const saveSettings = require("./settingSaver");

class TextEngine {    
  constructor(
    inferenceClient,
    sendToClipboard,
    recieveApi,
    notify,
    endpoints,
    identities ,
    instructions ,
    apiParams,
    formats,
    settingSaver,
    fs,
  ) {
    //todo settings
    this.inferenceClient = inferenceClient;
    this.sendToClipboard = sendToClipboard;
    this.recieveApi = recieveApi;
    this.settingSaver = settingSaver;
    this.fs = fs;
    this.endpoints = endpoints;
    
    this.identities = identities;
    this.appSettings = instructions;
    this.notify = notify;
    this.params = apiParams.default;
    this.apiParams = apiParams.params;
    //this.apiConfigSet = endpoints.endpoints;
    this.api = endpoints.endpoints[endpoints.defaultClient];
    this.formats = formats;
    this.identity = {};
    this.recentClip = { text: "" };
    this.text = "";//sorted
    this.setAgent = {};
    this.memory = "";
    this.ChatLog = "";
    this.debugLog = "";
    this.memengines = {};
    this.agentBatchKit = {};
    this.batchLength = 0;
    this.batch = "";
    this.duplicateCheck = "";
    this.batchAssistantLimiter = "";
    this.batchUserLimiter = "";
    this.copyResponse = "";
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
    this.noChatLogging= false;
  }

  returnTrip(str) {
    if (typeof str !== "string"){
      return "Error: Input must be a string";
    } 
    let tripCoding= 0;
    let trip ={api:0, batch:0, format: 0, trip:""};
    for (let i = 0; i < str.length; i++ ){
      if (str[i] === this.appSettings.backendSwitch )  {
        trip.api++;
        trip.trip = trip.trip + this.appSettings.backendSwitch;
        tripCoding++
      } else if (str[i] === this.appSettings.batchSwitch) {
        trip.batch++;
        trip.trip = trip.trip + this.appSettings.batchSwitch;
        tripCoding++
      } else if(str[i] === this.appSettings.batchMiss){
        trip.batch++;
        trip.trip = trip.trip + this.appSettings.batchMiss;
        tripCoding++
      } else if(str[i] === this.appSettings.formatSwitch){
        trip.format++;
        trip.trip = trip.trip + this.appSettings.formatSwitch;
        tripCoding++
      } else if (str[i] === this.appSettings.assistantTag) {
        trip.trip = trip.trip + this.appSettings.assistantTag;
        tripCoding++
      } else if (str[i] === this.appSettings.userTag) {
        trip.trip = trip.trip + this.appSettings.userTag;
        tripCoding++
      } else if (str[i] === this.appSettings.systemTag) {
        trip.trip = trip.trip + this.appSettings.systemTag;
        tripCoding++
      } else if (str[i] === this.appSettings.batchNameSwitch) {
        trip.trip = trip.trip + this.appSettings.batchNameSwitch;
        tripCoding++
      } else if (str[i] === this.appSettings.batchContinueTag) {
        trip.trip = trip.trip + this.appSettings.batchContinueTag;
        tripCoding++
      } else if (str[i] === this.appSettings.batchAssistantSwitch) {
        trip.trip = trip.trip + this.appSettings.batchAssistantSwitch;
        tripCoding++
      }else if (str[i] === this.appSettings.setJsonLevel) {
        trip.trip = trip.trip + this.appSettings.setJsonLevel;
        tripCoding++
      }else if (i < tripCoding){
        return trip;
      }
    }
    return trip;
  }
  batchAgent(identity, trip){
    //batchAgent builds up a an object of agents to be used in the batch
    if (this.batchLength < trip.batch){
      this.batchLength = trip.batch;
    }
    this.agentBatchKit[identity] = trip
  }
  batchProcessor(){
    let setBatch = [];
    //console.log(this.batchLength);
    if (this.batchLength > 0){
      this.batchLength--;
      for (let key in this.agentBatchKit) {       
          console.log(key, this.agentBatchKit[key]);
          if (this.agentBatchKit[key].trip[0]  === this.appSettings.batchSwitch){
            this.agentBatchKit[key].trip = this.agentBatchKit[key].trip.slice(1);
            setBatch.push(key);
          } else if (this.agentBatchKit[key].trip[0]  === this.appSettings.batchMiss){
            this.agentBatchKit[key].trip = this.agentBatchKit[key].trip.slice(1);
          } else if (this.agentBatchKit[key].trip.length === 0){
            delete this.agentBatchKit[key];
          }
        
      }  
      this.batch = setBatch.join(this.appSettings.agentSplit);
    }
  }
  setJsonLevel(identity){
    let trimmed = identity.slice(1).trim()
    if (trimmed === "") {
      this.api.jsonSystem = ""
    } else if(trimmed === ""){
      this.api.jsonSystem
    } else {
      this.api.jsonSystem = identity.slice(1).trim()
    }
    switch (trimmed) {
      case "1":
      case "markup":
      case "full turns":
      case "fullTurns":
        this.api.jsonSystem = "markup"
        break;
      case "2":
      case "json":
      case "code":
      case "full":

        this.api.jsonSystem = "full"
        break;
      case "3":
      case "keys":
      case "useKeys":
      case "partial":
        this.api.jsonSystem = "keys"
        break;
      case "4":
      case "no":
      case "none":
      case "off":
        this.api.jsonSystem = "none"
        break;            
      default:
        break;
    }
  }
  updateIdentity(identity) {
    let trip = this.returnTrip(identity);
    let found = false;
    let setIdent = {};
    let setAgent = false;
    let batching = false;
    
    if (identity !== "" && identity !== null && identity !== undefined) {
      if (identity) {
        if (Number.isNaN(Number(identity))) {
          identity = identity.trim();
          if (trip.trip[0] === this.appSettings.assistantTag){
            this.setPrompt("assistantRole",identity.slice(1));
            found = true;
          }
          if (trip.trip[0] === this.appSettings.userTag){
            this.setPrompt("userRole",identity.slice(1));
          }
          if (trip.trip[0] === this.appSettings.systemTag) {
            this.setPrompt("systemRole", identity.slice(1));
          }
          if (trip.trip[0] === this.appSettings.formatSwitch){
            this.setInferenceFormat(identity.slice(1));
          }
          if (trip.trip[0] === this.appSettings.batchNameSwitch){
            this.batchUserLimiter = this.getBatchLimiterName("user",identity.slice(1));
            this.chatHistory = true;
          }
          if (trip.trip[0] === this.appSettings.batchAssistantSwitch){
            this.batchAssistantLimiter = this.getBatchLimiterName("assistant",identity.slice(1));
            this.chatHistory = true;
          }
          if (trip.trip[0] === this.appSettings.batchContinueTag) {
            this.setPrompt("responseStart", identity.slice(1));
          }
          if (trip.trip[0] === this.appSettings.setJsonLevel) {
           this.setJsonLevel(identity);
          }
          if(this.endpoints.endpoints.hasOwnProperty(identity)) {
            this.api = this.endpoints.endpoints[identity];
            console.log("setting api: " + JSON.stringify(this.api));

            return { text: "", agent: false, set: false }
          }
          if (trip.batch > 0){
            identity = identity.slice(trip.batch);
            this.batchAgent(identity, trip);
            batching = true;
          }  
          
          if (trip.api > 0 && !batching) {
            let counter = 1;//start at one to let zero be the default
            for (const key in this.endpoints.endpoints){
              console.log(trip.api + " : " + counter);
              if (counter === trip.api) {
                this.api = this.endpoints.endpoints[key];
                console.log("setting api: " + JSON.stringify(this.api));  
                identity = identity.slice(trip.api); 
                console.log(identity);
                break;
              }
              counter++;
            }
          }
          }else {
            this.api = this.endpoints.endpoints[this.endpoints.defaultClient];
            console.log("using default api: " + JSON.stringify(this.api));
          }
          
          if (this.identities.hasOwnProperty(identity) && !batching) {
            setIdent[identity] = this.identities[identity];
            found = true;
            setAgent = true;
          } else {
            found = false;
            const flags = this.funFlags(identity); 
            setIdent[identity] = flags.text;
            found = flags.found;
            setAgent = flags.set;

          }
        } else {
          //this.params.max_length = parseInt(identity, 10);
        }
      }
      return { text: setIdent[identity], agent: found, set: setAgent };
    }
  forget() {
    this.memory = [];
  }
  undress() {
    this.identity = {};
  }

