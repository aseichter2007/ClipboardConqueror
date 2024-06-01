![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - General Use
=============================

[Home](readme.md), [install](install.md), [Choosing a model](choosingAModel.md), [Prompt Reference](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)

Configuration:
---
setup.js contains all the settings. 


The Clipboard Conqueror format is very configurable, but always adheres to the following formula:

>`text before`(invocation"`|||`") optional agents and commands (optional split "`|`")  optional system prompt (optional split "`|`") user text (optional assistant dictation "`~~~`") optional start of assistant response (optional close assistant "`~~~`") continue user text (`text before` goes at the end. )

"!@# query" could be valid, "123ai+ query" could be valid, and "{!?!?!} agents (8)^ quick prompt (8)^ query" could valid, but there is no setting to change the order. 

Personally I like pipes |||agents|quick prompt|user query ~~~ start assistant response. The default. 






Using Clipboard Conqueror:
---
1. Enter `|||` followed by your request or command. Pipe `|` can be typed by pressing `shift + backslash` (above enter, left of enter for European layouts).
2. Copy the text to your clipboard. After a few moments, you should get a notification and the response is ready to paste:
  ```
  ||| "Ahoy Captain, open the airlock, we're coming aboard the Clipboard Conqueror"
  ```
  `Copy the line above.` Wait for the notification to `paste the AI response.` Sometimes my notifications are a little funny but I have about a thousand layers of mess running all the time so it could be something related to streaming stuff. Also errors have been reported with linux notifications and sounds. 

  ```
  |||introduction|
  ```
  This is a writing command, it provides immediately ready to paste text from this application. It will tell you about LLMs and how they work, and explain the settings that are useful to control generation. Ready to paste immediately. Currently after using a command that writes data from the application, "|||agent,write|", "|||help|", "|||introduction|" `the next copy made will not send` text to the AI. `Copy your command again`, it should work the second time. If not, `ensure you are only copying one ||| invoke` with your text. 

  ```
  |||character,temperature:1.4|What is a square root and what dishes and sauces are they best served with?
  ```
  aside: there does not appear to be a too hot for general queries, is this thing on? Hermes is simply not having any square root soup. 
  This is exemplary; character is not a default prompt. Captain Clip will respond. Try:

  ```
  |||frank,!Frank,user| "Hello, Frank. You can't hide from me. Show yourself."
  ```
  Here we have set the assistant name to Frank, by prepending the desired name with an exclaimaiton point, as well as included his character card. Llama-3 is particularly good with the assistant name set. Set names persist until changed or CC is restarted. 

There are 6 special operators for the `|||agents|` segment, that start with the symbol, and end with the next comma "," (agentSplit).

    - "%" format, like |||%chatML, agents|, do this one first if you use it, it overwrites the others. Valid formats are stored in setup.js
    - "!" assitant name
    - ">" user name
    - "}" system name
    - "~" start of assistant response, "~~~" overwrites "~".
    - "^" change params for api, overwrites current api parameter settings.
    - "`" the backtick or grave symbol changes the system prompt format. Supports "json","markup","partial", or none. 

  `"%}^>!" all persist until overwritten.`  all valid entries for "%" and "^" can be used without the prefix operator, but will then also set endpoints, generation parameter sets, and prompt formats sharing the name. This allows quick accesss while preserving flexibility. 

  - Note: "`:`", the setting break, is not supported inside these operators, and will cause trouble. If you need that for your assistant name, change settinglimit or add it to the prompt format in setup.js promptFormats. Similar for comments.

>|||`json, %chatML, ! Rick, > Morty, writer, } Narrator's notes| Rick answers morty's questions.| Where are we going today, grandpa?  

This query is formatted like:

>"prompt": "<|im_start|> `Narrator's notes`\n{\"system\":\"` Rick answers morty's questions`.\",\"`writer`\":\"Write a lengthy prose about user's topic. Do not wrap up, end, or conclude the narrative, write the next chapter.\\n \\n\"}<|im_end|>\n<|im_start|> `Morty`\n Where are we going today, grandpa?<|im_end|>\n<|im_start|> `Rick`\n"

  
  Clipboard Conqueror inserts the data to assemble a complex query in seconds. 

  ```
  Anywhere. |||`none, } set system name, >set user name, ! set assistant name | quick prompt | each change the corresponding portion of the prompt ~~~ Clipboard Conqueror is ready to completely control any LLM! ~~~ for complete control.
  ```
    - ~~~ sets text after the "~~~" to the start of the assistant reply for this turn only. 

>"prompt": "<|im_start|> `set system name`\n `quick prompt` \n<|im_end|>\n<|im_start|>`set user name`\n each change the corresponding portion of the prompt  `for complete control.``Anywhere.` <|im_end|>\n<|im_start|> `set assistant name`\n Clipboard Conqueror is ready to completely control any LLM!"



Settings and More!
---
```
|||frank,mem|Frank, how many fingers am I holding up?
```

Ask Frank Drebin if he has information contained in tag "mem"

- Agents, memory agents, and instructions can be combined like |||agent1,agent2|.
Three pipes, agent, one pipe. No spaces. Any agents or settings must be closed with one pipe or the names will be sent as text to the default agent (Captain Clip).

```
|||2700| write a long story bout a picture of a story where an artist draws a picture of a story about an artist being written by an author
```
- sets the max response length to 2700. Also works like |||agent,setting:0.5,1000| just a number is always max response length.

```
|||temperature:1.1| be more unpredictable, normalize probabilities by 10% after other samplers.
```
- sets the temperature to 1.1. This works for any setting, e.g., top_p, min_p. supports :true :false. Overrides the params in setup.js.

`setting names vary per backend you connect to.` 

- Only persists in memory and used for the defaultClient set in setup.js. |||settings:set| are not used for secondary endpoints used like |||tgwchat|.
```
|||re| what is this code doing? 
```
- return last copy inserted after user prompt text.
- sends the thing you copied last after "what is this code doing? \n \n", copied text here at the end of the user prompt" and sends the Captain Clip assistant in the system prompt.
```
|||rf| what is in the rf agent? 
```
- return last copy in system prompt inserted like an agent at the level rf is placed relative to other agents ex |frank,rf,tot| copied text comes after frank agent in the system prompt.


```
|||memory:save| writes or overwrites an identity called memory with this text: " writes or overwrites an identity..."
```





It's useful to save information like

```
|||memory:save|thisFunction(variable){ return variable + variable * variable; }
```

and then use it like

```
|||coder,memory| describe the function of the code and suggest descriptive variable names. 
```
If you desire, delete will remove your saved agent.
```
|||memory:delete| removes memory, defaults will return when Clipboard Conqueror is restarted. 
```


List is for knowing what is available. It will provide an easy to expand list of available agents.

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
The file command saves that agent to the 0identities.json file. Currently only supports agents and will save settings values and backends as agents if you tell it to. This will mess up sending to apis set like |||kobold| and require cleaning the 0identities.json.  Currently the only way to delete filed agents is to delete them from 0identites.json or delete the json entirely to restore defaults next run.

File will write 0identities.json if it doesn't exist. 


>|||code|`|` 

By sending a second pipe "|" on the end, you avoid collisionss with "||" OR operators or loose pipes in the text. Alternatively, you could change the invoke delimiter in setup.js (instruct.endTag)

Currently after using a command that writes data from the application,"`|||list|`", "`|||agent,write|`", "`|||help|`", "`|||introduction|`", or "`|||dw|`" `you must copy your next query twice` before it sends to the LLM.


|||c| for Chat:
---
the |||c| or |||chat| flag creates a chat history using the interaction, which builds, extending the system prompt into a conversation history.  c should always go last, though it doesn't have to, allowing for end of chat insertion of additional agent text. 

This context doesn't send without c, and always advances when called. 

|||sc| or |||silentChat| lets you chat without saving new messages to the conversation. 

"]" renames text from user in the chatlog.

";" renames text from assistant in the chatlog. 

```
|||ch|  or |||clearHistory| or |||clearChat|
```
Will clear the chat history. It is preserved in |||dw| until you clear that with |||clearDebug| or restart Clipboard Conqueror.

|||e,c,] `Batman`,; `Superman`| `Howdy pal.`

