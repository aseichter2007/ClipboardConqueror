![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Readme
=============================
Clipboard Conqueror is a multi-platform omnipresent copilot alternative. Currently requring a kobold united compatible backend, this software brings powerful LLM based tools to any text field, the universal copilot you deserve. It simply works anywhere. No need to sign in. 

*Special thank you to the creators of  KoboldAi, KoboldCPP, llamma, openAi, and the communities that made all this possible to figure out. 


With Clipboard Conqueror, you can leverage AI abilities by invoking it with `|||` and copying commands or requests for information.

I solemnly promise that this application and at least one compatible backend will function in the absence of internet connectivity.
One of my design inspirations for this application is to spread LLM models to as many computers as possible. I want to ensure at least one intact system is recovered by future archeologists, an incredible time capsule of culture, science, and data.  We should be sending intelligent boxes to deep space too. Our Knowledge and posterity must not go to waste. 

This project is also a bit of a last gasp. I've been looking for work and getting nothing but scams.
Please, if you get good use from this application, especially in a commercial setting, consider supporting me. My son will be born next month and debt is already starting to get out of hand. Chronic depression has always kicked my ass, I gotta get some traction and start rolling. 

patreon.com/ClipboardConqueror

ko-fi.com/aseichter2007

|||make these links in markup for a .md file

Captain Clip: Here are the links formatted as Markdown for a .md file:

1. [Patreon](https://patreon.com/ClipboardConqueror)
2. [Ko-fi](https://ko-fi.com/aseichter2007)

With enough support, this app will become extremely useful for anyone. 


Quick Start Jam, Reccomended:

[![YouTube Video](https://i.ytimg.com/vi/fcM8dDtVTYQ/hqdefault.jpg)](https://youtu.be/fcM8dDtVTYQ)

Quick demo: 

[![YouTube Video](https://i.ytimg.com/vi/n8tQJlne3qs/hqdefault.jpg)](https://youtu.be/n8tQJlne3qs)



Using Clipboard Conqueror to Create, and Installation:


[![Youtube Video](https://i.ytimg.com/vi/NqnpBi0MHsc/hqdefault.jpg)](https://youtu.be/NqnpBi0MHsc)


Usage:
------

1. Enter `|||` followed by your request or command. Pipe "|" can be typed by pressing shift + backslash (above enter).
2. Copy the text to your clipboard. After a few moments, you should get a notification and the response is ready to paste:
   ```
   - ||| Clip, say hello!
   ```
   Copy the line above. Wait for the notification the paste. Sometimes my notifications are a little funny but I have about a thousand layers of mess running all the time so it could be something related to streaming stuff. 

   ```
   - |||introduction|
   ```
   will tell you about LLMs and how they work, and explain the settings that are useful to control generation. Ready to paste immediately.
- |||character,temp:0.4|What is a square root and what dishes and sauces are they best served with?
  
     aside: there does not appear to be a too hot for general queries, is this thing on? Hermes is simply not having any square root soup. 
  This is exemplary; character is not a default prompt. Captain Clip will respond. Try:
  ```
  |||frank,user| "Hello, Frank. You can't hide from me. Show yourself."
  ```

  ```
  |||stable| write a prompt for a picture of a beautiful forest with pixies playing with animals.
  ```

  Stable Diffuson prompts with ease. The Picture at the top was generated using this tool. 



    ```
  |||frank,mem|Frank, how many fingers am I holding up?
    ```
   - Ask Frank Drebin if he has information contained in tag "mem"

   Note: Agents, memory agents, and instructions can be combined like |||agent1,agent2|.
   Three pipes, agent, one pipe. No spaces. Any agents or settings must be closed with one pipe or they will be sent as text to the default agent (Captain Clip).

   ```
   |||2700| write a long story bout a picture of a story where an artist draws a picture of a story about an artist being written by an author
   ```
   - sets the max response length to 1200. Also works like |||agent,setting:0.5,1000| just a number is always max response length.

   ```
   |||temperature:1.1| be more unpredictable, but only 10%
   ```
   - sets the temperature to 1.1. This works for any setting, e.g., top_p, min_p. Use 1 and 0 to set true/false //true/false untested.
   ```
    |||coder,re| what is this code doing? 
   ```

   - sends the thing you copied last, prepended by "what is this code doing?" and sends the coder assistant prompt to help frame the output format and preconceptions.

   ```
   |||memory:save| writes or overwrites an identity called memory with this text: "writes or overwrites an identity..."
   ```

     - Note - extensive formatting causes errors. This can be sent JSON, but it's really fiddly and the saved identity is just stringified back out anyway. Advanced example way below. 

   ```
   |||mem:save| SYSTEM: take on the role of {{character}}, description:  description.
   ```
   More formatting is more potential for errors, and errors don't make it into memory.
   

   >Save is the only command supported like `|||agent:save|{"description":"description"}` JSON format works but the syntax has to be perfect; recommend avoiding wraping with {} by hand.

   - |||coder,mute,memone,stevesdayoff|
     > This command will insert the coder character card, the mute card, memone, and stevesdayoff. The AI will receive each of these.
     Note, only coder is a standard character.

  It's useful to save information like
   ```
   |||memory:save|thisfunction(variable){ return variable + variable * variable; }
   ```
   and then use it like
   ```
   |||coder,memory| describe the function of the code and suggest descriptive variable names. 
   ```
   ```
   |||memory| walk me through the expected output if "variable" is equal to 10. 
   ```


List is useful for knowing what is available.

   ```
   |||list|
   ```
   The list command sends a list of current agents in memory to the clipboard, ready to paste out immediately.

   ```
   |||mem,write|
   ```
   The write command will copy the entire prompt of all entered agent tags to the clipboard ready to paste, and then copy back under a new name or edited.

Currently after using  a command that writes data from the application, you must copy text with no invoke token to clear an error. 

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
* Locally run large language model support with KoboldCPP for powerful, secure, text processing.
* Combines user-supplied text with AI output for precise customization.
* Supports multiple languages and contexts for diverse applications. Not all LLM models are multilingual, some configuration may be required.
* Can utilize various personas and roles for different tasks.  
* Quick saving of new agents and information for later use.
* Capable of mimicking "voices" and generating unique content.

Supported Platforms:
--------------------
Clipboard Conqueror is designed to work seamlessly across multiple platforms including Windows, macOS, and Linux. It has been rigorously tested and optimized to ensure stability and compatibility.//??!! Dang, that is a complete lie. There are at least 2 bugs I havent nailed down, and I have no idea if this works on linux or mac. Report your findings please. 

Notice://gtp, openai unimplemented. LMStudio is not supported yet either.
--------
When using the |||gtp:3| or |||gpt:4| commands, be aware that data will be sent to outside systems. This may be a breach of your companies data protection policy.

//unimplemented, consider secondary branch to avoid data protection policy issues.

You can safely use any other command to query sensitive data, and depending on your configuration, gtp commands can be sent to LMStudio to run against a larger slower model. //unimplemented
Please use Clipboard Conqueror responsibly and respect copyright and laws in your country while generating content. Misuse of this tool might lead to unintended consequences and breaches of privacy or intellectual property rights. I hold no reponsibility for the data that passes through this tool on any system.  
//implementing this undercuts the mission. Distribute LLMs. 

Project License:

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Additional Terms:

While the MIT License permits free use, modification, and distribution, I kindly request that you refrain from creating derivative works containing my code without permission from the original author (aseichter2007). In part because it's terrible code. If you have any inquiries regarding modifications or feature requests, please contact me at clipboard.aseichter2007@gmail.com or open an issue.

Your understanding and respect for these terms are appreciated.


Additional Resources:
//todo: link assorted knowlege banks. 


Advanced Example:

```
|||newAgent:save| {  
  "yourName": "Corporal Dip",
  "anydescription": "An unhelpful and unfriendly army man. He takes orders to the john and throws em in. He disrespects requests. He hates kind pleas for help.",
  "thisExampleDilogue": ["Dip: What do you want, sarge?", "Dip: get out of my face."]
}

```
will add that agent json parsed into the memory until the application is closed. Note: the entire JSON is sent to the LLM. Openhermes loves the format with keys like {"system":"You are {{char}}:", "name": "SuperAIHELPErman5000", "description": "future roboto assistant mega help power"}

---------------------------------
Installation:
-------------
|||how to to install node for normies. Use markdown suitable for a .MD for links

1. Assumption: You are seeking instructions on how to install Node.js for someone with little technical knowledge and would like the explanation to be in a Markdown format suitable for a .md file.

Step 1: Visit the official Node.js website [Get Node](https://nodejs.org/) and download the installer that corresponds to your operating system. Node 20 is suffucient.

Step 2: Double-click on the downloaded installer file to start the installation process.

Step 3: Follow the on-screen prompts to complete the installation. Ensure to check the box for "Add to PATH" during the installation to have Node.js available globally on your system.

Step 4: Once installed, test Node.js by running the following command in your terminal or command prompt: `node -v`



Clipboardd Conqueror reqires [KoboldCPP](http://www.github.com/LostRuins/koboldcpp/releases/) or a Kobold United model host to be running in order to funcion.


For macOS get KoboldAi or anything that hosts a kobold united compatible endpoint for tavern, etc. //Notes below for linux and mac, thank Herro.


a kobold compatible api must be running to use Clipboard Conqueror.
I will supply a sample batch file for loading a model with your settings file after you get kobold dialed in from the launcher. 

Kobold needs a model. Here are my reccomendations 11/29/23:
https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF

OpenHermes-2.5-Mistral supports 8192 context. This is a decent couple of pages. 

Most of my prompts are specifically tuned against OpenHermes 2.5 Mistral 7b, and the default prompts follow chatML format. The system instuction in the training is an incredibly powerful tool. 
any chatML model should work great out of the box. Psyfighter an xwin_mlewd work great too, though they don't nail the instructions as well. 

currently the entire settings for my app are in the constructor of textengine.js

Finally, download Clipboard Conqueror from this repository. I recommend fresh clones for updates, or you might overwrite your settings. 

-----
Choosing A model:
--------


hardware("token speed")  [fast = 20+ tokens/sec, medium =  ~<10 tokens/sec. slow = <2tokens/sec]* Lower on this chart is smarter. Partial offloading is possible but costs speed. 

```
In the world of inference, some macs can be medium with even very large models. Metal.
```
16gb ram and no graphics card, or laptop with shared gfx memory(slow, notable quality loss): 


[Q3_K_M](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf)VRAM used: 5429.57 MB (model: 3301.56 MB, context: 2128.01 MB) + a bit for ingestion, use lower quants for less than  16gb  RAM consider Rocket 3B//untested


.

Less than 8gb gfx cards(fast-medium, notable quality loss): 

[Q3_K_M](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf)VRAM used: 5429.57 MB (model: 3301.56 MB, context: 2128.01 MB)


.

8gb gfx cards(medium, prompt ingestion might not fit in mem = slow consider 4k context if faster): 

[Q6_K 8k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q5_K_M.gguf)VRAM used: 7691.57 MB (model: 5563.56 MB, context: 2128.01 MB)


.

12gb gfx cards (fast): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf) total VRAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

.

24gb vram(fast): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf) total VRAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)
.

32gb ram and not using graphicss card(slow): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf)  RAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)
``````           

  I thought about reccommending other models, but openhermes is simply decent and fast, even tested on a friend's old 1080, under one minute for complex queries and with no gfx acceleration on 16gb ram its painfully slow to ingest, a few minutes for a large query and response.  smaller batches help you be sure its not hung up. 

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

  OpenHermes 2.5 is 35 layers. with a Q_3 you should be able to just fit it all with at least 2k context in 6gb of VRAM I think(untested).   You can load the model in memory, see how much your final model memory cost is in the console, and get a rough estimate of the size of each layer by dividing the size in memory by the number of layers. Remember to leave room for the context, which can get big fast. At 8k context I think use over 5gb of memory with the Q8, just for the context alone.

*Model bit depth is trade between output quality and output speed.  Generally, larger models are smarter and can follow more complex instructions.
KoboldCPP uses GGUF format, which are quantized from 16 bit to between 2 bit and 8 bit depending on model. (I like 8 bit if it fits in vram with room for 8k context.)
lower bits require less ram, but there is a drop in reasoning and writing quality, though even the q2 was following instructions well. 
I get all mine from huggingface/thebloke. Not all models suport chatML format, and you will have to change some things around in the constructor of textengine.js.

for ease of use and organization, consider keeping kobold and the model you chose inside Clipboard Conqueror application.  If koboldcpp.exe is placed here, Clipboard Commander will run it automatically.//ToDo: detect and run kobold with cc.kcpps
``````
Finally run Clipboard Conqueror.  
run installCC.bat
run runClipboardConqueror.bat
or
//open terminal at folder and run
npm i
npm start



  ![harrow](https://styles.redditmedia.com/t5_20v1i8/styles/profileIcon_snoo94b3e9ee-40b0-4d50-976b-f84339866e74-headshot-f.png?width=256&height=256&crop=256:256,smart&s=99c1f9c5ba8353614aca16055afd851209dba8ca)
  level 4
  harrro:

  Ok, got it working after some debugging on my Ubuntu Linux system.

  The npm start was exiting immediately without output (I added a setInterval at the end to keep the app alive to debug) but noticed that no clipboard events were firing.

  Turns out there is a problem with the clipboard-event library on Linux: https://github.com/sudhakar3697/node-clipboard-event/issues/20

  For some reason, that issue was closed without a fix but to fix it, I ran this command from the root folder of this app as people suggested in that Github issue (the command sets the clipboard-listener binary to be executable): chmod +x node_modules/clipboard-event/platform/clipboard-event-handler-linux

  In that issue, people suggest adding that command before your app starts in your npm start entry in package.json (but you'd only do this on Linux and possibly Mac).

  After that, it worked well. Copy started generating with kobold and paste had the contents of the result as expected.

  The notification when generation finished also worked but there is no audible sound.



--------------------------------

Begin elevated computeration. 
--------------------------------

Copy this line:
```
|||introduction|
```
paste in a text field, a big one. Read the introduction. It's jam packed with information.
three pipes invokes the ai. If you want to skip the introduction you can get right to things like:
```
|||what is an inverse square root and how is it useful. 
```
Have fun and remember you can always ask for
```
|||help|
```


//I'll just leave this here https://www.reddit.com/r/bookmarklets/comments/d8pqe2/toggle_design_mode/
---------------------------------
Bug Reports and Feature Requests:
---------------------------------
If you encounter any issues while using Clipboard Conqueror or have suggestions for future improvements, please report them via github or email me at "clipboard.aseichter2007@gmail.com" I will work diligently to address and resolve any concerns.

I'm chasing a bug where after |||list| the next copy is not parsed, but is stored, preventing the same thing being copied and invoking the AI.  Workaround: copy text without an invoke to clear the stored copy and allow a "fresh" copy that will activate the parsing engine. 

Saving agents like |||re,name:save|"more details" is likely to mess you up, it will include both the copied text and any text surrounding the invoke that you copy with it. 

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
//todo: keyboard binding to activate ai on last clip without prompt. //maybe paid, I don't want to make it too easy to do all the linkedin tests, and a ready line to copy is the same. 
//todo: implement horde? maybe? or offer free gtp 3.5 or something. This will be after I make some money, send donations to accellerate this process. 
//todo: /api/extra/abort  
//todo text to speech agent that can interact with the clipboard contents. //waiting on upstream that runs on my hardware without dinkin around or enough generosity to set up a closet server. 

//decline: use case? I guess return tokens like|||tokens| so you can see if it will fit... ok. undecline: todo: /api/extra/generate/check  //return in progress, useful for vlarge gens on slow mode
//todo: /api/extra/tokencount //should run against entered data and updates should be shown after setting mem or agent and on final send. 
//todo: /api/extra/true_max_context_length //returns context max
// i found this!https://lite.koboldai.net/koboldcpp_api#/1




//implement |||no| //uh oh, better comment needed. I should learn from this someday. Waaait, it's coming back to me. |||no| will disable parsing on the next run for transporting instructions, though its much easier to just error it off like "||| ||| ||| move this without invoking"

release!//oh snap I got excited and went. //beta release in motion.
//premium
//todo: branch to build premium binaries from. premium branch features:
//todo: savesettings and getsettings in premium branch. //premium primary feature is inter session settings. without premium you must overwrite the settings like ||||settings,write| to paste ' |||settings,save| `{ the settings serialized json }` ' which can be edited in place and copied to save the settings. Listen for confirmation. 
//todo: per charachter rolling memory to allow more natural exchanges and enable rp. 
//todo: group chain interacting so you can batch like |||summary,writer|"text" and paste a summary, then you press the invoke key and it advances the chain and gives you the output from writer with the results of summary in the memory//todo: settings bulk in and out
//todo: web api to host login server. 404 defaults to allow normal operation of paid branch users if I decide the server is expensive to run, or I die, or the internet is down. potential vulnerability: blocking in hosts to avoid subscriptoin check. Please pay for the full version of this software, this is my only income. Life is hard. 
//todo: portal site to serve binary download links, take payment and manage your subscription level. Look up rules about re-serving chatgtp api on my key. Consider asp.net, it will just handle users and the front end only feels a little silly, no need for relational mongo or any silliness. Downside, I've never succssfullt hooked up a database right deploying to s2. consider aws lambda for auth,  serverless.  lambda auth has additional challenges
//todo: make a lambda script to setup a lambda to serve a daily charachter, run a continuous contest so people vote for tomorrows char. |||dailycandidate,rate|10, assign up to ten points for the candidate last retrieved with |||dailycandidate| provies random from server. 
//todo: consider price schedule. Leaning towards $2 monthly and $30-60 one time options at checkout.
//todo: build agent portal with easy to copy and use workflow. 
//todo: mystery agent of the day. vulnerability: the description is visible in the kobold terminal


todo: a server for a mystery agent to play twenty questions against. If you guess the character you get points for the premium prompt store. Monthly tokens on a subscription, no need for phoning out, just copy from the page. Profit sharing intent, but core first.

//todo: Implement FunkyTown, you kids will never guess what this does. 



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





###tot#how to make this tool better.

