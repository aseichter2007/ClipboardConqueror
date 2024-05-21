![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Batch Chain Agents
=============================
[Home](readme.md), [Install](install.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), 

---
Multi agent chaining and complex agent workflows:
---
Clipboard Conqueror is a no code and non code testing, basic multi-agent chat framework ready to operate on or in any context. 

CC supports chaining agents sequentially like:

```
|||agentFirst,@agentSecond,#@agentThird,#@@anotherAgentThirdandFourth,##@agentFourth,@@@c| and on. 
```
Special initializers "! > } ^ % ]  ;" are supported when batching. "]" and ";"change the names in the chatlog, so you can prompt for response and then change to a name suitable for the next agent to recognise. 
"c" or "continue" crates a chatlog in proper format to keep consistent conversation context for the various agents. .  


- "@" executes, and it is reccommended to use specifically targeted chaining agents which I have not developed yet. I'm hoping someone has used superAGI and can point me a direction.

- "#" Skips execution, or whatever you like, as everything else in Clipboard Conqueror it can be adjusted to your satisfaction in setup.js.

I like to think of it like feeding a tape, so I can send in the manager every so often to keep track like ###@##@##@#@@@#manager, who knows what you will find with workflows like this that can be shifted and set up in moments and executed by small LLMs in minutes. The Grok api should blaze. 

If you're quick you can just paste out each step. 



return the debug log by copying  |||dw| or |||debugWrite| and paste.  The first turn is the initial query followed by what this contains, and the final output is not contained with d.  "dw" returns the middle for debugging your bot interactions. 


endpoints, prompt formats, parameter sets, and agents as defined in setup.js or 0endpoints.json. can be used and chained by name like |||@textGenWebUiChat,@hightemp,c,@c|

Remember that changing backends overwrites other settings so always use the turn order:

>cf, backend, format, paramSet, $, %, ^,  

these first in this order, they overwrite the whole subset. 

- cf clears the chat history without stopping execution for a clean history chain. 

Then the rest overwrite single values:

>settings:1, !, }, >, ;, 200, prompts,

and finally c
>@c| or chat,@chat| 

on the end, 
- or set cs to get multiple responses with static chat history, it just raises an additional flag to c, no collisions to worry about.


It's janked in there like a stack of lego on the end of the system prompt. prompts set after c will be sent as part of the last message in the history. This might be useful somehow for inserting knowlege to talk about and stay on task, or persistent instructions but it's typically the last assistant response the agent lands after as part of the turn.


```
|||@tgwchat,#@chatGPT3|initial query
```
In this case, Captain Clip will be sent first to Kobold with the initial query. The output from Kobold then goes to TextGenWebUi openai api, and the out from there to ChatGPT 3.5 turbo though the openAI api. Here, there are no agents defined for the second and third queries. Add them like |||@tgwchat,#@chatGPT3,@writer| will send the writer agent to TextGenWebUi completions. If we added c,@@c then c is built up like a chatlog and sent in the system prompt.

Chaining Captain Clip or AGI will stop the chain of execution. (agents with instructions to write invokes can cause the chain to stop)

```
|||cf, kobold, #@kobold, @ooba, @%chatML, #@%llama3, frank, #@frank, !Frank, #@!Frank,@abe, @!Abe,  c, @@c| Fight.
```
This query will build a multiturn conversation, Frank's response(kobold api) to the initial query is sent to abe marked with chatML format(Text Gen Webui completion api), abe's response to the query is sent to frank(with llama 3 markup on kobold api), and the whole conversation has history with c,@@c


|||c,write| sends the history to the clipboard ready to paste. 

|||dw| will contain the chatlog after it is cleared with |||cc| or |||clearHistory|.
- if you copy |||dw|, you will get back the conversation steps as carried by c. Or it's in the clipboard history as well, I never used that really, sorry clipboard history champs. This app absolutely pollutes it. I gotta rebuild in c# to fix that.
- |||dw| is a writing command so it causes the hang where you have to copy text with no invoke. I gotta figure this bug out...


"c" carries the chat context forward optionally like #@#@c.
```
|||cot, !Query Node, @! Rick Sanchez @; Rick's Inner thoughts| 
```
Will present the query node as a discrete turn labeled Rick's Inner thoughts in the chat log for the second turn. 


Sending names like !Name @!Name, or setting any prompt segment like |||PROMPT:{{segment}}| will hold prompt format overrides, interfering with multiple backend support, use  noFormat: true as a key, (example: setup.js line 100) per endpoint, to prevent sending jinja or kobold adapters and preserve the default instruct format supplied by the backend from the model config when using multiple models with different instruct sets.

Handle % format changes first, like |||%alpaca, !name| or the format change overwrites the name change. 

; and ]
---
;assistant,
]user,

these activate the history, and they change the history name as it is built, allowing you to rename a response to direct the next agent's response to the content. 

The history only applies on the next turn where it is enabled. 

---

[Home](readme.md), [Install](install.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), 