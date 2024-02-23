// curl http://127.0.0.1:5000/v1/completions \
//   -H "Content-Type: application/json" \
//   -d '{...params, prompt: prompt}'

// curl http://127.0.0.1:5000/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -d '{
//     "messages": [
//       {
//         "role": "user",
//         "content": "Hello!"
//       }
//     ],
//     "mode": "instruct",
//     "instruction_template": "Alpaca"
//   }'
async function getChat(apiUrl, apiKey, messages, params, callback,  notify  ) {
  const body = JSON.stringify({...params, messages: messages,

})
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: body
     
    }).then(response => {
      if (!response.ok) {
        notify("api error: ", response.statusText);
      }
      console.log(response.json());
      callback(response.json());
    })
  const data = await response.json();
  return data.choices[0].message.content;
}
function messageBuilder(identity, user, instructions) {
    //for key in identity
    const messaged = [];
    //messaged.system = identity[instructions.rootname];
    for (key in identity) {
        messaged.push ({
            "role": key,
            "content": identity[key]
        })
    }
    messaged.push({
        "role": 'user',
        "content": user        
    });
    return messaged;
}
function messageSystemBuilder(identity, message, instructions) {
    //for key in identity
    const messages = [];
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
    return messages;
}
function messageOneSystemBuilder(identity, message, instructions) {
    //for key in identity
    const messages = [];
    messages.push ({
        "role": 'system',
        "content": identity
    })
    
    messages.push ({
        "role": 'user',
        "content": message
    })
    return messages;
  
}
function completionMessageBuilder(identity, formattedQuery, params, instruct, template, messages) {
    let finalPrompt = 
   instruct.system +
   instruct.prependPrompt +
    JSON.stringify(identity) +
   instruct.postPrompt +
   instruct.memoryStart +
   instruct.memoryPost +
    formattedQuery +
    instruct.finalprompt +
    instruct.responseStart;
    params.prompt = finalPrompt;
}
module.exports.getCompletion = getCompletion;
module.exports.getChat = getChat;
module.exports.messageBuilder = messageBuilder;
module.exports.messageSystemBuilder = messageSystemBuilder;
module.exports.completionMessageBuilder = completionMessageBuilder;
