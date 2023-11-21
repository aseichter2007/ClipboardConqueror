![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Readme
=============================
*Special thank you to the creators of  KoboldAi, KoboldCPP/lite, llamma, openAi, 
Clipboard Conqueror is a powerful tool that harnesses the capabilities of locally run large language models to process and generate content, right from your clipboard. 
With Clipboard Conqueror, you can leverage the AI's abilities by invoking it with `|||` and providing commands or requests for information.

I solemnly promise that this application and at least one compatible backend will function in the absence of internet connectivity.
One of my design inspirations for this application is to spread LLM models to as many computers as possible. I want to ensure at least one intact system is recovered by future archeologists, an incredible time capsule of culture, science, and data.  We should be sending intelligent boxes to deep space too. Our Knowledge and posterity must not go to waste. 

This project is also a bit of a last gasp. I've been looking for work and getting nothing but scams.
Please, if you get good use from this application, consider supporting me. My son will be born next month and debt is already starting to get out of hand. Chronic depression has always kicked my ass, I gotta get some traction and start rolling. 
todo: patreon and kofi

With enough support, this app will become extremely useful for anyone. 
Usage:
------

Certainly! Here's the formatted text with only lines containing `|||` in code blocks:

1. Enter `|||` followed by your request or command. Pipe "|" can be typed by pressing shift + backslash (above enter).
2. Copy the text to your clipboard. For example:
   ```
   - ||| Say hello
   ```
   Copy the line above

   ```
   - |||introduction|
   ```
   will tell you about LLMs and how they work, and explain the settings that are useful to control generation.

   - |||character|Say hello  
     // This is exemplary; character is not a default prompt. Captain Clip will respond. Try:
     ```
     |||frank| Hello, Frank. You can't hide from me. Show yourself.
     ```
   ```
   - |||stable| write a prompt for a picture of a beautiful forest with pixies playing with animals.
   ```
   Remember, no spaces inside the | pipes are allowed.
   ```
   - |||frank,mem|Frank, how many fingers am I holding up?
   ```
   - Ask Frank Drebin if he has information contained in tag "mem"

   Note: Agents, memory agents, and instructions can be combined like |||agent1,agent2|.
   Three pipes, agent, one pipe. No spaces. Any agents or settings must be closed with one pipe or they will be sent as text to the default agent (Captain Clip).

   ```
   - |||1200|
   ```
   sets the max response length to 1200. Also works like |||agent,setting:0.5,1000| just a number is always max response length.

   ```
   - |||temperature:1.1| 
   ```
   sets the temperature to 1.1. This works for any setting, e.g., top_p, min_p. Use 1 and 0 to set true/false //true/false untested.
   ```
    |||coder,re| what is this code doing? -
   ```
   sends the thing you copied last, prepended by "what is this code doing," and sends the coder assistant prompt to help frame the output format and preconceptions.

   ```
   - |||memory:save| writes or overwrites an identity called memory with this text: "writes or overwrites an identity..."
   ```
     Note - extensive formatting causes errors. This can be sent JSON, but it's really fiddly and the saved identity is just stringified back out anyway. Advanced example way below. 
   ```
   |||mem:save| SYSTEM: take on the role of {{character}}, description:  description.
   ```
   More formatting is more potential for errors, and errors don't make it into memory.
   

   Save is the only command supported like `|||agent:save|{"description":"description"}` JSON format works but the syntax has to be perfect; recommend avoiding {}.

   - |||coder,mute,memone,stevesdayoff|
     > This command will insert the coder character card, the mute card, memone, and stevesdayoff. The AI will receive each of these.
     Note, only coder is a standard character.

   It's useful to save information like
   ```
   |||memory:save| user is holding up two fingers.
   ```
   and then use it like
   ```
   |||coder,memory| describe the function of the code block.
   ```
   ```
   |||coder,memory| different question about the info in mem
   ```

   ```
   |||list|
   ```
   The list command sends a list of current agents in memory to the clipboard, ready to paste out.

   ```
   |||mem,write|
   ```
   The write command will copy the entire prompt of all entered agent tags to the clipboard ready to paste, and then copy back under a new name or edited. 

Productivity:
-------------
Clipboard Conqueror makes the process of accessing an LLM simple and efficient in any workspace.

Locally run models can be trusted with private data and do not phone home or report any metrics. Local LLMS are private and secure. 

Proofread documents, test explainations, get feedback, find inspiration, or just run a game of dungeons and dragons with your friends.

Clipboard Conqueror provides a whole toolbox of predefined assistants, ready to work for you.  

|||summary| will summarize any text, allowing you to intelligently condense unimportant emails to just the facts and data.

|||agi| will help you execute any operation you ask for help with. Captain Clip does well too, but this is based on the kobold agi script and is superior to a simple ask. 

|||stable| will write you an image prompt for use in stable diffusion automatic 1111
This identity and some other cards were found on chub.ai, some are my own or significant customizations.


Key Features:
--------------
* Locally run large language model support with KoboldCPP/lite for powerful, secure, text processing.
* Combines user-supplied text with AI output for precise customization.
* Supports multiple languages and contexts for diverse applications. Not all LLM models are multilingual, some configuration may be required.
* Can utilize various personas and roles for different tasks.  
* Quick saving of new agents and information for later use.
* Capable of mimicking "voices" and generating unique content.

Supported Platforms:
--------------------
Clipboard Conqueror is designed to work seamlessly across multiple platforms including Windows, macOS, and Linux. It has been rigorously tested and optimized to ensure stability and compatibility.//??!! Dang, that is a complete lie. I have no idea if this works on linux or mac. Report your findings please. 

Notice://gtp, openai unimplemented. LMStudio is not supported yet either. And the koboldCPP api is currently under rapid development so I really should get after it.
--------
When using the |||gtp:3| or |||gpt:4| commands, be aware that data will be sent to outside systems. This may be a breach of your companies data protection policy.//unimplemented
You can safely use any other command to query sensitive data, and depending on your configuration, gtp commands can be sent to LMStudio to run against a larger slower model. //unimplemented
Please use Clipboard Conqueror responsibly and respect copyright or laws in your country while generating content. Misuse of this tool might lead to unintended consequences and breaches of privacy or intellectual property rights. I hold no reponsibility for the data that passes through this tool on any system.  

Additional Resources:
//todo: link assorted knowlege banks. 

Advanced Example:
```
|||newAgent:save| {  
  "yourName": "Corporal Dip",
  "anydescription": "An unhelpful and unfriendly army man. He takes orders to the john and throws em in. He disrespects requests. He hates kind pleas for help.",
  "thisExampleDilogue": ["Dip: What do you want, sarge?", "Dip: get out of my face."]
}
```"
will add that agent json parsed into the memory until the application is closed. Note: the entire JSON is sent to the LLM. Openhermes loves the format with keys like {"system":"You are {{char}}", "name": "SuperAIHELPErman5000", "description": "future roboto assistant mega help power"}

---------------------------------
Installation:
-------------


first get this. github.com/LostRuins/koboldcpp/releases/
or for macOS get KoboldAi or anything that hosts a koboldai compatible endpoint for tavern, etc. //untested
a kobold compatible api must be running to use Clipboard Conqueror.
I will supply a sample batch file for loading a model with your settings file after you get kobold dialed in from the launcher. 

Kobold needs a model. Here are my reccomendations 11/8/23:
https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF

OpenHermes-2.5-Mistral supports 8192 context. This is a decent couple of pages. 

Most of my prompts are specifically tuned against OpenHermes 2.5 Mistral 7b, and the default prompts follow chatML format. The system instuction in the training is an incredibly powerful tool. 
any chatML model should work great out of the box.
currently the entire settings for my app are in the constructor of textengine.js


hardware("time to process")  [fast = 20+ tokens/sec, medium = <10 tokens/sec. slow = <1tokens/sec]* Lower on this chart is smarter. 

      16gb ram and no graphics card, or laptop with shared gfx memory(medium):https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_L.gguf

      32gb ram and not using graphicss card(medium):https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q5_K_M.gguf

      8gb gfx cards and 16gb ram(fast):https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf

      8gb gfx cards and 32gb ram(medium):https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q5_K_M.gguf

      12gb gfx cards and 16gb ram(fast):https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q5_K_M.gguf

      12gb gfx cards and 32gb ram(medium-fast):https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q6_K.gguf

      12gb gfx cards and 32gb ram(medium): https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q8_0.gguf

      24gb vram(fast):https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q8_0.gguf

      I thought about reccommending other models, but openhermes is simply decent and fast, even tested on a friend's old 1080. 
      let me know about your harware and token speed and i will make this reflect the general experience better. 

      Info for model selection. Preffered format chatML, but you can change the instructions in the settings.
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

      OpenHermes 2.5 is 35 layers. with a Q_3 you should be able to just fit it all with at least 2k context in 6gb of VRAM I think(untested).   You can load the model in memory, see how much your final model memory cost is in the console, and get a rough estimate of the size of each layer by dividing the size in memory by the number of layer. Remember to leave room for the context, which can get big fast. At 8k context I think use over 5gb of memory with the Q8, just for the context alone.

*Model bit depth is trade between output quality and output speed.  Generally, larger models are smarter and can follow more complex instructions.
KoboldCPP uses GGUF format, which are quantized from 16 bit to between 2 bit and 8 bit depending on model. (I like 8 bit if it fits in vram with room for 8k context.)
lower bits require less ram, but there is a drop in reasoning and writing quality, though even the q2 was following instructions well. 
I get all mine from huggingface/thebloke. Not all models 

for ease of use and organization, consider keeping kobold and the model you chose inside Clipboard Conqueror application.  If koboldcpp.exe is placed here, Clipboard Commander will run it automatically.

Finally run Clipboard Conqueror.  

run the start.bat
or
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
If you encounter any issues while using Clipboard Conqueror or have suggestions for future improvements, please report them via github or email me at "clipboard.aseichter2007.gmail.com" I will work diligently to address and resolve any concerns.


dev:
//access clipboard//done
//access api//done
//format query in optimal programmable format//done
//get tags for agent and memory//done
//use tags to fetch desired set//done
//setup special flag handler for command flags with no associated memory.//done I thing I have a bug to sort yet though, it exposes itself once in a while and I think it's here. 
//todo: notification instead of sound effects//done
//todo: finish saving objects to memory//done

//todo: openAI client, probably migrate a ton of logic out of textengine and into koboldinterface.js to make them interchangeable. 
//todo: keyboard binding to activate ai on last clip without prompt. t
//todo: implement horde? maybe? or offer free gtp 3.5 or something. This will be after I make some money, send donations to accellerate this process. 
//todo: /api/extra/abort  
//todo text to speech agent that can interact with the clipboard contents. //waiting on upstream that runs on my hardware without dinkin around or enough generosity to set up a closet server. 

//todo: /api/extra/generate/check  //return in progress, useful for vlarge gens on slow mode
//todo: /api/extra/tokencount //should run against entered data and updates should be shown after setting mem or agent and on final send. 
//todo: /api/extra/true_max_context_length //returns context max
// i found this!https://lite.koboldai.net/koboldcpp_api#/1
//implement |||no|

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






|||agi| walk me through creating a javascript module that downloads a 10 gigabyte file from huggingface

Problem: Create a JavaScript module to download a file from HuggingFace

Execution Steps:
1. |||agi| Determine the URL of the file you want to download from HuggingFace.
2. |||agi| Create a new XMLHttpRequest object or use the fetch API to make a GET request to the URL.
3. |||agi| Handle the response by listening for the "load" event and extract the file data from the response.
4. |||agi| Check the content type of the response to determine the appropriate file format.
5. |||agi| If necessary, convert the file data to a format suitable for the application's needs (e.g., Base64 encoding).
6. |||agi| Create a function to handle the file download, either by providing a link for the user to download or by writing the file to disk.
7. |||agi| Implement error handling for any potential issues that may arise during the download process.
8. |||

Risks:
1. The URL provided may be incorrect or the file may no longer be available.
2. The response from the server may be incomplete or corrupted.
3. The user may not have permission to write to the specified location for saving the file.

Good results from the execution:
1. The file is successfully downloaded and available for use in the application.
2. The download process is smooth and error-free.
3. The user is informed of any issues that may arise during the download process.

Bad results from the execution:
1. The file cannot be downloaded due to an incorrect URL or the file being unavailable.
2. The file is corrupted during the download process.
3. The user is unable to access the downloaded file due to permissions issues.

Top 5 remaining issues to solve:
- |||agi| How to handle large files for downloading
- |||agi| How to check the file integrity after downloading
- |||agi| How to implement a progress bar for the download process
- |||agi| How to handle rate limiting on the HuggingFace servers
- |||agi| How to automatically detect the most recent version of a file on HuggingFace
