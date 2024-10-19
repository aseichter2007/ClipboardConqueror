const { default: axios } = require("axios");

class InferenceClient {
  constructor(
    handler,
    recieveApiResponse,
    //returnSummary,
    notify,
    instructionFormats,
    parameters,
    endpoints
  ) {
    this.handler = handler;
    this.callback = recieveApiResponse;
    //this.returnSummary = returnSummary;
    this.notify = notify;
    this.instructSet = {};
    this.instructionFormats = instructionFormats;
    this.parameterFormats = parameters.params;
    this.parameters = parameters.default;
    this.endpoints = endpoints;
    this.lastOutpoint = "";
    this.storeparams = parameters.default;
  }

  /**
   * Sets a specific prompt format segment for the inference interface.
   *
   * @param {string} setting - The name of the prompt format setting to be updated.
   * @param {string} value - The new value for the specified prompt format setting.
   */
  setOnePromptFormat(setting, value) {
    this.instructSet[setting] = value;
  }

  /**
   * Sets the generation parameters stored in inference interface.
   * 
   * @param {*} params 
   */
  setParams(params){
    this.parameters = params;
  }
  
  /**
   * Sets the prompt format for the inference interface.
   *
   * @param {Object} setting - An object containing the settings for the prompt format.
   * @param {string} [setting.bos] - The beginning of sentence token.
   * @param {string} [setting.eos] - The end of sentence token.
   * @param {string} [setting.startTurn] - The token to start a conversation turn.
   * @param {string} [setting.endTurn] - The token to end a conversation turn.
   * @param {string} [setting.startSystem] - The token to start a system message.
   * @param {string} [setting.startUser] - The token to start a user message.
   * @param {string} [setting.startAssistant] - The token to start an assistant message.
   * @param {string} [setting.endSystemTurn] - The token to end a system message turn.
   * @param {string} [setting.endUserTurn] - The token to end a user message turn.
   * @param {string} [setting.endAssistantTurn] - The token to end an assistant message turn.
   * @param {string} [setting.systemRole] - The role of the system.
   * @param {string} [setting.endSystemRole] - The token to end the system role.
   * @param {string} [setting.userRole] - The role of the user.
   * @param {string} [setting.endUserRole] - The token to end the user role.
   * @param {string} [setting.endRole] - The token to end any role.
   * @param {string} [setting.roleGap] - The gap between roles.
   * @param {string} [setting.endUserRole] - The token to end the user role.
   * @param {string} [setting.assistantRole] - The role of the assistant.
   * @param {string} [setting.endAssistantRole] - The token to end the assistant role.
   * @param {string} [setting.prependPrompt] - The prompt to prepend to the conversation.
   * @param {string} [setting.systemAfterPrepend] - The system message after the prepend prompt.
   * @param {string} [setting.postPrompt] - The prompt to append to the conversation.
   * @param {string} [setting.memorySystem] - The system memory.
   * @param {string} [setting.memoryUser] - The user memory.
   * @param {string} [setting.responseStart] - The token to start the assistant's response.
   * @param {string} [setting.specialInstructions] - Special instructions for the conversation.
   *
   * @throws {Error} If an invalid key is used in the setting object.
   */
  setPromptFormat(setting) {
    try {
      let bos = "";
      if (setting.hasOwnProperty("bos")) {
        bos = setting.bos;
      }
      let eos = "";
      if(setting.hasOwnProperty("eos")){
        eos = setting.eos;
      }
      let startTurn = "";
      if (setting.hasOwnProperty("startTurn")) {
        startTurn = setting.startTurn;
      }
      let endTurn = "";
      if (setting.hasOwnProperty("endTurn")) {
        endTurn = setting.endTurn;
      }
      let startSystem = "";
      if (setting.hasOwnProperty("startSystem")) {
        startSystem = setting.startSystem;
      }
      let startUser = "";
      if (setting.hasOwnProperty("startUser")) {
        startUser = setting.startUser;
      }
      let startAssistant = "";
      if (setting.hasOwnProperty("startAssistant")) {
        startAssistant = setting.startAssistant;
      }
      let endSystemTurn = "";
      if (setting.hasOwnProperty("endSystemTurn")) {
        endSystemTurn = setting.endSystemTurn;
      }
      let endUserTurn = "";
      if (setting.hasOwnProperty("endUserTurn")) {
        endUserTurn = setting.endUserTurn;
      }
      let endAssistantTurn = "";
      if (setting.hasOwnProperty("endAssistantTurn")) {
        endAssistantTurn = setting.endAssistantTurn;
      }
      let systemRole = "";
      if (setting.hasOwnProperty("systemRole")) {
        systemRole = setting.systemRole;
      }
      let endSystemRole = "";
      if (setting.hasOwnProperty("endUserRole")) {
        endSystemRole = setting.endSystemRole;
      }
      let userRole = "";
      if (setting.hasOwnProperty("userRole")) {
        userRole = setting.userRole;
      }
      let endRole = "";
      if (setting.hasOwnProperty("endRole")) {
        endRole = setting.endRole;
      }
      let roleGap = "";
      if (setting.hasOwnProperty("roleGap")) {
        roleGap = setting.roleGap;
      }
      let endUserRole = "";
      if (setting.hasOwnProperty("endUserRole")) {
        endUserRole = setting.endUserRole;
      }
      let assistantRole = "";
      if (setting.hasOwnProperty("assistantRole")) {
        assistantRole = setting.assistantRole;
      }
      let endAssistantRole = "";
      if (setting.hasOwnProperty("endAssistantRole")) {
        endAssistantRole = setting.endAssistantRole;
      }
      let prependPrompt = "";
      if (setting.hasOwnProperty("prependPrompt")) {
        prependPrompt = setting.prependPrompt;
      }
      let systemAfterPrepend = "";
      if (setting.hasOwnProperty("systemAfterPrepend")) {
        systemAfterPrepend = setting.systemAfterPrepend;
      }
      let postPrompt = "";
      if (setting.hasOwnProperty("postPrompt")) {
        postPrompt = setting.postPrompt;
      }
      let memorySystem = "";
      if (setting.hasOwnProperty("memorySystem")) {
        memorySystem = setting.memorySystem;
      }
      let memoryUser = "";
      if (setting.hasOwnProperty("memoryUser")) {
        memoryUser = setting.memoryUser;
      }
      let responseStart = "";
      if (setting.hasOwnProperty("responseStart")) {
        responseStart = setting.responseStart;
      }
      let specialInstructions = "";
      if (setting.hasOwnProperty("specialInstructions")) {
        specialInstructions = setting.specialInstructions;
      }

      this.instructSet = {
        bos: bos,
        eos: eos,
        startTurn: startTurn,
        endTurn: endTurn,
        startSystem: startSystem,
        startUser: startUser,
        startAssistant: startAssistant,
        endSystemTurn: endSystemTurn,
        endUserTurn: endUserTurn,
        endAssistantTurn: endAssistantTurn,
        systemRole: systemRole,
        endSystemRole: endSystemRole,
        userRole: userRole,
        endUserRole: endUserRole,
        endRole: endRole,
        roleGap: roleGap,
        assistantRole: assistantRole,
        endAssistantRole: endAssistantRole,
        prependPrompt: prependPrompt,
        systemAfterPrepend: systemAfterPrepend,
        postPrompt: postPrompt,
        memorySystem: memorySystem,
        memoryUser: memoryUser,
        responseStart: responseStart,
        specialInstructions: specialInstructions
      };
    } catch (error) {
      console.log(
        "setPromptFormat error: " +
          error +
          " \n Please ensure you are using a valid key in setup.js promptFormats"
      );
    }
    console.log("prompt format set: " + JSON.stringify(this.instructSet));
  }

