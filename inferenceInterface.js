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
    this.lastOutpoint = "";
    this.storeparams = parameters.default;
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
    const { 
      startTurn, 
      endSystemTurn, 
      endUserTurn, 
      endTurn, 
      systemRole, 
      userRole, 
      assistantRole, 
      prependPrompt, 
      systemAfterPrepend, 
      postPrompt, 
      memorySystem, 
      memoryUser, 
      responseStart, 
      specialInstructions
    } = setting;

    this.instructSet = {
      startTurn : startTurn,
      endSystemTurn : endSystemTurn,
      endUserTurn : endUserTurn,
      endTurn : endTurn,
      systemRole : systemRole,
      userRole : userRole,
      assistantRole : assistantRole,
      prependPrompt : prependPrompt,
      systemAfterPrepend : systemAfterPrepend,
      postPrompt : postPrompt,
      memorySystem : memorySystem,
      memoryUser : memoryUser,
      responseStart : responseStart,
      specialInstructions : specialInstructions
    };
  } catch (error) {
  console.log("setPromptFormat error: " + error);
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
  const instruct = this.instructSet;
  console.log(JSON.stringify(this.instructSet));
  if (api.model) {
    params.model = api.model;
  }
  const outIdentity = JSON.stringify(identity)
  let finalPrompt = 
  instruct.startTurn +
  instruct.systemRole +
  instruct.prependPrompt +
  instruct.systemAfterPrepend + 
  outIdentity +
  instruct.postPrompt +
  instruct.memorySystem +
  instruct.endSystemTurn +
  instruct.startTurn +
  instruct.userRole +
  instruct.memoryUser +
  formattedQuery +
  instruct.endUserTurn +
  instruct.startTurn +
  instruct.assistantRole +
  instruct.responseStart;
  
  params.prompt = finalPrompt;
  completion(api, params, this.callback, this.notify);
}

  send(identity, text, params, api) {
    console.log("send: " + JSON.stringify(api));
    console.log("params: " + JSON.stringify(params));
   
    if ( api.type === "completion") {
      if (!this.custom) {
        this.instructSet = this.instructionFormats[api.format];
      }
      this.completionMessageBuilder(identity, text, params, api);   
   } 
    else if (api.type === "chat") {
      if (api.buildType === "key") {
          this.messageBuilder(identity, text, params, api);       
      }
      else if (api.buildType === "system") {
          this.messageSystemBuilder(identity, text, params, api);
      }
      else if (api.buildType === "combined") {
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

    for (let key in identity) {
        messaged.push ({
            "role": key,//I thihnk this is a bad path.
            "content": identity[key]
        })
    }
    messaged.push({
        "role": 'user',
        "content": user        
    });
    //messaged = JSON.stringify(messaged);
    chat(api, messaged, this.instructSet, params, this.callback, this.notify);
  }
  messageSystemBuilder(identity, message, params, api) {    
    if (api.model) {
      params.model = api.model;
    }
    let messages = [];
    for ( let key in identity) {
        let ident = identity[key]//identity[key];
        messages.push ({
            "role": 'system',
            "content": ident
        });
    }
    messages.push ({
        "role": 'user',
        "content": message
    })
    //messages = JSON.stringify(messages);
    chat(api, messages, this.instructSet, params, this.callback, this.notify);
  }
  messageOneSystemBuilder(identity, message, params, api) {
    if (api.model !== undefined) {
      params.model = api.model;
    }
    //for key in identity
    let messages = [];
    messages.push ({
        "role": 'system',
        "content": JSON.stringify(identity)//might need to json string it
        //"content": identity
    })
    messages.push ({
        "role": 'user',
        "content": message
    })
    //messages = JSON.stringify(messages);
    chat(api, messages, this.instructSet, params, this.callback, this.notify)
  }
}
async function chat(api, messages, instructions, params, callback,  notify) {
  params[api.templateStringKey] =  JinjaFormatter(instructions);
  params.adapter = returnKoboldAdapter(instructions);
  //messages = JSON.stringify(messages)
  console.log("messages: " +messages);
  let errcatch = "";
  //try {
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
    const response = await fetch(api.url, {//maybe put back axios
      method: 'POST',
      headers,
      body: outprompt,
    });
    console.log(JSON.stringify(response));
    let jsonResponse = await response.json();
    //console.log("response: "+JSON.stringify(jsonResponse));
    if (!jsonResponse.ok) {
      errcatch = jsonResponse.error
      console.log(`Request failed with status ${response.status}: ${jsonResponse.error}`);
    }
    console.log("response: "+JSON.stringify(jsonResponse));
    const text = outPointer(api.outpoint, jsonResponse); //now it's the user's problem after I sort out defaults.
    if (text === "") {
      callback("blank response");
    }
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
   
    // show contents of response
    if (!response.ok) {
      notify("api error: ", response.statusText);
      console.log("completion api error: " + response.statusText);
    }
    let jsonResponse = await response.json();
    console.log("response: "+JSON.stringify(jsonResponse));
    
    //const data = await response.json();
    //console.log(JSON.stringify(response));
    const text = outPointer(api.outpoint, jsonResponse); //now it's the user's problem after I sort out defaults.
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
function outPointer(outpoint, data) {
  //try {
    switch (outpoint.outpointPathSteps) {
      case 1:
        console.log(data[outpoint.one]);
        return data[outpoint.one];
      case 2:
        return data[outpoint.one][outpoint.two];
      case 3:
        return data[outpoint.one][outpoint.two][outpoint.three];
      case 4:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four];
      case 5:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][outpoint.five];
      case 6:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][outpoint.five][outpoint.six];
      case 7:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][outpoint.five][outpoint.six][outpoint.seven];
      case 8:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][outpoint.five][outpoint.six][outpoint.seven][outpoint.eight];
      case 9:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][outpoint.five][outpoint.six][outpoint.seven][outpoint.eight][outpoint.nine];
      case 10:       
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][outpoint.five][outpoint.six][outpoint.seven][outpoint.eight][outpoint.nine][outpoint.ten];
      case 11:
        throw new Error({message:"Bro, really? you buried your simple response target this deep in a response object? Is this your security through obscurity layer?"});       
      default:  
        console.log("Expected a number between 1 and 10, but got: " + outpoint.outpointPathSteps, );
      break;   
    }
  // } catch (error) {
  //   console.log("Expected " + outpoint.outpointPathSteps + "{ outpointPathSteps: 3, one : 'variable', two..., but got: " + JSON.stringify(outpoint) + "\n error: " + error);
  // }
}
function JinjaFormatter(instructionSet) {
 return `|-
  {%- set ns = namespace(found=false) -%}
   {%- for message in messages -%}
       {%- if message['role'] == 'system' -%}
           {%- set ns.found = true -%}
       {%- endif -%}
   {%- endfor -%}
   {%- for message in messages %}
      {%- if message['role'] == 'system' -%}
        {{- '` + instructionSet.startTurn + instructionSet.systemRole + instructionSet.prependPrompt + instructionSet.systemAfterPrepend + `' + message['content'] + '` + instructionSet.postPrompt + instructionSet.memorySystem  + instructionSet.endSystemTurn + `' -}}
      {%- else -%}
      {%- if message['role'] == 'user' -%}
        {{-'` + instructionSet.startTurn + instructionSet.userRole + instructionSet.memoryUser + `' + message['content']` + instructionSet.specialInstructions + ` + '` + instructionSet.endUserTurn + `'-}}
      {%- else -%}
        {{-'` + instructionSet.startTurn + instructionSet.assistantRole + `' + message['content'] + '` + instructionSet.endTurn + `' -}}
        {%- endif -%}
      {%- endif -%}
    {%- endfor -%}
  {%- if add_generation_prompt -%}
  {{-'` + instructionSet.startTurn + instructionSet.assistantRole + instructionSet.responseStart + `'-}}
  {%- endif -%}
  `;
}
// function JinjaFormatter(instructionSet) {
//   return `|-
//   {%- set ns = namespace(found=false) -%}
//   {%- for message in messages -%}
//   {%- if message['role'] == 'system' -%}
//   {%- set ns.found = true -%}
//   {%- endif -%}
//   {%- endfor -%}
//   {%- for message in messages %}
//   {%- if message['role'] == 'system' -%}
//   {{- ` + instructionSet.startTurn + instructionSet.systemRole + instructionSet.prependPrompt + instructionSet.systemAfterPrepend + `message['content'] + '` + instructionSet.postPrompt + instructionSet.memorySystem  + instructionSet.endSystemTurn + `' -}}
//   {%- else -%}
//   {%- if message['role'] == 'user' -%}
//   {{-'` + instructionSet.startTurn + instructionSet.userRole + instructionSet.memoryUser `' + message['content']` + instructionSet.specialInstructions + ` + '` + instructionSet.endTurn + `'-}}
//   {%- elif message['role'] !== 'assistant' -%}
//   {{-'` + instructionSet.memoryUser + instructionSet.startTurn + `' + 'role' + message['content'] + '` + instructionSet.endUserTurn + `' -}}
//   {%- else -%}
//   {{-'` + instructionSet.startTurn + instructionSet.assistantRole + `' + message['content'] + '` + instructionSet.endTurn + instructionSet.responseStart + `' -}}
//   {%- endif -%}
//   {%- endif -%}
//   {%- endfor -%}
//   {%- if add_generation_prompt -%}
//   {{-'` + instructionSet.startTurn + instructionSet.assistantRole + instructionSet.responseStart + `'-}}
//   {%- endif -%}
//   `
//   return jinja;
// }
function returnKoboldAdapter(instructionSet){//should be recieved into params.adapter
  const systemStart = instructionSet.startTurn + instructionSet.systemRole + instructionSet.prependPrompt + instructionSet.systemAfterPrepend;
  const systemEnd = instructionSet.postPrompt + instructionSet.memorySystem  + instructionSet.endSystemTurn;
  const userStart = instructionSet.startTurn + instructionSet.userRole + instructionSet.memoryUser;
  const userEnd = instructionSet.endUserTurn;
  const assistantStart = instructionSet.startTurn + instructionSet.assistantRole;
  const assistantEnd = instructionSet.endTurn + instructionSet.responseStart;
  return {
    system_start: systemStart,
    system_end: systemEnd,
    user_start: userStart,
    user_end: userEnd,
    assistant_start: assistantStart,
    assistant_end: assistantEnd
  };
}

module.exports = InferenceClient;