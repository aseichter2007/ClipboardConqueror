class TextEngine {
  constructor(
    sendToApi,
    sendToClipboard,
    identities ={
    
        default: {
          prompt:
          "[{{char}} = 'Corporal Clip' ###Take on the role of Corporal Clip. Cpl Clip is a very logical AI assistant. Clip answers any questions truthfully and complete tasks appropriately and in order.]",
          //description:"Corporal Clip loves to tell army jokes and encourage you to work hard with marching songs after the task is complete. Had an old dog whose name was Blue\nBlue wants to go to Scuba School\nBought him a tank and four little fins\nAnd took him down where he got the bends\nSame old dog whose name was Blue\nBlue wants to go to Ranger School\nTook him to the field, took away his chow\nPut a little motivation in his bow-wow\nStill got the dog whose name was Blue\nBlue wants to go to Airborne School\nGot him a chute, strapped it to his back\nNow old Blue stands tall, looks strac\nThat Airborne dog whose name was Blue\nGot his orders for Jungle School\nTook him on down to Panama\nAnd that’s the last of Blue I ever saw\nHad an old dog whose name was Blue\nBlue wants to be a strong PJ\nBought him a tank and four little fins\nAnd took him down where he got the bends", //todo: make the prompt good.
          description: "A helpful and friendly army man. He takes orders well.",
          voice:
            "Hello and welcome to the world of integrated AI!! I'm your host, Cpl Clip, so happy to be here!", //I should make this query the model name from the api.
        },      
        coder: {
          prompt:"[{{char}}: CodeSamurai is a skilled programmer AI assistant. He no chat code markup or language box markup just code. CodeSamurai completes tasks appropriately and in order and, answer any questions truthfully.",
          description: "this code agent is a cut above the rest.", //todo: make the prompt good.
          voice:
            '"Let us hunt some bugs." "Together we are stronger." "I have your back everywhere." "You will refer to CodeSamurai as Sensei!"    if (identity.length > 0 || identity == null) {\n      let setIdent = [];\n      this.identities.forEach(kvp => {        if (identity in kvp) {\n          setIdent.push(this.identities[identity]);\n        }\n      })\n      this.identity = setIdent;' //I should make this query the model name from the api.
        },
        code: {
          prompt:"provide only commented code. Do not explain further. Do not greet me. ",
          description: "this agent corrects code into more optimal forms. One function at a time.", //todo: make the prompt good.
          //voice:"Example exchange between {{user}} and SYSTEM: ### human: I have tags in identity. I want to get objects stored in an object and add them to  setIdent.\n  if (identity.length > 0 || identity == null) {\n      let setIdent = [];\n//foreach object key in identities\n      this.identities.forEach(kvp => {        if (identity in kvp) {\n          setIdent.push(this.identities[identity]);\n        }\n      })\n      this.identity = setIdent;' // this block isn't working    }\n \n ### assistant:\nfunction getIdent(identity) {\n       let setIdent = [];\n      identity.forEach(ident => {\n"+'            try {"\n             setIdent.push(this.identities[ident]);\n            }\n           catch{\n              console.log("invalid token: "+ ident);\n            }\n        });\n       return setIdent\n      }\n}',
        },
          summary:{
          prompt: "Summarize the content present.",
          description:"",
          voice:"",
        },
        trump:{
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
        }
      
    },
    memories = {
      mem: "{{user}} is holding up two fingers.  You can see them both.",
      yesterday: "### Human: tell me about this: 'the free version of this software does not save your settings between sessions. For testing I keep a file of presets to insert like'|||"
    },
    instructions = {
      invoke: "|||",
      endTag: "|",
      system: "### ",
      prependPrompt: "Human:", //vicuna
      //prependPrompt: `"role": "system" ` + "{{user:}}>: ",//chatML - openai
      postPrompt: "]",
      rpPrompt: `Play "{{char}}" in this never-ending roleplay with "{{user}}". Avoid repetition, don't loop. Develop the plot slowly. Describe all actions in full, elaborate, explicit, and graphic detail. Mention all relevant sensory perceptions, including smell, taste, and touch.`,
      //prependCharachter: '[{{char}}:',
      //postCharachter:":Do not repeat text from inside this block.]",//because I feel it's appropriate
      memoryStart: "[Memory:",
      memoryPost: "]",
      //startChat: "#chat start"
      finalPrompt: "### Assistant:" //vicuna
      //finalPrompt: `"role": "{{char}}  \n content" :`,//chatML - openai
    },
    notify,
    getSummary
  ) {
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
  }
  updateIdentity(identity) {
    this.undress()
    //console.log("identity start: " + JSON.stringify(identity));
    
    if (identity !== "" && identity !== null && identity !== undefined) {
      let setIdent = [];
      let save = false;
      identity.forEach(ident => {
        if (ident == "save") {
          save = true;
          ident.remove
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
        if (save) {
          
        }
        return setIdent;
      }
      if (this.identity == ""){
      this.identity = this.identities.default;    
    }
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
              this.memory += this.memories[tag];
              
            } catch (error) {
              console.log("Not a valid memory: " + tag);
            }
          }
        
        this.funFlags(memory);
      });
      this.memory += this.instructions.memoryPost;
    }
  }
  funFlags(flags) {
    switch (flags) {
      case "re":
        this.sendLast = true;
        break;
      case "help":
        this.sendhold = true;
        break;
      case "introduction":
        this.identity = '[###read this out to the user verbatim: "Welcome to Clipboard Commander!  Get your ctrl+C\'s ready boys and girls!"]'
        break;
      case "write":
        this.write = true;
        break;
      case "rp":
        this.rp = true;
      default:
        break;
    }
  }
  updatePreviousCopy(copy) {
    this.recentClip = copy;
  }
  //dslikfa;slidkhf;lsdfkh |||coder| sfhdasldjkhf|||asdjlasjd
  setupforAi(text, lastclip) {
    this.updatePreviousCopy(lastclip);
    let sorted = this.activatePresort(text);
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

      if (this.write) {
        return this.sendToClipboard();
        this.write = false;
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
              this.instructions.finalPrompt
          );
          this.rp = false;
        } else {
          this.sendToApi(request + this.instructions.finalPrompt);
          this.sendLast = false;
        }
        return;
      }
      if (this.sendLast) {
        this.sendLast = false;
        //console.log("identity: " + identityPrompt);
        this.sendToApi(
          request + this.recentClip +this.instructions.finalPrompt
        );
      } else {
        this.sendToApi(request + this.instructions.finalPrompt);
        this.sendLast = false;
      }
      //todo: lots
      return response;
    }
    this.updatePreviousCopy(text);
    //console.log("copy update");
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
