Clipboard Conqueror - Readme
=============================
*Special thank you to the creators of  KoboldAi, KoboldCPP/lite, llamma, openAi, 
Clipboard Conqueror is a powerful tool that harnesses the capabilities of locally run large language models to process and generate content, right from your clipboard. 
With Clipboard Conqueror, you can leverage the AI's abilities by invoking it with `|||` and providing commands or requests for information.

I solemnly promise that this application and at least one compatible backend will function in the absence of internet connectivity.
One of my design inspirations for this application is to spread LLM models to as many computers as possible. I want to ensure at least one intact system is recovered by future archeologists, an incredible time capsule of culture, science, and data.  We should be sending intelligent boxes to deep space too. Our Knowledge and posterity must not go to waste. 



Usage:
------

1. Enter `|||` followed by your request or command.
2.Copy the text to your clipboard. For example:
```
   - ||| Say hello

   - |||character|Say hello

   - |||agentname| your text - sends your text to a specified agent

   - |||clintEastwood|mem| how many fingers am I holding up?  -ask Clint Eastwood if he has information contained in memory "mem"

    Note: Four pipes (||||) are used before memory tags and instructions, three before charachter agents, and can be combined like |||agent1,agent2|memory1,memory2| , count 'em 5 | pipes is the maximum supported. 
    Three pipes, agents, one pipe, memories/command tags, one pipe. Any tags must be closed with one pipe, followed by memory if any. If memory, you require a fifth | pipe to close. *
   - ||||noban| (overrides banned tokens)
   - ||||1200| sets the max response length to 1200
   - ||||temperature:1| sets the temperature to 1.
   - ||||memory,save|** overwrites memory with this text:"overwrites memory with this text:"
   - ||||memory,save,re| overwrites memory with the previous clipboard contents
   - |||coder|re| what is this code doing? - sends the code you copied last, prepended by "what is this code doing", and invokes the coder assistant to help frame the output format and preconceptions. 
   
      *save is the only command supported like `|||save, agent|memory,memory| {"description":"description"}`  - this does not save memory into the agent persona. It saves a persona called with the iternal(ai can't see tag, sees the entire object you send though.) flag "agent" defined like: {"description":"description"}.  Must use json format. Listen to the audio feedback to indicate success or failure. 
      ** no spaces in here or it will save seperate characters and memory I think.//needs testing or trim(), I can't decide if the utility of spaced tags is great or confusing. Also, spaces will break all the commands, but I could account for it.
```
3. Optionally, include a memory tag or command tag after the initial `|||`. For example:
```
   - |||coder,mute|re,memone,stevesdayoff
       > This command will insert the coder card, apply the mute card to silence comments and explanations, then append the contents of memone and stevesdayoff. The AI will interpret these tags as instructions to create software, since it's using the coder persona.
```
Note: Remember to use four pipes (`||||`) for memory tags. They help to store data and instructions for later use. Chaining multiple tags is also possible, like `|||noban|memtag|Remember this message`.

Productivity:
-------------
Clipboard Conqueror makes the process of accessing an LLM simple and efficient in any workspace.

Proofread documents, get feedback, find inspiration, or just run a game of dungeons and dragons with your friends.

Clipboard Conqueror provides a whole toolbox of predefined assistants, ready to work for you.  

|||summary| will summarize any text, allowing you to intelligently condense unimprtant emails to just the facts and data.

|||agi| will make you a plan to execute any operation you ask for. Captain Clip does well too, but this is based on the kobold agi script. 

Key Features:
--------------
* Locally run large language model support with KoboldCPP/lite for powerful text processing.
* Combines user-supplied text with AI output for precise customization.//done
* Supports multiple languages and contexts for diverse applications.//sure
* Can utilize various personas and roles for different tasks.//done
* Capable of mimicking voices and generating unique content.

Supported Platforms:
--------------------
Clipboard Conqueror is designed to work seamlessly across multiple platforms including Windows, macOS, and Linux. It has been rigorously tested and optimized to ensure stability and compatibility.

Notice:
--------
When using the |||gtp:3| or |||gpt:4| commands, be aware that data will be sent to outside systems. This may be a breach of your companies data protection policy.
You can safely use any other command to 
Please use Clipboard Conqueror responsibly and respect copyright laws while generating content. Misuse of this tool might lead to unintended consequences and breaches of privacy or intellectual property rights.

Additional Resources:
You can train Clipboard Conqueror to better understand your needs by providing examples of usage formatted as a json. Personalizing your AI experience allows for more accurate results tailored specifically to your requirements. To train the AI, simply enter `|||train` followed by a description of the improvement you desire.

Advanced Example:
```
   - |||newAgent, save| {  
  "yourtag": "Corporal Clip",
  "anydescription": "A helpful and friendly army man. He takes orders well.",
  "thisExampleDilogue": ["Hello and welcome to the world of integrated AI!! I'm your host, Cpl Clip, so happy to be here!", "I'd take a bullet for you, if I had a body.]"
}
will add that agent json parsed into the memory until next run. You can purchase a licence to the full version here: //todo: build website. 
```"



