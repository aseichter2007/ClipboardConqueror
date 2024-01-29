const { default: axios } = require("axios");

class InferenceClient {
  constructor( handler, recieveApiResponse, returnSummary, notify, instructionFormats, parameters, endpoints) {
    this.handler = handler;
    this.callback = recieveApiResponse;
    this.returnSummary = returnSummary;
    this.notify = notify;
    this.instructSet = {};
    this.instructionFormats = instructionFormats;
    this.parameterFormats = parameters.params;
    this.parameters = parameters.default;
    this.custom = false;
    this.endpoints = endpoints;
  }
setOnePromptFormat(setting, value) {
  this.instructSet[setting] = value;
  this.custom = true;
}
setPromptFormat(setting) {
  //console.log("old format: " + JSON.stringify(this.instruct));
  //console.log("set prompt format: " + JSON.stringify(setting));
 this.custom =  true;
 try{
  const { system, prependPrompt, postPrompt, memoryStart, memoryPost, finalprompt, responseStart } = setting;
  this.instructSet = {
    system: system,
    prependPrompt : prependPrompt,
    postPrompt : postPrompt,
    memoryStart : memoryStart,
    memoryPost : memoryPost,
    finalprompt : finalprompt,
    responseStart : responseStart,
  };
} catch (error) {
  try{
   const { system, prepend, post, memory, memoryPost, final, Start } = setting;
   this.instructSet = {
    system: system,
    prependPrompt : prepend,
    postPrompt : post,
    memoryStart : memory,
    memoryPost : memoryPost,
    finalprompt : final,
    responseStart : Start,
   }
  } catch (error) {
    console.log("setPromptFormat error: " + error);
  }
}
  
  
  
  console.log("prompt format set: " + JSON.stringify(this.instructSet));
}

setFormat(format){
  try {
    this.instructSet = this.instructionFormats[format];
  } catch (error) {
    console.log("invalid format: " + error);
  }
}
completionMessageBuilder(identity, formattedQuery, params, api ) {
  let instruct = this.instructSet;
  if (api.model) {
    params.model = api.model;
  }
  const outIdentity = JSON.stringify(identity)

  let finalPrompt = 
  instruct.system +
  instruct.prependPrompt +
  outIdentity +
  instruct.postPrompt +
  instruct.memoryStart +
  instruct.memoryPost +
  formattedQuery +
  instruct.finalprompt +
  instruct.responseStart;
  
  params.prompt = finalPrompt;
  completion(api, params, this.callback, this.notify);
}

  send(identity, text, params, api) {
    console.log("send: " + api.type);
   
    if ( api.type === "completion") {
      if (!this.custom) {
        this.instructSet = this.instructionFormats[api.format];
      }
      this.completionMessageBuilder(identity, text, params, api);   
   } 
    //   else if ( api.type === "kompletion") {
    //   if (!this.custom) {
    //     this.instructSet = this.instructionFormats[api.format];
    //   }
    //   this.kompletionMessageBuilder(identity, text, params, api);   
    // } 
    else if (api.type === "chat") {
      if (api.format === "key") {
          this.messageBuilder(identity, text, params, api);       
      }
      else if (api.format === "system") {
          this.messageSystemBuilder(identity, text, params, api);
      }
      else if (api.format === "combined") {
        this.messageOneSystemBuilder(identity, text , params, api);
      }
    }
  } 
    //sendPostTextRequest(this.baseURL, params, this.callback, this.handler, this.notify);
  
