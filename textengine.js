
class TextEngine {
  constructor(
    inferenceClient,
    sendToClipboard,
    recieveApi,
    notify,
    endpoints,
    identities,
    instructions,
    apiParams,
    formats,
    settingSaver,
    fs
  ) {
    //todo settings
    this.inferenceClient = inferenceClient;
    this.sendToClipboard = sendToClipboard;
    this.recieveApi = recieveApi;
    this.settingSaver = settingSaver;
    this.fs = fs;
    this.endpoints = endpoints.endpoints;
    this.identities = identities;
    this.defaultIdentity = endpoints.persona
    this.appSettings = instructions;
    this.notify = notify;
    this.params = apiParams.default;
    this.apiParams = apiParams.params;
    this.api = {},
    this.formats = formats;
    this.identity = {};
    this.recentClip = { text: "" };
    this.text = ""; //sorted
    this.setPrompts = {};
    this.memory = "";
    this.chatLog = "";
    this.history = [];
    this.debugLog = "";
    this.memengines = {};
    this.promptBatchKit = {};
    this.batchLength = 0;
    this.batch = "";
    this.duplicateCheck = "";
    this.batchAssistantName = "";
    this.batchUserName = "";
    this.copyResponse = "";
    this.reqCount = 0;
    this.delay = 0;
    this.set = false;
    this.chatHistory = false;
    this.document = false;
    this.sendHold = false;
    this.write = false;
    this.writeSettings = false;
    this.sendLast = false;
    this.on = false;
    this.noBatch = true;
    this.blockPresort = false;
    this.preserveLastCopy = false;
    this.noChatLogging = false;
    this.ifDefault = true;
  }