Koboldcpp or a completion endpoint will see:

>"prompt": "<|start_header_id|>system<|end_header_id|>\n\n<|eot_id|><|start_header_id|>`user`<|end_header_id|>\n\n `Howdy pal.`<|eot_id|><|start_header_id|>`assistant`<|end_header_id|>\n\n"

The first shot doesn't have a history to append, but the conversation is saved, ready for the next message:

|||e,c,] Aquaman,; Superman| We're just checking things out. 


>"prompt": "<|start_header_id|>system<|end_header_id|>\n\n continue : <|eot_id|><|start_header_id|> `Batman`<|end_header_id|>\n\n Howdy pal.<|eot_id|><|start_header_id|>` Superman`<|end_header_id|>\n\nHowdy back atcha, partner! What brings you to these here parts?\n\n<|eot_id|><|start_header_id|>`user`<|end_header_id|>\n\n We're just checking things out.<|eot_id|><|start_header_id|>`assistant`<|end_header_id|>\n\n"

Both turns have been appended to the history with the name provided, but koboldcpp sees user and assistant for the prompt turn. Those can be set with `>` (user) and `!`(assistant). This allows us to rename the history to guide the response we desire. Llama 3 is very good at this. 



(the history preface, "continue" can be changed, instruct.historyName in setup.js) this key can be eliminated by using "`none". I chose continue as a default to avoid collisions with |||history:save| when crafting a narrative. 