  messageBuilder(identity, user, params, api) {
    if (api.model) {
      params.model = api.model;
    }
    let messaged = [];

    for (const key in identity) {
        messaged.push ({
            "role": key,
            "content": identity[key]
        })
    }
    messaged.push({
        "role": 'user',
        "content": user        
    });
    messaged = JSON.stringify(messaged);
    chat(api, messaged, params, this.callback, this.notify);
  }
  messageSystemBuilder(identity, message, params, api) {    
    if (api.model) {
      params.model = api.model;
    }
    let messages = [];
    //messages.system = identity[instructions.rootname];
    for (key in identity) {
        messages.push ({
            "role": 'system',
            "content": identity[key]
        })
    }
    messages.push ({
        "role": 'user',
        "content": message
    })
    messages = JSON.stringify(messages);
    chat(api, messages, params, this.callback, this.notify);
  }
  messageOneSystemBuilder(identity, message, params, api) {
    if (api.model !== undefined) {
      params = {...params, model: api.model};
    }
    //for key in identity
    const messages = [];
    messages.push ({
        "role": 'system',
        "content": identity//might need to json parse it
    })
    messages.push ({
        "role": 'user',
        "content": message
    })
    messages = JSON.stringify(messages);
    chat(api, messages, params, this.callback, this.notify)
  }
}
// async function sendPostPerfRequest(apiUrl, data, handler, notify) {
//   let error = ""
//   try {
//     const response = await handler.post(apiUrl, data);
//     //console.log(`Response status: ${response.status}`);
//     //var text = JSON.stringify(response.data.results[0].text)
//     var text = response.last_token_count;
//     console.log(`Response data: ${response}`);
//     return text;
//   } catch (error) {
//    // notify("error:", error);
//     console.log(`Error sending token request: ${error}`);
//   }
// }
async function chat(api, messages, params, callback,  notify) {
  messages = JSON.stringify(messages)
  console.log(messages);
  let errcatch = "";
  //try {
    const url = api.url;
    //console.log(apiKey, identity, formattedQuery, params, apiUrl, model);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api.key}`,
    };
    const prompt = {
      model: api.model,
      messages: messages,
      max_tokens: params.max_length,
      stream: false
    }
    const outprompt = JSON.stringify({...params,...prompt})
    console.log("outprompt: "+ outprompt);
    const response = await fetch(url, {//maybe put back axios
      method: 'POST',
      headers,
      body: outprompt,
    });
    console.log(JSON.stringify(response));
    const jsonResponse = await response.json();
    //console.log("response: "+JSON.stringify(jsonResponse));
    if (!response.ok) {
      errcatch = jsonResponse.error
      console.log(`Request failed with status ${response.status}: ${jsonResponse.error.message}`);
    }
    console.log(JSON.stringify(jsonResponse));
    const text = outPointer(api.outpoints, jsonResponse); //now it's the user's problem after I sort out defaults.

    callback(text);//could make programatical in a switch off a number
  //
}
async function completion(api, params, callback, notify) {
  try {
    console.log("sending to api: " + api.url);
    const response = await fetch(api.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${api.key}`,
      },
      body: JSON.stringify(params)
    });
    //console.log(JSON.stringify(response));
    if (!response.ok) {
      notify("api error: ", response.statusText);
      console.log("completion api error: " + response.statusText);
    }
    
    const data = await response.json();
    //console.log(JSON.stringify(data));
    const text = outPointer(api.outpoints, data); //now it's the user's problem after I sort out defaults.
    //const text = data[api.outpoint][0].text;
    //callback(JSON.stringify(text));
    //console.log(text);
    callback(text); 
  } catch (error) {
    console.error("Error in completion API:", error);
    notify("Error in completion API:", error);
    throw error;
  }
}
function outPointer(outpoints, data) {
  try {
    switch (outpoints.outpointPathSteps) {
      case 1:
        return data[outpoints.one];
      case 2:
        return data[outpoints.one][outpoints.two];
      case 3:
        return data[outpoints.one][outpoints.two][outpoints.three];
      case 4:
        return data[outpoints.one][outpoints.two][outpoints.three][outpoints.four];
      case 5:
        return data[outpoints.one][outpoints.two][outpoints.three][outpoints.four][outpoints.five];
      case 6:
        return data[outpoints.one][outpoints.two][outpoints.three][outpoints.four][outpoints.five][outpoints.six];
      case 7:
        return data[outpoints.one][outpoints.two][outpoints.three][outpoints.four][outpoints.five][outpoints.six][outpoints.seven];
      case 8:
        return data[outpoints.one][outpoints.two][outpoints.three][outpoints.four][outpoints.five][outpoints.six][outpoints.seven][outpoints.eight];
      case 9:
        return data[outpoints.one][outpoints.two][outpoints.three][outpoints.four][outpoints.five][outpoints.six][outpoints.seven][outpoints.eight][outpoints.nine];
      case 10:       
        return data[outpoints.one][outpoints.two][outpoints.three][outpoints.four][outpoints.five][outpoints.six][outpoints.seven][outpoints.eight][outpoints.nine][outpoints.ten];
      case 11:
        throw new Error({message:"Bro, really? you buried your simple response target this deep in a response object? is this your security through obscurity layer?"});       
      default:  
        console.log("Expected a number between 1 and 10, but got: " + outpoints.outpointCount, );
      break;   
    }
  } catch (error) {
    console.log("Expected " + outpoints.outpointPathSteps + " steps: {one: 'name, two...}, but got: " + JSON.stringify(outpoints) + "\n error: " +JSON.stringify(error));
  }
}
module.exports = InferenceClient;
// async function koboldCompletion(api, params, callback,  notify) {
//   try {
//     console.log("sending to api: " + api.url);
//     const response = await fetch(api.url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify(params)
//     });
//     //console.log(JSON.stringify(response));
//     if (!response.ok) {
//       notify("api error: ", response.statusText);
//       console.log("completion api error: " + response.statusText);
//     }

//     const data = await response.json();
//     console.log(JSON.stringify(data));
//     const text = data[api.outpoint][0].text;
//     callback(JSON.stringify(text));
//     console.log(text);
//     return text;
//   } catch (error) {
//     console.error("Error in completion API:", error);
//     notify("Error in completion API:", error);
//     throw error;
//   }
// }
// formatQueryAndSend(identity, formattedQuery, params) {
//   //console.log("current instruct: " + JSON.stringify(this.instruct));
//   //console.log("system out: " + this.instruct.system +"\n");
//   let finalPrompt = 
//   this.instructSet.system +
//   this.instructSet.prependPrompt +
//   JSON.stringify(identity) +
//   this.instructSet.postPrompt +
//   this.instructSet.memoryStart +
//   this.instructSet.memoryPost +
//   formattedQuery +
//   this.instructSet.finalprompt +
//   this.instructSet.responseStart;
//   params.prompt = finalPrompt;
//   this.allParams = allParams;  
//   sendPostTextRequest(this.baseURL, params, this.callback, this.handler, this.notify);
// }
// kompletionMessageBuilder(identity, formattedQuery, params, api ) {
//   let instruct = this.instructSet;
//   if (api.model) {
//     params.model = api.model;
//   }

//   let finalPrompt = 
//   instruct.system +
//   instruct.prependPrompt +
//   JSON.stringify(identity) +
//   instruct.postPrompt +
//   instruct.memoryStart +
//   instruct.memoryPost +
//   formattedQuery +
//   instruct.finalprompt +
//   instruct.responseStart;
//   params.prompt = finalPrompt;

//   koboldCompletion(api, params, this.callback, this.notify);
// }