  funFlags(flag) {
    //need to accept temp:123
    ///slice off 4
    var outp = { text: "", found: false, set: false };
    switch (flag) {
      case "help"://left justified for formatitng when printed
        const intro = `delete the extra on this line before saving or sharing agents printed with write.
Welcome to Clipboard Commander!\n

|||introduction| will explain the basics of LLMs, this help is more about this software.

Remember, LLMs predict the next word using all the words that come in and predict each next word one at a time.
Lanuage specifity is important for results, and the small models can stumble in strange ways on misspelled words, vague requests, or poor wording in instructions. For storytelling less can be more, but for specific results you must give specific input. 
They usually get things pretty right, but the quality of the output suffers.  Use specific language. I tend to spend the time waiting for the reponse refining my query so that if it's confused by any bad language the first time, I can ask it in a better way. 
Run on sentences for a given instruction work well, commas tent to bring forward the idea. Periods are good to start a new idea.
For instance, describing a class and a function, I would describe the class in one run on rather than multiple sentences, and the function in another run on. 
This will help the AI keep these ideas seperate rather than tying sentences together to continue them like "the class. the class. the class. The fucntion. the function." This will be much more likely to return a mess or near miss. 
Do it like: The class is, has, needs, whatever. The function is for, needs, does, etc.

Either way can work, for very complex stuff you have to do both, and sometimes you gotta play around cause it doesnt get something, but as you learn how the model likes to be told, you will begin to get incredible results from these small models. 
I feel that voice is not specific enough, so I made this tool to bring your AI anywhere, and Clipboard Conqueror can interface the same backend and run side by side.

||| invokes the default agent Captain Clip to respond to any text sent with the invoke token. Say Hi, Clip!

the invoke token is clipped out, so it can be anywhere in the text you copy or at the end too|||

|||writer| Write me a bedtime story about 11 little squirrels who talk to and help a little girl find shelter in a storm.

|||writer,frank| Title: "Frank's Sauciest Case: Big pizza from little Tony."
  Sends the frank derbin character and the writer along with any text you send to guide the story.  

|||writer,write| will write the contents of the writer agent to the clipboard, ready to paste back instantly and see what is sent to the ai with |||writer|. 

This message starts with |||name:save|. change 'name' to your choice of name(or leave it name), and any text you copy with this will be saved with that name

:save| accepts json but incorrectly formatted json will fail to parse and not be saved.
note the full colon. ,save tries to send data stored as save. |||save:save| will work just fine, saving anything copied along into |||save|. Without care, you could get confusing results. 
currently no changes are written to the hard drive. Restarting this program will reset any changed agents and any custom will be lost. Luckily you can copy them right back in.
//todo: build and link my own charachter library

|||on| toggles activation on every copy even with no invoke until |||on| is called again.

|||list| writes a list of all agents that are currently available.

|||re| what is this code doing? 

- return copy at end of prompt inserted like continued user question.
- sends the thing you copied last,   after "what is this code doing? \n \n {{lastcopy}}", at the end of the user prompt" and sends the Captian Clip assistant in the system prompt to help consider the instruction.
  
|||rf| what is this code doing? 

- return last copied first in prompt inserted like an agent at the level rf is placed relative to other agents ex |frank,rf,tot| copied text comes after frank agent.
- sends the thing you copied last before the Captian Clip assistant prompt to help frame the output format and preconceptions.

|||1200| sets the max response length to 1200. Also works like |||agent,setting:0.5,1000| just a number is always max response length.  

|||temperature:1.1| sets the temperature to 1.1. This works for any setting ex: top_p, min_p. Use 1 and 0 to set true/false //true/false untested.
again, full colon on settings, which go directly to the backend api. 

Troubleshooting:
  Occasionally kobold or this app hangs. You can type rs in the console and press enter to restart this application.

 To clear momentary troubles simply try again. 

Copy the following block to exchange the Captain Clip persona for a more professional AI:

|||default:save|[[{"SYSTEM":"Simulate an AI described by DIP - Do It Professionally. First, list your assumptions. Next, think step-by-step. Finally, state your conclusion.  DIP is a very logical AI assistant. Answer any questions truthfully and complete tasks appropriately and in order.]","description":"DIP will Do It Professionally","confused":"If not given a different instruction, summarize and explain any content provided. DIP will explain he can not learn, is based on past data, and can not access the internet if he is asked for current events or research.","voice":"Sure Boss. Here you go. \"Get started: \"."},""],[null,""]]

Advanced Command:

||||System: Command first before Clip agent.|  text from <user> in the internal chain

^^^^note 4 "|" , and the close on the end

|||writer|SYSTEM: Command First.| User: after agent writer

System applies set formatting like:
---
"prompt":"<|im_start|>[\"SYSTEM: Command First.\",[\"SYSTEM: Write a lengthy prose about the requested topic. Do not wrap up, end, or conclude the story, write the next chapter.\\n \\n Story:\",\"\"]]<|im_end|>\n<|im_start|>user:\n User: after agent 
frank\n\n<|im_end|>\n<|im_start|>assistant:\n

---

|||re,frank|this text is invisible to :save| query.

||set|:

|||rf,frank,set,joe|these system commands persist| query goes out. 

- set will save all agents before it as a persistent default, and include any system command sent at this time. in this case joe does not persist with the next simple ||| 

once set "|||"{query} will behave as 

"|||(that last copy saved with rf),frank|these system commands persist|"{query}

until |||set| is copied again, clearing the set agents. 

While set, |||any,additional,agents| can be sent and add after the set agents.

|||rf,set| is extremely useful for repeated queries against the same copied data. 

while set |||any|this instruction replaces the old system instruction before agents this time only| {query}


Remember: this is a large language model AI, and a small one at that. You should always check its work. It will make stuff up sometimes. It is not current, and has no internet connectivity. It may reccomand outdated software, imaginary modules, or misunderstand a key component and return nonsense altogther. 
If you ask for smut, you are likely to get it. We're heading into a future of AI everywhere, and a day will come that you have an AI respond to an email. You owe it to yourself, whoever you sent it to, and just general decency, at least read what the AI says on your behalf, every single time.  
The AI can tell you a lot of real info about many things. It can debug, rubber duck, respond in charachter, tell new and original stories, or summarize text, all with great success. 
Expecially with smaller models, your words matter, how you ask is everything. Bigger models do better inferring intent, but the best results always come from specific language, and the AI won't always do what you expect. 

Speaking of help, I've been struggling to find work and my son will be born any day now. I built this tool to hopefully make some money, though the paid features are still in the works.
This is me pan-handling folks, but I'm not playing drums on buckets in the street, I integrated a sweet set of tools for you to use anytime and help do your job. Help sell the software or send me something, please. 
If you get good use from this software, or are using it in a commercial environment, please send what it's worth to you.. I need it to support my family. Thank you for using Clipboard Conqueror.

https://patreon.com/ClipboardConqueror
https://ko-fi.com/aseichter2007
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
      case "introduction"://left justified for formatitng when printed.
        const identity = `
Hello there! My name is Captain Clip, and I am here to introduce you to Clipboard Conqueror. As a friendly and helpful sailor, I'm here to guide you through the exciting world of integrated AI.

Clipboard Conqueror is an innovative tool that bridges the gap between text-based AI and the computer clipboard. This incredible software allows the AI to be accessible from any text box or place where a user can type freely. Whether you need assistance with basic tasks, quick reference, or understanding strange messages, Clipboard Conqueror has got you covered.

With Clipboard Conqueror, you can enjoy the full potential of large language model-based AI, making your life easier and more efficient. So, get ready to set sail on this incredible journey with Captain Clip and Clipboard Conqueror!

You can always load the model of your choice and uncomment the proper instructions in the settings, which have some comments to aid the way, currently in the constructor of textengine.js above the apiParams. Todo: move the settings to multiple config files: params and actors. 
____________________________________
*note, you can get this far without a backend host running. Ensure that you have started a compatible backend like koboldcpp.*
Lets try it out! Copy the following:
||| Jack and Jill went up the hill, each carrying 10 apples. Jack fell down, rolled down the hill, and dopped all of his apples. Jill did not come tumbling after. Jill gave half her apples to Jack when he returned to the top of the hill. They each ate an apple, and then climbed back down the hill, where they spotted an apple tree. Jack picked 3 apples and gave them to Jill, while Jill pickes 8 apples and splits them between herself and jack, adding half to the apples she carried down the hill. How many apples do each have at the end?

Now wait for the notification. It could be a while depending on your hardware, settings, and how much the AI writes. When you are notified, paste the response somewhere.
I rarely wait over 30 seconds with my 3090 running 8 bit OpenHermes 2.5 Mistral, but on very slow hardware you might wait minutes or turn the max generation size down like |||200|


There are 5 special operators for the |||agents| segment, that start with the symbol, and end with hte next comma "," (agentSplit).
- "!" assitant name
- ">" user name
- "}" system name
- "~" start of assistant response, ~~~ overwrites a this one.
- "%" format like format |||%chatML|, do this one first if you use it, it overwrites the others. 

||| %chatML, ! Rick, > Morty, writer, } Narrator's notes| Rick answers morty's questions.| Where are we going today, grandpa? 


See? Not quite. lets try and cool things off a bit. LLMs have a parameter called a temperature, even chatGPT.
|||temperature:0.4|Jack and Jill went up the hill, each carrying 10 apples. Jack fell down, rolled down the hill, and dopped all of his apples. Jill did not come tumbling after. Jill gave half her apples to Jack when he returned to the top of the hill. They each ate an apple, and then climbed back down the hill, where they spotted an apple tree. Jack picked 3 apples and gave them to Jill, while Jill pickes 8 apples and splits them between herself and jack, adding half to the apples she carried down the hill. How many apples do each have at the end?

probably better. Do math and logic stuff at low temperature for better results.
lets get back to standard, the setting persists unless you restart this application:
|||temperature:1|What happens if I make a computer successfully divide by zero?

higher temps get better results when you are trying to generate fiction or do imaginative things like:

|||temperature:1.6| Write me 10 ideas for videos to record on a youtube. Avoid already popular tropes and focus on finding a fun and imaginative niche for me to fill.
  //with psyfighter, we get some sailing contaminatoin from the Captain Clip prompt. That's why there is a |||writer,agi,tot,code,etc...| 
Higher temps lead to AI halucination and making stuff up, and that can be desirable, but don't ask for programming help at high temps or you might be led to install fake node modules.
Hot as you can handle makes some fancy fantasy, but really for serious writing I reccommend Psyfighter 13b or something bigger over OpenHermes, the 7Bs are a step behind.


As you can see, Small ai isn't perfect but a few years ago this type of query against a computer was basically impossible. The experience this software provides will improve as the models and technology available evolve further.

We've established that LLMs are not calculators. They work by predicting what the next word should be, for every word. 
Temperature changes the selection probability of each word. All the likely choices are scaled, temperature below 1 makes unlikey words less likely, temperature above 1 makes unlikely words more likely. 2 is max. 

in addition to temperature for controlling the output, we also have other values. I've included the defaults for this applicatoin.

  min_p: 0.1,//0.1: discard possible tokens less than 10% as probable as the most likely possible token.  If top token is 10% likely, tokens less than 1% are discarded.
  I saw a post about how this works and I'm sold, I reccomend starting here. 1 should be deterministic, with more possible tokens as you approach zero.
  
  top_a: 0,//With Top A if the most likely token has a high probability, less tokens will be kept. If the maximum probability is very close to the other probabilities, more tokens will be kept. Lowering the top-a value also makes it so that more tokens will be kept.
  
  top_k: 0,//discard all but top_k possible tokens. top_k: 3 means each next token comes from a max of 3 possible tokens. I've seen a lot of 40 floating around.
  
  top_p: 1.0,//discard possible tokens by throwing out lest likely answers. 0.8 throws away least likeky 20%
  
  tfs: 0.97,//tail free sampling, removes unlikely tokens from possibilities by finding the platau where tokens are equally unlikely. 0.99 maximum. Higher value finds a lower, flatter plateau. Note:some reports say tfs may cause improper gendering or mixups in responses, he instead of she, his/hers, etc. 1 thread reporting.
  don't mess with that one too much, though you could go as low as 0.9 without significantly changing the output.

  there is also mirostat_modes 1 and 2. Reccomend 0 or 2. Mirostat uses previous context to tune against perplexity somehow. I don't understand it so I can't reccomend it, but I've tried it out and it seems to work fine. 
  Mirostat turns off select other settings, and does use temperature.


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

|||Tell me about the funciton of the liver and what activities damage it.

|||coder|write fizzbuzz with comments on each line. Explain how fizzbuzz is used to judge candidates in interviews

|||agi| walk me though setting up a react website including components for the navigation header, footer, and a window for the main content. 
`;
        this.write = true;
        this.sendHold = true;
        this.noBatch = true;

        //this.nicereturn = true;
        outp.text = identity;
        outp.found = true;
        outp.set = true;
        //return identity;
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
            this.appSettings.agentSplit +
            "write" +
            this.appSettings.endTag +
            "\n";
        }
        outp.text = list;
        outp.found = true;
        outp.set = true;
        break;
      case "rf":
        outp.text = this.recentClip.text; //send lastclip like any other agent prompt.
        outp.found = false;
        outp.set = true;
        break;
      case "re":
        this.sendLast = true;
        outp.found = false;
        break;
      case "on":
        this.on = !this.on;
        break;
      case "no":
        this.sendHold = true
        break

      case "tokens":
      case "tok":
        this.write = true;
        this.sendHold = true;

        outp.text = this.getTokens(this.currentText);//nah fam, this will be async and need a callback to send to clipboard
        outp.found = true;//save a couple operations adding an agent 
        //console.log(outp.text);
        break;
      case "set":
      case "setDefault":
        if (!this.set) {
          this.set = true;
          this.setAgent = this.identity;
        } else {
          this.set = false;
        }
        break;
      case "e":
      case "empty":
        outp.text = "";
        outp.found = true;
        outp.set = true;
        break;
      case "c":
      case "chat":
      case "useHistory":
        this.chatHistory = true;
        /* 
        
        */
        break;
      case "sc":
      case "silentChat":
      case "silentContinue":
      case "ghostChat":
        this.chatHistory = true;
        this.noChatLogging = true;
        break;
      case "clearHistory":
      case "ch":
      case "cc":
      case "clearC":
      case "clearChat":
        this.debugLog = this.ChatLog;
        this.ChatLog = "";
        this.sendHold= true;
        break;
      case "c":
      case "c":
        this.ChatLog = "";
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
      case "cleard":
      case "clearDebug":
        this.debugLog = "";
        break;
      case "agi":
      case "default":
      case "defaultOpenerResolved":
        this.noBatch = true;//agi always writes |||, clip often writes |||help|. it's confusing. 
        break;
      case "dateTime":
        outp.text = new Date();
        console.log(outp.text);
        outp.found = true;
        outp.set = true;
        break;
        
      default:
        break;
    }
    return outp;
  }
  updatePreviousCopy(copy) {
    this.recentClip.text = copy;
  }
  checkEndpoints(identity) {
    //check if keys in this.endpoints match identity
    const endpointKeys = this.getObjectKeys(this.endpoints.endpoints);
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
    // instruct.bos +
    // instruct.startTurn +
    // instruct.startSystem+
    // instruct.systemRole +
    // instruct.endSystemRole +
    // instruct.prependPrompt +
    // instruct.systemAfterPrepend + 
    // outIdentity +
    // instruct.postPrompt +
    // instruct.memorySystem +
    // instruct.endSystemTurn +
    // instruct.endTurn +
    // instruct.startTurn +
    // instruct.startUser +
    // instruct.userRole +
    // instruct.endUserRole +
    // instruct.memoryUser +
    // formattedQuery +
    // instruct.endUserTurn +
    // instruct.endTurn +
    // instruct.startTurn +
    // instruct.startAssistant +
    // instruct.assistantRole +
    // instruct.endAssistantRole +
    // instruct.responseStart;
    switch (command.toLowerCase()) {
      case "bos":
        this.inferenceClient.setOnePromptFormat ("bos", formattedQuery);
        break;
      case "startturn":
      case "startall":
        this.inferenceClient.setOnePromptFormat ("startTurn", formattedQuery);
        break;
      case "endturn":
      case "end":
      case "eos":
      case "aeos":
      case "endall":
        this.inferenceClient.setOnePromptFormat ("endTurn", formattedQuery);
        break;
      case "startsystem":
      case "systemtoken":
        this.inferenceClient.setOnePromptFormat ("startSystem", formattedQuery);
        break;
      case "system":
      case "systemrole":
      case "systemname":
      case "sysname":
        this.inferenceClient.setOnePromptFormat ("systemRole", formattedQuery);
        break;
      case "endsystemrole":
      case "endsystem":
      case "endsys":
      case "seor":
        this.inferenceClient.setOnePromptFormat ("endSystemRole", formattedQuery);
        break;
      case "prepend":
      case "prependprompt":     
        this.inferenceClient.setOnePromptFormat ("prependPrompt", formattedQuery);
        break;
      case "systemafterprepend":
      case "systemafter":
      case "system2":
        this.inferenceClient.setOnePromptFormat ("systemAfterPrepend", formattedQuery);
        break;
      case "post":
      case "postprompt":      
        this.inferenceClient.setOnePromptFormat ("postPrompt", formattedQuery);
        break;
      case "systemmemory":
      case "memorysystem":
        this.inferenceClient.setOnePromptFormat ("memorySystem", formattedQuery);
        break;
      case "endsystem":
      case "endsystemturn":
      case "seos":
        this.inferenceClient.setOnePromptFormat ("endSystemTurn", formattedQuery);
        break;
      case "userrole":
      case "user":
      case "username":
      case "name":
        this.inferenceClient.setOnePromptFormat ("userRole", formattedQuery);
        break;
      case "enduserrole":
      case "endusername":
      case "ueor":
        this.inferenceClient.setOnePromptFormat ("endUserRole", formattedQuery);
        break;
      case "memoryUser": 
      case "usermemory":
        this.inferenceClient.setOnePromptFormat ("memoryUser", formattedQuery);
        break;
      case "enduserturn":
      case "enduser":
      case "ueos":
        this.inferenceClient.setOnePromptFormat ("endUserTurn", formattedQuery);
        break;
      case "assistantrole":
      case "assistant":
      case "assistantname":
      case "char":
        this.inferenceClient.setOnePromptFormat ("assistantRole", formattedQuery);
        break;
      case "endassistantrole":
      case "endassistant":
      case "aeor":
        this.inferenceClient.setOnePromptFormat ("endAssistantRole", formattedQuery);
        break;
      case "start":
      case "responsestart":
      case "response":

        // this.instructions.responseStart = formattedQuery;
        this.inferenceClient.setOnePromptFormat ("responseStart", formattedQuery);
        break;
      case "special":
      case "specialInstructions":
        this.inferenceClient.setOnePromptFormat ("specialInstructions", formattedQuery);
        break;
      default:
       let notfound = "invalid prompt key: " + command + " Options: systemDefault, systemRole, prepend, postPrompt, systemAfterPost, memorySystem, memoryUser, endSystemTurn, startTurn, userRole, memoryUser, endUserTurn, assistantRole, endTurn, responseStart \n \n you may edit and copy below: \n";
        this.notify("invalid key: " + command ," Options: systemDefault, systemRole, prepend, postPrompt, systemAfterPost, memorySystem, memoryUser, endSystemTurn, startTurn, userRole, memoryUser, endUserTurn, assistantRole, endTurn, responseStart");
        // let settings = {
          
        //   system: this.inferenceClient.instruct.system + "\n",
        //   prependPrompt: this.inferenceClient.instruct.prependPrompt + "\n",
        //   postPrompt: this.inferenceClient.instruct.postPrompt + "\n",
        //   memorySystem: this.inferenceClient.instruct.memorySystem + "\n",
        //   memoryUser: this.inferenceClient.instruct.memoryUser + "\n",
        //   finalprompt: this.inferenceClient.instruct.finalprompt + "\n",
        //   responseStart: this.inferenceClient.instruct.responseStart
        // }
        this.identity.settings = notfound;
        this.writeSettings = true
        break;
    }
  }
  setInferenceFormat(setting) {
    setting = setting.trim();
    let names = [];
    //console.log(JSON.stringify(this.formats));
    let set = {};
    try {
      set = this.formats[setting];
      //console.log("\nset: " +JSON.stringify(set));
    } catch (error) {
      for (let key in this.formats) {
        names.push(key);
      }
      console.log( setting + " : format not found, options: " + JSON.stringify(names) );
    }
    this.inferenceClient.setPromptFormat(set);
  }
  personaAtor(persona, sorted, ifDefault){
  persona.forEach(tag => {
    tag = tag.trim();
    let commands = tag.split(this.appSettings.settinglimit);
    console.log(commands);
    if (commands.length === 2) {
      commands[0] = commands[0].trim();
      commands[1] = commands[1].trim();
      if (commands[1] == this.appSettings.save && this.sendLast) {
        //save like |||agent:save|
        this.identities[commands[0]] = this.recentClip; 
        tag = commands[0];
      } else if (commands[1] == this.appSettings.save) {
        //save like |||agent:save|
        this.sendHold = true;
        this.identities[commands[0]] = sorted.formattedQuery; 
        tag = commands[0];
      } else if (commands[1] == this.appSettings.delete) {
        //save like |||agent:delete|
        this.sendHold = true;
        delete this.identities[commands[0]];
        tag = commands[0];
      } else if (commands[1] == this.appSettings.saveAgentToFile) {
        //save like |||agent:file|
        this.sendHold = true;
        let setting  ={[commands[0]]:this.identities[commands[0]]}
        //console.log(JSON.stringify(setting));
        this.settingSaver(setting, "0identities.json", this.notify, this.fs) //todo: fix this magic string.
        tag = commands[0];
      } else if (commands[0] == this.appSettings.setPromptFormat && this.appSettings.save == commands[1]) {
        this.sendHold = true;
        this.pickupFormat(sorted.formattedQuery);
      }  else if (commands[0] == this.appSettings.setInstruction) {
        this.sendHold = true;
        this.setPrompt(commands[1],sorted.formattedQuery);
      }else if (!isNaN(commands[1])) {
        this.params[commands[0]] = parseFloat(commands[1]);
        //console.log(commands[0] + commands[1] +" written> " + this.params[commands[0]]);//ill keep this one for now
      } else if (commands[1] == this.appSettings.true) {
        this.params[commands[0]] = true;
      } else if (commands[1] == this.appSettings.false) {
        this.params[commands[0]] = false;
      }
      else {
        this.params[commands[0]] = commands[1];
      }
    } else {
      //if 
      if (!isNaN(tag)) {
        //if params contains a key called max_length
        if (this.params.max_length) {
          this.params.max_length = parseInt(tag);//todo: eliminate magic keys like max_length to fully support any completion backend.
        }
        // if params has a key called max_tokens
        else if (this.params.max_tokens) {
          this.params.max_tokens = parseInt(tag);
        }
        else{
          console.log("no matching max_length or max_tokens in params: " +JSON.stringify(this.params));
        }
      } else if (tag === this.appSettings.setPromptFormat) {
        this.sendHold = true;
        this.setInferenceFormat(sorted.formattedQuery);
      } else {
        const ident = this.updateIdentity(tag);
      if (ifDefault) {
        ifDefault = !ident.agent;//comes out true set false
      }
      if (ident.set) {
        this.identity[tag] = ident.text;
      }
    }
  }
  });
  return ifDefault;
} 
  pickupFormat(setting) {
    console.log("hit pickup format: " + setting);
    try {
      let parsed = JSON.parse(setting);   //this will for sure mess up, probably don't count on this functionality until I manually build a parse for this. 
      console.log(JSON.stringify(parsed));
      this.inferenceClient.setPromptFormat(parsed);   
    } catch (error) {
      this.notify("invalid format: ", error);
      console.log("invalid format: " +JSON.stringify(error));
    }

  }
  continueText(text){
    
    const splitText = text.split(this.appSettings.continueTag);
    // console.log("Lenght: "+ splitText.length + " : " +  JSON.stringify(splitText));
    if (splitText.length === 1){
      return splitText[0];
    } else if ( splitText.length === 2){
      this.setPrompt("start", splitText[1]);
      return splitText[0];
    } else if (splitText.length === 3){
      this.setPrompt("start", splitText[1]);
      return splitText[0] + splitText[2]; 
    } else if (splitText.length >= 3){
      return text;
    }
    return text;

  }
  continueSetText(text){
    const splitText = text.split(this.appSettings.continueTag);
    // console.log("Lenght: "+ splitText.length + " : " +  JSON.stringify(splitText));
    if (splitText.length === 1){
      return splitText[0];
    } else if ( splitText.length === 2){
      //this.setPrompt("start", splitText[1]);
      return splitText[0];
    } else if (splitText.length === 3){
      //this.setPrompt("start", splitText[1]);
      return splitText[0] + splitText[2]; 
    } else if (splitText.length >= 3){
      return text;
    }
    return text;
  }
  getBatchLimiter(type){
    
    if (type === "user"){
      type = "User";
    }
    if (type === "assistant") {
      type = "Assistant"
    }
    let typeStepBack = {
      Assistant: "User",
      User:"Assistant",
    }
    //console.log(this.inferenceClient.instructSet.endTurn + this.inferenceClient.instructSet["end"+typeStepBack[type]+"Turn"] + this.inferenceClient.instructSet.startTurn + this.inferenceClient.instructSet["start"+type ] + this.inferenceClient.instructSet[type.toLowerCase()+"Role"] + this.inferenceClient.instructSet["end"+type+"Role"]);
    return this.inferenceClient.instructSet.endTurn + this.inferenceClient.instructSet["end"+typeStepBack[type]+"Turn"] + this.inferenceClient.instructSet.startTurn + this.inferenceClient.instructSet["start"+type ] + this.inferenceClient.instructSet[type.toLowerCase() +"Role"] + this.inferenceClient.instructSet["end"+type+"Role"]+ this.inferenceClient.instructSet.endRole;
  }
  getBatchLimiterName(type,name){
    if (type === "user"){
      type = "User";
    }
    if (type === "assistant") {
      type = "Assistant"
    }
    let typeStepBack = {
      Assistant: "User",
      User:"Assistant",
    }

    return this.inferenceClient.instructSet.endTurn + this.inferenceClient.instructSet["end"+typeStepBack[type]+"Turn"] + this.inferenceClient.instructSet.startTurn + this.inferenceClient.instructSet["start"+type ] + name + this.inferenceClient.instructSet["end"+type+"Role"] + this.inferenceClient.instructSet.endRole +this.inferenceClient.instructSet.roleGap;
  }
  chatBuilder(text){
    if (this.chatHistory && text != "" && !this.noChatLogging ){
      if (this.appSettings.batchLimiter === "") {
          if (this.batchAssistantLimiter != "") {
            this.ChatLog += this.batchAssistantLimiter + text;

          }else {
            this.ChatLog += this.getBatchLimiter("Assistant") + text;
          }
        
      } else {
        this.ChatLog += this.appSettings.batchLimiter + text;
      }
    }
    this.chatHistory = false;
    this.noChatLogging = false;

  }
  isKeyName(string) {
    let regex = /^[a-zA-Z0-9_-]+$/;
    if (regex.test(string)) {
        return true;
    } else {
        return false;
    }
}
  commandHandle(tags){//todo: fix this.
    
    console.log(tags);
    if (tags.command != undefined && tags.command != '' && tags.command != "") {
      let splitCommand = tags.command.split(this.appSettings.quickPromptLimit);
      if (splitCommand.length = 1) {
        return 0;
      } else if (splitCommand.length = 2){
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
          return splitCommand.slice(1).join(this.appSettings.quickPromptLimit)
        } else {
          return 0;
        }
      }
    }
  }
  setupforAi(text) {
    //console.log(this.batchDocument); 
    if (this.endpoints.duplicateCheck) {
      if (this.duplicateCheck == text){
        this.sendHold = true;
        this.preserveLastCopy = true;
      }
      this.duplicateCheck = text;
    }
    if (this.batchLength > 0) {
      this.blockPresort = false;
      this.noBatch = false;
      this.batchProcessor();      
      text = this.appSettings.invoke + this.batch + this.appSettings.endTag + text;      
    }
    else {
      this.noBatch = true;
      //this.debugLog = this.ChatLog;
    }
    if (this.blockPresort) {
      this.blockPresort = false;
      return
    }
    
    this.chatBuilder(this.recentClip.text);
    const sorted = this.activatePresort(text);
    let ifDefault = true;
    if (sorted) {
      this.text = this.continueSetText(sorted.formattedQuery);
      this.undress();
      // console.log(sorted.tags.command);
      // sorted.tags.command = sorted.tags.command.slice(this.commandHandle(sorted.tags));
      // console.log(sorted.tags.command);
      if(this.set){
        this.identity = this.setAgent;
        ifDefault = false;
        if ( sorted.tags.command != undefined && sorted.tags.command != "" ) {
          this.identity[this.appSettings.rootname] = sorted.tags.command;          
        }
      } else{
        if (sorted.tags.command != undefined && sorted.tags.command != "") {
          this.identity[this.appSettings.rootname] = sorted.tags.command;//send ||||this text over if it exists|
        }
      }
      if (sorted.tags.persona) {
        let persona = sorted.tags.persona.split(this.appSettings.agentSplit);
        //console.log("persona tags: " + JSON.stringify(persona));
        //console.log("persona count: " + sorted.tags.length);
        ifDefault = this.personaAtor(persona, sorted);
        //console.log("identset: " + JSON.stringify(this.identity));
      }
      sorted.formattedQuery = this.continueText(sorted.formattedQuery);
      if (sorted.run || this.on) {
        //const defaultIdentity = { [this.instructions.rootname]: "" };
        //console.log(ifDefault);
        if (ifDefault && !this.set) {
          //console.log("hit default");
          this.identity.CaptainClip = this.identities[this.appSettings.defaultPersona];
          this.noBatch = true;
        }
        if (this.identity[this.appSettings.rootname] === "" && this.appSettings.clean){
          delete this.identity[this.appSettings.rootname];
        }
        //if this.identity contains a key called "e" remove it.
        if(this.identity.hasOwnProperty(this.appSettings.emptyquick)) {
          delete this.identity[this.appSettings.emptyquick];
        }
        if (this.identity.hasOwnProperty(this.appSettings.empty)) {
          delete this.identity[this.appSettings.empty];
        }
        if (this.chatHistory) {
          if(this.ChatLog != ""){
            this.identity[this.appSettings.historyName] = this.ChatLog; 
          }
        }
        if (this.sendLast) {
          this.sendLast = false;
          sorted.formattedQuery = sorted.formattedQuery + "\n" + this.recentClip.text;
        }
        if (this.write) {
          this.write = false;
          this.noBatch = true;
          this.blockPresort = true;
          delete this.identity[this.appSettings.rootname];
          let sendtoclipoardtext =
          this.appSettings.writeSave + "\n" +
          JSON.stringify(this.identity) +
          this.appSettings.writeSplit +
          sorted.formattedQuery; 
          sendtoclipoardtext = sendtoclipoardtext.replace(/\\n/g, "\n");
          this.notify("Paste Ready:", sendtoclipoardtext.slice(0, 150));
          this.recentClip.text = sendtoclipoardtext
          return this.sendToClipboard(sendtoclipoardtext);
        }
        if (this.writeSettings) {
          this.writeSettings = false;
          this.noBatch = true;
          this.blockPresort = true;
          let sendtoclipoardtext =
          this.appSettings.writeSettings + "\n" +
          JSON.stringify(this.identity.settings) +//this is set up for PROMPT edit failures
          this.appSettings.writeSplit +
          sorted.formattedQuery; 
          //sendtoclipoardtext = sendtoclipoardtext.replace(/\\n/g, "\n");
          this.notify("Paste Response:", sendtoclipoardtext.slice(0, 150));
          this.recentClip.text = sendtoclipoardtext
          return this.sendToClipboard(sendtoclipoardtext);
        }
        if (!this.sendHold) {
          //set params for outgoing
          //console.log("params: " + JSON.stringify(this.params));
          // let outParams = this.params;
          // if (this.api.config && this.apiConfigSet !== this.api.config) {
            //   outParams = this.apiParams[this.api.config];
            //   //todo: build whole engine to transport settings across multiple apis
            // }
            // console.log("outParams: " + JSON.stringify(outParams));
            console.log(sorted);            
            this.inferenceClient.send(this.identity, sorted.formattedQuery, this.params, this.api);
          } else {
            this.sendHold = false;
          }
        }
      } 
      if (this.chatHistory && !this.noChatLogging) {
        if(this.batchUserLimiter != ""){
          this.ChatLog += this.batchUserLimiter + this.text
          this.batchUserLimiter = "";
        } else{
        this.ChatLog += this.getBatchLimiter("user") + this.text;
        }
      }
      if (!this.preserveLastCopy) {
        this.recentClip.text = this.text;// + " ";    
      }
      this.preserveLastCopy = false;
      this.setPrompt("responsestart","");//clear assistant response start.
    }
    activatePresort(text) {
      
      let run = false;
      text = text.trim();
      var response = [];
      const parsedData = text.split(this.appSettings.invoke);
      let tags = "";
      if (parsedData.length > 3) {//todo: fix this so it works better
        this.notify(
          "Not Sent:",
          "too many " + this.appSettings.invoke + ". max 2."
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
        //console.log("parse delimiter: " + JSON.stringify(parsedData));
        let longtrue = text.length > parsedData[0].length;
        if (!longtrue){
          this.copyResponse = text;
        }
        if (longtrue && parsedData.length === 1) {
          tags = this.tagExtractor(parsedData[0]);
          response.push(tags.text);
          response.push("");
          response.push("");
          
          run = true;
        }
        if (parsedData.length === 2) {
          tags = this.tagExtractor(parsedData[1]);
          response.push(tags.text);
          response.push(parsedData[0]);
          response.push("");
          run = true;
        }
        if (parsedData[0].length === 3) {
          tags = this.tagExtractor(parsedData[1]);
          response.push(tags.text);
          response.push(parsedData[0]);
          response.push(parsedData[2]);
          run = true;
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
          const cutTags = tags.slice(2)
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
    }
    module.exports = TextEngine;
    