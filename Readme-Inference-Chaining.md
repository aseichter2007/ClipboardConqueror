![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Batch Chain Agents
=============================
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Setup.js](Readme-Setup.md)

---
Multi prompt chaining and complex prompt workflows:
---
Clipboard Conqueror is a no code and no code execution, basic multi-agent chat framework ready to operate on or in any context. 

CC supports chaining prompts sequentially like:

```
|||promptFirst,@promptSecond,#@promptThird,#@@anotherPromptThirdandFourth,##@promptFourth,@@@c| and on. 
```
Special initializers "! > } ^ % ]  ;" are supported when batching. "]" and ";"change the names in the chatlog, so you can prompt for response and then change to a name suitable for the next prompt to recognise. 
"c" or "continue" crates a chatlog in proper format to keep consistent conversation context for the various agents. .  


- "@" executes, and it is reccommended to use specifically targeted chaining prompts which I have not developed yet. I'm hoping someone has used superAGI and can point me a direction.

- "#" Skips execution, or whatever you like, as everything else in Clipboard Conqueror it can be adjusted to your satisfaction in setup.js.

I like to think of it like feeding a tape, so I can send in the manager every so often to keep track like ###@##@##@#@@@#manager, who knows what you will find with workflows like this that can be shifted and set up in moments and executed by small LLMs in minutes. The Grok api should blaze. 

If you're quick you can just paste out each step. 


### Debug:

return the debug log by copying  |||dw| or |||debugWrite| and paste.  The first turn is the initial query followed by what this contains, and the final output is not contained with d.  "dw" returns the middle for debugging your bot interactions. 

## Changing Endpoints:
endpoints, prompt formats, parameter sets, and prompts as defined in setup.js or 0endpoints.json. can be used and chained by name like |||@textGenWebUiChat,@hightemp,c,@c|

Remember that changing inference endpoints can overwrite other settings so always use the turn order:

>cf, backend, format, paramSet, $, %, ^,  

these first in this order, they overwrite the whole subset. 

- cf clears the chat history without stopping execution for a clean history chain. 

Then the rest overwrite single values:

>settings:1, !, }, >, ;, 200, prompts,

## history or c
>@c| or chat,@chat| 

on the end, 
- or set cs to get multiple responses with static chat history, it just raises an additional flag to c, no collisions to worry about.


The history is janked in there like a stack of lego on the end of the system prompt. 

```
|||frank,@tgwchat,#@chatGPT3|initial query
```
In this case, Captain Clip will be sent first to Kobold with the initial query. 

The output from Kobold then goes to TextGenWebUi openai api,

The out from there to ChatGPT 3.5 turbo though the openAI api. 

Here, there are no prompts defined for the second and third queries. Add them like 
```
|||@tgwchat,#@chatGPT3,writer,@@writer| 
```
will send the writer prompt each step. If we added c,@@c then c is built up like a chatlog and sent in the system prompt. Notice that duplication is required to send the same prompt to sequential inferences. @writer only sends the writer prompt to the second inference.

Chaining Captain Clip or AGI will stop the chain of execution. (prompts with instructions to write invokes can cause the chain to stop unexpectedly.)

```
|||cf, kobold, #@kobold, @ooba, @%chatML, #@%llama3, frank, #@frank, !Frank, #@!Frank,@abe, @!Abe,  c, @@c| Fight.
```
This query will build a multiturn conversation, Frank's response(kobold api) to the initial query is sent to abe marked with chatML format(Text Gen Webui completion api), abe's response to the query is sent to frank(with llama 3 markup on kobold api), and the whole conversation has history with c,@@c


|||dw| will contain the chatlog after it is cleared with |||ch| or |||clearHistory|.
- if you copy |||dw|, you will get back the conversation steps as carried by c. Or it's in the clipboard history as well, I never used that really, sorry clipboard history champs. This app absolutely pollutes it. I gotta rebuild in c# to fix that.
- |||dw| is a writing command so it causes the halt where you have to copy a second time for your query to send.


"c" carries the chat context forward optionally like #@#@c.

The history only appears and builds after turns where it is enabled. use |||sc| to skip a turn writing to the history while sending the history. 


Sending names like !Name @!Name, or setting any prompt segment like |||PROMPT:{{segment}}| will hold prompt format overrides, interfering with multiple backend support, use  noFormat: true as a key, (example: setup.js line 100) per endpoint, to prevent sending jinja or kobold adapters and preserve the default instruct format supplied by the backend from the model config when using multiple models with different instruct sets.

Handle % format changes first, like |||%alpaca, !name| or the format change overwrites the name change. 

; and ]
---
;assistant, 
- when chaining prompts, ";" doesn't apply, rename user with ">" to name the incoming response in the turn. 

]user,
- changes the user name as sent in the history. Does not change the name for the current turn. 


>|||cf, !`Query Node`, >`user`, ]`summer`, @!`Rick Sanchez`,@>`Rick Sanchez's Inner Thoughts`,@~`An adventure?`, @c|  Hey lets go on an adventure, grandpa.


This command set will present the Query Node response as labeled Rick's Inner thoughts as the user turn for the second inference, as well as change the original query to summer. 
these activate the history, and they change the history name as it is built, allowing you to rename a response to direct the next agent's response to the content. 

turn one:
>"prompt": "<|start_header_id|>system<|end_header_id|>\n\n<|eot_id|><|start_header_id|>`user`<|end_header_id|>\n\n  Hey lets go on an adventure, grandpa.<|eot_id|><|start_header_id|>`Query Node`<|end_header_id|>\n\n""

turn two:
>"prompt": ""<|start_header_id|>system<|end_header_id|>\n\n<|eot_id|><|start_header_id|>`summer`<|end_header_id|>\n\n  Hey lets go on an adventure, grandpa.\n\n<|eot_id|><|start_header_id|>`Rick Sanchez's Inner Thoughts`<|end_header_id|>\n\nAs we embark on this adventure, I must admit that I'm feeling a bit older than usual today. The journey ahead of us seems long and winding, filled with unexpected twists and turns.<|eot_id|><|start_header_id|>`Rick Sanchez`<|end_header_id|>\n\n`An adventure?`"

- note that `;Rick's Inner thoughts,` does not appear but does activate the history. When chaining, the response is always sent as user or set with ">". 

Response:

>Ha! There's no such thing as an adventure, Morty. There's just survival. And if you're lucky, maybe you'll find something worth surviving for. Now let's get moving before things get any worse.



Useful Prompting Strategies:
---
### These prompt strategies can be looked up and implemented. I have a Chain of Thought prompt `|||cot|` designed for multi-turn use that may not exactly fall under the definition, and a Tree of thought prompt `|||tot|` designed for single inference queries. 

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


---

[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Setup.js](Readme-Setup.md)