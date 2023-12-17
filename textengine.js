class TextEngine {
  constructor(
    sendToApi,
    sendToClipboard,
    recieveApi,
    notify,
    getSummary,
    getTokens,
    openAiConfig,
    identities ,
    instructions ,
    apiParams,
    openAikey
  ) {
    //todo settings
    this.identities = identities;
    this.sendToApi = sendToApi;
    this.sendToClipboard = sendToClipboard;
    this.recieveApi = recieveApi;
    this.getTokens = getTokens;
    this.openAiConfig = openAiConfig;
    this.openAikey = openAikey;
    this.instructions = instructions;
    this.notify = notify;
    this.getSummary = getSummary;
    this.params = apiParams;
    this.identity = {};
    this.recentClip = { text: "" };
    this.sentToClip = ""
    this.set = false;
    this.setAgent = {};
    this.memory = "";
    this.summary = "";
    this.memengines = {};
    //this.lastAgentTags = [];
    this.sendHold = false;
    this.write = false;
    this.rp = false;
    this.sendLast = false;
    this.on = false;
    this.openAi = false;
    this.compatible = false;
  }
  //|||re|  to get first and last charachter of string identity
  returnTrip(str) {
    if (typeof str !== "string") return "Error: Input must be a string";
    //if (str.length < 2) return "Error: String too short";
    return [str[0], str[1]]
  }

  updateIdentity(identity) {
    //console.log("identity start:"+identity);
    let tripcode = this.returnTrip(identity);
    let found = false;
    let setIdent = {};
    let memlevel = 0;
    let setAgent = false;

    if (identity !== "" && identity !== null && identity !== undefined) {
      //identity = identity.trim();
      if (identity) {
        if (Number.isNaN(Number(identity))) {
          //for memory, pending... Do I need memory? Does it really help the purpose? It's marginally useful in a case where someone wants a proper chat but the text box works well enough extending like just user: further queries against context. Its like 90% hooked up though, just forget token tracking and pound it out, but I'll never use it, do we need another 7 inches on the readme for more features that like 1 person will use all the time?
          if (tripcode[0] === this.instructions.backendSwitch){
            if(tripcode[1] === this.instructions.backendSwitch){
              console.log("activate OpenAi");
              identity = identity.slice(2);
              memlevel = 2;
                //identity = identity.slice(1);
              } else {
                console.log("activate lmStudio");
                identity = identity.slice(1);
                memlevel = 1;
            }
          }
                if (memlevel === 1) {//set longterm or w/e true
                  //co opted fot openAi and LMStudio
                  this.compatible = !this.compatible;//invert to swap with kobold if default changed or # set

               } else if( memlevel === 2){//set both true
                this.openAi = !this.openAi; //invert to duck out when set

              }
          }

          if (this.identities.hasOwnProperty(identity)) {
            setIdent[identity] = this.identities[identity];
            found = true;
            setAgent = true;
          } else {
            found = false;
            const flags = this.funFlags(identity); //flags not coming out?
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
  

  // dress(identity){
  //   this.identity = ``
  // }
  // costumeStore(tag, text){
  //   this.identities[tag]= text;
  // }///make the if statement implement the costumeStore function. Currently they have equal functinality after the if check.
  // remember(tag, text) {
  //   thisidentity
  // }
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
        var intro = `delete the extra on this line before saving or sharing agents printed with write.
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
  
    Occasionally the last copy is the same as what you're copying again. To clear momentary troubles copy text with no invoke to clear the system.

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

  |||re,frank|this text is invisible to :save| //also, :save in there may have unpredictable results...
  
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

  there is also mirostat_modes 1 and 2. Reccomend 2. Mirostat uses previous context to tune against perplexity somehow. I don't understand it so I can't reccomend it, but I've tried it out and it seems to work fine. 
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
        var list = "";
        for (let key in this.identities) {
          list =
            list +
            this.instructions.invoke +
            key +
            this.instructions.agentSplit +
            "write" +
            this.instructions.endTag +
            "\n";
        }
        outp.text = list;
        outp.found = true;
        outp.set = true;
        break;
      case "rp":
        this.rp = true;
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
      case "tokens":
      case "tok":
        this.write = true;
        this.sendHold = true;

        outp.text = this.getTokens(this.currentText);//nah fam, this will be async and need a callback to send to clipboard
        outp.found = true;//save a couple operations adding an agent 
        console.log(outp.text);
        break;
      case "set":
        if (!this.set) {
          this.set = true;
          this.setAgent = this.identity;
        } else {
          this.set = false;
        }
        break;
        case "e":
          outp.text = "";
          outp.found = true;
          outp.set = true;
      default:
        break;
    }
    return outp;
  }
  updatePreviousCopy(copy) {
    this.recentClip.text = copy;
  }
  setupforAi(text) {
    if (text === this.sentToClip) {
         //
      return;
    }
    if (this.instructions.defaultClient != "kobold") {
      switch (this.instructions.defaultClient) {
        case "openAi":
          this.openAi = true;    
          break;
        case "compatible":
          this.compatible = true;
          break;
        default:
          console.log(" improper client setting, defaulting to kobold : "+ this.instructions.defaultClient);
          break;
      }
    }
    const sorted = this.activatePresort(text);
    let ifDefault = true;
    if (sorted) {
      this.undress();
      this.identity[this.instructions.rootname] = sorted.tags.command;
      if(this.set){
        this.identity = this.setAgent;
        if (sorted.tags.command != "") {
          this.identity[this.instructions.rootname] = sorted.tags.command;          
          ifDefault = false;
        }
      }
      if (sorted.tags.persona) {
        let persona = sorted.tags.persona.split(this.instructions.agentSplit);
        //console.log("persona tags: " + JSON.stringify(persona));
        //console.log("persona count: " + sorted.tags.length);
        let temPersona = {};
        persona.forEach(tag => {
          tag = tag.trim();
          let commands = tag.split(this.instructions.settinglimit);
          if (commands.length === 2) {
            if (commands[1] == this.instructions.save && this.sendLast) {
              //save like |||agent:save|
              this.identities[commands[0]] = this.recentClip; //
              tag = commands[0];
            } else if (commands[1] == this.instructions.save) {
              //save like |||agent:save|
              this.identities[commands[0]] = sorted.formattedQuery; //
              tag = commands[0];
            } else if (commands[1] == this.instructions.delete) {
              //save like |||agent:delete|
              delete this.identities[commands[0]]; //
              tag = commands[0];
            }else if (!isNaN(commands[1])) {
              this.params[commands[0]] = parseFloat(commands[1]);
              //console.log(commands[0] + commands[1] +" written> " + this.params[commands[0]]);//ill keep this one for now
            } else if (commands[1] == "true") {
              this.params[commands[0]] = true;
            } else if (commands[1] == "false") {
              this.params[commands[0]] = false;
            }
            else {
              this.params[commands[0]] = commands[1];
            }
          } else {
            if (!isNaN(tag)) {
              this.params.max_length = parseInt(commands[0]);
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
        //console.log("identset: " + JSON.stringify(this.identity));
      }
      if (sorted.run || this.on) {
        //const defaultIdentity = { [this.instructions.rootname]: "" };
        console.log(ifDefault);
        if (ifDefault) {
          //console.log("hit default");
          this.identity.CaptainClip = this.identities[this.instructions.defaultPersona];
        }
        //response.memory = this.memory;

        let request =
          this.instructions.system +
          this.instructions.prependPrompt +
          //this.identity +
          JSON.stringify(this.identity) +
          this.instructions.postPrompt +
          this.instructions.memoryStart +
          //this.memory +
          //JSON.stringify(this.memory) +//may be one undefined
          this.instructions.memoryPost +
          sorted.formattedQuery;
        //this.instructions.chatStart+
        //this.instructions.finalprompt goes on as it leaves this function, with lastclip and rp if needed.

        if (this.write) {
          this.write = false;
          delete this.identity[this.instructions.rootname];
          let sendtoclipoardtext =
            this.instructions.writeSave + "\n" +
            JSON.stringify(this.identity) +
            this.instructions.writeSplit +
            sorted.formattedQuery; //todo send the right thing to the clipboard
          sendtoclipoardtext = sendtoclipoardtext.replace(/\\n/g, "\n");
          this.notify("Paste Response:", sendtoclipoardtext.slice(0, 140));
          this.sentToClip = sendtoclipoardtext
          return this.sendToClipboard(sendtoclipoardtext);
        }
        if (!this.sendHold) {
          if (this.openAi || this.identity.hasOwnProperty(this.instructions.openAi)) {
            if (!this.set) {
              this.openAi = false;
            }
            if (this.sendLast) {
              generateCompletion(this.openAikey.key, this.identity, sorted.formattedQuery + this.recentClip.text , this.params, this.recieveApi, this.openAiConfig.url, this.params.model, this.notify)              
            } else {
              generateCompletion(this.openAikey.key, this.identity, sorted.formattedQuery, this.params, this.recieveApi, this.openAiConfig.url, this.params.model, this.notify) 
            }          
          } else if(this.compatible || this.identity.hasOwnProperty(this.instructions.lmStudio)){
            if (!this.set) {
              this.compatible = false;
            }
            if (this.sendLast) {
              generateCompletion(this.openAikey.key, this.identity, sorted.formattedQuery + this.recentClip.text , this.params, this.recieveApi, this.openAiConfig.compatible, this.params.model, this.notify) 
            } else {
              generateCompletion(this.openAikey.key, this.identity, sorted.formattedQuery, this.params, this.recieveApi, this.openAiConfig.compatible, this.params.model, this.notify) 
            }
          } else if (this.rp) {
            if (this.sendLast) {
              this.sendLast = false;
              this.sendToApi(
                request +
                  this.recentClip.text +
                  this.instructions.rpPrompt +
                  this.instructions.finalPrompt,
                this.params
              );
              this.rp = false;
              //this.sendLast = false;
            } else {
              this.sendToApi(
                request + this.instructions.finalPrompt,
                this.params
              );
              //this.sendLast = false;
            }
            //return;
          } else if (this.sendLast) {
            this.sendToApi(
              request + this.recentClip.text + this.instructions.finalPrompt,
              this.params
            );
            this.sendLast = false;
          } else {
            this.sendToApi(
              request + this.instructions.finalPrompt,
              this.params
            );
          }
        } else {
          this.sendHold = false;
        }
      }
    }
    if (this.sendLast === true) {
      this.recentClip.text = text; // + "\n" + this.recentClip.text);//todo: determine if this is dumb or not. Consider letting this run evey time and re toggles to allow building a big context to send with a question.
      this.sendlast = false;
    } else {
      this.recentClip.text = text;
    }
  }
  recievesummary(summary) {
    this.summary = summary;
  }
  activatePresort(text) {
    let run = false;
    text = text.trim();
    var response = [];
    const parsedData = text.split(this.instructions.invoke);
    let tags = "";
    if (parsedData.length > 3) {
      this.notify(
        "Warning:",
        "too many " + this.instructions.invoke + ". max 2."
      );
      this.sendHold = true;
      //this.write = true;
      return {
        run: run,
        formattedQuery:
          "The user sent too many invoke tokens to the interface, |||query, |||identity|query,  context ||| query, context|||query|||context are the supported modes. ",
        tags: tags
      };
    }
    //console.log("parse delimiter: " + JSON.stringify(parsedData));
    let longtrue = text.length > parsedData[0].length;
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
    const sendout = response[0] + "\n" + response[1] + "\n" + response[2];
    return {
      run: run,
      formattedQuery: sendout,
      tags: tags
    };
  }
  tagExtractor(text) {
    const tags = text.split(this.instructions.endTag);
    var output = {};
    if (tags.length === 1) {
      output = { persona: "", command: "", text: text };
    } else if (tags.length === 2) {
      output = { persona: tags[0], command: "", text: tags[tags.length - 1] };
    } else if (tags.length === 3) {
      output = {
        persona: tags[0],
        command: tags[1],
        text: tags[tags.length - 1]
      };
    }
    return output;
  }
}
async function generateCompletion(apiKey, identity, formattedQuery,params, callback, apiUrl, model = 'text-davinci-003', notify) {
  try {
    const url = apiUrl;
    //console.log(apiKey, identity, formattedQuery, params, apiUrl, model);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
    const stringifidentity = JSON.stringify(identity);
    const prompt = {
      "model": model,
      "messages": [
        { "role": "system", "content": stringifidentity},//stringify the message?
        { "role": "user", "content": formattedQuery }//I should build my memory structure and force chats with openai through that? that would handle the instruction promps for multimodel support. Consider ## for memory clearing rather than extra modes. Currently supports initial needs for assigning an agent to gpt with ##
      ],
      "temperature": params.temperature,
      "max_tokens": params.max_length,
      "stream": false
    }
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(prompt)
    });
    const jsonResponse = await response.json();
    //console.log("response: "+JSON.stringify(jsonResponse));
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${jsonResponse.error.message}`);
    }
    //console.log("2nd end response: "+JSON.stringify( jsonResponse.choices[0].message.content));
    callback(jsonResponse.choices[0].message.content);
  } catch (error) {
    console.log("error : " +JSON.stringify( error));
    notify("error:", JSON.stringify(error));
  }
}

module.exports = TextEngine;