super advanced save: 
---
``` 
|||CurrentText:save,re,LastCopy:save|CurrentText
```
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
- not the advice I was expecting, I wasnt expecting "stalk her down and become her". WOW!

```
||||System: Command first before Clip agent.|  query from user
```

^^^^note 4 "|" , and the close on the end above but only 3, then agents|, then system, then closing "|" below.  


>|||`writer`| `Command First.`| `User after agent writer`



Clipboard Conqueror applies formatting like:

>"prompt": "<|start_header_id|>system<|end_header_id|>\n\n{\"system\":\" `Command First`.\",\"`writer`\":\"Write a lengthy prose about user's topic. Do not wrap up, end, or conclude the narrative, write the next chapter.\\n \\n\"}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n `User after agent writer`<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"


"system" is a configurable key in setup.js and should only be present when a quick prompt is specified and removed if it is empty.

```
|||re,frank|this text is invisible to :save| user query ~~~ and this text is invisible to save as well. 
```
instant system prompts like |||e ( *for empty prompt* )| off the cuff system prompt.| are preserved with |||set|.

|||set|
---


>|||rf,frank,`set`,joe|these system commands persist| query goes out. 


- set will save all agents before it as a persistent default, and include any system command sent at this time. in this case joe does not persist with the next simple invoke ||| 

once set "|||"{query} will behave as 
```
|||(that last copy saved with rf),frank|these system commands persist|{query} 
```


until |||set| is copied again, clearing the set agents. 

While set, |||any,additional,agents| can be sent and add after the set agents, and will go along after the set agents.

|||rf,set| is extremely useful for repeated queries against the same copied data. 

while set ||||any| any replaces the old system instruction before agents this time only.

- again note 4 pipes before system insert. 

---

That ought to get you started and covers most operation. Head to [Backend Switching](multipleEndpoints.md) or [Chaining agents](agentChaining.md) for more feature explainations, or check the available default [Agents](agents.md) for explainations about each of those.

---
[Home](readme.md), [install](install.md), [Choosing a model](choosingAModel.md), [Prompt Reference](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)