 /**
  * Sets the instruction format by name..
  *
  * @param {string} format - The format to be set for the instruction set.
  * @throws {Error} If the provided format is invalid.
  */
  setFormat(format) {
    try {
      this.instructSet = this.instructionFormats[format];
    } catch (error) {
      console.log("invalid format: " + error);
    }
  }
  /**
   * Builds a completion message for the given identity, user query, parameters, and API.
   *
   * @param {Object} identity - The identity object containing system information.
   * @param {string} userQuery - The user's query or input.
   * @param {Object} params - The parameters object to be modified with the final prompt.
   * @param {Object} api - The API object containing additional configuration options.
   * @returns {void}
   */
  completionMessageBuilder(identity, userQuery, params, api) {
    const instruct = this.instructSet;
    //console.log(JSON.stringify(this.instructSet));
    if (api.model) {
      params.model = api.model;
    }

    let outIdentity = ""; //identityStringifyNoKey(identity);
    if (api.hasOwnProperty("jsonSystem")) {
      if (api.jsonSystem === "full") {
        outIdentity = JSON.stringify(identity);
      } else if (api.jsonSystem === "keys") {
        outIdentity = this.identityStringifier(identity);
      } else if (api.jsonSystem === "markup") {
        outIdentity = this.systemPromptBuilder(identity);
      } else if (api.jsonSystem === "none") {
        outIdentity = this.identityStringifyNoKey(identity);
      } else {
        outIdentity = this.identityStringifyNoKey(identity);
      }
    } else {
      outIdentity = this.identityStringifyNoKey(identity);
    }
    let finalPrompt ="";
    if (instruct.hasOwnProperty("order")) {

      finalPrompt += instruct.bos;
      instruct.order.forEach(segment => {
        if (segment == "system") {
          finalPrompt += 
            instruct.startTurn +
            instruct.startSystem +
            instruct.systemRole +
            instruct.endSystemRole +
            instruct.endRole +
            instruct.roleGap +
            instruct.prependPrompt +
            instruct.systemAfterPrepend +
            outIdentity +
            instruct.postPrompt +
            instruct.memorySystem +
            instruct.endSystemTurn +
            instruct.endTurn;
        } else if(segment == "user") {
          finalPrompt += 
            instruct.startTurn +
            instruct.startUser +
            instruct.userRole +
            instruct.endUserRole +
            instruct.endRole +
            instruct.roleGap +
            instruct.memoryUser +
            userQuery +
            instruct.endUserTurn +
            instruct.endTurn;
        }else if(segment == "assistant") {
          userQuery += 
            instruct.startTurn +
            instruct.startAssistant +
            instruct.assistantRole +
            instruct.endAssistantRole +
            instruct.endRole +
            instruct.roleGap +
            instruct.responseStart;
        }
        
      });
      finalPrompt += instruct.eos; //this may belong up top, or responstStart may belong below this. idk, the tokenizer generally handles this.
    } else {
      
      finalPrompt =
        instruct.bos +
        instruct.startTurn +
        instruct.startSystem +
        instruct.systemRole +
        instruct.endSystemRole +
        instruct.endRole +
        instruct.roleGap +
        instruct.prependPrompt +
        instruct.systemAfterPrepend +
        outIdentity +
        instruct.postPrompt +
        instruct.memorySystem +
        instruct.endSystemTurn +
        instruct.endTurn +
        instruct.startTurn +
        instruct.startUser +
        instruct.userRole +
        instruct.endUserRole +
        instruct.endRole +
        instruct.roleGap +
        instruct.memoryUser +
        userQuery +
        instruct.endUserTurn +
        instruct.endTurn +
        instruct.startTurn +
        instruct.startAssistant +
        instruct.assistantRole +
        instruct.endAssistantRole +
        instruct.endRole +
        instruct.roleGap +
        instruct.responseStart+
        instruct.eos;//this might be better up one line, but should generally remain empty
    }
    if (api.hasOwnProperty("promptLocation") && api.promptLocation !== "") {
      if (api.hasOwnProperty("textHandle") && api.textHandle !== "") {
        params[api.promptLocation][api.textHandle] = finalPrompt;
      } else{
        params[api.promptLocation] = finalPrompt;
      }
    } else if (api.hasOwnProperty("textHandle") && api.textHandle !== "") {
      params[api.textHandle] = finalPrompt;
    } else {
      params.prompt = finalPrompt;
    }
    completion(api, params, this.callback, this.notify, this.handler);
  }