---------------------------------
Installation:
-------------
first get this. github.com/LostRuins/koboldcpp/releases/
or for macOS get KoboldAi //untested
a kobold compatible api must be running to use Clipboard Conqueror.

Kobold needs model. Here are my reccomendations 11/8/23:

hardware("time to process")  [fast = 20+ tokens/sec, medium = <10 tokens/sec. slow = <2tokens/sec]* Lower on this chart is smarter. 

      32gb ram and not using graphicss card(medium):

      8gb gfx cards and 16gb ram(fast):

      8gb gfx cards and 32gb ram()

      12gb gfx cards and 16gb ram(fast) and 32or 32gb ram and 8gb vram(mediumn):

      12gb gfx cards and 32gb ram(medium):

      12gb gfx cards and 32gb ram(slow): 

      24gb vram(fast):

      24gb vram(medium):

      24gb vram(slow):



      LLAMA 3B needs at least 4GB RAM total vram+ram
      LLAMA 7B needs at least 8GB RAM
      LLAMA 13B needs at least 16GB RAM
      LLAMA 30B needs at least 32GB RAM
      LLAMA 65B needs at least 64GB RAM

*Model bit depth is trade between output quality and output speed.  Generally, larger models are smarter and can follow more complex instructions.
KoboldCPP uses GGUF format, which are quantized from 16 bit to between 2 bit and 8 bit depending on model. (I like 8 bit if it fits in vram with room for the context.)
lower bits require less ram, but there is a drop in reasoning ad
I get all mine from huggingface/thebloke.

for ease of use and organization, consider keeping kobold and the model you chose inside Clipboard Conqueror/api.  If koboldcpp.exe is placed here, Clipboard Commander will run it automatically and run with the settings in freeconfig.js

Finally run Clipboard Conqueror.  

//open terminal at folder and run
npm i
npm start


Copy this line:

|||introduction|

paste in a text field. Read the introduction. 
three pipes invokes the ai. If you want to skip the introduction you can get right to things like:

|||what is an inverse square root and how is it useful. 

Have fun and remember you can always ask for 
|||help|
---------------------------------
Bug Reports and Feature Requests:
---------------------------------
If you encounter any issues while using Clipboard Conqueror or have suggestions for future improvements, please report them via github or email me at //todo setup email. I will work diligently to address and resolve any concerns.


dev:
//access clipboard//done
//access api//done
//format query in optimal programmable format//done
//get tags for agent and memory//done
//use tags to fetch desired set//done
//setup special flag handler for command flags with no associated memory.//done I thing I have a bug to sort yet though, it exposes itself once in a while and I think it's here. 

//todo: finish saving objects to memory
//todo: openAI client, probably migrate a ton of logic out of textengine and into koboldinterface.js to make them interchangeable. 
//todo: notification instead of sound effects
//todo: keyboard binding to activate ai on last clip without prompt. 
//todo: implement horde? maybe? or offer free gtp 3.5 or something. This will be after I make some money, send donations to accellerate this process. 
//todo: /api/extra/abort  
//todo: /api/extra/generate/check  //return in progress, useful for vlarge gens on slow mode
//todo: /api/extra/tokencount //should run against entered data and updates should be shown after setting mem or agent and on final send. 
//todo: /api/extra/true_max_context_length //returns context max
// i found this!https://lite.koboldai.net/koboldcpp_api#/1
release!
//premium
//todo: branch to build premium binaries from. premium branch features:
//todo: savesettings and getsettings in premium branch. //premium primary feature is inter session settings. without premium you must overwrite the settings like ||||settings,write| to paste ' |||settings,save| `{ the settings serialized json }` ' which can be edited in place and copied to save the settings. Listen for confirmation. 
//todo: per charachter rolling memory to allow more natural exchanges and enable rp. 
//todo: group chain interacting so you can batch like |||summary,writer|"text" and paste a summary, then you press the invoke key and it advances the chain and gives you the output from writer with the results of summary in the memory
//todo: web api to host login server. 404 defaults to allow normal operation of paid branch users if I decide the server is expensive to run, or I die, or the internet is down. potential vulnerability: blocking in hosts to avoid subscriptoin check. Please pay for the full version of this software, this is my only income. Life is hard. 
//todo: portal site to serve binary download links, take payment and manage your subscription level. Look up rules about re-serving chatgtp api on my key. Consider asp.net, it will just handle users and the front end only feels a little silly, no need for relational mongo or any silliness. Downside, I've never succssfullt hooked up a database right deploying to s2. consider aws lambda for auth,  serverless.  lambda auth has additional challenges
//todo: make a lambda script to setup a lambda to serve a daily charachter, run a continuous contest so people vote for tomorrows char. |||dailycandidate,rate|10, assign up to ten points for the candidate last retrieved with |||dailycandidate| provies random from server. 
//todo: consider price schedule. Leaning towards $2 monthly and $30-60 one time options at checkout.






