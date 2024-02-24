![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Readme
=============================
Clipboard Conqueror is a multi-platform omnipresent copilot alternative. Currently requiring a kobold united or openAI compatible back end, this software brings powerful LLM based tools to any text field, the universal copilot you deserve. It simply works anywhere. No need to sign in, no required key. 

Provided you are using local AI, CC is a data secure alternative integration provided you trust whatever backend you use.   

*Special thank you to the creators of KoboldAi, KoboldCPP, llamma, openAi, and the communities that made all this possible to figure out. 

If you are unhappy with my syntax, almost everything is configurable. 

With Clipboard Conqueror, you can leverage AI abilities, invoke it by copying `||| "request"` 

Local AI responds after copying commands or requests for information.

There is a wealth of information below and in this repo.
All you really need to know is copying ||| with Clipboard Conqueror and Koboldcpp running will send any text you copy with that ||| to local AI.

[Install Node](https://nodejs.org/) Clipboard Conqueror requires Node and NPM to run. 

Clipboard Conqueror reccomends [KoboldCPP](http://www.github.com/LostRuins/koboldcpp/releases/) for Windows users. Kobold does the actual AI LLM processing, Clipboard Conqueror bridges kobold with the clipboard for use anywhere. 

[OpenHermes 2.5 Mistral 7B 16K Context.GGUF](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF)

Get a model that fits in your graphics card or system ram, more details in installation, faaar below. 

Download this repo. 

Windows:
---
Run z-instalCC.bat

Run z-runCC.bat

I like z-runCCnodeMon.bat in case it's hung funny you can type rs in the console to restart. 

linux or Mac:
---
y-linux-mac-install.sh

y-linux-mac-start-no-nodemon.sh

For openAi access 
--------

put your key into the apropriate endpoints in setup.js and invoke with |||chatGPT3| or change the default in 0endpoints.json. |||chatGPT4| will hit turbo with defaults, change the target model in 0endpoints.json or setup.js.  For now, default behavior does not write the config files.

Kobold or local AI are not required to use Clipboard Conqueror, but it requires paid openAi api credit to use their service. OpenAi access has been included to ensure anyone can master prompting with my tools, on a budget that fits their current hardware.  If CC really gets rolling and meets my needs, I will host a dedicated cluster of my own to ensure free access for anyone, on secure and transparent terms with the excess. AI will change everything at an incredible rate, everyone deserves the best tools we can get our hands on in these trying times. 

Please help me share Clipboard Conqueror with everyone. 

Copy, Conquer, Paste.
--------

I solemnly promise that this application and at least one compatible backend will function in the absence of internet connectivity.
One of my design inspirations for this application is to spread LLM models to as many computers as possible. I want to ensure at least one intact system is recovered by future archaeologists, an incredible time capsule of culture, science, and data.  We should be sending intelligent boxes to deep space too. Our Knowledge and posterity must not go to waste. 

This project is also a bit of a last ditch effort to remain software oriented, I need income. I've been looking for work and getting nothing but scams.
Please, if you get good use from this application, especially in a commercial setting, consider supporting me, or hiring me. I'm a new father and not having stable income is just frying my brain. 
``````
patreon.com/ClipboardConqueror

ko-fi.com/aseichter2007

|||make these links in markup for a .md file
``````
Captain Clip: Here are the links formatted as Markdown for a .md file:

1. [Patreon](https://patreon.com/ClipboardConqueror)
2. [Ko-fi](https://ko-fi.com/aseichter2007)

I have provided the tools to supply your own custom always ready assitant on your terms. You tip your delivery guy, consider my contribution to your workflow, it will really help my family. Please drop a coin for your coder.


Quick Start Jam, Reccomended:

[![YouTube Video](https://i.ytimg.com/vi/fcM8dDtVTYQ/hqdefault.jpg)](https://youtu.be/fcM8dDtVTYQ)

Quick demo: 

[![YouTube Video](https://i.ytimg.com/vi/n8tQJlne3qs/hqdefault.jpg)](https://youtu.be/n8tQJlne3qs)



Using Clipboard Conqueror to mutate content, and Installation: 


[![Youtube Video](https://i.ytimg.com/vi/NqnpBi0MHsc/hqdefault.jpg)](https://youtu.be/NqnpBi0MHsc)


 - *note in this video I mention context leaking with Context Shift, that was my mistake, for a bit I had a bug where re was persisting unexpectedly. 

Large Language Models:
---

LLMs are powerful tools but it's important to understand how they work. The input text is vectorized and put through matrix transformations and a big complex vector is built, and then each word is added to that vector as it is chosen in turn one at a time, with some randomity to get better speech flavor, until the next probable token is a stop token or max length is exceeded.

In an LLM every word is a cloud of numbers that represent how that token relates to every other and some phrase structures or collections of tokens. By turning words into numbers, we can then beat them with math and determine which tokens probably are appropriate to go next.

It doesn't really reason, it doesn't really think, it amplifies patterns and guesses using probabilities and random, each next word chosen with such accuracy and literate complexity that kind of functionally it simulates having thought.  An important note: LLMs return a list of probable tokens and their probability, and after the LLM has done the math, one word is selected by user set rules from the returned set.  

LLM models don't make the choice, sampling happens after and then the machine is asked for the next tokens to choose from, ev-ery -to-ke-n - however the words are sliced.

It's weird, but they have no state, it's data-crunch-out every word in turn, no real consideration. 

Use them effectively within their limits to succeed in 2024.

You can go find the right data and paste the text at an LLM and it can use that data, but no LLM should be trusted implicitly, just as a first resort, right here aboard the Clipboard Conqueror.


Productivity:
-------------
Clipboard Conqueror makes the process of accessing an LLM simple and efficient in any workspace.

-  Locally run models can be trusted with private data and do not phone home or report any metrics. Local LLMS are private and secure. 

- Proofread documents, test explanations, get feedback, find inspiration, or just run a game of dungeons and dragons with your friends.

Clipboard Conqueror provides a whole toolbox of predefined assistants, ready to work for you.  



- |||agi|"AI Generate Instructions" will help you execute any operation you ask for help with. Captain Clip does well too, but this is based on the kobold agi script and is superior to a simple ask. 

- |||stable| will write you an image prompt for use in stable diffusion automatic 1111
This identity and some other cards were found on chub.ai, some are my own or significant customizations, or simply found out in the web.

- |||tot|"tree of thought" will expand and include near concepts, questions, or ideas to produce a more comprehensive solution


Save agents on the fly to store, sort, query, think, review, or just tell you jokes or anything you can  ask for, really. 

Key Features:
--------------
* Locally run large language model support with KoboldCPP for powerful, secure, text processing.
* Combines user-supplied text with AI output for precise customization.
* Supports multiple languages and contexts for diverse applications. Not all LLM models are multilingual, some configuration may be required.
* Targeted agents for specific tasks.
* Quick saving of new agents and information for later use.


Desktop Platforms:
--------------------
Clipboard Conqueror is designed to work seamlessly across multiple platforms including Windows, macOS, and Linux. It has been gently tested to ensure stability and compatibility.

Usage:
------

1. Enter `|||` followed by your request or command. Pipe "|" can be typed by pressing shift + backslash (above enter, left of enter for European layouts).
2. Copy the text to your clipboard. After a few moments, you should get a notification and the response is ready to paste:
   ```
   ||| "Ahoy Captain, open the airlock, we're coming aboard the Clipboard Conqueror"
   ```
   Copy the line above. Wait for the notification to paste the AI response. Sometimes my notifications are a little funny but I have about a thousand layers of mess running all the time so it could be something related to streaming stuff. Also errors have been reported with linux notifications and sounds. 

   ```
    |||introduction|
   ```
   will tell you about LLMs and how they work, and explain the settings that are useful to control generation. Ready to paste immediately. Currently after using a command that writes data from the application, "|||agent,write|", "|||help|", "|||introduction|" you must copy text with no invoke token to clear a bugged state. 

    ```
    |||character,temperature:1.4|What is a square root and what dishes and sauces are they best served with?
    ```
    aside: there does not appear to be a too hot for general queries, is this thing on? Hermes is simply not having any square root soup. 
    This is exemplary; character is not a default prompt. Captain Clip will respond. Try:

    ```
    |||frank,user| "Hello, Frank. You can't hide from me. Show yourself."
    ```
    ```
    |||stable| write a prompt for a picture of a beautiful forest with pixies playing with animals.
    ```

    Stable Diffusion prompts with ease. The logo picture at the top was generated using this tool, automatic1111 and controlnet. 



    ```
    |||frank,mem|Frank, how many fingers am I holding up?
    ```

    Ask Frank Drebin if he has information contained in tag "mem"

    Note: Agents, memory agents, and instructions can be combined like |||agent1,agent2|.
    Three pipes, agent, one pipe. No spaces. Any agents or settings must be closed with one pipe or they will be sent as text to the default agent (Captain Clip).

    ```
    |||2700| write a long story bout a picture of a story where an artist draws a picture of a story about an artist being written by an author
    ```
    - sets the max response length to 2700. Also works like |||agent,setting:0.5,1000| just a number is always max response length.

    ```
     |||temperature:1.1| be more unpredictable, but only 10%
     ```
    - sets the temperature to 1.1. This works for any setting, e.g., top_p, min_p. supports :true :false. Currently temperature and max length are the only settings used for openAi compatible endpoints. 
    ```
      |||re| what is this code doing? 
      ```
    - return copy at end of prompt inserted after user prompt.
    - sends the thing you copied last after "what is this code doing? \n \n", copied text here at the end of the user prompt" and sends the Captain Clip assistant in the system prompt.
    ```
      |||rf| what is this code doing? 
    ```
    - return last copied first in prompt inserted like an agent at the level rf is placed relative to other agents ex |frank,rf,tot| copied text comes after frank agent in the system prompt. Clip will go after in this case because of how he is added, but you can do |||default,rf| if you want Clip's prompt first.
   

    ```
    |||memory:save| writes or overwrites an identity called memory with this text: "writes or overwrites an identity..."
    ```

     - Note - I reccomend editing the json directly for complex agents, especially if you are testing prompts to use in production. 

    ```
    |||mem:save| SYSTEM: take on the role of {{character}}, description:  description.
    ```
    
    

    >Save is the only command supported like `|||agent:save|{"description":"description"}` JSON format works but the syntax has to be perfect; recommend avoiding wrapping with {} by hand.
    
    //depreciated, no longer parsing input. 

     - |||coder,mute,memone,stevesdayoff|
     > This command will insert the coder character card, the mute card, memone, and stevesdayoff. The AI will receive each of these.
     Note, only coder is a standard card.

     It's useful to save information like

    ```
    |||memory:save|thisFunction(variable){ return variable + variable * variable; }
    ```

    and then use it like

    ```
    |||coder,memory| describe the function of the code and suggest descriptive variable names. 
    ```
    ```
    |||memory| walk me through the expected output if "variable" is equal to 10. 
    ```

    ```
    |||memory:delete| removes memory, defaults will return when Clipboard Conqueror is restarted. 
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

    ```
    |||agent:file|
    ```
    The file command saves that agent to the 0identities.json file. Currently only supports agents and will save settings values as agents if you tell it to.  Currently the only way to delete filed agents is to delete them from 0identites.json or delete the json entirely to restore defaults next run.

  Currently after using a command that writes data from the application, "|||agent,write|", "|||help|", "|||introduction|" you must copy text with no invoke token to clear a bugged state. 


--------
OpenAi Compatible 
-----
  Clipboard Conqueror supports infinite configurable endpoints. You can add as many as you like. 
  CC supports multiple parameter sets to ease multiple backend configurations.
  I think it can support anything that takes either a string or chat messages style input.

  Move your favorites to the top and invoke them by |||$| from top to |||$$$... at bottom. Or just use the key names like |||kobold| or |||koboldChat|  

  ```
  |||$|this message will go to the first configured endpoint;
  ```

  ```
  |||$$|this will go to the second configured endpoint
  ```
  ```
  |||ooba|this will go to the TextGenerationWebUi endpoint because I called it ooba for quick access.
  ```
  Add endpoints and parameters in settings.js or 0endpoints.json if settings files are enabled. File writing is off by default, the settings files are more for use with binaries.

  When using these commands, be aware that data may be sent to outside systems. This may be a breach of your company's data protection policy.
```
|||model:gpt-3.5-turbo| 
```
  will change the target openai model. names must be exact. I dont know them or have a gpt key to test this feature. I put the ones that arent marked depreciating in |||gpts,write|  This is curently superceded by models set on the endpoint configuration. I think this can still be used if you don't specify a model in the endpoint configuration.

  |||$,set| will behave as expected and send to the compatible endpoint until |||set| to release. //todo: determine if this is broken.


  You can safely use any other command to query sensitive data, and depending on your configuration, gpt commands can be sent locally as well. 


  Advanced Example:

  ```
  |||newAgent:save| {  
    "yourName": "Corporal Dip",
    "anydescription": "An unhelpful and unfriendly army man. He takes orders to the john and throws em in. He disrespects requests. He hates kind pleas for help.",
    "thisExampleDilogue": ["Dip: What do you want, sarge?", "Dip: get out of my face."]
  }

  ```
  will add that agent json parsed into the memory until the application is closed. Note: the entire JSON is sent to the LLM. Openhermes loves the format with keys like {"system":"You are {{char}}:", "name": "SuperAIHELPErman5000", "description": "future roboto assistant mega help power"}

   super advanced save: 
   ---
   
      |||CurrentText:save,re,LastCopy:save|CurrentText
  - if the re flag is set, saved agents come from the last copy. This allows saving an agent from the current text that is distinct from the lastCopy agent which comes from the last clipboard contents, and allows saving agents while making an initial query like:  


  ```
  |||re,frank,dataCopiedLast:save| Hey get a load of this!
  ```

  - This will save the last copy to the clipboard into dataCopiedLast and send the frank system agent and user "Hey get a load of this!" followed by the last copied text to the LLM. Note, tags between the | | parse left to right. It matters where re is placed
  
  ``` 
  |||frank,dataCopiedLast:save,re| Hey get a load of this! 
  ```
  - will save "Hey get a load of this!" to dataCopiedLast because re is not activated until after the :save.

  ```  
  |||CurrentText,LastCopy| query combined next like this. 
  ```

 System commands
 ---

```
 ||||System command sends before captain clip | "user query"
```
 - note 4 "|" to send a custom system prompt with the default agent
```
 |||writer| system command sends before writer| "user query"
```

 This syntax lets you command the system directly at the same time you send as user. 

 ```
 |||| assistant gives really weird bogus advice: | how can I become as pretty as OPs mom?
 ```

Advanced Commands:
---
```
||||System: Command first before Clip agent.|  text from <user> in the internal chain
```

^^^^note 4 "|" , and the close on the end above but only 3, then agents|, then system, then closing "|" below.

```
|||writer| Command First.| User: after agent writer
```
System applies set formatting like:
```
"prompt":"<|im_start|>[\"###": Command First.\",[\"SYSTEM: Write a lengthy prose about the requested topic. Do not wrap up, end, or conclude the story, write the next chapter.\\n \\n Story:\",\"\"]]<|im_end|>\n<|im_start|>user:\n User: after agent writer\n\n<|im_end|>\n<|im_start|>assistant:\n
```

"###" is a configurable key, and seems to ease the use of alpaca models and doesnt seem to upset anything as it comes first. 

```
|||re,frank|this text is invisible to :save| 
```

|||set|
---

```
|||rf,frank,set,joe|these system commands persist| query goes out. 
```

 - set will save all agents before it as a persistent default, and include any system command sent at this time. in this case joe does not persist with the next simple ||| 
 
 once set "|||"{query} will behave as 
 
 "|||(that last copy saved with rf),frank|these system commands persist|"{query}
 
 until |||set| is copied again, clearing the set agents. 

 While set, |||any,additional,agents| can be sent and add after the set agents.

 |||rf,set| is extremely useful for repeated queries against the same copied data. 

 while set ||||any| any replaces the old system instruction before agents this time only.
 
 - again note 4 pipes before system insert. 


Multi agent chaining and complex agent workflows. 
---
Clipboard Conqueror is a no code multi-agent framework ready to operate on or in any context. 

CC supports chaining agents sequentially like:

```
|||agentFirst,@agentSecond,#@agentThird,#@@anotherAgentThirdandFourth,##@agentFourth,@@@c,@@@d| and on. 
``````
 "@" executes, and it is reccommended to use specifically targeted chaining agents which I have not developed yet. I'm hoping someone has used superAGI and can point me a direction.

 "#" Skips execution, or whatever you like, as everything else in Clipboard Conqueror it can be adjusted to your satisfaction in 0instructions.json.

 I like to think of it like feeding a tape, so I can send in the manager every so often to keep track like ###@##@##@#@@@#manager, who knows what you will find with workflows like this that can be shifted and set up in moments and executed by small LLMs in minutes. 

 If you're quick you can just paste out each step. 

 "d" or "debug" like ,@@@@debug saves a growing output of each turn if not skipped like ##@#. this example returns only the third to final of the 6 total interactions. The final output is never captured, the first input can be captured like |||agent,@agent,d,@d| @ chains always execute second.

 
 return the debug log by copying  |||dw| or |||debugWrite| and paste.  The first turn is the initial query followed by what this contains, and the final output is not contained with d.  "dw" returns the middle for debugging your bot interactions. 

 "c" or "continue" works similarly to send the log internally to the LLM with minimal markup "</s>"  between messages to build more of a chatlog.  

an agent saved like |||lm:save| or |||gpt:save| always go to the openAI compatible or openAI api endpoints, so you should be able to chain different backends like 
```
|||@lm,#@gpt|
```
in this case, Captain Clip will be sent first, to koboldAI, the output then goes to LMstudio,  and the out from there to ChatGPT api. 

Chaining Captain Clip or AGI is not advisable cause Captain Clip likes to say "|||help|" and I have implemented this functionality in kind of a funky way so extra invokes will pile up and stop execution, or rather, Clip will pull the help to the clipboard if he sends the help suggestion. 

It seems this triggers the same bug as write. If Clipboard Connqueror seems stuck, copy a little text with no invoke, and try your query again. 

It might be that I was using dw though, and that is a writing command so it causes the hang where you have to copy text with no invoke. I gotta figure this bug out...


Prompt Formats:
---
Change the instruction format like :
```
|||FORMAT|chatML
or
|||FORMAT|alpaca
etc.
```
Formats must exist in 0formats.json, the name must match the object key.


Or you can set individual prompt segments one at a time like:
```
|||PROMPT:startTurn|<|im_start|>

|||PROMPT:endSystem|<|im_end|>\n 

|||PROMPT:endUser|<|im_end|>\n

|||PROMPT:endTurn|<|im_end|>\n

|||PROMPT:systemRole|system\n

|||PROMPT:userRole|user\n 

|||PROMPT:assistantRole|assistant\n

//this example sets up basic ChatML formatting. For alpaca I reccommend setting the format strings in the role positions. StartTurn starts all turns; system, user, and assistant.  StartTurn is a bad place for "### Instruction:"

|||PROMPT:prepend|You are a helpfull assistant\n\n

|||PROMPT:systemAfterPrepend| still before agents

|||PROMPT:post| after agents

|||PROMPT:systemMemory| spot for persistent system context after agents

//These set system prompt segments.

|||PROMPT:userMemory| spot for persistent user context before user query

|||PROMPT:start|start of the AI response

```
and special for jinja formatter only:

```
|||PROMPT:special|.rstrip() //Probably not needed for typical use.

```
 
None of these are case sensitive. |||SySTEMmemOrY| is the same as |||systemmemory|||. There are a few options to hit these as well, such as username or name, endturn or end, etc. I've hopefully reached easy to remember without adding confusion.

//todo: fix this: Also supports setting all instructions like: 
```
|||FORMAT:save|//todo: find the bug, this isnt working, you have to pick them up one at a time like above.
{"system":"<|im_start|> ","prependPrompt":"assistant:","postPrompt":"after agents","memoryStart":"spot for universal memory","memoryPost":"<|im_end|>\n<|im_start|>user:\n ","finalprompt":"<|im_end|>\n<|im_start|>assistant:\n","responseStart":"start of the AI response"}
```

note: current behavior removes chatml markup "<|any|>" from the ai response to ease use of non chatML models with default settings. For the most part monster merge models respond very well, but will markup character dialog in a way I find undesirable. Comment line 24 "text = this.removeChatML(text);" in responsengine.js to stop this behavior. Response engine is ready for function calls, let me know what would be useful.

---
Installation:
---
Currently there are no built binaries and Node is required to run Clipboard Conqueror.

|||how to to install node for normies. Use markdown suitable for a .MD for links

1. Assumption: You are seeking instructions on how to install Node.js for someone with little technical knowledge and would like the explanation to be in a Markdown format suitable for a .md file.

    Step 1: Visit the official Node.js website [Get Node](https://nodejs.org/) and download the installer that corresponds to your operating system. Node 20 is sufficient.

    Step 2: Double-click on the downloaded installer file to start the installation process.

    Step 3: Follow the on-screen prompts to complete the installation. Ensure to check the box for "Add to PATH" during the installation to have Node.js available globally on your system.

    Step 4: Once installed, test Node.js by running the following command in your terminal or command prompt: `node -v`




2. Clipboard Conqueror is most powerful with [KoboldCPP](http://www.github.com/LostRuins/koboldcpp/releases/),or a kobold compatible API. [openAI compatible API](https://lmstudio.ai/) doesn't expose as many settings. CC works with either or both! or just an openAI key. Or all three! I'd love to hear how you connect your choice of backend for a compatibility list.


    For macOS get KoboldAi or anything that hosts a kobold united compatible endpoint for tavern, etc. //Notes below for linux and mac, thank Herro.


    a kobold or openAI compatible api must be running to use Clipboard Conqueror for free.
    I supply a sample batch file for loading a model with your settings file after you get kobold dialed in from the launcher. 

3. Kobold needs a model. Here are my reccomendations 12/5/23:[OpenHermes 2.5 Mistral 7B 16K Context.GGUF](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF)

     
     
      ```
      OpenHermes-2.5-Mistral 7b 16k.gguf supports 16384 context.
      This is a decent few pages. 
      If it seems slow reduce your context to 8k, if the problem persists, select a lower Quantization.

      Most of my prompts are specifically tuned against OpenHermes 2.5 Mistral 7b.
      The default prompts follow chatML format. 
      any chatML model should work great out of the box. 
      Psyfighter2 works pretty well too, though it doesn't nail the instructions as well being a storytelling model. 
      ```

Finally, download Clipboard Conqueror from this repository. 

windows:
---

run z-instalCC.bat

after it finishes run:

z-runCC.bat

Mac/Linux
---

y-linux-mac-install.sh
y-linux-mac-start-no-nodemon.sh

or just run from the folder:
npm i

npm start      
(windows)

or 

npm run linux

Troubleshooting:
---

If Clipboard Conqueror closes on launch, ensure you have Node installed and have run an install.bat or sh.

If Clipboard Conqueror seems unresponsive, make sure Koboldcpp is running and type rs then press enter in the Clipboard Conqueror console window to restart the application especially if any errors are displayed. 


If CC seems hung, copy text with no invoke and try again. 

currently the entire settings for my app are in setup.js, uncomment or add the correct instruction format to the keys required for non ChatML model support. Set instruct in 0endpoints.json for easy switching.
setup.js writes files for each type of setting. If formatting errors are introduced in those files, they are overwritten with the defaults. 


-----
Choosing A Model:
--------


hardware("token speed")  [fast = 20+ tokens/sec, medium =  ~<10 tokens/sec. slow = <2tokens/sec]* Lower on this chart is smarter. Partial offloading the video ram is possible but costs speed. 

```
In the world of inference, some macs can be medium with even very large models. Metal. 
```
16gb ram and no graphics card, or laptop with shared gfx memory(slow, notable quality loss): 

[Q3_K_M](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf)VRAM used: 5429.57 MB (model: 3301.56 MB, context: 2128.01 MB) + a bit for ingestion, use lower quants for less than  16gb  RAM consider Rocket 3B//untested


.

Less than 8gb gfx cards(fast-medium, notable quality loss): 

[Q3_K_M](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf)VRAM used: 5429.57 MB (model: 3301.56 MB, context: 2128.01 MB)


.

8gb gfx cards(medium, prompt ingestion might not fit in mem = slow consider as low as 4k context if faster): 

[Q5_K_M 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q5_K_M.gguf)VRAM used: 7691.57 MB (model: 5563.56 MB, 8k context: 2128.01 MB)//I think this data is for Q6


.

12gb gfx cards (fast): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf) total VRAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

.

24gb vram(fast): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf) total VRAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

.

32gb ram and not using graphicss card(slow): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf)  RAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

other models:
---------
minimum hardware:[rocket_3B](https://huggingface.co/TheBloke/rocket-3B-GGUF) should be chatML I havent messed with it much.

[Nous-Hermes-2-SOLAR](https://huggingface.co/TheBloke/Nous-Hermes-2-SOLAR-10.7B-GGUF) total VRAM used: 11652.35 MiB (model: 8294.06 MiB, 16k context: 3358.29 MiB) This might be my new favorite. 

[Solar 10B](https://huggingface.co/TheBloke/SOLAR-10.7B-Instruct-v1.0-GGUF) this one is impressing me. solar-10.7b-instruct-v1.0.Q6_K.gguf total VRAM used: 10123.63 MiB (model: 8294.05 MiB, 8k context: 1829.58 MiB) Works great with default chatML instruct

[psyonic-cetacean](https://huggingface.co/TheBloke/psyonic-cetacean-20B-GGUF) psyonic-cetacean-20b.Q4_K_M.gguf total VRAM used: 22001.74 MiB (model: 11395.73 MiB, 8k context: 10606.00 MiB)
 

For large models, set the batch size lower in kobold to keep the working context memory requirements smaller. I like 128 these days. 5 threads on a 6 core system to preserve responsiveness.
         

  >I thought about recommending other models, but OpenHermes 2.5 is simply decent and fast, even tested on a friend's old 1080, under one minute for complex queries and with no gfx acceleration on 16gb ram its painfully slow to ingest, a few minutes for a large query and response.  smaller batches help you be sure its not hung up. 

  >let me know about your hardware and token speed and i will make this reflect the general experience better. 

  >Info for model selection. Preferred format chatML, but you can change the instructions in the settings.
  
  Model sizes:
 - 3B needs at least 4GB RAM total ram + vram (gfx card must support cuda or the amd one so super old stuff isn't that useful)
 - 7B needs at least 8GB RAM
 - 13B needs at least 16GB RAM
 - 30B needs at least 32GB RAM
 - 65B needs at least 64GB RAM

        And they all need some space for the context. GPU offloading puts the layers of the model into the memory of your graphics card. Fitting the whole model into VRAM makes things way faster. 
  
  For reference, at 2048 context in Q4_0*, a 6GB Nvidia RTX 2060 can comfortably offload:
  - 32 layers with LLAMA 7B
  - 18 layers with LLAMA 13B
  - 8 layers with LLAMA 30B

  >OpenHermes 2.5 is 35 layers. with a Q_3 you should be able to just fit it all with at least 2k context in 6gb of VRAM I think(untested).   You can load the model in memory, see how much your final model memory cost is in the console, and get a rough estimate of the size of each layer by dividing the size in memory by the number of layers. Remember to leave room for the context, which can get big fast. At 8k context I think use over 5gb of memory with the Q8, just for the context alone.

>*Model bit depth is trade between output quality and output speed.  Generally, larger models are smarter and can follow more complex instructions.
KoboldCPP uses GGUF format, which are quantized from 16 bit to between 2 bit and 8 bit depending on model. (I like 8 bit if it fits in vram with room for 8k context.)
lower bits require less ram, but there is a drop in reasoning and writing quality, though even the q2 was following instructions well. 
I get all mine from huggingface/thebloke. Not all models support chatML format, and more wont perform optimally without their expected format.  To change things around look toward the bottom of setup.js and delete 0instructions.json, I packaged the settings there to enable comments, if there are .json comments, someone should tell me.

Quantization:
-----
Here is the download on quantization as I understand it.

You take a 16 bit number, and you don't shorten it.

You collect all the numbers that are constituent or very near to the token vector, and you cut those off small and package them together in a table referenced by the full number

The collected tokens retain some information from their original vector, they arent simply collected, they are compressed with some loss.

Then you cut off bits from the full number's end but preserve its beginning and vector orientation, so rather than a rife bullet and bullseye you have instead a shotgun shell with shot to hit a wide target on the vector. The words still fly roughly the right direction, but there is more variance in how they land, leading to loss of which word was optimal and instead landing on a whole cloud of "should be close enough" Effectively the same words are presented at 2 bit and 16 bit when the samplers run, but they have less fidelity in the model, many words weight the same on the final selection instead of the natural best word having a highest value.


Because we choose from that selection randomly anyway, the detectable loss is very low, but lower bit depth is generalizing more words and concepts together more closely than 16 bit.

Think about a radius, a ray pointing from center out inside a sphere. Unquantized it is a line to a word. Quantization makes that ray become a cone with the wide base on the sphere's surface centered on the original vector point. Words inside the cone are treated like the same word, but that is slightly oversimplified.

extreme quantization works because even if you make the sphere sides a binary choice, you're still beating enough tokens against it that the result is narrowed to a small enough vector to hit the concepts, but it loses accuracy and ability to be specific other than by luck and elimination of actively poor words rather than choosing best like an unquantized or less compressed model.

Because 8Bit still carries enough data to maintain distinct accuracy even packaged, the loss is effectively negligible as the distinctions aren't as aggressively bundled and boiled down.

Base models vs Finetunes:
----
In the world of LLMs there are two kinds of models. 

Base models - these models are completion models, they respond well to: "sure, here is a code block containing fizzbuzz in javascript:" it will complete the statement you start.

Finetuned models can, depending on how they have been tuned, make sense of more direct orders: "write Fizzbuzz in javascript". Not all finetunes are instruct models, read model descriptions to learn what a model is designed for.

Finetuning is creating a lora, but often the entire model is shipped rather than the lora, I expect because loras will be model specific or wildly unpredictable when applied to different bases.

Base models are not fully cooked, they have some training room remaining to allow finetuning of the output. 

Finetunes are finished models that can't be further trained without detrimental effects. 

The models I have recommended are all finetunes, because you can speak to them more naturally and get good results. Base models take a little more thinking to interact with till you're used to it. 


Model Merges
---
Some models, "monster merges" are different model layers shuffled together with various levels of strategy and I think a bit of finetuning on top.

Other techniques average the weights of a model with another. 

Then there is distillation, which I have yet to dig into. 

Model merges often result in odd sizes, so not all models fit the typical 3/7/13/30/65 progression. 


Linux/Mac Notes. 
----

  ![harrro](https://styles.redditmedia.com/t5_20v1i8/styles/profileIcon_snoo94b3e9ee-40b0-4d50-976b-f84339866e74-headshot-f.png?width=256&height=256&crop=256:256,smart&s=99c1f9c5ba8353614aca16055afd851209dba8ca)
  level 4
  harrro:

  Ok, got it working after some debugging on my Ubuntu Linux system.

  The npm start was exiting immediately without output (I added a setInterval at the end to keep the app alive to debug) but noticed that no clipboard events were firing.

  Turns out there is a problem with the clipboard-event library on Linux: https://github.com/sudhakar3697/node-clipboard-event/issues/20

  For some reason, that issue was closed without a fix but to fix it, I ran this command from the root folder of this app as people suggested in that Github issue (the command sets the clipboard-listener binary to be executable): chmod +x node_modules/clipboard-event/platform/clipboard-event-handler-linux

  In that issue, people suggest adding that command before your app starts in your npm start entry in package.json (but you'd only do this on Linux and possibly Mac).

  After that, it worked well. Copy started generating with kobold and paste had the contents of the result as expected.

  The notification when generation finished also worked but there is no audible sound.


Finally run Clipboard Conqueror.  
----
run z-installCC.bat

run z-runClipboardConqueror.bat or Mac_Linux_Start.bat

or

//open terminal at folder and run
npm i
npm start or npm run linux for mac/linux




I provide sampleLaunchKoboldBat.bat and hermes16.kcpps to ease making quick launch shortcuts. They need to be changed to match your system, and the bat expects to be in the same folder as both koboldcpp.exe and hermes16.kcpps.  hermes16.kcpps contains a full path that must match the model location, I recommend loading and saving the file to change the target. Also, lately I have found smaller batch sizes is better when I am pushing my memory limits, 512 and higher end up putting context on the hard drive at large contexts.

--------------------------------

Begin elevated computeration. 
--------------------------------

Copy this line:
```
|||introduction|
```
paste in a text field, a big one. Read the introduction. It's jam packed with information.
three pipes invokes the AI. If you want to skip the introduction you can get right to things like:
```
|||what is an inverse square root and how is it useful. 
```
Have fun and remember you can always ask for
```
|||help|
```


//I'll just leave this here https://www.reddit.com/r/bookmarklets/comments/d8pqe2/toggle_design_mode/

Settings Conqueror is poor and should be avoided. It will mess your settings up.
---------------------------------
This application will get binaries when I am happy with it, for now it's a very basic GUI for changing the settings, except for your openAI key which goes in 0openAiKey.json and isn't touched. No need to expose keys to the browser, one line in one file with one option can't be done wrong.

Settings Conqueror is currently delayed while I think hard about how to make user definable function calling and how to make that a neat package that is easy to use. 

Settings Conqueror should work fine for instructions and endpoints, but is adding extra formatting in the agents page that generally seems ignored by most models but I am very unhappy that it's not coming out predictably. My expectation is I am double stringifying somewhere, or bad formatting in the default agents is frying me. Or both. It pretty much works though. 

It also needs node, and can be run with the install and run batch files in the folder.


Bug Reports and Feature Requests:
---------------------------------
If CC seems hung, copy text with no invoke a couple times and try again. 

If you encounter any issues while using Clipboard Conqueror or have suggestions for future improvements, please report them via github or email me at "clipboard.aseichter2007@gmail.com" I will work diligently to address and resolve any concerns.

I'm chasing a bug where after |||list| or |||agent,write| the next copy is not parsed, but is stored, preventing the same thing being copied and invoking the AI.  Workaround: copy text without an invoke to clear the stored copy and allow a "fresh" copy that will activate the parsing engine. 

Saving agents like |||re,name:save|"more details" is likely to mess you up, it will save the last text you copied into "name" rather than "more details"

Please use Clipboard Conqueror responsibly and respect copyright and laws in your country while generating content. Misuse of this tool might lead to unintended consequences and breaches of privacy or intellectual property rights. I hold no responsibility for the data that passes through this tool on any system.  


Project License:
--

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Additional Terms:

While the MIT License permits free use, modification, and distribution, I kindly request that you refrain from creating works containing my verbatim code without permission from the original author (aseichter2007). In part because it's terrible code. You're welcome to bits of it, but please don't distribute it in full as your own work. If you have any inquiries regarding modifications or feature requests, please contact me at clipboard.aseichter2007@gmail.com or open an issue.

Your understanding and respect for these terms are appreciated.


Additional Resources:
[AMD GPU resources](https://llm-tracker.info/howto/AMD-GPUs)
[The HitchHiker's guide to LLMs](https://osanseviero.github.io/hackerllama/blog/posts/hitchhiker_guide/)

[LLMs, how do they work?](https://bbycroft.net/llm) this is a cool visualization of how the machine does the magic.

[OpenHermes 2.5 Mistral prompting ideas](https://www.reddit.com/r/LocalLLaMA/comments/18j59g1/you_are_a_helpful_ai_assistant/)]

//todo: link assorted knowledge banks. 


dev:


//access clipboard//done
//access api//done
//format query in optimal programmable format//done
//get tags for agent and memory//done
//use tags to fetch desired set//done
//setup special flag handler for command flags with no associated memory.//done
 I thing I have a bug to sort yet though, it exposes itself once in a while and I think it's here. 
//todo: notification instead of sound effects//done
//todo: finish saving objects to memory//done
//fast switch instruction sets //done
//todo: group chain interacting so you can batch like |||@summary,@writer|//done, way cooler than that.

//todo: openAI client, probably migrate a ton of logic out of textengine and into koboldinterface.js to make them interchangeable. //half I should implement it properly but it's such a mystery without keys. 


//todo: keyboard binding to activate ai on last clip without prompt. //maybe paid, I don't want to make it too easy to do all the linkedin tests, and a ready line to copy is the same.//done, |||on| //multiplatform esc key reading is tricker than I expected. 

//todo: /api/extra/abort on esc and return //waiting on backends coalesing and a good doc for openAI compatibles 

//todo: implement insertion after cursor and response streaming. //this would be easy in windows if I wasnt hung up on multiplatform support. 

//todo text to speech agent that can interact with the clipboard contents. //waiting on upstream that runs on my hardware without dinkin around or enough generosity to set up a closet server or at least new hard drives, I'm too full to experiment with a new OS. 

//decline: use case? I guess return tokens like|||tokens| so you can see if it will fit... ok. undecline: todo: /api/extra/generate/check  //return in progress, useful for vlarge gens on slow mode
//todo: /api/extra/tokencount //should run against entered data and updates should be shown after setting mem or agent and on final send. //I'm gonna wait and do this after I figure out more completion backends and make it work for oogabooga and others.

// i found this! https://lite.koboldai.net/koboldcpp_api#/1


//todo: implement some kind of update check and notification.//half, update bat.



//pass, just close CC it launches in one second//implement |||no| //uh oh, better comment needed. I should learn from this someday. Waaait, it's coming back to me. |||no| will disable parsing on the next run for transporting instructions, though its much easier to just error it off like "||| move this without invoking||| ||| " recommend extra at the end.
//this needs reworking. its setting off that write bug too.


release!//oh snap I got excited and went. //beta release in motion.

//todo: savesettings and getsettings. overwrite settings like |||settings,write| to paste ' |||settings,save| `{ the settings serialized json }` ' which can be edited in place and copied to save the settings. //partial, it's bugged

//todo: write agents or custom settings to file. 

//really waffling, its simply good like >user: //todo: per character rolling memory to allow more natural exchanges and enable rp.//decline for now. I should do a proper conversation builder.

//todo: settings bulk in and out //partial, prompt format swithcing is in, needs instructions switching to support more completion backends. 


//CC should not make outbound requests other than openAI, security is important. I'm thining about a branch without openAI just for data safety but until someone asks I won't split main. 

//todo: make a lambda script to setup a lambda to serve a daily charachter, run a continuous contest so people vote for tomorrows char. |||dailycandidate,rate|10, assign up to ten points for the candidate last retrieved with |||dailycandidate| provies random from server. Points are gained by and blind?
//todo: build agent portal with easy to copy and use workflow. 
//todo: mystery agent of the day. vulnerability: the description is visible in the kobold terminal
//does anyone really want this?

todo: a server for a mystery agent to play twenty questions against. If you guess the character you get points for the premium prompt store. Monthly tokens on a subscription, no need for phoning out, just copy from the page. Profit sharing intent, but core first.

//todo: Implement FunkyTown, you kids will never guess what this does. 


This info belongs here somewhere.
// GSM8K is a dataset of 8.5K high-quality linguistically diverse grade school math word problems created by human problem writers

// HellaSwag is the large language model benchmark for commonsense reasoning.

// Truful QA: is a benchmark to measure whether a language model is truthful in generating answers to questions.

// Winogrande - Common sense reasoning
// `