  /**
   * Sends a message to a message builder based on the API configuration.
   *
   * @param {string} identity - The identity of the sender.
   * @param {string} text - The text of the message.
   * @param {Object} params - The parameters for the message.
   * @param {Object} api - The API configuration.
   */
  send(identity, text, params, api) {
    if (api.type === "completion") {
      this.completionMessageBuilder(identity, text, params, api);
    } else if (api.type === "chat") {
      if (api.buildType === "key") {
        this.messageBuilder(identity, text, params, api);
      } else if (api.buildType === "system") {
        this.messageSystemBuilder(identity, text, params, api);
      } else if (api.buildType === "combined") {
        this.messageOneSystemBuilder(identity, text, params, api);
      } else if (api.buildType === "systemuserstream") {
        this.messageSystemBuilder(identity, text, params, api);
      }
      //  else if (api.buildType === "compatible") {
      //   generateCompletion(
      //     api,
      //     identity,
      //     text,
      //     this.instructSet,
      //     params,
      //     this.callback,
      //   );
      //}
       else {
        this.basicMessageBuilder(identity, text, params, api);
      }
    }
  }
 /**
   * Builds a message object for a chatbot interaction. Sends the built message object to chat().
   *
   * @param {Object} identity - The identity of the chatbot.
   * @param {string} user - The user's message.
   * @param {Object} params - Additional parameters for the chatbot.
   * @param {Object} api - The API object containing the model.
   */
 messageSystemBuilder(identity, user, params, api) {
  if (api.model) {
    params.model = api.model;
  }
  let messaged = [];
  let count = 0;
  for (let key in identity) {
    if (count === 0) {
      messaged.push({
        role: "system", 
        content: identity[key],
        name: this.instructSet.systemRole
      });
    } else {
      messaged.push({
        role: "user", 
        content: identity[key],
        name: this.instructSet.userRole
      });
    }
    count++;
  }
  messaged.push({
    role: "user",
    content: user,
    name: this.instructSet.systemRole
  });
  //messaged = JSON.stringify(messaged);
  chat(
    api,
    messaged,
    this.instructSet,
    params,
    this.callback,
    this.notify,
    this.handler
  );
}
  /**
   * Builds a message object for a chatbot interaction. Sends the built message object to chat().
   *
   * @param {Object} identity - The identity of the chatbot.
   * @param {string} user - The user's message.
   * @param {Object} params - Additional parameters for the chatbot.
   * @param {Object} api - The API object containing the model.
   */
  messageBuilder(identity, user, params, api) {
    if (api.model) {
      params.model = api.model;
    }
    let messaged = [];

    for (let key in identity) {
      messaged.push({
        role: "user", 
        content: identity[key],
        name: this.instructSet.userRole
      });
    }
    messaged.push({
      role: "user",
      content: user,
      name: this.instructSet.systemRole
    });
    //messaged = JSON.stringify(messaged);
    chat(
      api,
      messaged,
      this.instructSet,
      params,
      this.callback,
      this.notify,
      this.handler
    );
  }

