![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Operators and Prompts
=============================
[Home](readme.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)

---
Special ||| operators | to apply:
---
- "`]`" renames text from user in the chatlog.

- "`;`" renames text from assistant in the chatlog. 

- "`%`" format, like |||%chatML, agents|, do this one first if you use it, it overwrites the others. Valid formats are stored in setup.js

- "`!`" assitant name

- "`>`" user name

- "`}`" system name

- "`~`" start of assistant response, "~~~" overwrites "~". "~" can be chained to shape later responses

- "`" the backtick or grave symbol changes Clipboard Conqueror's system prompt send format. Supports "json","markup","partial", or none. 

    - Partial inserts system prompts like "name : text".  
    - None leaves off the key names and sends only the text.
    - markup makes each agent it's own turn with the current prompt format. this leaves an empty system at the begining.
    - use "|||FORMAT:prependPrompt| persistent top system prompt" with a completion endpoint to set a system prompt when using "markup"

- "`@`" executes a next turn using the assistant response as the user query. 

- "`#`" skips a turn in the chain

- "`]`" activates the chat history and sets this name for  user in the history. Best when chaining. 

- "`;`" activates the chat history and sets this name for asstant in the history. Best when chaining. 

        The chat history uses the current set prompt formatting when it is sent. This can cause unexpected output issues if the backend is using a different prompt format.

Fancy |||`flags`|
---
|||`help`| Contains instructions about CC operations. 

`qr` quick reference sheet ready to paste. 

`introduction` has more about samplers and settings. 

`e` or empty blocks the default agent to provide an empty prompt

`write` sends an instantly ready to paste set of agents preceding the write command.

`list` will instantly supply a ready to paste list of all agents like below.

`on` makes clipboard conqueror run every copy, no invoke required, till you toggle it off.

`no` prevents sending to AI, useful for copying entire invokes, just add the flag.

`set` or `setDefaultsaves` agents left of it to be added until toggled off like |||set|

`rf` will put the last thing you copied at the position of rf in the system prompt. 

`re` will send the last copied text after text from |||re|user  last copied text.

`rh` will clear the history and start a new history with the last copied text as a message from user. 

`c` or `chat` activates the history

`crh` will send the last copied text into the history and activate the history this turn. 

`sc` or `silentChat` sends the history wihout adding the new turn to the history. For multiple queries against the same history. 

`csrh` sends last copy into the end of the history but does not add user query or assistant response to history this turn. 

`ch` or `clearHistory` clears the chatlog and prevents sending to the AI.


`cf` or `clearFirst` clears the chatlog while sending the query to the LLM.

`d` or `debug` The last cleared history is stored here till CC is restarted or you clear again

`dw` or `debugWrite` ready to paste last history cleared.

`cd` or `clearDebug` clear debug manually.

`dateTime` sends the date and time in the system prompt at the position you send it.

Noteworthy Agents:
---
The following definitions live toward the bottom of setup.js. If you set writeFiles = true, the files written override the definitions in setup.js, so you can enable files and then save your prompts like |||name:save| then |||name:file| to save the agent to disk and protecting against overwriting your work.

- |||`agi`|"AI Generate Instructions" will help you execute any operation you ask for help with. Captain Clip does well too, but this is based on the kobold agi script and is superior to a simple ask. 

- |||`stable`| will write you an image prompt for use in stable diffusion automatic 1111
This identity and some other cards were found on chub.ai, some are my own or significant customizations, or simply found out in the web.

- |||`tot`|"tree of thought" will expand and include near concepts, questions, or ideas to produce a more comprehensive solution

- |||`rpi`| writes a well crafted character respons.

- `cot,@rot` Chain of Thought and Recieve Thougtht prompts ask guiding questions surrounding the topic to provide a robust answer, and then resolve those questions in the final response, producing a superior result.

- |||`pro`| A more professional, less piratey assistant for professional tasks. 

- |||`business`| a calculating business mogul. I havent this one much. 



|||list|
---
Copy and paste the following lines to show the full prompt quickly.

|||`default`,write| Captain Clip

|||`clip`,write| Captain Clip optimized differently

|||`form`,write|the Clipboard Conqueror invoke format. 

|||`link`,write| Short description of Clipboard Conqueror

|||`dolphin`,write| the standard dolphin system prompt.

|||`starCoder`,write| the standard starCoder system prompt.

|||`vicunaFree`,write| the standard vicuna free system prompt.

|||`vicunaCocktail`,write| the standard vicuna coctail system prompt.

|||`hermes`,write| the standard OpenHermes system prompt.

|||`agi`,write| AI Generate Instructions, includes invoke formatting to make it fast and optimized for CC.

|||`gitCopilot`,write| the prompt for github copilot chat

|||`coder`,write| A code assistant that attempts a personality

|||`code`,write| A better code assistant that should only provide code

|||`cowboy`,write| Talk like a cowboy

|||`bugfix`,write| an attempt at an editor,

|||`bugspot`,write| another attempt at an editor, tends to point out bugs instead of fix them. 

|||`writer`,write| Writing assistants of various flavors and goals. 

|||`author`,write|

|||`text`,write|

|||`retext`,write|

|||`novel`,write|

|||`w`,write|

|||`editor`,write|

|||`rpwrite`,write|

|||`rpi`,write|

|||`rps`,write|

|||`rpc`,write| end writing assistants with various flavors and goals. One of these last 3 write the best.

|||`mem`,write| example memory, says something about holding up two fingers.

|||`summary`,write|"Summarize the content present."

|||`sumup`,write|" State only the facts presented."

|||`sum`,write|"Summarize the content from user in one line"

|||`explain`,write| Explain any ideas present in the content...

|||`abe`,write| "Abe Lincoln"

|||`brewella`,write| attempts to force wierd rhyming, I need to add more example exchanges to make it function. 

|||`parametrius`,write| Ask for more details and specifics

|||`frank`,write| Frank Derbin

|||`woody`,write|

|||`buzz`,write|

|||`shia`,write| an experiment with a song

|||`stable`,write| returns stable diffusion 1.5 prompts

|||`iot`,write| intermediat thought for cot, needs work.

|||`cot`,write| Chain of Thought, asks questions to prepate a final answer

|||`rot`,write| Recieve Chain of thought. A little nudge to consume the cot link

|||`tot`,write| Tree of thought, expands and writes detailed answers.

|||`pro`,write| A basic more professional agent to replace default, includes think step by step priming.

|||`twenty`,write| Play 20 Questions

|||`grug`,write| grug good agent. Grug help.

|||dark,write| reply with dark humor and puns on the theme

|||`seuss`,write| write like Dr. Seuss

|||`devil`,write| Play the devils advocate

|||`business`,write| be a business assistant

|||`translateTo`,write| Targetlangguage, text to translate

|||`JPLT`,write| this one attempts to toggle japanese to english or english to japanese

|||`en`,write| Return text from user in English.

|||`es`,write|spanish

|||`jp`,write|japanes

|||`gr`,write|german

|||`fr`,write|frenc

|||`hi`,write|hindi

|||`ch`,write| Return text from user in Chinese.

|||`gpts`,write| this contains a short list of gpt models. Functionality has kind of moved away from this

|||`prompter`,write| prompt reformer, needs work. 

|||`sellin`,write| Contains info about Clipboard Conqueror operations. 

|||`lootbox`,write| returns an item on a theme.

|||`dndEvent`,write| Dice resolver, needs work. 

|||`dndNPC`,write| A dnd narrator, needs work.

|||`plotSummarize`,write|

|||`hand`,write| Mockup to control a robot hand, maybe tests physical awareness of a model. Maybe.

|||`search`,write| A few minutes of trying to call tools, needs work, not really suitable for this style of interface, it should happen during inference on the backend. (stream = false)  I think textgenwebui has add ons.

 _______


[Home](readme.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)
