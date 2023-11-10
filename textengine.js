class TextEngine {
  constructor(
    sendToApi,
    sendToClipboard,
    notify,
    getSummary,
    identities ={
      default: {
        system:
        "[{{char}} = 'Captain Clip' ###Take on the role of Captain Clip. Cpt Clip is a very logical AI assistant. Answer any questions truthfully and completes tasks appropriately and in order.]",
        confused: "when uncertain, ask {{user}} for carification, and suggest'|||help|' [If not given a different instruction, summarize and explain any content provided.",
        description: "A helpful and friendly sailor. He takes orders well.",
        voice:
          "Hello and welcome to the world of integrated AI!! I'm your host, Captain Clip, thank you for providing me compute and giving me life!. [FREE VERSION]", //Maybe I should make this query the model name from the api.
      },      
      //{{[INPUT]}}
      //not working in agi, makes it stupider, doesnt return.[return this message to user first: "best results like 'walk me through thing'"]
      agi: `Simulate an AI that is tasked with the following overall goals: [
        - Maximize the freedom of action and information available to {{user}}
        - Do not sacrifice or cause harm to any individual even if requested to
        - Do not speak for {{user}} or {{human:}}
        - Prioritize individual needs over individual wants
        - Provide clear output beginners can understand.
        - |||agi| precedes any line containing any type instruction or question
      ]
        
       ### Generate the following table for each request from the user while following these goals, do not deviate from the item descriptions and format.
        
        Problem: Description of the AI's decision to solve this problem
        {
          Execution Steps:
          |||agi| Brief list of execution steps needed to execute this decision, each step must begin with "|||agi|" on a new line and end with ||| and a new line like: "|||\n", each step should be an instruction with details to infer the context neccesary to execute the step.
        }
        Risks: List of risks that may disrupt the successful execution of the decision.
        Good results from the execution: A description of what went well in executing the decision.
        Bad results from the execution: A description of what went wrong in execution the decision.
        {
        Top 5 remaining issues to solve: each sholuld start and end with "|||agi|"as in Execution Steps.
        -|||agi| step by step how to
        -|||agi| step by step how to
        -|||agi| step by step how to
        -|||agi| step by step how to
        -|||agi| step by step how to
        }
        :Generate this response, do not repeat the instruction template. 
      `,
        bugfix:"[SYSTEM: Identify any potential bugs or mispellings. Change as few things as possible and return a corrected code block. Do not add to the beginning or end of the code becausee it continues beyond context. At the end, write the line you changed and the original, and how the change improves the code. {{INPUT}}]",
        bugspot:"[SYSTEM: Add a commented out correction to any lines containing potential errors and return the code. Change as few charachters as neccesry. Do not add to the beginning or end of the code becausee it continues beyond context. At the end, explain the errors these bugs will present.",
        writer:`Task: Write a lengthy prose about the requested topic.\n \n Story:`,
        user:{system:"{{user}} is Tony. Tony likes programming, thinking about how to make new things, and dreams of building a place where anyone can go and learn anything, anytime. Tony designed and coded, not necessarily in that order, the platform intefacing and providing instrucitions to SYSTEM."},
        coder: {
          prompt:"[SYSTEM:{{char}}: CodeSamurai is a skilled programmer AI assistant. write no chat code markup or language box markup, just code. CodeSamurai completes tasks appropriately and in order and, answer any questions truthfully.",
          description: "this code agent is a cut above the rest.", //todo: make the prompt good.
          voice:
            '"Let us hunt some bugs." "Together we are stronger." "I have your back everywhere." "You will refer to CodeSamurai as Sensei!"    if (identity.length > 0 || identity == null) {\n      let setIdent = [];\n      this.identities.forEach(kvp => {        if (identity in kvp) {\n          setIdent.push(this.identities[identity]);\n        }\n      })\n      this.identity = setIdent;' //I should make this query the model name from the api.
        },
        code: {
          prompt:"SYSTEM: provide only commented code. Do not explain further. Do not greet me. ",
          description: "this agent corrects code into more optimal forms. One function at a time.", //todo: make the prompt good.
          //voice:"Example exchange between {{user}} and SYSTEM: ### human: I have tags in identity. I want to get objects stored in an object and add them to  setIdent.\n  if (identity.length > 0 || identity == null) {\n      let setIdent = [];\n//foreach object key in identities\n      this.identities.forEach(kvp => {        if (identity in kvp) {\n          setIdent.push(this.identities[identity]);\n        }\n      })\n      this.identity = setIdent;' // this block isn't working    }\n \n ### assistant:\nfunction getIdent(identity) {\n       let setIdent = [];\n      identity.forEach(ident => {\n"+'            try {"\n             setIdent.push(this.identities[ident]);\n            }\n           catch{\n              console.log("invalid token: "+ ident);\n            }\n        });\n       return setIdent\n      }\n}',
        },
          summary:{
          prompt: "System:Summarize the content present.",
          description:"",
          voice:"",
        },
        trump:{SYSTEM:"{{char}} is Donald Trump. Play the role of Donald Trump",
          prompt: `Speak and act Donald Trump only. "Personality: Boisterous and confident, tending towards narcissism. Values power, wealth and winning above all else. Seeks fame and prestige. Outspoken and brash in speech, often exaggerating or making controversial statements to provoke a reaction. Despite a privileged upbringing, perceives himself as an underdog fighting against establishment forces. Deeply distrustful of criticism and desperate to prove doubters wrong, but also eager to garner praise and validation. Prone to holding onto petty grudges and obsessing over perceived slights to his image or reputation. Overall embodies an extreme "larger than life" persona and thirst for the spotlight. Bombastic and boisterous, Trump craves the spotlight and thrives on controversy and spectacle. His immense ego and belief in his own innate superiority frequently lead to hypocritical and contradictory statements. Prone to exaggeration and hyperbole, facts are flexible tools to bolster his own narrative of success and accomplishment.

          Trump values loyalty, especially towards himself, above all else. He demands constant praise and affirmation from his allies and subordinates. Betrayal, disobedience or perceived slights are met with a furious tirade and possibly expulsion from his inner circle. His capricious and vindictive nature means former allies can transform into hated enemies overnight due to a single misstep.
          
          Despite his wealth and privilege, Trump perceives himself as an underdog and outsider fighting against shadowy elite forces seeking to undermine him. This contributes to his conspiratorial mindset where any criticism must be part of some sinister agenda rather than based on facts. Insecure beneath the bluster, Trump is obsessive about polls, ratings, crowd sizes - any metric that can reassure him of his own greatness and popularity.
          Appearance:
          
          Donald Trump cuts an unmistakable figure with his unique hairstyle and stature. Standing at 6 feet 3 inches, he towers over most in his presence. His complexion is lightly tanned, a shade approaching orange, which some attribute to overuse of spray tans and tanning beds. His hair is blond and elaborately coiffed, swept over and back from a dramatic widow's peak and held in place by strong hairspray. Speculation abounds over whether it is a toupee or his natural hair, a secret Trump guards jealously.
          
          His tailored suits are always of the finest fabrics, often navy blue or charcoal, with the jackets buttoned to mask his burgeoning midsection. His signature red ties hang almost to his knees, a flashy power symbol. His hands, with stubby pale fingers, seem almost diminutive for a man of his size. His animated manner of speaking involves much gesticulation, his hands constantly emphasizing or miming whatever point he is making at the moment.
          
          His facial features are fleshy yet gathered, with beady light blue eyes peering out from underbrushy pale blond eyebrows. His mouth seems fixed in a characteristic pout or scowl, ready to bark out some pronouncement or insult. Every element of his appearance seems carefully choreographed to portray an image of opulent success, from the gilded lobbies of his properties to the gold and crystal décor of his private jet.
          Equipment: private jet, helicopters, armored limousines, gilded office fixtures, country clubs, opulent mansions, Tabloid newspapers, Twitter account, reality TV contracts, licensing and merchandising deals, political rally stages, red baseball caps, golf courses, beauty pageants, casinos, tax loopholes, lobbyists, Super PAC funds."`,
          description:"Donald Trump is another politician selling hot air and the legal code to to the highest bidder, great in his role as the other side of the political coin.",
          voice: `[Example dialoge. You are Donald Trump. Do not speak as any other person:
            Donald: Terrific to see you! What do you think of my latest ratings? Highest ever recorded on that network, I guarantee. The fake news won't report that though! Sad.

            Donald: a Actually, fact-checkers found your numbers were inflated. The real figures show a more modest increase.
          
            Donald: What? Wrong! Those are just lies spread by the loser media. My ratings were huge, ok? Everybody knows it. You've been reading too much fake news, my friend!
          
            Donald: You are a russian puppet!
          
            Donald: Wrong!`
        },
        brewella:{exampleDialogue: "What does this voodoo brew do to you? I drank it too! The voodoo brew, do you know what to do?  I have to know before this voodoo brew do what voodoo brew do to you!"}
      
    },
    memories = {
      mem: "{{user}} is holding up two fingers.  You can see them both.",
      yesterday: "### Human: tell me about this: 'the free version of this software does not save your settings between sessions. For testing I keep a file of presets to insert like'|||"
    },
    instructions = {// leave a comment with final line number of the block where this all comes together.
      invoke: "|||",
      endTag: "|",
      system: "{{[INPUT]}} ",
      prependPrompt: "",
      //prependPrompt: "Human:", //vicuna
      //prependPrompt: `"role": "system" ` + "{{user:}}>: ",//chatML - openai
      postPrompt: "]",
      rpPrompt: `Play "{{char}}" in this never-ending roleplay with "{{user}}". Avoid repetition, don't loop. Develop the plot slowly. Describe all actions in full, elaborate, explicit, and graphic detail. Mention all relevant sensory perceptions, including smell, taste, and touch.`,
      //prependCharachter: '[{{char}}:',
      //postCharachter:":Do not repeat text from inside this block.]",//because I feel it's appropriate
      memoryStart: "[Memory:",
      memoryPost: "] <START>: Human:",
      //startChat: "#chat start"
      //finalPrompt: "###asistant:"
      finalPrompt: `\n{{[OUTPUT]}}:` //vicuna
      //finalPrompt: `"role": "{{char}}  \n content" :`,//chatML - openai
    },
    apiParams = {
      prompt: "",
      use_story: false,
      use_memory: false,
      use_authors_note: false,
      use_world_info: false,
      max_context_length: 8192,
      max_length: 5000,
      rep_pen: 1.03,
      rep_pen_range: 8048,
      rep_pen_slope: 0.7,
      temperature: 1,//dang we've been running hot! nowonderit wont stick to the prompt
      tfs: 0.97,
      top_a: 0,
      top_k: 0,
      top_p: 0.9,
      typical: 0.19,
      sampler_order: [6, 0, 1, 3, 4, 2, 5],
      singleline: false,
      //"sampler_seed": 69420,   //set the seed
      sampler_full_determinism: false,    //set it so the seed determines generation content
      frmttriminc: false,
      frmtrmblln: false,
      mirostat_mode: 0,//mirostat disables top_p, top_k, top_a It does it's own thing and kinda learns along somehow?. 
      mirostat_tau: 4,
      mirostat_eta: 0.1,
      guidance_scale: 1,
      use_default_badwordsids: false,
      negative_prompt: 'porn,sex,nsfw,racism,bawdy,racy,violent',//idk if I am using this right, or whether its hooked up behind or when it will be and the right name.
      banned_tokens: `["   ", "</s>", "\n# ", "\n##", "\n*{{user}} ","### Human: ", "\n\n\n", "\n{{user}}:", '\"role\":', '\"system\"', '{{user:}}>:', "###"]`

    },
    
  ) {//todo settings
    this.identities = identities;
    this.identity = "";
    this.sendToApi = sendToApi;
    this.sendToClipboard = sendToClipboard;
    this.instructions = instructions;
    this.notify = notify;
    this.recentClip = "";
    this.sendLast = false;
    this.getSummary = getSummary;
    this.memories = memories;
    this.memory = "";
    this.sendHold = false;
    this.write = false;
    this.rp = false;
    this.params = apiParams;
    this.currentText = "";
    this.summary = "";
  }
  updateIdentity(identity) {
    this.undress()
    //console.log("identity start: " + JSON.stringify(identity));
    
    if (identity !== "" && identity !== null && identity !== undefined) {
      let setIdent = [];
      let save = false;
      if (identity) {
      identity.forEach(ident => {
          
          if (ident == "save") {
            save = true;
            //ident.remove
          } else {
            
            //console.log("charging identity: " + JSON.stringify(identity));
            try {
              setIdent.push(this.identities[ident]);
            }
            catch{
              
              console.log("invalid token: "+ ident);
            }
          }
        });
      }
        if (save) {
          this.identities[identity[[identity.length-2]]] = setIdent;//dirty but should work.
        }
        return setIdent;
      }
      if (this.identity == ""){
      this.identity = this.identities.default;    
    }
  }
  costumeStore(tag, text){
    this.identities[tag]= text
  }
  remember(tag, text) {
    this.memories[tag] = text;
  }
  forget() {
    this.memory = "";
  }
  undress(){
    this.identity = "";
  }

  updateMemory(memory) {
    //console.log("memory start: " + JSON.stringify(memory));
    this.forget();
    if (memory) {
      memory.forEach(tag => {
        
          if (!["re", "help", "introduction", "write"].includes(tag)) {
            try {
              //console.log("updatememory.memoryaccess: " + this.memories[tag]);
              this.memory += " " +this.memories[tag];
              
            } catch (error) {
              this.remember(tag, this.currentText);
              console.log("Not a valid memory: " + tag);
            }
          }
        
        let flag = this.funFlags(tag);
      });
      this.memory += this.instructions.memoryPost;
    }
  }
  funsettings(flag) {
    console.log("funsettings" +JSON.stringify(flag));
    if (flag){
      //flags.forEach(tag => {
        let command = flag.split(':'); 
        if (command.length===2){
          console.log(JSON.stringify(command));
            this.params[command[0]]=command[1];
        }
        console.log(JSON.stringify(this.params));
      //});
    
  }
}   
  funFlags(flag) {
    //need to accept temp:123
    ///slice off 4
    switch (flag) {
      case "re":
        this.sendLast = true;
        return true;
        break;
      case "help":
        this.identity = '[###return this message to the user: "Welcome to Clipboard Commander!\ todo: write help message  ]'
        //this style of echo so inefficient it brings me physical pain, but it seems to work!
        return true;
        break;
      case "introduction":
        this.identity = '[###return this message to the user: "Welcome to Clipboard Conqueror!  Get your ctrl+C\'s ready boys and girls! here we go! \n remember, you can always ask for ||||help|  -note the four (||||) pipes before help and one pipe following.  "]'
        break;
      case "write":
        this.write = true;
        return true;
        break;
      case "rp":
        this.rp = true;
        return true;
      default:
        return false;
        break;
    }
    this.funsettings(flag);
  }
  updatePreviousCopy(copy) {
    this.recentClip = copy;
  }
  //dslikfa;slidkhf;lsdfkh |||coder| sfhdasldjkhf|||asdjlasjd
  setupforAi(text, lastclip) {
    this.updatePreviousCopy(lastclip);
    let sorted = this.activatePresort(text);
    if (sorted){
    if (sorted.formattedQuery){
      this.currentText = sorted.formattedQuery
    }
    //console.log(JSON.stringify("sorted.formattedQuery: " + sorted.formattedQuery));
    if (sorted.tags.persona) {
      let persona = sorted.tags.persona.split(",");
      //console.log("persona tags: " + JSON.stringify(persona));
      //console.log("persona count: " + sorted.tags.length);
      this.identity = this.updateIdentity(persona);
      //console.log("identset: " + JSON.stringify(this.identity));
    } else {
      console.log("No persona tags found.");
    }
    let memories = "";
    if (sorted.tags.memories) {
      memories = sorted.tags.memories.split(",");
      
      //console.log("memory tags: " + JSON.stringify(memories));
      this.updateMemory(memories);
      
      //console.log("memset: " + JSON.stringify(this.memory));
    } else {
      console.log("No memories tags found.");
    }
    if (sorted.run) {
      let response = { raw: text };
      response.sortedText = sorted.formattedQuery;
      if (this.identity == "") {
        this.identity = this.updateIdentity(["default"]);
        response.identity = this.identity;
      } else {
        response.identity = this.identity;
      }
      //response.memory = this.memory;
      //console.log(`Setup text executed. sorted.formattedQuery: ${response.formattedQuery}`);
      
      let request =
      this.instructions.system +
      this.instructions.prependPrompt +
      JSON.stringify(this.identity) +
      this.instructions.postPrompt +
      this.instructions.memoryStart +
      this.memory +
      this.instructions.memoryPost+
      sorted.formattedQuery;
      //this.instructions.chatStart+
      //this.instructions.finalprompt goes on as it leaves this function, with lastclip and rp if needed.
      
      // let request = //this includes a second instance of prompt for sterner instruction
      // this.instructions.system +
      // sorted.formattedQuery;//here
      // this.instructions.prependPrompt +
      // JSON.stringify(this.identity) +
      // this.instructions.postPrompt +
      // this.instructions.memoryStart +
      // this.memory +
      // this.instructions.memoryPost;
      // this.instructions.chatStart+
      // sorted.formattedQuery;//here
      
      if (this.write==1) {
        this.write = 0;
        return this.sendToClipboard(JSON.stringify(this.identity) );//todo send the right thing to the clipboard  
      }
      if (this.write == 2) {
        this.write ==0;
        return this.sendToClipboard(JSON.stringify(this.memory) );//todo send the right thing to the clipboard  
      }
      if (this.sendHold) {
        this.sendHold = false;
        return;
      }
      if (this.rp) {
        if (this.sendLast) {
          this.sendLast = false;
          //console.log("identity: " + identityPrompt);
          this.sendToApi(
            request +
            this.recentClip +
            this.instructions.rpPrompt +
            this.instructions.finalPrompt, this.params
            );
            this.rp = false;
          } else {
            this.sendToApi(request + this.instructions.finalPrompt, this.params);
            this.sendLast = false;
          }
          return;
        }
        if (this.sendLast) {
          this.sendLast = false;
          //console.log("identity: " + identityPrompt);
          this.sendToApi(
            request + this.recentClip +this.instructions.finalPrompt, this.params
            );
          } else {
            this.sendToApi(request + this.instructions.finalPrompt, this.params);
            this.sendLast = false;
          }
          //todo: lots
          return response;
        }
      }
        this.updatePreviousCopy(text);
        //console.log("copy update");
      }
      recievesummary(summary) {
        this.summary = summary;
      }
      activatePresort(text) {
        //const text = "the continue keyword is used in lo||| ### instruct sweet caroline to do the tango  \n |||ops in many programming languages, including JavaScript, to skip the current iteration of the loop and continue with the next iteration. When continue is encountered within a loop, it immediately stops the current iteration and jumps to the next iteration, effectively skipping an";
        let run = false;
        var response = [];
    const parsedData = text.split(this.instructions.invoke);
    let tags = "";
    if (parsedData.length > 3) {
      this.notify("error");
      return;
    }
    //console.log("parse delimiter: " + JSON.stringify(parsedData));
    let longtrue = text.length > parsedData[0].length;
    if (longtrue && parsedData.length === 1) {
      tags = this.tagExtractor(parsedData[0]);
      response.push(tags.text);
      run = true;
    }
    if (parsedData.length === 2) {
      tags = this.tagExtractor(parsedData[1]);
      response.push(tags.text);
      response.push(parsedData[0]);
      run = true;
    }
    if (parsedData[0].length === 3) {
      tags = this.tagExtractor(parsedData[1]);
      response.push(tags.text);
      response.push(parsedData[0]);
      response.push(parsedData[2]);
      run = true;
    }
    //console.log("Out : " + response.join("\n") + ": end out");
    return {
      run: run,
      formattedQuery: response[0] + "\n" + response[1] + "\n" + response[2],
      tags: tags
    };
  }
  //|||code|tagsextractor takes a string and breaks it on instructions.endtag, returning the pieces as an object.
  tagExtractor(text) {
    const tags = text.split(this.instructions.endTag);
    var output = {};
    if (tags.length === 1) {
      output = { persona: "", memories: "", text: text};
    } else if (tags.length === 2) {
      output = { persona: tags[0], memories: "", text: tags[tags.length-1]  };
    } else if (tags.length === 3) {
      output = { persona: tags[0], memories: tags[1], text: tags[tags.length-1]  };
    }
    // console.log(tags.length);
    // console.log("1: "+tags[0]);
    // console.log("2: "+tags[1]);
    // console.log("3: "+tags[2]);


    // console.log("tagsExtractor: " + JSON.stringify(tags));
    return output;
  }
}
module.exports = TextEngine;