  /**
   * Builds multiple message system prompts. Sends the built message object to chat().
   *
   * @param {Object} identity - The identity object containing various keys.
   * @param {string} message - The user message to be included in the conversation.
   * @param {Object} params - Additional parameters for the message system.
   * @param {Object} api - The API object that may contain a model property.
   */
  messageSystemBuilder(identity, message, params, api) {
    if (api.model) {
      params.model = api.model;
    }
    let messages = [];
    for (let key in identity) {
      let ident = identity[key]; //identity[key];
      messages.push({
        role: "system",
        content: JSON.stringify(ident),
        name: this.instructSet.systemRole
      });
    }
    messages.push({
      role: "user",
      content: message,
      name: this.instructSet.userRole
    });
    //messages = JSON.stringify(messages);
    chat(
      api,
      messages,
      this.instructSet,
      params,
      this.callback,
      this.notify,
      this.handler
    );
  }

  /**
   * Builds one system message prompt combining all identities. Sends the built message object to chat().
   *
   * @param {Object} identity - The identity object containing various keys.
   * @param {string} message - The user message to be included in the conversation.
   * @param {Object} params - Additional parameters for the message system.
   * @param {Object} api - The API object that may contain a model property.
   */
  messageOneSystemBuilder(identity, message, params, api) {
    if (api.model !== undefined) {
      params.model = api.model;
    }
    //for key in identity
    let outIdentity = ""; //identityStringifyNoKey(identity);
    if (api.hasOwnProperty("jsonSystem")) {
      if (api.jsonSystem === "full") {
        outIdentity = JSON.stringify(identity);
      } else if (api.jsonSystem === "keys") {
        outIdentity = this.identityStringifier(identity);
      } else if (api.jsonSystem === "markup") {
        outIdentity = this.systemPromptBuilder(identity);
      } else if (api.jsonSystem === "none") {
        outIdentity = this.identityStringifyNoKey(identity);
      } else {
        outIdentity = this.identityStringifyNoKey(identity);
      }
    } else {
      outIdentity = this.identityStringifyNoKey(identity);
    }
    let messages = [];
    if(api.hasOwnProperty("systemLocation")){
      //this is gonna mess with the history I cludged in. 
    }else{
      messages.push({
        role: "system",
        content: outIdentity,
        name: this.instructSet.systemRole
      });
    }
    messages.push({
      role: "user",
      content: message,
      name: this.instructSet.userRole
    });
    //messages = JSON.stringify(messages);
    chat(
      api,
      messages,
      this.instructSet,
      params,
      this.callback,
      this.notify,
      this.handler,
      outIdentity
    );
  }

