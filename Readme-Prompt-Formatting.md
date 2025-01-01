![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Readme
=============================
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Bookmarklets](https://aseichter2007.github.io/ClipboardConqueror/bookmarklets.html), [Prompt Reference](Readme-Prompt-Reference.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-Inference-Chaining.md), [Setup.js](Readme-Setup.md)
---

There are 6 special operators for the `|||prompts and commands|` segment, that start with the symbol, and end with the next comma ",". These change the prompt format 

  - "%" format, like |||%chatML, prompts|, do this one first if you use it, it overwrites the others. Valid formats are stored in setup.js
  - "^" change params for api, overwrites current api parameter settings.
  - "!" assitant name
  - ">" user name
  - "}" system name
  - "\~" start of assistant response, "~~~" overwrites "\~" this turn only.
  - "`" the backtick or grave symbol changes the system prompt format. Supports "json","markup","partial", or none. 

  ### "%}^>!" all persist until overwritten or the prompt format is changed.  
  all valid entries for "%" and "^" can be used without the prefix operator, but will then also set endpoints, generation parameter sets, prompt formats, and prompts sharing the same name. This allows quick and complete configuration while preserving flexibility. 

  - Note: "`:`", the setting break, is only supported in these operators if there is a space between words, or `:` is directly on the end, and will attempt to create generation parameter settings when used like `|||!Cowboy:Friends, otherPrompt| query`. This will not work as intended and will create a generation parameter setting { Cowboy:"Friends" }, use `|||!Cowboy and Friends:, prompt| query`, or `|||!Cowboy:, prompts|` to avoid creating temporary settings instead of changing the desired segment of the prompt format. 

>grandpa? |||`json, %chatML, ! Rick, > Morty, writer, } Narrator's notes| Rick answers morty's questions.| Where are we going today,  

This query is formatted like:

>"prompt": "<|im_start|>` Narrator's notes`\n{\"system\":\"` Rick answers morty's questions`.\",\"`writer`\":\"Write a lengthy prose about user's topic. Do not wrap up, end, or conclude the narrative, write the next chapter.\\n \\n\"}<|im_end|>\n<|im_start|> `Morty`\\n Where are we going today,\n`grandpa? `<|im_end|>\n<|im_start|> `Rick`\n"

  
  Clipboard Conqueror arranges the data to assemble a complex query. 

  ```
  Anywhere. |||`none, } set system name, >set user name, ! set assistant name | quick prompt | each change the corresponding portion of the prompt ~~~ Clipboard Conqueror is ready to completely control any LLM! ~~~ for complete control.
  ```
    - ~~~ sets text after the "~~~" to the start of the assistant reply for this turn only. 

>"prompt": "<|im_start|> `set system name`\n `quick prompt` \n<|im_end|>\n<|im_start|>`set user name`\n each change the corresponding portion of the prompt  `for complete control.`\\n`Anywhere.` <|im_end|>\n<|im_start|> `set assistant name`\n Clipboard Conqueror is ready to completely control any LLM!"



The chat history uses the current set prompt formatting when it is sent. This can cause unexpected output issues if an openAI api endpoint is using a different prompt format.

Pretty much everything here is only supported with completion endpoints or apis that accept jinja templates or kobold adapters.
Prompt Formats.

---

### Change the instruction format without sending to the LLM like :

`|||FORMAT|chatML`

or

`|||FORMAT|alpaca`

etc.

### or inline while sending to the LLM:

`|||chatML| query to answer`

- without "%": any prompt, parameter set, prompt format, or endpoint of the same name will be set active. 
- create unified sets with the same key names in setup.js to make quick change sets for your favorite models. 

`|||%chatML| query to answer`  will only set chatML prompt format even if you create params or endpoints called chatML.


### Order matters, so change backends and formats first to preserve later changes to the prompt format like "!assistant name," . 

Formats must exist in setup.js or 0formats.json, the name must match the object key. 

Files override setup.js when enabled, so if you use settings files, you have to delete or rename them to reflect changes in setup.js.
I added some extra complexity, I apologise for the bit of extra noise, but there are use cases.

Set Individual Prompt Segments:
---
### special operators to use inline send the current query:

- "`%`" format, like |||%chatML, prompts|, do this one first if you use it, it overwrites the others. Valid formats are stored in [setup.js - promptFormats](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L449)

- "`!`" assitant name

- "`>`" user name

- "`}`" system name

- "`~`" start of assistant response, "~~~" overwrites "~". "~" can be chained to shape later responses
 
> note: some links in these files are permanent links the code locations in the github repository, but because of their nature they link to old versions. Don't pay too much attention to line numbers, but they should help orient you when you are looking at the source code on your computer.
### Explicit prompt settings prevent sending to AI when used:

```
|||PROMPT:startTurn|<|im_start|>
```
- this applies to every turn, the system, assistant, and user. 
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

The above sets up basic ChatML formatting, the rest are kind of extra. For alpaca I reccommend setting the format strings in the role positions. StartTurn starts all turns; system, user, and assistant.  
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
|||PROMPT:prependsystem|You are a helpfull assistant\n\n 
```
- persistent text before system prompts, set a base system prompt here when using "`markup"
```
|||PROMPT:systemAfterPrepend| still before system prompts. 
```
- This is here for double system prompts, you can close the first and open the second here where prepend contains the meat of the hidden persistent system prompt. 
```
|||PROMPT:post| after prompts. 
```
- I use this to close an open codeblock on on the system prompt. 

```
|||PROMPT:systemMemory| spot for persistent system context after prompts
```
- Above set system prompt segments, below set user and asssistant prompt segments.
```
|||PROMPT:userMemory| 
```
- spot for persistent user context before user query
```
|||PROMPT:start|start of the AI response
```
- This defines the start of the AI response. If you desire pure text completion, save this in here and use empty prompts like "|||e|" Or steer it by sending prompts and a user query.

and special for jinja formatter only:

```
|||PROMPT:special|.rstrip() //Probably not needed for typical use. Not sure what .rstrip() does. I think it removes whitespace at the end of the string, really I dislike this behavior for CC. I want to know and expose exactly what the machine sees. 
```
I think I missed a few. CC supports a lot of flexibility in prompt formats.
None of these are case sensitive. |||PROMPT:SySTEMmemOrY| is the same as |||PPROMPT:systemmemory|||. There are a few options to hit these as well, such as username or name, endturn or end, etc. I've hopefully reached easy to remember without adding confusion.

History names:
---
### These operators do not change the prompt format, only the history:

- "`]`" activates the chat history and sets this name for user in the history but not the active turn. Best when chaining. 

- "`;`" activates the chat history and sets renames text from assistant in the chatlog. This is unused for chain of inference, change the user name `>` in later turns to change "who" the response is sent as.

Configuration:
---
In setup.js, if you want prompts like |||writer| to set different generation parameters, you can create params or a format in the file like "writer: {{ desired params }} and they will be loaded every time writer is called. 

Similarly you can have particular names set up seperate backend destinations, or add system text when setting prompt formats using "|||chatML:save| your text" will send your text in the system prompt on turns when chatML is called and set chatML formatting until another format is set. 

note: current default behavior removes token markup "<|" any "|>" from the ai response to ease use of various models. For the most part monster merge models respond very well, but will markup character dialog in a way I find undesirable. set [removeFormatting](https://github.com/aseichter2007/ClipboardConqueror/blob/7bb5720bfd1404d71be2184eaae1d59b6e8d72ed/setup.js#L396) false to stop this behavior. 


---
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Bookmarklets](https://aseichter2007.github.io/ClipboardConqueror/bookmarklets.html), [Prompt Reference](Readme-Prompt-Reference.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-Inference-Chaining.md), [Setup.js](Readme-Setup.md)