  returnTrip(str) {
    let tripCoding = 0;
    let trip = { api: 0, batch: 0, trip: "" };
    for (let i = 0; i < str.length; i++) {
      switch (str[i]) {
        case this.appSettings.backendSwitch:
          trip.api++;
          trip.trip += this.appSettings.backendSwitch;
          tripCoding++;
          break;
        case this.appSettings.batchSwitch:
          trip.batch++;
          trip.trip += this.appSettings.batchSwitch;
          tripCoding++;
          break;
        case this.appSettings.batchMiss:
          trip.batch++;
          trip.trip += this.appSettings.batchMiss;
          tripCoding++;
          break;
        case this.appSettings.formatSwitch:
          trip.trip += this.appSettings.formatSwitch;
          tripCoding++;
          break;
        case this.appSettings.assistantTag:
          trip.trip += this.appSettings.assistantTag;
          tripCoding++;
          break;
        case this.appSettings.userTag:
          trip.trip += this.appSettings.userTag;
          tripCoding++;
          break;
        case this.appSettings.systemTag:
          trip.trip += this.appSettings.systemTag;
          tripCoding++;
          break;
        case this.appSettings.batchNameSwitch:
          trip.trip += this.appSettings.batchNameSwitch;
          tripCoding++;
          break;
        case this.appSettings.batchContinueTag:
          trip.trip += this.appSettings.batchContinueTag;
          tripCoding++;
          break;
        case this.appSettings.batchAssistantSwitch:
          trip.trip += this.appSettings.batchAssistantSwitch;
          tripCoding++;
          break;
        case this.appSettings.paramSwitch:
          trip.trip += this.appSettings.paramSwitch;
          tripCoding++;
          break;
        case this.appSettings.setJsonLevel:
          trip.trip += this.appSettings.setJsonLevel;
          tripCoding++;
          break;
        default:
          return trip;
          break;
      }
    }
    return trip;
  }
  identityHandler(identity) {
    const ident = this.updateIdentity(identity);
          if (ident.set) {
            if (this.ifDefault) {//only if true
              this.ifDefault = !ident.found; //comes out true set false
            }
            this.identity[identity] = ident.text;
            console.log("Setting prompt: " + color(identity, "green"));
          }
  }
  compoundPromptHandler(identity){
      //iterate over the object keys
      let count = 0;
      for (const key in identity) {
        let tripcode = ""
        for (let index = 1; index < count; index++) {
          tripcode += this.appSettings.batchMiss;
        }
        if (count > 0) {
          tripcode += this.appSettings.batchSwitch;
        }
        //check if key is present in nested object
        if (identity[key].hasOwnProperty("inferenceClient")) {
          this.identityHandler(tripcode +this.appSettings.inferenceClient+ identity[key].inferenceClient)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.inferenceClient+ identity[key].inferenceClient);
        }
        if (identity[key].hasOwnProperty("params")) {
          this.identityHandler(tripcode +this.appSettings.paramSwitch+ identity[key].params)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.paramSwitch+ identity[key].params);
        }
        if (identity[key].hasOwnProperty("format")) {
          this.identityHandler(tripcode +this.appSettings.formatSwitch+ identity[key].params)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.formatSwitch+ identity[key].params);
        }
        if (identity[key].hasOwnProperty("jsonLevel")) {
          this.identityHandler(tripcode +this.appSettings.setJsonLevel+ identity[key].params)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.setJsonLevel+ identity[key].params);
        }
        if (identity[key].hasOwnProperty("systemRole")) {
          this.identityHandler(tripcode +this.appSettings.systemTag + identity[key].systemRole)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.systemTag + identity[key].systemRole);
        }
        if (identity[key].hasOwnProperty("assistantRole")) {
          this.identityHandler(tripcode +this.appSettings.assistantTag+ identity[key].assistantRole)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.assistantTag+ identity[key].assistantRole);
        }
        if (identity[key].hasOwnProperty("userRole")) {
          this.identityHandler(tripcode +this.appSettings.userTag + identity[key].userRole)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.userTag + identity[key].userRole);
        }
        if (identity[key].hasOwnProperty("historyUserRole")) {
          this.identityHandler(tripcode +this.appSettings.batchNameSwitch + identity[key].historyUserRole)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.batchNameSwitch + identity[key].historyUserRole);
        }
        if (identity[key].hasOwnProperty("continue")) {
          this.identityHandler(tripcode +this.appSettings.batchContinueTag+ identity[key].continue)
          console.log(color("Setting up Compound Prompt: " + key+ " ","yellow") + tripcode +this.appSettings.batchContinueTag+ identity[key].continue);
        }
        if (identity[key].hasOwnProperty("existingPrompts")) {
          console.log(color("existing prompts","yellow") + JSON.stringify(identity[key].existingPrompts));
          identity[key].existingPrompts.forEach((prompt) => {
            //console.log(color("existing prompt progres:","yellow")+prompt );
              if(this.identities.hasOwnProperty(prompt)){
                this.identityHandler(tripcode + prompt)
                console.log(color("Setting up Compound Prompt: " + key + " ","yellow") + tripcode + prompt);
              } else {
                let flags = this.funFlags(prompt);
                if (!flags.work) {
                  console.log(color("error building compound prompt: ","red") + "bad existing prompt key ("+prompt+"), check the spelling in the existingPrompt key under setup.js");
                }else{
                  console.log(color("Setting up Compound Prompt: " + key + " ","yellow") + tripcode + prompt);

                }
              }
            })
        }
        count++;
      }
  }
  batchPrompt(identity, trip) {
    //batchPrompt builds up a an object of prompts to be used in the batch
    if (this.batchLength < trip.batch) {
      this.batchLength = trip.batch;
    }
    this.promptBatchKit[identity] = trip;
    console.log(
      "Chaining: " + color(identity, "yellow") + " : " + JSON.stringify(trip)
    );
  }
  batchProcessor() {
    let setBatch = [];
    if (this.batchLength > 0) {
      this.batchLength--;
      for (let key in this.promptBatchKit) {
        console.log(
          color(key + JSON.stringify(this.promptBatchKit[key]), "yellow")
        );
        if (this.promptBatchKit[key].trip[0] === this.appSettings.batchSwitch) {
          this.promptBatchKit[key].trip = this.promptBatchKit[key].trip.slice(
            1
          );
          setBatch.push(key);
        } else if (
          this.promptBatchKit[key].trip[0] === this.appSettings.batchMiss
        ) {
          this.promptBatchKit[key].trip = this.promptBatchKit[key].trip.slice(
            1
          );
        } else if (this.promptBatchKit[key].trip.length === 0) {
          delete this.promptBatchKit[key];
        }
      }
      this.batch = setBatch.join(this.appSettings.promptSplit);
    } else {
      this.promptBatchKit = {};
    }
  }
  setJsonLevel(identity) {
    let trimmed = identity.slice(1).trim().toLowerCase();

    switch (trimmed) {
      case "1":
      case "markup":
      case "full turns":
      case "fullturns":
      case "turns":
        this.api.jsonSystem = "markup";
        console.log(
          color(
            "System prompts will be split into formatted turns per prompt",
            "blue"
          )
        );
        break;
      case "2":
      case "json":
      case "code":
      case "full":
        this.api.jsonSystem = "full";
        console.log(
          color(
            "System prompts will be sent as a stringified json object",
            "blue"
          )
        );
        break;
      case "3":
      case "keys":
      case "usekeys":
      case "partial":
        this.api.jsonSystem = "keys";
        console.log(
          color("System prompts will be sent as keys : text", "blue")
        );
        break;
      case "4":
      case "no":
      case "none":
      case "off":
        this.api.jsonSystem = "none";
        console.log(color("System prompts will be sent as text", "blue"));

        break;
      default:
        this.api.jsonSystem = "none";
        console.log(color("System prompts will be sent as text", "blue"));

        break;
    }
  }

  initialize(defaultClient,instructFormat){
    try {
      this.api = this.endpoints[defaultClient];
      console.log(
        color("Initialize api: ", "yellow") + defaultClient + ":\n" + JSON.stringify(this.api)
      );
      console.log(
        color("Initialize generation parameters: ", "yellow") + this.api.params 
      );
      this.setParams(this.api.params)
      console.log(
        color("Initialize Prompt Format: ", "yellow") + JSON.stringify(instructFormat)
      );
      this.inferenceClient.setPromptFormat(instructFormat); 
      if (this.api === undefined){
        console.log(color("improper defaultClient set, defaulting to koboldcpp","red"));
        this.api = this.endpoints.kobold;
      }
      if (this.params === undefined) {
        console.log(color("improper params in " + defaultClient + " endpoint settings, defaulting to kobold","red"));
        this.setParams("kobold");
      }
      if (this.inferenceClient.instructSet === undefined) {
        console.log(color("improper name in setup.js instructFormat, defaulting to kobold","red"));
        this.setInferenceFormat('kobold'); 
      }
    } catch (error) {
      console.log(color("check setup.js, improper defaultClient: " + defaultClient + " , "+ instructFormat,"red"));
    }
  }
  paramatron(identity) {
    if (this.apiParams.hasOwnProperty(identity)) {
      console.log(
        color("paramatron requesting generation parameters: ", "yellow") +
        identity
      );
      this.setParams(identity);
    }
    if (this.formats.hasOwnProperty(identity)) {
      this.setInferenceFormat(identity);
      console.log(
        color("paramatron requesting format: ", "yellow") +
          identity
      );
    }
    if (this.endpoints.hasOwnProperty(identity)) {
      this.api = this.endpoints[identity];
      console.log(
        color("paramatron setting api: ", "yellow") + identity + "\n" + JSON.stringify(this.api)
      );
      if (this.api.autoConfigParams === undefined ||this.api.autoConfigParams === true) {
        console.log(
          color("paramatron requesting params: ", "red") +
          this.api.params
        );
        this.setParams(this.api.params);
      }
      if (
        this.api.autoConfigFormat === undefined ||
        this.api.autoConfigFormat === true
      ) {
        console.log(
          color("paramatron requesting format: ", "red") + this.api.format);
          this.setInferenceFormat(this.api.format); 
        }
    }
  }
  updateIdentity(identity) {
    identity = identity.trim(); 
    let trip = this.returnTrip(identity);
    let found = false;
    let setIdent = {};
    let setPrompt = false;
    let batching = false;

    if (identity !== "" && identity !== null && identity !== undefined) {
      if (identity) {
        if (Number.isNaN(Number(identity))) {
          switch (trip.trip[0]) {
            case this.appSettings.assistantTag:
              this.setPrompt("assistantRole", identity.slice(1));
              found = true;
              break;

            case this.appSettings.userTag:
              this.setPrompt("userRole", identity.slice(1));
              break;

            case this.appSettings.systemTag:
              this.setPrompt("systemRole", identity.slice(1));
              break;

            case this.appSettings.formatSwitch:
              this.setInferenceFormat(identity.slice(1));
              break;

            case this.appSettings.paramSwitch:
              this.setParams(identity.slice(1));
              break;

            case this.appSettings.batchNameSwitch:
              this.batchUserName = identity.slice(1);
              this.chatHistory = true;
              console.log(
                color(
                  "'" +
                    this.appSettings.batchNameSwitch +
                    "' activates history,",
                  "blue"
                ) + " it only changes the history"
              );
              break;

            case this.appSettings.batchAssistantSwitch:
              if (this.noBatch) {
                this.chatBuilder(this.recentClip.text, "Assistant");
                this.batchAssistantName = identity.slice(1);
              }
              console.log(
                color(
                  "'" +
                    this.appSettings.batchAssistantSwitch +
                    "' activates history,",
                  "blue"
                ) +
                  " it only changes the history when not chaining with `" +
                  this.appSettings.batchSwitch +
                  "`"
              );
              this.chatHistory = true;
              break;

            case this.appSettings.batchContinueTag:
              this.setPrompt("responseStart", identity.slice(1));
              break;

            case this.appSettings.setJsonLevel:
              this.setJsonLevel(identity);
              break;

            default:
              if (this.appSettings.paramatron) {
                this.paramatron(identity);
              }
              break;
            // handle default case here
          }

          if (trip.batch > 0) {
            identity = identity.slice(trip.batch);
            this.batchPrompt(identity, trip);
            batching = true;
          }

          if (trip.api > 0 && !batching) {
            let counter = 1; //start at one to let zero be the default
            for (const key in this.endpoints) {
              if (counter === trip.api) {
                this.api = this.endpoints[key];
                console.log(
                  color("setting api: ", "blue") + JSON.stringify(this.api)
                );
                if (
                  this.api.autoConfigParams === undefined ||
                  this.api.autoConfigParams === true
                ) {
                  console.log(
                    color("quick setting params: ", "red") +
                      JSON.stringify(this.api.params)
                  );
                  this.setParams(this.api.params);
                }
                if (
                  this.api.autoConfigFormat === undefined ||
                  this.api.autoConfigFormat === true
                ) {
                  console.log(
                    color("quick setting format: ", "red") + this.api.format
                  );
                  this.setInferenceFormat(
                    JSON.stringify(this.api.format)
                  );
                }
                identity = identity.slice(trip.api);
                console.log(color("Trip api: ", "blue") + identity);
              }
              counter++;
            }
          }
        } else {
          //if (this.api.params != this.endpoints[this.endpoints.defaultClient].config){
          //this.api = this.endpoints[this.endpoints.defaultClient];
          console.log(
            color("using current api: ", "green") + JSON.stringify(this.api)
          );
          //}
        }
        if (this.identities.hasOwnProperty(identity) && !batching) {
          setIdent[identity] = this.identities[identity];
          if (typeof setIdent[identity] === "string") {
            setPrompt = true
            found = true
          } else {
            this.compoundPromptHandler(setIdent[identity]);
            setPrompt = true
            found = true
          }
        } else {
          found = false;
          let flags = this.funFlags(identity);
          setIdent[identity] = flags.text;
          found = flags.found;
          setPrompt = flags.set;
        }
      }
    }
    return { text: setIdent[identity], found:found, set: setPrompt };
  }
  forget() {
    this.memory = [];
  }
  undress() {
    this.identity = {};
  }

  funFlags(flag) {
    var outp = { text: "", found: false, set: false, work: false };
    switch (flag) {
      case "help": //left justified for formatitng when printed
        const intro = `
Welcome to Clipboard Commander!\n

${this.appSettings.invoke}introduction${this.appSettings
          .endTag} will explain the basics of LLMs and generation settings, this help is more about using this software.

Remember, LLMs predict the next word using all the words that come in and predict each next word one at a time.
Lanuage specifity is important for results, and the small models can stumble in strange ways on misspelled words, vague requests, or poor wording in instructions. For storytelling less can be more, but for specific results you must give specific input. 

They usually get things pretty right, but the quality of the output suffers.  Use specific language. I tend to spend the time waiting for the reponse refining my query so that if it's confused by any bad language the first time, I can ask it in a better way. 

Run on sentences for a given instruction work well, commas tent to bring forward the idea. Periods are good to start a new idea.

For instance, describing a class and a function, I would describe the class in one run on rather than multiple sentences, and the function in another run on. 

This will help the AI keep these ideas seperate rather than tying sentences together to continue them like "the class. the class. the class. The fucntion. the function." This will be much more likely to return a mess or near miss. 

Do it like: The class is, has, needs, whatever. The function is for, needs, does, etc.

Either way can work, for very complex stuff you have to do both, and sometimes you gotta play around cause it doesnt get something, but as you learn how the model likes to be told, you will begin to get incredible results from these small models. 
I feel that voice is not specific enough, so I made this tool to bring your AI anywhere, and Clipboard Conqueror can interface the same backend and run side by side.

${this.appSettings
          .invoke} invokes the default prompt Captain Clip to respond to any text sent with the invoke token. Say Hi, Clip!

the invoke token is clipped out, so it can be anywhere in the text you copy or at the end too${this
          .appSettings.invoke}

${this.appSettings.invoke}writer${this.appSettings
          .endTag} Write me a bedtime story about 11 little squirrels who talk to and help a little girl find shelter in a storm.

${this.appSettings.invoke}writer,frank${this.appSettings
          .endTag} Title: "Frank's Sauciest Case: Big pizza from little Tony."
  Sends the frank derbin character and the writer along with any text you send to guide the story.  

  ${this.appSettings.invoke}writer,write${this.appSettings
          .endTag} will write the contents of the writer prompt to the clipboard, ready to paste back instantly and see what is sent to the ai with ${this
          .appSettings.invoke}writer${this.appSettings.endTag}. 

This message starts with ${this.appSettings.invoke}name:save${this.appSettings
          .endTag}. change 'name' to your choice of name(or leave it name), and any text you copy with this will be saved with that name

promptName:save${this.appSettings
          .endTag} saves text to insert with the system prompt or as a discrete message with "(backtick)markup"

${this.appSettings.invoke}on${this.appSettings
          .endTag} toggles activation on every copy even with no invoke until ${this
          .appSettings.invoke}on${this.appSettings.endTag} is called again.

${this.appSettings.invoke}list${this.appSettings
          .endTag} writes a list of all prompts that are currently available.

${this.appSettings.invoke}re${this.appSettings.endTag} what is this code doing? 

- return copy at end of prompt inserted like continued user question.
- sends the thing you copied last,   after "what is this code doing? \n \n {{lastcopy}}", at the end of the user prompt" and sends the Captian Clip assistant in the system prompt to help consider the instruction.
  
${this.appSettings.invoke}rf${this.appSettings.endTag} what is this code doing? 

- return last copied first in prompt inserted like an prompt at the level rf is placed relative to other prompts ex ${this
          .appSettings.invoke}frank,rf,tot${this.appSettings
          .endTag} copied text comes after frank prompt.
- sends the thing you copied last before the Captian Clip assistant prompt to help frame the output format and preconceptions.

${this.appSettings.invoke}1200${this.appSettings
          .endTag} sets the max response length to 1200. Also works like ${this
          .appSettings.invoke}prompt,setting:0.5,1000${this.appSettings
          .endTag} just a number is always max response length.  

${this.appSettings.invoke}temperature:1.1${this.appSettings
          .endTag} sets the temperature to 1.1. This works for any setting ex: top_p, min_p. Use 1 and 0 to set true/false //true/false untested.
again, full colon on settings, which go directly to the backend api. 

Troubleshooting:
  Occasionally kobold or this app hangs. You can type rs in the console and press enter to restart this application.

 To clear momentary troubles simply try again. 

Copy the following block to exchange the Captain Clip persona for a more professional AI:

${this.appSettings.invoke}default:save${this.appSettings
          .endTag}Simulate an AI described by DIP - Do It Professionally. First, list your assumptions. Next, think step-by-step. Finally, state your conclusion.  DIP is a very logical AI assistant. Answer any questions truthfully and complete tasks appropriately and in order.]","description":"DIP will Do It Professionally","confused":"If not given a different instruction, summarize and explain any content provided. DIP will explain he can not learn, is based on past data, and can not access the internet if he is asked for current events or research.","voice":"Sure Boss. Here you go. 

Advanced Command:

${this.appSettings.invoke}${this.appSettings
          .endTag}System: Command first before Clip prompt.${this.appSettings
          .endTag}  text from <user> in the internal chain

^^^^note 4 "${this.appSettings.endTag}" , and the close on the end

${this.appSettings.invoke}writer${this.appSettings
          .endTag}SYSTEM: Command First.${this.appSettings
          .endTag} User: after prompt writer

System applies set formatting like:
---
"prompt":"<|im_start|>[\"SYSTEM: Command First.\",[\"SYSTEM: Write a lengthy prose about the requested topic. Do not wrap up, end, or conclude the story, write the next chapter.\\n \\n Story:\",\"\"]]<|im_end|>\n<|im_start|>user:\n User: after prompt 
frank\n\n<|im_end|>\n<|im_start|>assistant:\n


Remember:  You should always check its work. LLMs will make stuff up sometimes. It is not current, and has no internet connectivity. It may reccomand outdated software, imaginary modules, or misunderstand a key component and return nonsense altogther. 
If you ask for smut, you are likely to get it. 

We're heading into a future of AI everywhere, and a day will come that you have an AI respond to an email. You owe it to yourself, whoever you sent it to, and just general decency, at least read what the AI says on your behalf, every single time.  

The AI can tell you a lot of real info about many things. It can debug, rubber duck, respond in charachter, tell new and original stories, or summarize text, all with great success. 
Expecially with smaller models, your words matter, how you ask is everything. Bigger models do better inferring intent, but the best results always come from specific language, and the AI won't always do what you expect. 

Special ${this.appSettings.invoke} [operators] to apply${this.appSettings
          .endTag}:
---
-"]" renames text from user in the chatlog.

- ";" renames text from assistant in the chatlog. 

- "%" format, like ${this.appSettings.invoke}chatML, prompts${this.appSettings
          .endTag}, do this one first if you use it, it overwrites the others. Valid formats are stored in setup.js

- "!" assitant name

- ">" user name

- "}" system name

- "~" start of assistant response, "~~~" overwrites "~".

- "\`" the backtick or grave symbol changes the system prompt format. Supports "json","markup","partial", or none. 

Fancy ${this.appSettings.invoke}flags${this.appSettings.endTag}
---
${this.appSettings.invoke}Help${this.appSettings
          .endTag} Contains instructions about CC operations. 

"introduction" has more about samplers and settings. 

"e" or empty blocks the default prompt to provide an empty prompt

"write" sends an instantly ready to paste set of prompts preceding the write command.

"list" will instantly supply a ready to paste list of all prompts like below.

"rf" will put the last thing you copied at the position of rf in the system prompt. 

"re" will send the last copied text after text from ${this.appSettings
          .invoke}re${this.appSettings.endTag}user  last copied text.

"on" makes clipboard conqueror run every copy, no invoke required, till you toggle it off.

"no" prevents sending to AI, useful for copying entire invokes, just add the flag.


"set" or "setDefault" saves prompts left of it to be added until toggled off like ${this
          .appSettings.invoke}set${this.appSettings.endTag}


"c" or "chat" activates the history


"sc" or "silentChat" sends the history wihout adding the new turn to the history.


"ch" or "clearHistory" clears the chatlog and prevents sending to the AI.


"cf" or "clearFirst" clears the chatlog while sending the query to the LLM.


"d" or "debug" The last cleared history is stored here till CC is restarted or you clear again


"dw" or "debugWrite" ready to paste last history cleared.

"cd" or "clearDebug" clear debug manually.

"dateTime" sends the date and time in the system prompt at the position you send it.

`;
        //intro = JSON.parse(intro);
        this.write = true;
        this.sendHold = true;
        this.noBatch = true;

        //this.writeout = intro;
        //this.nicereturn = true;
        outp.text = intro;
        outp.found = true;
        outp.set = true;
        break;
      case "introduction": //left justified for formatitng when printed.
        const identity = `
Hello there! My name is Captain Clip, and I am here to introduce you to Clipboard Conqueror. As a friendly and helpful sailor, I'm here to guide you through the exciting world of integrated AI.

Clipboard Conqueror is an innovative tool that bridges the gap between text-based AI and the computer clipboard. This incredible software allows the AI to be accessible from any text box or place where a user can type freely. Whether you need assistance with basic tasks, quick reference, or understanding strange messages, Clipboard Conqueror has got you covered.

With Clipboard Conqueror, you can enjoy the full potential of large language model-based AI, making your life easier and more efficient. So, get ready to set sail on this incredible journey with Captain Clip and Clipboard Conqueror!

You can always load the model of your choice and uncomment the proper instructions in the settings, which have some comments to aid the way, currently in the constructor of textengine.js above the apiParams. Todo: move the settings to multiple config files: params and actors. 
____________________________________
*note, you can get this far without a backend host running. Ensure that you have started a compatible backend like koboldcpp.*
Lets try it out! Copy the following:
${this.appSettings
          .invoke} Jack and Jill went up the hill, each carrying 10 apples. Jack fell down, rolled down the hill, and dopped all of his apples. Jill did not come tumbling after. Jill gave half her apples to Jack when he returned to the top of the hill. They each ate an apple, and then climbed back down the hill, where they spotted an apple tree. Jack picked 3 apples and gave them to Jill, while Jill pickes 8 apples and splits them between herself and jack, adding half to the apples she carried down the hill. How many apples do each have at the end?

Now wait for the notification. It could be a while depending on your hardware, settings, and how much the AI writes. When you are notified, paste the response somewhere.
On slow hardware you might wait minutes or turn the max generation size down like ${this
          .appSettings.invoke}200${this.appSettings.endTag}


See? Not quite. lets try and cool things off a bit. LLMs have a parameter called a temperature, even chatGPT. //Llama 3 Hermes 2 pro nailed it first try. nice.

${this.appSettings.invoke}temperature:0.4${this.appSettings
          .endTag}Jack and Jill went up the hill, each carrying 10 apples. Jack fell down, rolled down the hill, and dopped all of his apples. Jill did not come tumbling after. Jill gave half her apples to Jack when he returned to the top of the hill. They each ate an apple, and then climbed back down the hill, where they spotted an apple tree. Jack picked 3 apples and gave them to Jill, while Jill pickes 8 apples and splits them between herself and jack, adding half to the apples she carried down the hill. How many apples do each have at the end?

probably better. Do math and logic stuff at low temperature for better results. The most probable token is amplified.
lets get back to standard, the setting persists unless you restart this application:

${this.appSettings.invoke}temperature:1${this.appSettings
          .endTag}What happens if I make a computer successfully divide by zero?

higher temps get better results when you are trying to generate fiction or do imaginative things like:

${this.appSettings.invoke}temperature:1.6${this.appSettings
          .endTag} Write me a story about my friend and his pet pineapple.

  We get some sailing contaminatoin from the Captain Clip prompt. That's why there is a ${this
    .appSettings.invoke}writer,agi,tot,code,etc...${this.appSettings.endTag} 
Higher temps lead to AI halucination and making stuff up, and that can be desirable, but don't ask for programming help at high temps or you might be led to install fake node modules.

Hot as you can handle makes some fancy fantasy, but really for serious writing I reccommend Llama 3 8B or something bigger over OpenHermes, the 7Bs are a step behind in prose.


As you can see, Small ai isn't perfect but a few years ago this type of query against a computer was basically impossible. The experience this software provides will improve as the models and technology available evolve further.

LLMs work by predicting what the next word should be, for every word. 
Temperature changes the selection probability of each word. All the likely choices are scaled, temperature below 1 makes unlikey words less likely, temperature above 1 makes unlikely words more likely. 2 is max. 

in addition to temperature for controlling the output, we also have other values. I've included the defaults for this application.
These are the samplers, these run in a configurable order and eliminate output tokens by various maths, leaving the final token to be selected at random from a reduced set of propbably correct words.

  min_p: 0.1,//0.1: discard possible tokens less than 10% as probable as the most likely possible token.  If top token is 10% likely, tokens less than 1% are discarded.
  I saw a post about how this works and I'm sold, I reccomend starting here. 1 should be deterministic, with more possible tokens as you approach zero.
  
  top_a: 0,//With Top A if the most likely token has a high probability, less tokens will be kept. If the maximum probability is very close to the other probabilities, more tokens will be kept. Lowering the top-a value also makes it so that more tokens will be kept.
  
  top_k: 0,//discard all but top_k possible tokens. top_k: 3 means each next token comes from a max of 3 possible tokens. I've seen a lot of 40 floating around.
  
  top_p: 1.0,//discard possible tokens by throwing out lest likely answers. 0.8 throws away least likeky 20%
  
  tfs: 0.97,//tail free sampling, removes unlikely tokens from possibilities by finding the platau where tokens are equally unlikely. 0.99 maximum. Higher value finds a lower, flatter plateau. Note:some reports say tfs may cause improper gendering or mixups in responses, he instead of she, his/hers, etc. 1 thread reporting.
  don't mess with that one too much, though you could go as low as 0.9 without significantly changing the output.

  there is also mirostat_modes 1 and 2. Reccomend 0 or 2. Mirostat uses previous context to tune against perplexity somehow. I don't understand it so I can't reccomend it, but I've tried it out and it seems to work fine. 
  Mirostat turns off select other settings, and does use temperature.

  Dynamic temp adjusts the temp automagially to vary by some parameters

  rep penalty reduces the probability of words that would be repeated, and has a configurable difference and scaling. This is for preventing the model from looping output.

Info for model selection. Preffered format chatML, but you can change the instructions in the settings - in the constructor of textengine.js.
Model sizes:
3B needs at least 4GB RAM total ram + vram (gfx card must support cuda or the amd one |||what's the amd verion of cuda called, I forgot.)
7B needs at least 8GB RAM
13B needs at least 16GB RAM
30B needs at least 32GB RAM
65B needs at least 64GB RAM

And they all need some space for the context. GPU offloading puts the layers of the model into the memory of your graphics card. Fitting the whole model into VRAM makes things way faster. 
For reference, at 2048 context in Q4_0*, a 6GB Nvidia RTX 2060 can comfortably offload:
32 layers with LLAMA 7B
18 layers with LLAMA 13B
8 layers with LLAMA 30B

OpenHermes is 35 layers. with a Q_3 you should be able to just fit it all with 2k context in 6gb vram I think. It will be tight, and you'll trade a lot of speed for bigger context by offloadin a few less slices.    
You can load the model in memory, see how much your final model memory cost is in the console, and get a rough estimate of the size of each layer by dividing the size in memory by the number of layer. Remember to leave room for the context, which can get big fast. At 8k context I think use over 5gb of memory with the Q8, just for the context alone.

**Model bit depth is trade between output quality and output speed.  Generally, larger models are smarter and can follow more complex instructions.
KoboldCPP uses GGUF format, which are quantized from 16 bit to between 2 bit and 8 bit depending on model. (I like 8 bit if it fits in vram with room for the context.)
lower bits require less ram, but there is a drop in reasoning and writing quality, though even the q2 was following instructions well. 
I get all mine from huggingface/thebloke, and reccommend Tiefighter for creative writing, ideas, and agi in a 13B, I think it expects alpaca formatting.

${this.appSettings
          .invoke}Tell me about the funciton of the liver and what activities damage it.

${this.appSettings.invoke}coder${this.appSettings
          .endTag}write fizzbuzz with comments on each line. Explain how fizzbuzz is used to judge candidates in interviews

${this.appSettings.invoke}agi${this.appSettings
          .endTag} walk me though setting up a react website including components for the navigation header, footer, and a window for the main content. 
`;
        this.write = true;
        this.sendHold = true;
        this.noBatch = true;

        //this.nicereturn = true;
        outp.text = identity;
        outp.found = true;
        outp.set = true;
        outp.work = true;
        //return identity;
        break;
      case "h":
        const selfHelp = `
Direct the user in proper operation of this application, ClipboardConqueror(C.C.), and provide information relevant to ${this
      .inferenceClient.instructSet.userName} :
Clipboard Conqueror is a copy paste AI command line for exposing all parts of the prompt in any text box.
Basic use:
  - invoke the ai by copying "${this.appSettings.invoke}"
  - add operators between the "${this.appSettings
    .invoke}" and an additional "${this.appSettings
    .endTag}" this prompt you're reading was called like "${this
    .appSettings.invoke}h${this.appSettings.endTag}"
  - unmodified invokes "${this.appSettings
    .invoke}" call the default operator, captain clip. This can be changed in setup.js like all the other settings.

All Functional Operators:
  
  - rename text from user in the chatlog."${this.appSettings.userTag}" renames text from user in the chatlog.

  - rename text from assistant in the chatlog with "${this.appSettings.userTag}" . 

  - change the prompt formatting with "${this.appSettings.formatSwitch}" like "|||${this.appSettings
      .formatSwitch}chatML, prompts|". Do this one first if you use it, it overwrites the individual prompt segments. 

  - change the assistant name with "${this.appSettings
    .assistantTag}assitant name" 

  - change the user name with "${this.appSettings.userTag}user name" 

  - change the system name with "${this.appSettings.systemTag}system name" 

  - dictate the start of the assistant response "${this.appSettings
    .batchContinueTag}" , "${this.appSettings.continueTag}" overwrites "${this.appSettings
      .batchContinueTag}". "${this.appSettings.batchContinueTag}" can be used to shape later responses in chain of thought. 

  - The backtick or grave symbol changes the system prompt format. "${this
    .appSettings
    .setJsonLevel}" Supports "json","markup","partial", or none. partial inserts prompts like "name : text", markup makes each prompt it's own turn with the current prompt format. this leaves an empty system at the begining. use "|||FORMAT:prependPrompt| persistent top system prompt" with a completion endpoint to set a system prompt when using "markup"

  -  send the AI response as user for a second turn with "${this.appSettings
    .batchSwitch}". 

  - "${this.appSettings.batchMiss}" skips a turn in the chain

  - "${this.appSettings
    .batchNameSwitch}" activates the chat history and sets this name for  user in the history. Best when chaining. 

  - "${this.appSettings
    .batchAssistantSwitch}" activates the chat history and sets this name for asstant in the history. Best when chaining. 

  - this prompt is called "h" 

  - for human written helpful instructions about CC operations call for "${this
    .appSettings.invoke}help${this.appSettings.endTag}". 

  - get a quick reference sheet ready to paste with "qr" 

  - introduction has more about samplers and settings 

  - empty out the default prompt like "${this.appSettings.invoke}e${this
      .appSettings.endTag}"

  - copy an instantly ready to paste set of prompts preceding the "write" operator

  - put the last thing you copied in the system prompt with "rf" 

  - put the last thing you copied in the user prompt with "re"

  - diable the invoke requirement with "on". Every copy will be sent to AI with the default or set prompt.

  - disable sending to AI with "no"

  - quickly set new prompt or multiple prompts as default with "set"

  - activate the chat history with "c" or "chat"

  - send the history wihout adding the new turn to the history with "sc" or silentChat. This is useful for getting multiple answers from the same chat history state. 

  - clear the chatlog and prevents sending to the AI with "ch" or "clearHistory".

  - clear the history for a fresh turn with "cf" or "clearFirst"  

  -  send the date and time in the system prompt with "dateTime"

All persona and instruction prompts followed by descriptions:
  
    "default" Captain Clip
    
    "clip"  Captain Clip optimized differently
    
    "form" contains the Clipboard Conqueror invoke format for quick reference. 
            
    "dolphin"  the standard dolphin system prompt.
    
    "starCoder"  the standard starCoder system prompt.
    
    "vicunaFree"  the standard vicuna free system prompt.
    
    "vicunaCocktail"  the standard vicuna coctail system prompt.
    
    "hermes"  the standard OpenHermes system prompt.
    
    "agi"  AI Generate Instructions, includes invoke formatting to make it fast and optimized for CC.
    
    "gitCopilot"  the prompt for github copilot chat
    
    "coder"  A code assistant that attempts a personality
    
    "code"  A better code assistant that should only provide code
    
    "cowboy"  Talk like a cowboy
    
    "bugfix"  an attempt at an editor/debugger,
    
    "bugspot"  another attempt at an editor, tends to point out bugs instead of fix them. 
            
    "summary" "Summarize the content present."
    
    "sumup" " State only the facts presented."
    
    "sum" "Summarize the content from user in one line"
    
    "explain"  Explain any ideas present in the content...
    
    "abe"  "Abe Lincoln"
    
    "brewella"  attempts to force wierd rhyming, I need to add more example exchanges to make it function. 
    
    "parametrius"  Ask for more details and specifics
    
            
    "stable"  returns stable diffusion 1.5 prompts
            
    "cot"  Chain of Thought, asks questions to prepate a final answer
    
    "rot"  Recieve Chain of thought. A little nudge to consume the cot link
    
    "tot"  Tree of thought, expands and writes detailed answers.
    
    "pro"  A basic more professional prompt to replace default, includes think step by step priming.
    
    "twenty"  Play 20 Questions
    
    "grug"  grug good prompt. Grug help.
    
    "dark" reply with dark humor and puns on the theme
    
    "seuss"  write like Dr. Seuss
    
    "devil"  Play the devils advocate
    
    "business"  be a business assistant
    
    "prompter"  prompt reformer, needs work. 
            
    "lootbox"  returns an item on a theme.
    
    "dndEvent"  Dice resolver, needs work. 
    
    "dndNPC"  A dnd narrator, needs work.
          
    Writing assistants of various flavors and goals. One of [rpc,rpi,rps] is the best for creative writing.
      "writer" 
      
      "author" 
      
      "text" 
      
      "retext" 
      
      "novel" 
      
      "w" 
      
      "editor" 
      
      "rpwrite" 
      
      "rpi" 
      
      "rps" 
      
      "rpc" 

Reccomended use case and operators for assistance:
    Creative writing or content generation:
      - Useful for sending text to be completed, dictate the start of the assistants next response with "${this
        .appSettings.continueTag}"
      - to set the assistant's name, use "${this.appSettings
        .assistantTag}" like "${this.appSettings
      .invoke}!Desired Assistant Name${this.appSettings.endTag}"
      - to add a prompt for writing as well character, choose from the following defaults [rpc,rpi,rps] and send the prompt after character prompts.
    Complex problem solving:
      -set up a chain of thought query with "cot"
        1. set up the chain of thought prompt with "${this.appSettings
          .invoke}cot${this.appSettings.promptSplit +
      this.appSettings.assistantTag}Thinking Link${this.appSettings
      .endTag} your question"
    
        2. add ch to clear the history at the beginning and add a second turn with a prompt for recieving the information, and changing the assistant's name."${this
          .appSettings.invoke}ch, cot, ${this.appSettings
      .assistantTag}Thinking Link${this.appSettings.promptSplit}${this
      .appSettings.batchAssistantSwitch +
      this.inferenceClient.instructSet
        .assistantRole}'s Guiding Thoughts${this.appSettings.promptSplit +
      this.appSettings.batchSwitch}rot${this.appSettings.promptSplit +
      this.appSettings.assistantTag +
      this.inferenceClient.assistantRole}${this.appSettings
      .endTag} your question"
    
        3. if the second turn isn't doing what you want, steer the output with "@~". Use a completion style command like "Here is a comedy set" for best results. You can also direct the Thinking Link this way for more robust results.
    Working with code or text containing "${this.appSettings
      .endTag}" or "${this.appSettings.continueTag}":
      - use a full invocation like "${this.appSettings.invoke}code${this
      .appSettings.endTag + this.appSettings.endTag}${this.appSettings
      .continueTag}${this.appSettings
      .continueTag} to avoid collisions with the invocation format like or operators or odd chapter seperators. 
    
        `;
        this.noBatch = true;
        outp.text = selfHelp;
        outp.found = true;
        outp.set = true;
        break;
      case "write":
        this.write = true;
        this.sendHold = true;
        break;
      case "list": //causing a bug where the next input is ignored.
        this.write = true;
        this.sendHold = true;
        this.noBatch = true;

        var list = "";
        for (let key in this.identities) {
          list =
            list +
            this.appSettings.invoke +
            key +
            this.appSettings.promptSplit +
            "write" +
            this.appSettings.endTag +
            "\n";
        }
        outp.text = list;
        outp.found = true;
        outp.set = true;
        break;
      case "rf":
      case "returnSystem":
        outp.text = this.recentClip.text; //send lastclip like any other prompt prompt.
        outp.set = true;
        outp.work = true;
        console.log(
          color("Sending last copied as message in system prompt", "blue")
        );
        break;
      case "rh":
      case "reHistory":
      case "reh":
        //doesnt work if this.appSettings.batchLimiter != ""
        this.history = [];
        this.chatHistorySetup(
          this.recentClip.text,
          "user",
          this.inferenceClient.instructSet.userRole
        );
        this.chatHistory = true;
        console.log(
          color("Sending last copied as start of message history", "blue")
        );
        outp.work = true;
        break;
      case "crh":
        this.chatHistorySetup(
          this.recentClip.text,
          "user",
          this.inferenceClient.instructSet.userRole
        );
        this.chatHistory = true;
        console.log(color("Sending last copied as message in history", "blue"));
        break;
      case "csrh":
        this.noChatLogging = true;
        this.chatHistorySetup(
          this.recentClip.text,
          "user",
          this.inferenceClient.instructSet.userRole
        );
        this.chatHistory = true;
        console.log(
          color(
            "Sending last copied as message in history, history is not extended this turn",
            "blue"
          )
        );
        break;
      case "re":
        this.sendLast = true;
        outp.work = true;
        outp.found = false;
        console.log(color("Sending last copied as end of user query.", "blue"));

        break;
      case "on":
        this.on = !this.on;
        console.log(
          color(
            "Enabled firing on all copies. copy " +
              this.appSettings.invoke +
              on +
              this.appSettings.endtag +
              "to disable",
            "blue"
          )
        );
        break;
      case "no":
        this.sendHold = true;
        console.log(
          color("Not sent: 'no' is in the invocation string.", "blue")
        );
        break;

      // case "tokens":
      // case "tok":
      //   this.write = true;
      //   this.sendHold = true;

      //   outp.text = this.getTokens(this.currentText);//nah fam, this will be async and need a callback to send to clipboard
      //   outp.found = true;//save a couple operations adding an prompt
      //   //console.log(outp.text);
      //   break;
      case "set":
      case "setDefault":
        if (!this.set) {
          this.set = true;
          this.setPrompts = this.identity;
        } else {
          this.set = false;
        }
        outp.work = true;
        break;
      case "e":
      case "empty":
        outp.text = "";
        outp.found = true;
        outp.set = true;
        outp.work = true;
        break;
      case "c":
      case "chat":
      case "useHistory":
        this.chatHistory = true;
        outp.work = true;
        break;
      case "sc":
      case "silentChat":
      case "silentContinue":
      case "ghostChat":
        this.chatHistory = true;
        this.noChatLogging = true;
        outp.work = true;
        break;
      case "clearHistory":
      case "ch":
      case "cc":
      case "clearC":
      case "clearChat":
        this.debugLog = this.chatLog;
        this.chatLog = "";
        this.history = [];
        this.sendHold = true;
        outp.work = true;
        break;
      case "cf":
      case "clearFirst":
        this.chatLog = "";
        this.history = [];
        outp.work = true;
        break;
      case "d":
      case "debug":
        this.debugLog += this.text;
        break;
      case "dw":
      case "debugWrite":
        this.write = true;
        this.sendHold = true;
        outp.text = this.debugLog;
        outp.found = true;
        outp.set = true;
        break;
      case "cd":
      case "clearDebug":
        this.debugLog = "";
        outp.work = true;
        break;
      case "agi":
      case "default":
      case "defaultOpenerResolved":
        this.noBatch = true; //agi always writes |||, clip often writes |||help|. it's confusing.
        break;
      case "dateTime":
        const now = new Date();
        outp.text = now.toLocaleString();
        console.log(outp.text);
        outp.found = true;
        outp.set = true;
        break;
      case "qr":
        const quickReference = `
(invocation"${this.appSettings
          .invoke}") optional prompts and commands (optional split "${this
          .appSettings.endTag}")  optional system prompt (optional split "${this
          .appSettings.endTag}") user text (optional assistant dictation "${this
          .appSettings.continueTag}") optional start of assistant response
      
Special ${this.appSettings.invoke} [operators] to apply${this.appSettings
          .endTag}:
---
-"]" renames text from user in the chatlog.

- ";" renames text from assistant in the chatlog. 

- "%" format, like ${this.appSettings.invoke}chatML, prompts${this.appSettings
          .endTag}, do this one first if you use it, it overwrites the others. Valid formats are stored in setup.js

- "!" assitant name

- ">" user name

- "}" system name

- "~" start of assistant response, "~~~" overwrites "~". 

- "\`" the backtick or grave symbol changes the system json level. Supports "json","markup","partial", or none. 

- "@" executes a batch

- "#" skips a batch

Fancy ${this.appSettings.invoke}flags${this.appSettings.endTag}
---
${this.appSettings.invoke}Help${this.appSettings
          .endTag} Contains instructions about CC operations. 

"introduction" has more about samplers and settings. 

"e" or empty blocks the default prompt to provide an empty prompt

"write" sends an instantly ready to paste set of prompts preceding the write command.

"list" will instantly supply a ready to paste list of all prompts like below.

"rf" will put the last thing you copied at the position of rf in the system prompt. 

"re" will send the last copied text after text from ${this.appSettings
          .invoke}re${this.appSettings.endTag}user  last copied text.

"on" makes clipboard conqueror run every copy, no invoke required, till you toggle it off.

"no" prevents sending to AI, useful for copying entire invokes, just add the flag.


"set" or "setDefault" saves prompts left of it to be added until toggled off like ${this
          .appSettings.invoke}set${this.appSettings.endTag}


"c" or "chat" activates the history


"sc" or "silentChat" sends the history wihout adding the new turn to the history. For multiple turns with the same history.


"ch" or "clearHistory" clears the chatlog and prevents sending to the AI.


"cf" or "clearFirst" clears the chatlog while sending the query to the LLM.


"d" or "debug" The last cleared history is stored here till CC is restarted or you clear again


"dw" or "debugWrite" ready to paste last history cleared.

"cd" or "clearDebug" clear debug manually.

"dateTime" sends the date and time in the system prompt at the position you send it.

        `;
        this.write = true;
        this.sendHold = true;
        this.noBatch = true;

        //this.nicereturn = true;
        outp.text = quickReference;
        outp.found = true;
        outp.set = true;
        //return identity;
        break;

      default:
        break;
    }
    return outp;
  }
  checkEndpoints(identity) {
    //check if keys in this.endpoints match identity
    const endpointKeys = this.getObjectKeys(this.endpoints);
    //console.log(endpointKeys);
    if (endpointKeys.includes(identity)) {
      return true;
    } else {
      return false;
    }
  }
  getObjectKeys(object) {
    return Object.keys(object);
  }
  setPrompt(command, formattedQuery) {
    switch (command.toLowerCase()) {
      case "bos":
        this.inferenceClient.setOnePromptFormat("bos", formattedQuery);
        break;
      case "eos":
        this.inferenceClient.setOnePromptFormat("eso",formattedQuery);
        break;
      case "startturn":
      case "startall":
        this.inferenceClient.setOnePromptFormat("startTurn", formattedQuery);
        break;
      case "endturn":
      case "end":
      case "endall":
        this.inferenceClient.setOnePromptFormat("endTurn", formattedQuery);
        break;
      case "startsystem":
      case "systemtoken":
        this.inferenceClient.setOnePromptFormat("startSystem", formattedQuery);
        break;
      case "system":
      case "systemrole":
      case "systemname":
      case "sysname":
        this.inferenceClient.setOnePromptFormat("systemRole", formattedQuery);
        break;
      case "endsystemrole":
      case "endsystem":
      case "endsys":
      case "seor":
        this.inferenceClient.setOnePromptFormat(
          "endSystemRole",
          formattedQuery
        );
        break;
      case "rolegap":
      case "rolehead":
      case "rolebreak":
        this.inferenceClient.setOnePromptFormat("roleGap", formattedQuery);
        break;
      case "prepend":
      case "prependsystem":
      case "prependprompt":
        this.inferenceClient.setOnePromptFormat(
          "prependPrompt",
          formattedQuery
        );
        break;
      case "systemafterprepend":
      case "systemafter":
      case "system2":
        this.inferenceClient.setOnePromptFormat(
          "systemAfterPrepend",
          formattedQuery
        );
        break;
      case "post":
      case "postprompt":
        this.inferenceClient.setOnePromptFormat("postPrompt", formattedQuery);
        break;
      case "systemmemory":
      case "memorysystem":
        this.inferenceClient.setOnePromptFormat("memorySystem", formattedQuery);
        break;
      case "endsystem":
      case "endsystemturn":
      case "seos":
        this.inferenceClient.setOnePromptFormat(
          "endSystemTurn",
          formattedQuery
        );
        break;
      case "userrole":
      case "user":
      case "username":
      case "name":
        this.inferenceClient.setOnePromptFormat("userRole", formattedQuery);
        break;
      case "enduserrole":
      case "endusername":
      case "ueor":
        this.inferenceClient.setOnePromptFormat("endUserRole", formattedQuery);
        break;
      case "memoryUser":
      case "usermemory":
        this.inferenceClient.setOnePromptFormat("memoryUser", formattedQuery);
        break;
      case "enduserturn":
      case "enduser":
      case "ueos":
        this.inferenceClient.setOnePromptFormat("endUserTurn", formattedQuery);
        break;
      case "assistantrole":
      case "assistant":
      case "assistantname":
      case "char":
        this.inferenceClient.setOnePromptFormat(
          "assistantRole",
          formattedQuery
        );
        break;
      case "endassistantrole":
      case "endassistant":
      case "aeor":
        this.inferenceClient.setOnePromptFormat(
          "endAssistantRole",
          formattedQuery
        );
        break;
      case "start":
      case "responsestart":
      case "response":
        this.inferenceClient.setOnePromptFormat(
          "responseStart",
          formattedQuery
        );
        break;
      case "special":
      case "specialInstructions":
        this.inferenceClient.setOnePromptFormat(
          "specialInstructions",
          formattedQuery
        );
        break;
      default:
        this.notify(
          "invalid key: " + command,
          " invalid format segment name, see console for options"
        );

        let names = [];
        for (let key in this.inferenceClient.instructSet) {
          names.push(key);
        }
        console.log(
          setting +
            " : prompt segment not found, options: " +
            JSON.stringify(names)
        );
        let notfound =
          "invalid prompt key: " +
          command +
          " Options: (some, its a bit more flexible)" +
          JSON.stringify(names);
        this.identity.settings = notfound;
        this.writeSettings = true;
        break;
    }
  }
  setInferenceFormat(setting) {
    setting = setting.trim();
    let names = [];
    //console.log(JSON.stringify(this.formats));
    if (this.formats.hasOwnProperty(setting)) {   
      try {
        let set = this.formats[setting];
        console.log(
        color("changing prompt format: ", "yellow") + setting + " :\n " + JSON.stringify(set));
        this.inferenceClient.setPromptFormat(set);
      } catch (error) {
        for (let key in this.formats) {
          names.push(key);
        }
        console.log(
          color(
            setting + " : format not found, options: " + JSON.stringify(names),
            "red"
          )
        );
      }
    } else {
      console.log("Instruction Format Not Found");
    }
  }

  setParams(setting) {
    setting = setting.trim();
    if (this.apiParams.hasOwnProperty(setting)) {
      try {
        let set = this.apiParams[setting];
        this.params = set;
        console.log(
          color("setting generation parameters: ", "yellow") + setting + " :\n " + JSON.stringify(set)
        ); 
      } catch (error) {
        let names = [];
        for (let key in this.apiParams) {
          names.push(key);
        }
        console.log(
          color(
            setting + " : Param set not found, options: " + JSON.stringify(names),
            "red"
          )
        );
      }
    } else{
      console.log("format not found");
    }
  }
  personaAtor(persona, sorted) {
    persona.forEach(tag => {
      tag = tag.trim();
      let commands = tag.split(this.appSettings.settinglimit);
      console.log("prompt/flag: " + color(commands, "green"));
      if (commands.length === 2) {
        commands[0] = commands[0].trim();
        commands[1] = commands[1].trim();
        if (commands[1] === "" || commands[1]===undefined || commands[0].includes(' ')) {
          this.identityHandler(tag);
        } else {
          if (commands[1] == this.appSettings.save && this.sendLast) {
            //save like |||re,prompt:save|
            this.identities[commands[0]] = this.recentClip;
            tag = commands[0];
          } else if (commands[1] == this.appSettings.save) {
            //save like |||prompt:save|
            this.sendHold = true;
            this.identities[commands[0]] = sorted.formattedQuery;
            console.log(color("Saved ", "cyan") + commands[0]);
            tag = commands[0];
          } else if (commands[1] == this.appSettings.delete) {
            //save like |||prompt:delete|
            this.sendHold = true;
            delete this.identities[commands[0]];
            tag = commands[0];
          } else if (commands[1] == this.appSettings.savePromptToFile) {
            //save like |||prompt:file|
            this.sendHold = true;
            let setting = { [commands[0]]: this.identities[commands[0]] };
            //console.log(JSON.stringify(setting));
            this.settingSaver(
              setting,
              this.identities,
              "0prompts.json",
              this.notify,
              this.fs
            ); //todo: fix this magic string.
            tag = commands[0];
          } else if (
            commands[0] == this.appSettings.setPromptFormat &&
            this.appSettings.save == commands[1]
          ) {
            this.sendHold = true;
            this.pickupFormat(sorted.formattedQuery);
          } else if (commands[0] == this.appSettings.setInstruction) {
            this.sendHold = true;
            this.setPrompt(commands[1], sorted.formattedQuery);
          } else if (!isNaN(commands[1])) {
            //this.params[commands[0]] = parseFloat(commands[1]);
            this.paramSetter(commands[0],parseFloat(commands[1]))
          } else if (commands[1] == this.appSettings.true) {
            //this.params[commands[0]] = true;
            this.paramSetter(commands[0], true);
          } else if (commands[1] == this.appSettings.false) {
            //this.params[commands[0]] = false;
            this.paramSetter(commands[0], false);
          } else {
            //this.params[commands[0]] = commands[1];
            this.paramSetter(commands[0], commands[1]);

          }
        }
      } else {
        //if
        if (!isNaN(tag)) {
          //if params contains a key called max_length
          if (this.api.hasOwnProperty("maxReturnTokensKey") && this.api.maxReturnTokensKey !== "") {
            this.paramSetter(this.api.maxReturnTokensKey,parseInt(tag));
          } else{
            if (this.params.hasOwnProperty("max_length")) {
              this.params.max_length = parseInt(tag); 
            } else if (this.params.max_tokens) {
              // if params has a key called max_tokens
              this.params.max_tokens = parseInt(tag);
            } else if (this.params.hasOwnProperty("max_new_tokens")) {
              this.params.max_new_tokens = parseInt(tag);
            } else {
              console.log(
                color("no max_length or max_tokens in params: ", "red") +
                  JSON.stringify(this.params)
              );
            }
          }
        } else if (tag === this.appSettings.setParams) {
          this.sendHold = true;
          this.setParams(sorted.formattedQuery);
        } else if (tag === this.appSettings.setPromptFormat) {
          this.sendHold = true;
          this.setInferenceFormat(sorted.formattedQuery);
        } else {
          this.identityHandler(tag)
        }
      }
    });
  }
  paramSetter(name,setting){
    if (this.api.hasOwnProperty("paramPath") && this.api.paramPath !== "") {
      this.params[this.api.paramPath][name] = setting
    } else {
      this.params[name]= setting
    }
  }
  pickupFormat(setting) {
    console.log("hit pickup format: " + setting);
    try {
      let parsed = JSON.parse(setting); //this will for sure mess up, probably don't count on this functionality until I manually build a parse for this.
      console.log(JSON.stringify(parsed));
      this.inferenceClient.setPromptFormat(parsed);
    } catch (error) {
      this.notify("invalid format: ", error);
      console.log("invalid format: " + JSON.stringify(error));
    }
  }
  continueText(text) {
    var splitText = text.split(this.appSettings.continueTag);
    // console.log("ContinueText Lenght: "+ splitText.length + " : " +  JSON.stringify(splitText));
    if (splitText.length === 1) {
      return splitText[0];
    } else if (splitText.length === 2) {
      this.setPrompt("start", splitText[1]);
      return splitText[0];
    } else if (splitText.length === 3) {
      this.setPrompt("start", splitText[1]);
      return splitText[0] + splitText[2];
    } else if (splitText.length >= 3) {
      return text;
    }
    return text;
  }
  continueSetText(text) {
    const splitText = text.split(this.appSettings.continueTag);
    // console.log("Lenght: "+ splitText.length + " : " +  JSON.stringify(splitText));
    if (splitText.length === 1) {
      return splitText[0];
    } else if (splitText.length === 2) {
      //this.setPrompt("start", splitText[1]);
      return splitText[0];
    } else if (splitText.length === 3) {
      //this.setPrompt("start", splitText[1]);
      return splitText[0] + splitText[2];
    } else if (splitText.length >= 3) {
      return text;
    }
    return text;
  }
  
  getBatchLimiterName(type, name) {
    if (type === "user") {
      type = "User";
    }
    if (type === "assistant") {
      type = "Assistant";
    }
    let typeStepBack = {
      Assistant: "User",
      User: "Assistant"
    };
    return (
      this.inferenceClient.instructSet.endTurn +
      this.inferenceClient.instructSet["end" + typeStepBack[type] + "Turn"] +
      this.inferenceClient.instructSet.startTurn +
      this.inferenceClient.instructSet["start" + type] +
      name +
      this.inferenceClient.instructSet["end" + type + "Role"] +
      this.inferenceClient.instructSet.endRole +
      this.inferenceClient.instructSet.roleGap
    );
  }
  chatHistoryBuilder() {
    let formattedHistory = "";
    this.history.forEach(message => {
      formattedHistory +=
        this.getBatchLimiterName(message.origin, message.name) +
        this.inferenceClient.instructSet.roleGap +
        message.text;
    });
    return formattedHistory;
  }
  chatHistorySetup(text, origin, name) {
    this.history.push({ origin: origin, text: text, name: name });
  }
  chatBuilder(text, origin) {
    if (this.chatHistory && text != "" && !this.noChatLogging) {
      if (origin === "user") {
        if (this.appSettings.batchLimiter === "") {
          if (this.batchUserName != "") {
            this.chatHistorySetup(text, origin, this.batchUserName);
            this.batchUserName = "";
          } else {
            this.chatHistorySetup(
              text,
              origin,
              this.inferenceClient.instructSet.userRole
            );
          }
        } else {
          this.chatLog += this.appSettings.batchLimiter + text;
        }
      } else {
        if (this.appSettings.batchLimiter === "") {
          if (this.batchAssistantName != "") {
            this.chatHistorySetup(text, origin, this.batchAssistantName);
            this.batchAssistantName = "";
          } else {
            this.chatHistorySetup(
              text,
              origin,
              this.inferenceClient.instructSet.assistantRole
            );
          }
        } else {
          this.chatLog += this.appSettings.batchLimiter + text;
        }
        this.chatHistory = false;
        this.noChatLogging = false;
      }
    }
  }
  isKeyName(string) {
    let regex = /^[a-zA-Z0-9_-]+$/;
    if (regex.test(string)) {
      return true;
    } else {
      return false;
    }
  }
  commandHandle(tags) {
    //todo: fix this.

    console.log(color("Tags : ", "purple") + tags);
    if (tags.hasOwnProperty("command") && tags.command != "" && tags.command != "") {
      let splitCommand = tags.command.split(this.appSettings.quickPromptLimit);
      if ((splitCommand.length = 1)) {
        return 0;
      } else if ((splitCommand.length = 2)) {
        if (this.isKeyName(splitCommand[0])) {
          this.appSettings.rootname = splitCommand[0];
          tags.command = splitCommand[1];
          return splitCommand[0].length;
        } else {
          return 0;
        }
      } else if (splitCommand.length > 2) {
        if (this.isKeyName(splitCommand[0])) {
          this.appSettings.rootname = splitCommand[0];
          return splitCommand.slice(1).join(this.appSettings.quickPromptLimit);
        } else {
          return 0;
        }
      }
    }
  }
  setupforAi(text) {
    //console.log(this.batchDocument);
    if (this.reqCount>0) {
      return console.log(color("generation already in progress","red"));
    }
    if (this.endpoints.duplicateCheck) {
      if (this.duplicateCheck == text) {
        this.sendHold = true;
        this.preserveLastCopy = true;
      }
      this.duplicateCheck = text;
    }
    if (this.batchLength > 0) {
      this.blockPresort = false;
      this.noBatch = false;
      this.batchProcessor();
      text =
        this.appSettings.invoke +
        this.batch +
        this.appSettings.endTag +
        this.appSettings.endTag +
        text;
    } else {
      this.noBatch = true;
      //this.debugLog = this.ChatLog;
    }
    if (this.blockPresort) {
      this.blockPresort = false; //todo: Determine if this is why writing commands block the next query.
      return;
    }

    if (this.noBatch) {
      this.chatBuilder(this.recentClip.text, "assistant");
    }
    const sorted = this.activatePresort(text);
    this.ifDefault = true;
    if (sorted) {
      this.text = this.continueSetText(sorted.formattedQuery);
      this.undress();
      if (this.set) {
        this.identity = this.setPrompts;
        this.ifDefault = false;
        if (sorted.tags.hasOwnProperty("command") && sorted.tags.command != "") {
          this.identity[this.appSettings.rootname] = sorted.tags.command;
        }
      } else {
        if (sorted.tags.hasOwnProperty("command") && sorted.tags.command != "") {
          this.identity[this.appSettings.rootname] = sorted.tags.command; //send ||||this text over if it exists|
        }
      }
      if (sorted.tags.persona) {
        let persona = sorted.tags.persona.split(this.appSettings.promptSplit);
        this.personaAtor(persona, sorted);
      }
      sorted.formattedQuery = this.continueText(sorted.formattedQuery);
      if (sorted.run || this.on) {
        if (this.ifDefault && !this.set && (!sorted.tags.hasOwnProperty("command") || sorted.tags.command === "")
        ) {
          console.log(color("Sending default identity: ","green")+ this.defaultIdentity);
          this.identity[this.defaultIdentity] = this.identities[this.defaultIdentity];
          this.noBatch = true;
        }
        if (
          this.identity[this.appSettings.rootname] === "" &&
          this.appSettings.clean
        ) {
          delete this.identity[this.appSettings.rootname];
        }
        //if this.identity contains a key called "e" remove it.
        if (this.identity.hasOwnProperty(this.appSettings.emptyquick)) {
          delete this.identity[this.appSettings.emptyquick];
        }
        if (this.identity.hasOwnProperty(this.appSettings.empty)) {
          delete this.identity[this.appSettings.empty];
        }
        if (this.chatHistory) {
          if (this.chatLog != "") {
            this.identity[this.appSettings.historyName] = this.chatLog;
          } else if (this.history.length > 0) {
            this.identity[
              this.appSettings.historyName
            ] = this.chatHistoryBuilder();
          }
        }
        if (this.sendLast) {
          this.sendLast = false;
          sorted.formattedQuery =
            sorted.formattedQuery + "\n" + this.recentClip.text;
        }
        if (this.write) {
          this.write = false;
          this.noBatch = true;
          this.blockPresort = true; //todo: Determine if this is why writing commands block the next query.
          delete this.identity[this.appSettings.rootname];
          let sendtoclipoardtext =
            this.appSettings.writeSave +
            "\n" +
            JSON.stringify(this.identity) +
            this.appSettings.writeSplit +
            sorted.formattedQuery;
          sendtoclipoardtext = sendtoclipoardtext.replace(/\\n/g, "\n");
          this.notify("Paste Ready:", sendtoclipoardtext.slice(0, 150));
          //this.recentClip.text = sendtoclipoardtext;
          return this.sendToClipboard(sendtoclipoardtext);
        }
        if (this.writeSettings) {
          this.writeSettings = false;
          this.noBatch = true;
          this.blockPresort = true; //todo: Determine if this is why writing commands block the next query.
          let sendtoclipoardtext =
            this.appSettings.writeSettings +
            "\n" +
            JSON.stringify(this.identity.settings) + //this is set up for PROMPT edit failures
            this.appSettings.writeSplit +
            sorted.formattedQuery;
          //sendtoclipoardtext = sendtoclipoardtext.replace(/\\n/g, "\n");
          this.notify("Paste Response:", sendtoclipoardtext.slice(0, 150));
          //this.recentClip.text = sendtoclipoardtext;
          return this.sendToClipboard(sendtoclipoardtext);
        }
        if (!this.sendHold) {
          //set params for outgoing
          //console.log("params: " + JSON.stringify(this.params));
          // let outParams = this.params;
          // if (this.api.params && this.apiConfigSet !== this.api.params) {
          //   outParams = this.apiParams[this.api.params];
          //   //todo: build whole engine to transport settings across multiple apis
          // }
          // console.log("outParams: " + JSON.stringify(outParams));
          //console.log(sorted);
          console.log(color("Sending to endpoint: ", "green"));
          
          this.reqCount++;
          this.inferenceClient.send(
            this.identity,
            sorted.formattedQuery,
            this.params,
            this.api
          )
          ;
        } else {
          this.sendHold = false;
        }
      }
    }
    this.chatBuilder(this.text, "user");
    if (this.preserveLastCopy) {
    } else {
      this.recentClip.text = this.text; // + " ";
    }
    this.preserveLastCopy = false;
    this.setPrompt("responsestart", ""); //clear assistant response start.
  }
  activatePresort(text) {
    let run = false;
    text = text.trim();
    var response = [];
    const parsedData = text.split(this.appSettings.invoke);
    let tags = "";
    if (parsedData.length > 3) {
      //todo: fix this so it works better
      this.notify(
        "Not Sent:",
        "too many '" + this.appSettings.invoke + "'. max 2."
      );
      this.sendHold = true;
      //this.noBatch = true;
      //this.write = true;
      return {
        run: run,
        formattedQuery: parsedData.join(""),
        tags: tags
      };
    }
    ///check that an invoke was removed
    const longtrue = text.length > parsedData[0].length;
    // if (!longtrue){
    //   this.copyResponse = text;
    // }
    if (longtrue && parsedData.length === 1) {
      tags = this.tagExtractor(parsedData[0]);
      response.push(tags.text);
      response.push("");
      response.push("");

      run = true;
    } else if (parsedData.length === 2) {
      tags = this.tagExtractor(parsedData[1]);
      response.push(tags.text);
      response.push(parsedData[0]);
      response.push("");
      run = true;
    } else if (parsedData[0].length === 3) {
      tags = this.tagExtractor(parsedData[1]);
      response.push(tags.text);
      response.push(parsedData[0]);
      response.push(parsedData[2]);
      run = true;
    } else {
      response.push(text);
      response.push("");
      response.push("");
    }
    const sendout = response[0] + "" + response[1] + "" + response[2];
    return {
      run: run,
      formattedQuery: sendout,
      tags: tags
    };
  }

  tagExtractor(text) {
    text = text.trim();
    const tags = text.split(this.appSettings.endTag);
    var output = {};
    if (tags.length === 1) {
      output = { persona: "", command: "", text: text };
    } else if (tags.length === 2) {
      output = { persona: tags[0], command: "", text: tags[1] };
    } else if (tags.length >= 3) {
      const cutTags = tags.slice(2);
      if (text.length > 1) {
        const wholeText = cutTags.join(this.appSettings.endTag);
        output = {
          persona: tags[0],
          command: tags[1],
          text: wholeText
        };
      } else {
        output = {
          persona: tags[0],
          command: tags[1],
          text: cutTags[0]
        };
      }
    }
    return output;
  }

  //tests
  runTests(){
    testprint(test(`${this.appSettings.invoke}${this.appSettings.formatSwitch}llama3${this.appSettings.promptSplit}testAgent${this.appSettings.promptSplit}${this.appSettings.assistantTag}test name${this.appSettings.promptSplit} ${this.appSettings.userTag}test user${this.appSettings.promptSplit} ${this.appSettings.batchContinueTag}test completion${this.appSettings.endTag}test quick prompt${this.appSettings.endTag} user text `,"<|im_start...",this.setupforAi));
  
  }
}
function test(input, expected, callback) {
  let output = callback(input);
  if(output === expected){
    return {input: input, expected: expected, output: output, result: "pass"}
  }
  else{
    const tested = compareator(output, expected)
    return {input: input, output: output, expected: expected, test: false }
  }
}
function compareator(output, expected){
  //this javascript function returns a string with the differences higlighted in red using the color() function and spaces replaced by █ for easier reading. It also returns a boolean indicating whether the strings are equal or not.
    let isEqual = true;
    var colorstring = "";
    if(output.length !== expected.length) {
       console.log(color("UNEQUAL LENGTH", "red"));
       if (output.length > expected.length) {
        console.log("Input longer");
       } else{
        console.log("Expected longer");
      } 
    }
    for (let index = 0; index < output.length; index++) {
      if (index === expected.length) {

        break;
      }
      const inchar = output[index];
      const exchar = expected[index];
      if (inchar === exchar){
        colorstring = colorstring + inchar;
      }else{
        if (inchar === ' '){
          colorstring = colorstring + "█";
        } else if (inchar === '\n'){
          colorstring = colorstring + color("/n", "red");
        }  else {
          colorstring = colorstring + color(inchar, "red"); 
          isEqual = false;
        }
      }
    };
   console.log(colorstring);
   return { test: isEqual, result: colorstring }
}