  /**
   * Builds a basic system and user message object. Sends the built message object to chat().
   *
   * @param {Object} identity - The identity object containing various keys.
   * @param {string} message - The user message to be included in the conversation.
   * @param {Object} params - Additional parameters for the message system.
   * @param {Object} api - The API object that may contain a model property.
   */
  basicMessageBuilder(identity, message, params, api) {
    if (api.model !== undefined) {
      params.model = api.model;
    }
    let messages = [
      { role: "system", content: JSON.stringify(identity) },
      { role: "user", content: message }
    ];
    //messages = JSON.stringify(messages);
    chat(
      api,
      messages,
      this.instructSet,
      params,
      this.callback,
      this.notify,
      this.handler
    );
  }

  /**
   * Generates a system prompt based on the provided identity object.
   *
   * @param {Object} identity - An object containing roles and their descriptions.
   * @returns {string} - A string representing the system prompt.
   */
  systemPromptBuilder(identity) {
    let secretIdentity = "";
    for (const key in identity) {
      secretIdentity +=
        this.instructSet.endTurn +
        this.instructSet.endUserTurn +
        this.instructSet.startTurn +
        this.instructSet.startUser +
        key +
        this.instructSet.endUserRole +
        this.instructSet.endRole +
        identity[key] +
        this.instructSet.roleGap;
    } //this.instructSet.endTurn + this.inferenceClient.instructSet["end"+typeStepBack[type]+"Turn"] + this.inferenceClient.instructSet.startTurn + this.inferenceClient.instructSet["start"+type ] + name + this.inferenceClient.instructSet["end"+type+"Role"] + this.inferenceClient.instructSet.endRole;

    return secretIdentity;
  }

  /**
 * Converts an identity object into a string representation.
 *
 * This function iterates over the properties of the given identity object and constructs
 * a string where each property is represented as "key : value". The properties are separated
 * by a space and a roleGap string is appended at the end. The roleGap string is assumed to be
 * a property of the inferenceInterface object.
 *
 * @param {Object} identity - The identity object to be converted into a string.
 * @returns {string} A string representation of the identity object.
 */
  identityStringifier(identity) {
    let secretIdentity = "";
    for (const key in identity) {
      secretIdentity +=
        " " + key + " : " + identity[key] + this.instructSet.roleGap;
    }
    return secretIdentity;
  }

  /**
   * This function takes an object as input, where each key-value pair represents a part of a secret identity.
   * It concatenates all the values in the object into a single string, separating each value with a role gap.
   * This function does not include the keys in the concatenated string.
   *
   * @param {Object} identity - An object where each key-value pair represents a part of a secret identity.
   * @returns {string} A string that represents the concatenated secret identity.
   */
  identityStringifyNoKey(identity) {
    let secretIdentity = "";
    for (const key in identity) {
      secretIdentity += identity[key] + this.instructSet.roleGap;
    }
    return secretIdentity;
  }
}

