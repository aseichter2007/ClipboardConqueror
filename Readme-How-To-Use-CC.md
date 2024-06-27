![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - General Use
=============================

[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-Inference-Chaining.md), [Setup.js](Readme-Setup.md)


### The Clipboard Conqueror format is very [configurable](Readme-Setup.md), but always adheres to the following formula:

>`text before`(invocation"`|||`") system prompts and commands (optional split "`|`")  quick system prompt (optional split "`|`") user prompt text (optional assistant dictation "`~~~`") start of assistant response (optional close assistant response "`~~~`") continue user text 

`text before` is moved to the the end of the user query, or into the start of the assistant response if `~~~` is not closed. 

`~~~` is only supported on completion endpoints but is always available and will cause issued when used with a chat api. (text after disappears into the void.)

>|||code|`|` 

By sending a second pipe "|" on the end, you can avoid trouble  with "||" OR operators or loose pipes in the text.

## Using Clipboard Conqueror:

1. Enter `|||` followed by your request or command. Pipe `|` can be typed by pressing `shift + backslash` (above enter, left of enter for European layouts).
2. Copy the text. After a few moments, you should get a notification and the response is ready to paste:
```
||| "Ahoy Captain, open the airlock, we're coming aboard the Clipboard Conqueror"
```
`Copy the line above.` Wait for the notification to `paste the AI response.` Sometimes my notifications are a little funny but I have about a thousand layers of mess running all the time so it could be something related to streaming stuff. Also errors have been reported with linux notifications and sounds. 

```
|||introduction|
```
This is a writing command, it provides immediately ready to paste text from this application. It will tell you about LLMs and how they work, and explain the settings that are useful to control generation. Ready to paste immediately. Currently after using a command that writes data from the application, "|||prompt,write|", "|||help|", "|||introduction|" `the next copy made will not send text to the AI. Copy your command again`, it should work the second time. If not, `ensure you are only copying one ||| invoke` with your text. 

```
|||character,temperature:1.4|What is a square root and what dishes and sauces are they best served with?
```
- aside: there does not appear to be a too hot for general queries with good samplers, is this thing on? Hermes is simply not having any square root soup. 
This is exemplary; character is not a default prompt. Captain Clip will respond. Try:

```
|||frank,!Frank,user| "Hello, Frank. You can't hide from me. Show yourself."
```
Here we have set the assistant name to Frank, by prepending the desired name with an exclaimaiton point, as well as included his character card. Llama-3 is particularly good with the assistant name set. Set names persist until changed or CC is restarted. 

There are 6 special operators for the `|||prompts and commands|` segment, that start with the symbol, and end with the next comma ",".

  - "%" format, like |||%chatML, prompts|, do this one first if you use it, it overwrites the others. Valid formats are stored in setup.js
  - "^" change params for api, overwrites current api parameter settings.
  - "!" assitant name
  - ">" user name
  - "}" system name
  - "~" start of assistant response, "~~~" overwrites "~".
  - "`" the backtick or grave symbol changes the system prompt format. Supports "json","markup","partial", or none. 

  ### "%}^>!" all persist until overwritten or the prompt format is changed.  
  all valid entries for "%" and "^" can be used without the prefix operator, but will then also set endpoints, generation parameter sets, prompt formats, and prompts sharing the same name. This allows quick and complete configuration while preserving flexibility. 

  - Note: "`:`", the setting break, is only supported in these operators if there is a space between words, or `:` is directly on the end, and will attempt to create generation parameter settings when used like `|||!Cowboy:Friends, otherPrompt| query`. This will not work as intended and will create a generation parameter setting Cowboy:"Friends", use `|||!Cowboy and Friends:, prompt| query` to avoid assigning settings instead of changing the assistant name in the prompt format. 

>grandpa? |||`json, %chatML, ! Rick, > Morty, writer, } Narrator's notes| Rick answers morty's questions.| Where are we going today,  

This query is formatted like:

>"prompt": "<|im_start|>` Narrator's notes`\n{\"system\":\"` Rick answers morty's questions`.\",\"`writer`\":\"Write a lengthy prose about user's topic. Do not wrap up, end, or conclude the narrative, write the next chapter.\\n \\n\"}<|im_end|>\n<|im_start|> `Morty`\\n Where are we going today,\n`grandpa? `<|im_end|>\n<|im_start|> `Rick`\n"

  
  Clipboard Conqueror arranges the data to assemble a complex query. 

  ```
  Anywhere. |||`none, } set system name, >set user name, ! set assistant name | quick prompt | each change the corresponding portion of the prompt ~~~ Clipboard Conqueror is ready to completely control any LLM! ~~~ for complete control.
  ```
    - ~~~ sets text after the "~~~" to the start of the assistant reply for this turn only. 

>"prompt": "<|im_start|> `set system name`\n `quick prompt` \n<|im_end|>\n<|im_start|>`set user name`\n each change the corresponding portion of the prompt  `for complete control.`\\n`Anywhere.` <|im_end|>\n<|im_start|> `set assistant name`\n Clipboard Conqueror is ready to completely control any LLM!"



Settings and More!
---
```
|||frank,mem|Frank, how many fingers am I holding up?
```

Ask Frank Drebin if he has information contained in tag "mem"

- system prompts, operators, and configurations can be combined by seperating with a comma like |||prompt1`,`prompt2|. prompt text is sent in order it is called.

Three pipes, prompts, one pipe, user query. 

Any prompts or settings must be closed with one pipe or the names will be sent as text with the default prompt (Captain Clip).

```
|||2700| write a long story bout a picture of a story where an artist draws a picture of a story about an artist being written by an author
```
- sets the max response length to 2700. Also works like |||prompt,setting:0.5,1000| just a number is always max response length.

```
|||temperature:1.1| be more unpredictable, normalize probabilities by 10% after other samplers.
```
- sets the temperature to 1.1. This works for any setting, e.g., top_p, min_p. supports :true :false. Overrides the params in setup.js.

- Only persists in memory. |||settings:set| are lost when changing backends or parameter sets.

`setting names vary per inference platform you connect to.` Reference the docs for the API for the correct keys.

```
|||re| what is this code doing? 
```
- return last copy inserted after user prompt text.
- sends the thing you copied last after "what is this code doing? \n \n", copied text here at the end of the user prompt" and sends the Captain Clip assistant in the system prompt.
```
|||rf| what is in the rf prompt? 
```
- return last copy in system prompt inserted like any other prompt text at the level rf is placed relative to other prompts ex |frank,rf,tot| copied text comes after the frank prompt in the system prompt.


```
|||memory:save| writes or overwrites an identity called memory with this text: " writes or overwrites an identity..."
```

It's useful to save a prompt like:

```
|||memory:save|thisFunction(variable){ return variable + variable * variable; }
```

and then use it like:

```
|||coder,memory| describe the function of the code and suggest descriptive variable names. 
```
If you desire, delete will remove your saved prompt.
```
|||memory:delete| removes memory, defaults or prompts saved to file will return when Clipboard Conqueror is restarted. 
```
List is for knowing what is available. It will provide an easy to expand list of available prompts.

```
|||list|
```
The list command sends a list of current prompts in memory to the clipboard, ready to paste out immediately.

```
|||mem,write|
```
The write command will copy the entire prompt text of all entered prompt tags to the clipboard ready to paste, and then copy back under a new name or edited.

```
|||prompt:file|
```
The file command saves that prompt to the 0prompts.json file. Currently only supports prompts and will save setting keys and backend keys as prompts if you tell it to. This will add noise to the system prompt when setting improperly filed apis set like |||kobold| and require cleaning the 0prompts.json.  Currently the only way to delete filed prompts is to delete them from 0identites.json or delete the json entirely to restore defaults next run.

File will write 0prompts.json if it doesn't exist. 


Currently after using a command that writes data from the application,"`|||list|`", "`|||prompt,write|`", "`|||help|`", "`|||introduction|`", or "`|||dw|`" `you must copy twice` before it sends to the LLM.


|||c| for Chat History:
---
the |||c| or |||chat| flag creates a chat history using the interaction, which builds up, extending the system prompt into a conversation history.   Ensure that the correct prompt format is set in CC when using OpenAI compatible chat backends for best performance.

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
- if the re flag is set, saved prompts come from the last copy. This allows saving an prompt from the current text that is distinct from the lastCopy prompt which comes from the last clipboard contents.


```
|||re,frank,dataCopiedLast:save| Hey get a load of this!
```

- This will save the last copy to the clipboard into dataCopiedLast 
- Note, tags between the | | parse left to right. It matters where re is placed when saving prompts

``` 
|||frank,dataCopiedLast:save,re| Hey get a load of this! 
```
- will save "Hey get a load of this!" to dataCopiedLast because re is not activated until after the :save.

```  
|||CurrentText,LastCopy| query combined next like this. 
```

Quick Prompts
---

```
||||Quick prompts go before captain clip | "user query"
```
- note 4 "|" to send a quick system prompt with the default prompt
```
|||writer| quick prompt sends before writer| "user query"
```

This syntax lets you command the system directly at the same time you send as user. 

```
|||e| assistant gives really weird bogus advice: | how can I become as pretty as OPs mom?
```
- not the advice I was expecting, I wasnt expecting "stalk her down and become her". WOW!

```
||||System: Command first before Clip prompt.|  query from user
```

- ^^^^note 4 "|" , and the close on the end above 


>|||`writer`| `quick prompt first.`| `text from user to guide the writer prompt`

- only 3 pipes, then prompts|, then quick system prompt, then closing "|" below.  


Clipboard Conqueror applies formatting like:

>"prompt": "<|start_header_id|>system<|end_header_id|>\n\n{\"system\":\" `quick prompt first.`.\",\"`writer`\":\"Write a lengthy prose about user's topic. Do not wrap up, end, or conclude the narrative, write the next chapter.\\n \\n\"}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n `text from user to guide the writer prompt`<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"


"system" is a configurable key in setup.js and should only be present when a quick prompt is specified and removed if it is empty.

```
|||re,frank|this text is invisible to :save| user query ~~~ and this text is invisible to save as well. 
```
instant system prompts like |||e ( *for empty prompt* )| off the cuff system prompt.| are preserved with |||set|.

|||set|
---


>|||rf,frank,`set`,joe|these system commands persist| query goes out. 


- set will save all prompts before it as a persistent default, and include any system command sent at this time. In this case joe does not persist with the next simple invoke ||| 

once set "|||"{query} will behave as 
```
|||(that last copy saved with rf),frank|these system commands persist|{query} 
```


until |||set| is copied again, clearing the set prompts. 

While set, |||any,additional,prompts| can be sent and add after the set prompts, and will go along after the set prompts.

|||rf,set| is extremely useful for repeated queries against the same copied data. 

while set ||||any| any replaces the old quick prompt this time only.

- again note 4 pipes before system insert. 

---

That ought to get you started and covers most operation. Head to [API Switching](Readme-Endpoints.md) or [Chaining Inference](Readme-inferenceChaining.md) for more feature explainations, or check the available default [prompts](Readme-Prompt-Reference.md) for explainations.

---
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-Inference-Chaining.md), [Setup.js](Readme-Setup.md)