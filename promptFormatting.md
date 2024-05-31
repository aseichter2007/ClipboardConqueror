![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Readme
=============================
[Home](readme.md), [Install](install.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)

---

The chat history uses the current set prompt formatting when it is sent. This can cause unexpected output issues if an openAI api endpoint is using a different prompt format.

Prompt Formats:
---
Change the instruction format without sending to AI like :
```
|||FORMAT|chatML
or
|||FORMAT|alpaca

or inline with query execution:
|||chatML| query to answer
    - without "%" any agent, parameter set, prompt format, or endpoint of the same name will be set active. 

|||%chatML| query to answer
etc.
```
Order can matter, so change backends and formats first to preserve later changes to the prompt format such as "!assistant Name" . 

Formats must exist in setup.js or 0formats.json, the name must match the object key. Files override setup.js when enabled, so if you use settings files, you have to delete or rename them to reflect changes in setup.js.
I added some extra complexity, I apologise for the bit of extra noise, but there are use cases.

When the format is changed, it persists across backends. This is to ease testing of multiple models with different formats. To sidestep this limit, edit the format in setup.js or 0formats.json and assign the correct one in the endpoint definition or 0endpoints.json.


Or you can set individual prompt segments with:
---
special operators to use inline send the current query:
- "`]`" renames text from user in the chatlog.

- "`;`" renames text from assistant in the chatlog. 

- "`%`" format, like |||%chatML, agents|, do this one first if you use it, it overwrites the others. Valid formats are stored in setup.js

- "`!`" assitant name

- "`>`" user name

- "`}`" system name

- "`~`" start of assistant response, "~~~" overwrites "~". "~" can be chained to shape later responses

Explicit prompt settings prevent sending to AI:

```
|||PROMPT:startTurn|<|im_start|>
```
- this applies to every turn, the system, agent, and user. 
```
|||PROMPT:endTurn|<|im_end|>\n
```
- there are discrete endSystemTurn, endUserTurn, and endAssistantTurn, if needed. For startTurn as well.
```
|||PROMPT:systemRole|system
```
- or with sending like "|||}system| query to answer"
```
|||PROMPT:userRole|user 
```
 - or inline like "|||>user| query to answer"

```
|||PROMPT:assistantRole|assistant
```
- or inline like "|||!assistant| query to answer"

```
|||PROMPT:roleBreak|\n
```
- the gap beween the role header and the role text

The above set up basic ChatML formatting, the rest are kind of extra. For alpaca I reccommend setting the format strings in the role positions. StartTurn starts all turns; system, user, and assistant.  
```
|||PROMPT:endSystem|<|im_end|>\n 
```
each standard title (system, assistant, and user) each have their own end, while "endTurn" ends all turns, be careful not to duplicate bits by setting both.

StartTurn is a bad place for "### Instruction:" as it goes before user and assistant as well.
```
|||PROMPT:endUserRole|<|role_end|>\n
```
As above, each role has individual role closing tokens and a group role closing token. If both are set there will be an extra. 
```
|||PROMPT:prepend|You are a helpfull assistant\n\n 
```
- persistent context before agents
```
|||PROMPT:systemAfterPrepend| still before agents. 
```
- This is here for double system prompts, you can close the first and open the second here where prepend contains the meat of the hidden persistent system prompt. 
```
|||PROMPT:post| after agents. 
```
- I use this to close an open codeblock on on the system prompt. 

```
|||PROMPT:systemMemory| spot for persistent system context after agents
```
- Above set system prompt segments, below set user and asssistant prompt segments.
```
|||PROMPT:userMemory| 
```
- spot for persistent user context before user query
```
|||PROMPT:start|start of the AI response
```
- This defines the start of the AI response. If you desire pure text completion, save this in here and use empty prompts like "|||e|" Or steer it by sending agents and a user query.

and special for jinja formatter only:

```
|||PROMPT:special|.rstrip() //Probably not needed for typical use. Not sure what .rstrip() does. I think it removes whitespace at the end of the string, really I hate this behavior for CC. I want to know exactly what the machine sees. 
```
I think I missed a few. CC supports a lot of flexibility in prompt formats.
None of these are case sensitive. |||PROMPT:SySTEMmemOrY| is the same as |||PPROMPT:systemmemory|||. There are a few options to hit these as well, such as username or name, endturn or end, etc. I've hopefully reached easy to remember without adding confusion.

History names:
---
These operators do not change the prompt format, only the history:

- "`]`" activates the chat history and sets this name for user in the history but not the active turn. Best when chaining. 

- "`;`" activates the chat history and sets this name for asstant in the history. Best when chaining. 



Configuration:
---
In setup.js, if you want prompts like |||writer| to set different generation parameters, you can create params or a format in the file like "writer: {{ desired params }} and they will be loaded every time writer is called. 

Similarly you can have particular names set up seperate backend destinations, or add system text when setting prompt formats using "|||chatML:save| your text" will send your text in the system prompt on turns when chatML is called and set chatML formatting until another format is set. 


note: current behavior removes token markup "<|" any "|>" from the ai response to ease use of various models. For the most part monster merge models respond very well, but will markup character dialog in a way I find undesirable. Comment line 24 "text = this.removeChatML(text);" in responsengine.js to stop this behavior. Response engine is ready for function calls, let me know what would be useful.

---
[Home](readme.md), [Install](install.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)