/**
 * Function to handle chat completion using a specified openai compatible API.
 *
 * @async
 * @function chat
 * @param {Object} api - The API configuration object.
 * @param {Array} messages - The array of messages to send to the API.
 * @param {String} promptFormat - The format of the prompt.
 * @param {Object} params - The parameters to send to the API.
 * @param {Function} callback - The callback function to handle the API response.
 * @param {Function} notify - The notification function.
 * @param {Object} handler - The object handling the API request.
 * @throws {Error} Throws an error if there is an issue with the API request or response.
 * @returns {Promise<void>}
 */
async function chat(
  api,
  messages,
  promptFormat,
  params,
  callback,
  notify,
  handler,
  identity = ""
) {
  try {
    if (api.noFormat == undefined || api.noFormat == false) {
      if (api.hasOwnProperty("templateStringKey") && api.templateStringKey != "") {
        params[api.templateStringKey] = JinjaFormatter(promptFormat);
      }
      if (api.hasOwnProperty("koboldAdapter") && api.koboldAdapter != false) {
        params.koboldAdapter = returnKoboldAdapter(promptFormat);
      }
    }
    console.log("sending to completion api: " + api.url);
    params.messages = messages;
    
    const headers = {"Content-Type":"application/json"};
    if (api.hasOwnProperty("headers")) {
      api.headers.forEach(head => {
        headers[head[0]] = head[1]
      });
    }
    if (api.hasOwnProperty("authHeader")) {
      if (api.hasOwnProperty("authHeaderSecondary")){
        headers[api.authHeader] = api.authHeaderSecondary + api.key;
      }else{
        headers[api.authHeader] = api.key;
      }
    }
    const config = {
      method: "POST",
      url: api.url,
      headers: headers,
      data: params
    };
    if (api.hasOwnProperty("systemLocation")) {
      config.data.system = identity
    }
    console.log("outgoing request: "+ JSON.stringify(config));
    handler
      .request(config)
      .then(response => {
        try {
          if (!response.ok === "OK") {
            //notify("api error: ", response.statusText);
            console.log("Chat api error: " + response.statusText);
          }
          const output = outPointer(api.outpoint, response.data); // response.json();
          callback(output);
        } catch (error) {
          console.log(JSON.stringify(response));
          console.log(error);
          console.log(error.response.data.error);  
        }
      })
      .catch(error => {
        try {
          console.log(error);        
          console.log(error.response.data.error);  
        } catch (error) {
          console.log("error recieving api error.");
        }
      });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Makes a completion request to the specified API with the given parameters.
 *
 * @async
 * @function completion
 * @param {Object} api - The API object containing the URL and key for the completion request.
 * @param {Object} params - The parameters to be sent with the completion request.
 * @param {Function} callback - The callback function to be called with the output of the completion request.
 * @param {Function} notify - The function to be called for notifications (not used in this function).
 * @param {Object} handler - The object handling the HTTP request.
 * @throws {Error} If there is an error in the completion API request.
 */
async function completion(api, params, callback, notify, handler) {
  try {
    console.log("sending to completion api: " + api.url);
    const headers = {"Content-Type":"application/json"};
    if (api.hasOwnProperty("headers")) {
      api.headers.forEach(head => {
        headers[head[0]] = head[1]
      });
    }
    if (api.hasOwnProperty("authHeader")) {
      if (api.hasOwnProperty("authHeaderSecondary")){
        headers[api.authHeader] = api.authHeaderSecondary + api.key;
      }else{
        headers[api.authHeader] = api.key;
      }
    }
    const config = {
      method: "POST",
      url: api.url,
      headers: headers,
      data: params
    };
    if (api.hasOwnProperty("systemLocation")) {
      config.data.system = identity
    }
    const response = await handler
      .request(api.url, config,
       )
      .then(response => {
        try { 
          if (!response.ok === "OK") {
            console.log("completion api error: " + response.statusText);
          }
          //console.log(response.data);
          const output = outPointer(api.outpoint, response.data);
          callback(output);
        } catch (error) {
          console.log(error);
          console.log("make sure outpoint is configured for this api");
        }
      })
      .catch(error => {
        try {
          console.log(error);
        } catch (error) {
          console.log("error recieving api error");
        }
      });
  } catch (error) {
    console.error("Error in completion API:", error);
  }
}

/**
 * Retrieves a nested value from a data object based on the provided outpoint.
 *
 * @param {Object} outpoint - An object containing the path to the desired value.
 * @param {number} outpoint.outpointPathSteps - The number of steps in the path.
 * @param {string|number} outpoint.one - The first key or index in the path.
 * @param {string|number} [outpoint.two] - The second key or index in the path.
 * @param {string|number} [outpoint.three] - The third key or index in the path.
 * @param {string|number} [outpoint.four] - The fourth key or index in the path.
 * @param {string|number} [outpoint.five] - The fifth key or index in the path.
 * @param {string|number} [outpoint.six] - The sixth key or index in the path.
 * @param {string|number} [outpoint.seven] - The seventh key or index in the path.
 * @param {string|number} [outpoint.eight] - The eighth key or index in the path.
 * @param {string|number} [outpoint.nine] - The ninth key or index in the path.
 * @param {string|number} [outpoint.ten] - The tenth key or index in the path.
 * @param {Object} data - The data object from which to retrieve the value.
 * @returns {*} The nested value from the data object.
 * @throws {Error} If the outpointPathSteps value is greater than 10.
 */
function outPointer(outpoint, data) {
  try {
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
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][
          outpoint.five
        ];
      case 6:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][
          outpoint.five
        ][outpoint.six];
      case 7:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][
          outpoint.five
        ][outpoint.six][outpoint.seven];
      case 8:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][
          outpoint.five
        ][outpoint.six][outpoint.seven][outpoint.eight];
      case 9:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][
          outpoint.five
        ][outpoint.six][outpoint.seven][outpoint.eight][outpoint.nine];
      case 10:
        return data[outpoint.one][outpoint.two][outpoint.three][outpoint.four][
          outpoint.five
        ][outpoint.six][outpoint.seven][outpoint.eight][outpoint.nine][
          outpoint.ten
        ];
      case 11:
        throw new Error({
          message:
            "Bro, really? you buried your simple response target this deep in a response object? Is this your security through obscurity layer?"
        });
      default:
        console.log(
          "Expected a number between 1 and 10, but got: " +
            outpoint.outpointPathSteps
        );
        break;
    }
  } catch (error) {
    console.log(
      "Expected " +
        outpoint.outpointPathSteps +
        "{ outpointPathSteps: 3, one : 'variable', two..., but got: " +
        JSON.stringify(outpoint) +
        "\n error: " +
        error
    );
  }
}

