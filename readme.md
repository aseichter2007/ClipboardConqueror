![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Readme
=============================
[Install](install.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)

---

Clipboard Conqueror is a multi-platform omnipresent copilot alternative. Currently requiring a kobold united or openAI compatible back end, this software brings powerful LLM based tools to any text field, the universal copilot you deserve. It simply works anywhere. No need to sign in, no required key. 



*Special thank you to the creators of KoboldAi, KoboldCPP, Meta, openAi, and the communities that made all this possible to figure out. 


Pipe in Clipboard Conqueror to leverage cutting edge Artificial Intelligence.

Invoke it by copying three pipes and a question or command:  `||| "your request"` 

Local LLMs will produce a response, paste it directly wherever you want.

If you are using local LLMs, CC is a data secure alternative integration provided you trust whatever backend solution you use.   

There is a wealth of information linked below and in setup.js.
All you really need to know is copying ||| with Clipboard Conqueror and Koboldcpp running will send any text you copy with that `|||` to local AI.

When Copying code or text containing "|" symbols, you can use 5 pipes "|||||". Or change the default invoke settings. This will send the default agent with your query.

to banish the default agent, invoke like "`|||e||`", or send a prompt with your query like "`|||writer|`"

If you are unhappy with my syntax, almost everything is configurable in setup.js. 


Please help me share Clipboard Conqueror with everyone. 

`Table of Contents:`
---

[install](install.md)

[Choosing a model](choosingAModel.md)

[Basic Use](useClipboardConqueror.md)

[Agents And Operators](agents.md)

[Prompt Formatting](promptFormatting.md)

[Backend Switching](multipleEndpoints.md)

[Chaining agents](agentChaining.md)

Copy, Conquer, Paste.
--------

I solemnly promise that this application and at least one compatible backend will function in the absence of internet connectivity.
One of my design inspirations for this application is to spread LLM models to as many computers as possible. I want to ensure at least one intact system is recovered by future archaeologists, an incredible time capsule of culture, science, and data.  We should be sending intelligent boxes to deep space too. Our Knowledge and posterity must not go to waste. 

I've been looking for work all year and getting nothing but scams and my hopes up.
Please, if you get good use from this application, especially in a commercial setting, consider subscribing to my kofi, or hiring me. I'm a new father and not having stable income is just frying my brain. 
``````
patreon.com/ClipboardConqueror

ko-fi.com/aseichter2007

|||make these links in markup for a .md file
``````
Captain Clip: Here are the links formatted as Markdown for a .md file:

1. [Patreon](https://patreon.com/ClipboardConqueror)
2. [Ko-fi](https://ko-fi.com/aseichter2007)

I have provided the tools to supply your own custom always ready assitant in any application on your terms. You tip your delivery guy, please drop a coin for your coder, it will really help my family.

    BTC: 0x92cB00214fd137E73Fa85eE80e04232D8b14Ea5a

    DOGE: bc1qu0zp2y8gwmqelmq5radscdltjxy23t4u0rfx6s


---
Quick Start Jam, Reccomended:
---

[![YouTube Video](https://i.ytimg.com/vi/fcM8dDtVTYQ/hqdefault.jpg)](https://youtu.be/fcM8dDtVTYQ)

Quick demo: 

[![YouTube Video](https://i.ytimg.com/vi/n8tQJlne3qs/hqdefault.jpg)](https://youtu.be/n8tQJlne3qs)



Using Clipboard Conqueror to mutate content, and Installation: 


[![Youtube Video](https://i.ytimg.com/vi/NqnpBi0MHsc/hqdefault.jpg)](https://youtu.be/NqnpBi0MHsc)


 - *note in this video I mention context leaking with Context Shift, that was my mistake, for a bit I had a bug where re was persisting unexpectedly. 


---
Key Features:
--------------
* Control every part of LLM prompts without needing to switch context to a different tab, window, or program. It works in any text box. 

* Write and quickly call targeted agents for specific tasks.

* Quick saving of new agents and information for later use.

* Tailors text with proper formatting for precise AI responses.

* Locally run large language model support with KoboldCPP for powerful, secure, text processing.

* Supports multiple backends, diverse prompt configurations, and even a no code framework for prototyping chain-of-actor or chain-of-thought prompts for multi-step agent development pipelines.

* Supports multiple languages and contexts for diverse applications. Not all LLM models are multilingual, some configuration may be required.

---
Productivity:
-------------
Clipboard Conqueror makes the process of accessing an LLM simple and efficient in any workspace.

- Quickly prototype prompts for producuction environments, great for testing errata quickly. 
- Locally run models can be trusted with private data and do not phone home or report any metrics. Local LLMS can be private and secure. 

- Proofread documents, test explanations, get feedback, find inspiration, or just run a game of dungeons and dragons with your friends.

- Clipboard Conqueror provides a whole toolbox of predefined assistants, ready to work for you.  

Save agents on the fly to store, sort, query, think, review, or just tell you jokes or anything you can  ask for, really. 


Desktop Platforms:
--------------------
Clipboard Conqueror is designed to work seamlessly across multiple desktop platforms including Windows, macOS, and Linux. It has been gently tested to ensure stability and compatibility.

--------
OpenAi Compatible 
-----
  Put your key into the apropriate endpoints in setup.js and invoke with |||chatGPT3| or change the default in 0endpoints.json. |||chatGPT4| will hit turbo with defaults, change the target model in 0endpoints.json or setup.js.  Default behavior does not write the .json settings files.

  Kobold or other local inference engines are not strictly required to use Clipboard Conqueror, but it requires paid openAi api credit to access ChatGPT. OpenAi access has been included to ensure anyone can master prompting with my tools, on any hardware.  If CC really gets rolling and meets my needs, I will host a dedicated cluster of my own to ensure free access for anyone on secure and transparent terms, with the excess. AI will change everything at an incredible rate, everyone deserves the best tools we can get our hands on in these trying times. 

-----

Large Language Models:
---

LLMs are powerful tools but it's important to understand how they work. The input text is vectorized and put through matrix transformations and a big complex vector is built, and then each word is added to that vector as it is chosen in turn one at a time, with some randomity to get better speech flavor, until the next probable token is a stop token or max length is exceeded.

In an LLM every word is a cloud of numbers that represent how that token relates to other words and phrase structures. By turning words into numbers, we can then beat them with math and determine which numbers probably are appropriate to go next.

It doesn't really reason, it doesn't really think, it amplifies patterns and guesses using probabilities and random, each next word chosen with such accuracy and literate complexity that kind of functionally it simulates having thought.  An important note: LLMs return a list of probable tokens and their probability, and after the LLM has done the math, one word is selected by user set rules from the returned set.  

LLM models don't make the choice, sampling happens after and then the machine is asked for the next tokens to choose from, ev-ery -to-ke-n - however the words are sliced.

It's weird, but they have no state, it's data-crunch-out every word in turn, no real consideration. 

Use them effectively within their limits to succeed in 2024.

You can go find the right data and paste the text at an LLM and it can use that data, but no LLM should be trusted implicitly, just as a first resort, right here aboard the Clipboard Conqueror.



Linux/Mac Notes. 
----
  The notification when generation finished workes but there is no audible sound. Consider investigating how to define one in the toast notification config object in copyconqueror.js line 43.


Quick launch shortcuts:
---


I provide sampleLaunchKoboldBat.bat and hermes16.kcpps to ease making quick launch shortcuts. They need to be changed to match your system, and the bat expects to be in the same folder as both koboldcpp.exe and hermes16.kcpps.  hermes16.kcpps contains a full path that must match the model location, I recommend loading and saving the file to change the target. Also, lately I have found smaller batch sizes is better when I am pushing my memory limits, 512 and higher end up putting context on the hard drive at large contexts.

--------------------------------
[Install Clipboard Conqueror](install.md)

Begin elevated computeration. 
--------------------------------

Copy this line:
```
|||introduction|
```
paste in a text field, a big one. The introduction is jam packed with information.

three pipes invokes the AI. If you want to skip the introduction you can get right to things like:
```
|||what is an inverse square root and how is it useful. 
```
Have fun and remember you can always ask for
```
|||help|
```
and paste a quick review of common Clipboard Conqueror functions. 


//I'll just leave this here https://www.reddit.com/r/bookmarklets/comments/d8pqe2/toggle_design_mode/
---

Settings Conqueror is poor and should be avoided.
---
 It will mess your settings up. Current defaults avoid writing files because my use case is hampered by the development impact of said files. Settings files and Settings Conqueror are more for use with binaries that I haven't got around to yet. 

---------------------------------
Settings Conqueror is currently delayed while I think hard about how to make user definable function calling and how to make that a neat package that is easy to use. It will get binaries when I am happy with it, for now it's a very basic GUI for changing the settings. 


It also needs node, and can be run with the install and run batch files in the folder.


Bug Reports and Feature Requests:
---------------------------------
If CC seems hung, copy text with no invoke a couple times and try again. 

If CC is batching more than you expect, you're missing a "," in your command. 

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

If Clipboard Conqueror is helping you get paid, I would very much appreciate a donation.

Additional Resources:
---
[AMD GPU resources](https://llm-tracker.info/howto/AMD-GPUs)
[The HitchHiker's guide to LLMs](https://osanseviero.github.io/hackerllama/blog/posts/hitchhiker_guide/)

[LLMs, how do they work?](https://bbycroft.net/llm) this is a cool visualization of how the machine does the magic.

[OpenHermes 2.5 Mistral prompting ideas](https://www.reddit.com/r/LocalLLaMA/comments/18j59g1/you_are_a_helpful_ai_assistant/)]

This info belongs here somewhere.
// GSM8K is a dataset of 8.5K high-quality linguistically diverse grade school math word problems created by human problem writers

// HellaSwag is the large language model benchmark for commonsense reasoning.

// Truful QA: is a benchmark to measure whether a language model is truthful in generating answers to questions.

// Winogrande - Common sense reasoning
// `

1.	GRADE (Goal, Request, Action, Details, Example): Structures prompts to be goal-oriented and actionable.
2.	RODES (Role, Objective, Details, Example, Sense Check): Enhances precision and relevance with a final sense check.
3.	Chain of Thought (CoT): Encourages step-by-step articulation of reasoning processes.
4.	Zero-Shot and Few-Shots Learning: Prompts AI without or with minimal examples to demonstrate adaptability.
5.	ReAct (Reason and Act): Combines reasoning and task-specific actions in one prompt.
6.	Instruction Tuning: Fine-tunes AI on specific instructions for better direct response performance.
7.	Interactive Prompts: Engages AI in a dynamic back-and-forth interaction to refine outputs.
8.	TRACI (Task, Role, Audience, Create, Intent): Tailors prompts by considering task specifics and audience.
9.	TRAACI (Task, Role, Analyze, Audience, Create, Intent): Adds an analysis step to TRACI for deeper insight.
10.	Scaffolded Prompts: Provides a series of incremental prompts for complex or educational tasks.
11.	SMART (Specific, Measurable, Achievable, Relevant, Timebound): Applies goal-setting principles to prompt engineering.
12.	Prompt Chaining: Uses sequential prompts for complex or multistep tasks.
13.	Contextual Prompting: Incorporates rich context for more accurate and relevant responses.
14.	Contrastive Prompts: Uses contrasting examples to clarify what to do and what to avoid.
15.	Meta Prompts: Prompts about creating or optimizing other prompts.
16.	Dynamic Prompting: Adapts prompts based on real-time feedback or changes.
17.	Multimodal Prompts: Uses multiple types of data inputs to enrich AI interactions.
18.	Ethical Prompting: Ensures prompts adhere to ethical guidelines and cultural sensitivities.
19.	Hierarchical Prompting: Structures prompts from general to specific for layered information.
20.	Guided Imagery Prompts: Guides AI to generate detailed visual content or descriptions.
21.	Recursive Prompts: Uses output from one prompt as input for the next to refine responses.
22.	Adaptive Learning Prompts: Adjusts prompt complexity based on AI’s performance or user’s progress.
23.	Cross-Modal Prompts: Transforms inputs across different modalities (e.g., text to audio).
These summaries are designed to help you easily remember the essence of each prompting framework.

//todo: link assorted knowledge banks. 


dev:
---
https://www.npmjs.com/package/keypress


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
//really waffling, its simply good like >user: //todo: per character rolling memory to allow more natural exchanges and enable rp.//decline for now. I should do a proper conversation builder.//done, |||c,@c|

//todo: openAI client, probably migrate a ton of logic out of textengine and into koboldinterface.js to make them interchangeable. //half bugged SSL and I havent found the right answer to inform me what I am missing. 

//todo: keyboard binding to activate ai on last clip without prompt. //maybe paid, I don't want to make it too easy to do all the linkedin tests, and a ready line to copy is the same.//done, |||on| //multiplatform esc key reading is tricker than I expected. 

//todo: /api/extra/abort on esc and return //waiting on backends coalesing and a good doc for openAI compatibles. also reading esc key is tricker than I expected, gotta find the right thing.

//todo: implement insertion after cursor and response streaming. //this would be easy in windows if I wasnt hung up on multiplatform support. 

//todo text to speech agent that can interact with the clipboard contents. //waiting on upstream that runs on my hardware without dinkin around or enough generosity to set up a closet server or at least new hard drives, I'm too full to experiment with a new OS. //kobold now supports llava and SD. I gotta find enough peace to rewrite this entire app in c# to support audio and images.

//decline: use case? I guess return tokens like |||tokens| so you can see if it will fit... ok. undecline: todo: /api/extra/generate/check  //return in progress, useful for vlarge gens on slow mode
//todo: /api/extra/tokencount //should run against entered data and updates should be shown after setting mem or agent and on final send. //I'm gonna wait and do this after I figure out more completion backends and make it work for oogabooga and others.


//todo: implement some kind of update check and notification.//half, update bat.

//pass, just close CC it launches in one second//implement |||no| //uh oh, better comment needed. I should learn from this someday. Waaait, it's coming back to me. |||no| will disable parsing on the next run for transporting instructions, though its much easier to just error it off like "||| move this without invoking||| ||| " recommend extra at the end.
//this needs reworking. its setting off that write bug too.

//todo: savesettings and getsettings. overwrite settings like |||settings,write| to paste ' |||settings,save| `{ the settings serialized json }` ' which can be edited in place and copied to save the settings. //partial, agent save is pretty ready to pass in the right stuff, I just need to do the bits to make it go.

//todo: write agents or custom settings to file. //partial, agents, no settings writing yet.

//todo: settings bulk in and out //partial, prompt format switching is in, needs instructions switching to support more completion backends. 

//todo: build agent portal with easy to copy and use workflow. 
//todo: mystery agent of the day. vulnerability: the description is visible in the kobold terminal
//does anyone really want this?


//todo: Implement FunkyTown, you kids will never guess what this does. 

---
[Install](install.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)