function testprint(input, test, output, colorstring){
  if (test) {
    console.log(color("Test Passed: ", "green") + input + color(":","green") + output);
  }
  else {
    console.log(color("Test Failed: ", "red") + colorstring)
  }

}
//style
function color(text, color) {
  switch ((text, color)) {
    case "red":
      return `\x1B[31m${text}\x1B[0m`;
    case "green":
      return `\x1B[32m${text}\x1B[0m`;
    case "yellow":
      return `\x1B[33m${text}\x1B[0m`;
    case "blue":
      return `\x1B[34m${text}\x1B[0m`;
    case "white":
      return `\x1B[37m${text}\x1B[0m`;
    case "black":
      return `\x1B[30m${text}\x1B[0m`;
    case "magenta":
      return `\x1B[35m${text}\x1B[0m`;
    case "cyan":
      return `\x1B[36m${text}\x1B[0m`;
    case "gray":
      return `\x1B[90m${text}\x1B[0m`;
    case "light gray":
      return `\x1B[38m${text}\x1B[0m`;
    // Add other colors here
    case "purple":
      return `\x1B[91m${text}\x1B[0m`;
    case "brown":
      return `\x1B[92m${text}\x1B[0m`;
    case "orange":
      return `\x1B[93m${text}\x1B[0m`;
    case "pink":
      return `\x1B[94m${text}\x1B[0m`;
    case "turquoise":
      return `\x1B[95m${text}\x1B[0m`;
    case "lime":
      return `\x1B[96m${text}\x1B[0m`;
    case "gold":
      return `\x1B[97m${text}\x1B[0m`;
    case "silver":
      return `\x1B[98m${text}\x1B[0m`;
    case "maroon":
      return `\x1B[99m${text}\x1B[0m`;
    default:
      return text;
  }
}
module.exports = TextEngine;