/**
 * JinjaFormatter is a function that formats a given instruction set into a Jinja template string.
 * The function takes an instruction set as an argument and returns a string that can be used as a template for Text Generation WebUI openAI chat api.
 * @param {object} instructionSet - An object containing the instruction set to be formatted.
 * @returns {string} - A Jinja template string.
 */
function JinjaFormatter(instructionSet) {
  return (
    `|-
  {%- set ns = namespace(found=false) -%}
   {%- for message in messages -%}
       {%- if message['role'] == 'system' -%}
           {%- set ns.found = true -%}
       {%- endif -%}
   {%- endfor -%}
   {%- for message in messages %}
      {%- if message['role'] == 'system' -%}
        {{- '` +
    instructionSet.bos +
    instructionSet.startTurn +
    instructionSet.startSystem +
    instructionSet.systemRole +
    instructionSet.endRole +
    instructionSet.endSystemRole +
    instructionSet.roleGap +
    instructionSet.prependPrompt +
    instructionSet.systemAfterPrepend +
    `' + message['content'] + '` +
    instructionSet.postPrompt +
    instructionSet.memorySystem +
    instructionSet.endSystemTurn +
    instructionSet.endTurn +
    `' -}}
      {%- else -%}
      {%- if message['role'] == 'user' -%}
        {{-'` +
    instructionSet.startTurn +
    instructionSet.startUser +
    instructionSet.userRole +
    instructionSet.endUserRole +
    instructionSet.endRole +
    instructionSet.roleGap +
    instructionSet.memoryUser +
    `' + message['content']` +
    instructionSet.specialInstructions +
    ` + '` +
    instructionSet.endUserTurn +
    instructionSet.endTurn +
    `'-}}
      {%- else -%}
        {{-'` +
    instructionSet.startTurn +
    instructionSet.startAssistant +
    instructionSet.assistantRole +
    instructionSet.endAssistantRole +
    instructionSet.endRole +
    instructionSet.roleGap +
    // instructionSet.responseStart+ //maybe here... 
    `' + message['content'] + '` +
    instructionSet.endAssistantTurn +
    instructionSet.endTurn +
    `' -}}
        {%- endif -%}
      {%- endif -%}
    {%- endfor -%}
  {%- if add_generation_prompt -%}
  {{-'${ 
    instructionSet.startTurn +
    instructionSet.startAssistant +
    instructionSet.assistantRole +
    instructionSet.endAssistantRole +
    instructionSet.endRole +
    instructionSet.roleGap +
    instructionSet.responseStart 
  }'-}}
  {%- endif -%}
  `
  );
}

/**
 * Returns a Kobold adapter object based on the provided instruction set.
 *
 * The Kobold adapter object contains the following properties:
 * - system_start: The start of a system message.
 * - system_end: The end of a system message.
 * - user_start: The start of a user message.
 * - user_end: The end of a user message.
 * - assistant_start: The start of an assistant message.
 * - assistant_end: The end of an assistant message.
 *
 * @param {Object} instructionSet - An object containing instructions for the adapter.
 * @param {string} instructionSet.bos - The beginning of a sentence.
 * @param {string} instructionSet.startTurn - The start of a turn in the conversation.
 * @param {string} instructionSet.startSystem - The start of a system message.
 * @param {string} instructionSet.systemRole - The role of the system in the conversation.
 * @param {string} instructionSet.endSystemRole - The end of the system role.
 * @param {string} instructionSet.endRole - The end of a role in the conversation.
 * @param {string} instructionSet.roleGap - The gap between roles.
 * @param {string} instructionSet.prependPrompt - The prompt to prepend to the system message.
 * @param {string} instructionSet.systemAfterPrepend - The system message after the prepend prompt.
 * @param {string} instructionSet.postPrompt - The prompt to append to the system message.
 * @param {string} instructionSet.memorySystem - The system's memory in the conversation.
 * @param {string} instructionSet.endSystemTurn - The end of a system turn.
 * @param {string} instructionSet.endTurn - The end of a turn in the conversation.
 * @param {string} instructionSet.startUser - The start of a user message.
 * @param {string} instructionSet.userRole - The role of the user in the conversation.
 * @param {string} instructionSet.endUserRole - The end of the user role.
 * @param {string} instructionSet.memoryUser - The user's memory in the conversation.
 * @param {string} instructionSet.endUserTurn - The end of a user turn.
 * @param {string} instructionSet.startAssistant - The start of an assistant message.
 * @param {string} instructionSet.assistantRole - The role of the assistant in the conversation.
 * @param {string} instructionSet.endAssistantRole - The end of the assistant role.
 * @param {string} instructionSet.endAssistantTurn - The end of an assistant turn.
 * @param {string} instructionSet.responseStart - The start of the assistant's response.
 * @returns {Object} A Kobold adapter object.
 */
function returnKoboldAdapter(instructionSet) {
  //should be recieved into params.adapter
  const systemStart =
    instructionSet.bos +
    instructionSet.startTurn +
    instructionSet.startSystem +
    instructionSet.systemRole +
    instructionSet.endSystemRole +
    instructionSet.endRole +
    instructionSet.roleGap +
    instructionSet.prependPrompt +
    instructionSet.systemAfterPrepend;
  const systemEnd =
    instructionSet.postPrompt +
    instructionSet.memorySystem +
    instructionSet.endSystemTurn +
    instructionSet.endTurn;
  const userStart =
    instructionSet.startTurn +
    instructionSet.startUser +
    instructionSet.userRole +
    instructionSet.endUserRole +
    instructionSet.endRole +
    instructionSet.memoryUser;
  const userEnd = instructionSet.endUserTurn + instructionSet.endTurn;
  const assistantStart =
    instructionSet.startTurn +
    instructionSet.startAssistant +
    instructionSet.assistantRole +
    instructionSet.endAssistantRole +
    instructionSet.endRole +
    instructionSet.roleGap +
    instructionSet.responseStart;
  const assistantEnd =
    instructionSet.endAssistantRole +
    instructionSet.endAssistantTurn +
    instructionSet.endTurn;
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
