![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Understanding setup.js
=============================
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-inferenceChaining.md)


### Clipboard Conqueror specific invoke and operator settings are defined in [appSettings](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L366)
Most of these settings can not overlap. If they do, Clipboard Conqueror may not function properly.

Define new system prompts in [idents](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L1759). These should be strings and use unique key names. (key : "text")

[**appSettings**](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L366) = {
- all these keys are required to be present.

**invoke**: "|||", could be anything `#` or `AI:` or `Help Me ObiWan Kenobi`, whatever you want.

**endTag**: "|", its the limiter after |||: promptf "`|`"quick prompt"`|`"query. This should not be the same as any below. Again, pretty much anything goes for non single charachter operators below. 

**save**: "save", like |||name:`save`|

**true**: "true", like |||setting:`true`|, to ease use in other languages

**false**: "false", like |||setting:`false`|

**saveAgentToFile**: "file", like |||prompt:`file`| This will write 0prompts.json if it doesn't already exist.

**delete**:"delete", like |||prompt:`delete`|, removes the saved prompt from memory, //ToDo: Remove prompt from file.

**settinglimit**: ":", like |||prompt`:`save|

**continueTag**: "~~~", like ||| prompts| text `~~~` This text will start the assistant's response, and can support commas and colons without changing these settings. 

**batchContinueTag**: "~", |||`~` This text will start assistant's response, prompts|  can support periods but not commas or colons, change agentSplit to enable commas.  Must be a single charachter.

**systemTag**: "}", like |||`}` system Name|  Must be a single charachter.

**userTag**: ">", like |||`>` User Name|  Must be a single charachter.

**assistantTag**: "!", like |||! Assitant Name|  Must be a single charachter.

**backendSwitch**: "$", |||$| is similar to |||ooba| with default config order, but only changes the endpoint, depending on endpoint settings.  Must be a single charachter.

**batchNameSwitch**: "]", changes chat history user name next turn  Must be a single charachter.

**batchAssistantSwitch**: ";", changes chat history assistant name Must be a single charachter. This one only works when chatting, not when chaining inference. use `>` to set the incoming text identity when chaining. 

**historyName** : "continue",

**batchSwitch**: "@", like |||`@`name| Initiates chain of inference, sending the response as user for an additional turn.  Must be a single charachter.

**batchMiss**: "#", like |||`#`@name|  Must be a single charachter.

**formatSwitch**: "%", like |||`%`alpaca| changes only the prompt format. Do this one first before !>}  Must be a single charachter.


**paramSwitch**: "^", like |||`^`ooba| changes only the parameters.  Must be a single charachter.

**batchLimiter**: "", if empty, will mark the continue history with full format chat turns. Anything other than "" nothing will use this to seperate chat turns in the history.

**setJsonLevel**: "\`", like |||\`1| or |||\`json| etc

**empty**: "empty", |||`empty`| to prevent sending the default system prompt.

**emptyquick**: "e", |||`e`| for a quicker empty system prompt. 

**agentSplit**: ",", like |||prompt`,`write|

**rootname**: "system", when using ||||quick prompts| this key is used for json and partial modes. like  |||\`json| this text goes in the value| "request". example json system prompt: {"`system`": "this text goes in the value"}

**paramatron**: true,  false disallows naked key name matching like |||ooba|

**removeformatting**: true, removes formating <|any|> from the response before sending to the clipboard. Eases using chatML ar llama3 formats with alpaca models. 

**clean**: true, clean takes out the rootname key when it's not set. Set false to always send the rootname even if there is no associated text to send. 

**setInstruction**: "PROMPT", like |||`PROMPT`:assistantRole| James Bond, 

**options**: This is a comment to ease of configuring the .json file if written, can be ommitted.

**setPromptFormat**: "FORMAT", like |||FORMAT|chatML. If used like |||FORMAT:save| upi can copy correct json to set multiple prompt format segments at once. Not reccomended. 

**setParams**: "PARAMS", like |||`PARAMS`|kobold

**writeSave**: "|||name:save|", writes this out when you do |||prompt,write|, purely textual for user convenience. 

**writeSettings**: "|||FORMAT|", this is like writesave, it's to ease handling of written and pasted prompt formats.

**writeSplit**: "\n _______\n", similar to writeSave and writeSettings, adds text  after |||name,write| idk, it felt neccessary. make it "" and its like it isnt there at all. 



[Endpoints](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L42)
---
- all these keys are required to be present.

**writeFiles**: false, true to write 0formats.json, 0prompts.json etc.  |||name:file| will write 0prompts.json and it will then be used while present even if this is set false.

**duplicateCheck**: false, some other clipboard applications duplicate copied text back to the clipboard, set this true to catch those and preserve the proper last copied text.  Clipboard Conqueror should work seamlessly alongside any other program with the right settings. 

**defaultClient**: "kobold", must match a key in [endpoints](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L52). Recommend using kobold or ooba. Completion endpoints support all features of CC. 

**defaultOptions**: This is a comment to aid editing inside the json files when writeFiles is set true. It is never referenced in the software.

**instructFormat**: "llama3", overrides the defaultClient's set format. Must be a valid format key in [promptFormats](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L449)

**instructOptions**: This is a comment to aid editing inside the json files when writeFiles is set true. It is never referenced in the software.

**persona**: "default", must be a valid identity key in [idents](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L1759) set as "e" for empty or no default system prompt. 
    

## [**endpoints.endpoints**](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L552):{

- some of these keys are optional or unused depending on the type of endpoint.

Move your favorite endpoints to the top and invoke them by $ from top to $$$... at bottom.

Set endpoints persist until changed and can overwrite generation parameters

### [**kobold**](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L68):{ the object key is used to set the endpoint like |||`kobold`| 

**type**: "completion", completion or chat, completion allows CC to control the formatting completely, chat sends openAI style messages, and a jinja template in a key drfined under templateStringKey

**jsonSystem** : "none", markup,full,keys,none. Completion and chat combined only //full sends JSON.Stringify(allSetPrompts) into the system prompt.  keys sends the contents like key : content \n\n key2 : ... markup makes each prompt it's own chat message, none sends only the prompt text.

**buildType**: unused for completion, combined should be used for chat, the others are experimental. options combined, system, or key

**url** : "http://127.0.0.1:5001/api/v1/generate/", then endpoint url.

**params**: "kobold", sets the generation parameters. must match a key in [apiParams](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L1301). It it is the same as the endpoint, then switching endpoints will change the parameters as well

**autoConfigParams**: false, false prevents overriding params with |||tgwchat|

**templateStringKey**: "instruction_template_str", if present and not an empty string (""), sends a jinja template under this defined key name in the request. If ommited no jinja is sent. 

**format**: "llama3", must be a valid instruction format from [promptFormats](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L449).

**autoConfigFormat**: false, false prevents overriding prompt formatting with |||kobold| ommited = true

**key**: "optional authentication key for web api access. put your openAI key here and send to the openAI url to use ChatGPT apis",

**noFormat**: true, prevents sending the jinja template or kobold adapter, this breaks many features that change the prompt format such as `!>}%` operators. omitted = false.

**model*:  "optional model name sent with the params, overwrites model field if set in [apiParams](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L1301).

### outpoint: {

outpoint defines the structure for recieving text back from the infrerence engine payload.

results[0].text: "results" goes in **one**, [**two** sends a number (0)], **three** is "text".

- **outpointPathSteps**: 3, key for a nifty switch case to get the response payload without modifying inference.js.

keys must be lowercase numbers up to ten like one two three four...

- **one**: "results",

- **two**: 0,

- **three**: "text"

### Most openai compatible chat endpoints use: 

- outpointPathSteps: 4,
- one: "choices",
- two: 0,
- three: "message",
- four: "content"

## Prompt Formats:
- all of these keys are optional and empty "" if not defined.

completion has all the possible keys and needs none because they are blank, empty strings: "".

### [completion](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L450): { again the object key can be used like |||chatML| or |||%chatML|
    
order: ["system","user","assistant"], Completion endpoints only, controls turn order, only supports system, user, assistant, duplication is possible. If order is not defined, the default order, system, user, assistant, is applied. 

only add these two (bos,eos) if you're sure you know what you're doing, duplicate bos may reduce response quality

**bos**: "", always goes first

**eos**: "", 

they are generally added by the tokenizer. EOS goes on the end after responseStart, this may mess you up. Only use if neccesary to close BEFORE the generated assistant response.

The following to all turns, some formats have different turn initialization tokens so startTurn, endTurn, and endRole may not be appropriate for all formats. This is to avoid repeating the same info over and over again. 

**startTurn**: "", use if startSystem, startUser, and startAssistant are all the same

**endTurn**: "", use if endSystemTurn, endUserTurn, and endAssistantTurn are the same.  

**endRole**: "", use if all roles use the same role name closure.

**roleGap**: "", For adding a gap between role identifier and content. For individual gaps put them on endSystemRole, endUserRole, endAssistantRole. 


below, the above keys are commented in the places they append. 
The following is in the order that each is appended in a turn with the default system, user, assistant turn order. 

### System Prompt Segments: 

`startTurn`

**startSystem**: "", 

**systemRole**: "",

**endSystemRole**: "",

`endRole`

`rolegap`

**prependPrompt**: "",

**systemAfterPrepend**: "",

`system prompt text inserted here`, chat history is added at the end of the system prompt text.

**postPrompt**: "",

**memorySystem**: "",

**endSystemTurn**: "", 

### User Prompt Segments

`startTurn`

**startUser**: "",

**userRole**: "",

**endUserRole**: "",

`endRole`

`rolegap`

**memoryUser**: "",

`user prompt inserted here`

**endUserTurn**: "",

`endTurn`


### Assistant Prompt Segments

`startTurn`

**startAssistant**: "",

**assistantRole**: "",

**endAssistantRole**: "",

`endRole`

`roleGap`

**responseStart**: "", This segment isn't correctly being used by passed jinja templates.

**endAssistantTurn**: "", only used for history markup

`endTurn`

**specialInstructions**: "" only for jinja template

## examples: 

### Llama 3:
- startTurn: "<|start_header_id|>",
- endTurn: "<|eot_id|>", 
- endRole: "<|end_header_id|>",
- roleGap: "\n\n",
- systemRole: "system",
- userRole: "user",
- assistantRole: "assistant",

### ChatML:
- startTurn: "<|im_start|>",
- endTurn: "<|im_end|>\n",
- systemRole: "system",
- userRole: "user",
- assistantRole: "assistant",
- roleGap: "\n",
### Alpaca:
- endTurn: "\n\n",
- systemRole: "Below is an instruction that describes a task. Write a response that - appropriately completes the request.",
- userRole: "### Instruction:",
- assistantRole: "### Response:",

## Generation Parameters 

Different inference apis may have different key names and requirements. Notably Kobold uses `max_length` while TextGenWebUi uses `max_tokens` to define the maximum response length. You may need to reference the docs for your chosen inference server to determine the correct parameter keys. 

Clipboard Conqueror should work with any inference API, or as many parameter sets as you care to define for quick swapping.

 If you find an api that doesnt work, or need help, contact me at clipboard.aseichter2007@gmail.com or open an issue or discussion on github.

### Text Generation WebUi Completions
 ### [ooba](https://github.com/aseichter2007/ClipboardConqueror/blob/a926ac45bd4a1d93f214cfa3000f77a99741545e/setup.js#L1337): { again, the object key is used like |||ooba|
 
 - **max_context_length**: 8192, may not be required, CC relies on the inference API to trim overlong context. Kobold intelligently preserves the system prompt. 

 - **max_tokens**: 700, Number of tokens requested. This number is not strict, it's the maximum. It may be less if the model stops generating.

 - **temperature**: 1, Temperature changes scaling of final token probability, less than one makes unlikely tokens less likely, more than one makes unlikely tokens more likely, normalizing final probabilities.

 - **repetition_penalty**: 1.05, rep penalty helps prevent repetition. 1.00 is no penalty. High values can negatively impact formatting charachters.

 - **top_p**: 1, discard possible tokens by throwing out lest likely answers. 0.8 throws away least likely 20%

 - **top_k**: 0, discard all but top_k possible tokens. top_k: 3 means all but the most probable 3 possible tokens are discarded.

 - **top_a**: 0,If the maximum probability is very high, fewer tokens will be kept. If the maximum probability is very close to the other probabilities, more tokens will be kept.

 - **typical**: 1, this allows top tokens to be suppressed in favor of slightly lower probability tokens. May improve quality and control repetition. 

 - **tfs**: 0.97, tail free sampling, removes unlikely tokens from possibilities by finding the platau where tokens approach equally unlikely. 0.99 maximum. Higher value finds a lower, flatter plateau.

 - **min_p**: 0.1, discard possible tokens less than 10% as likely as the most likely possible token.  If top token is 10% likely, tokens less than 1% are discarded. I typically only use min_p.

 - **repetition_penalty_range**: 512, how many tokens to check for repetition penalty, longer slows generation. 
 
 - **repetition_penalty_slope**: 0.7, this applies a curve to repetition penalty so that tokens farther back in the context are penalized less. 

 - **sampler_order**: [6, 5, 0, 1, 3, 4, 2] the sampler order. Only adjust this if you know what you're doing. 
 
 }

## Ollama puts generation parameters under options:

Because of this, quick setting options are not currently supported, like "|||top_k:15|" they have to be changed in setup.js

ollama: {
- model: "llama3",//required for ollama. Can be changed like |||model:"llama3"| while params in options are not accessible from the copy line. 
- //format: "json" forces json response format from the inference API. I think it's just an easy apply grammar setting.
- keep_alive: "5m", how long to keep the model in memory, default is 5 minutes
- stream: false,
- options: { 
    - num_keep: 5,
    - seed: 42,
    - num_predict: 100,
    - top_k: 20,
    - top_p: 0.9,
    - tfs_z: 0.5,
    - typical_p: 0.7,
    - repeat_last_n: 33,
    - temperature: 0.8,
    - repeat_penalty: 1.2,
    - presence_penalty: 1.5,
    - frequency_penalty: 1.0,
    - mirostat: 1,
    - mirostat_tau: 0.8,
    - mirostat_eta: 0.6,
    - penalize_newline: true,
    - stop: ["\n", "user:"],
    - numa: false,
    - num_ctx: 1024,
    - num_batch: 2,
    - num_gpu: 1,
    - main_gpu: 0,
    - low_vram: false,
    - f16_kv: true,
    - vocab_only: false,
    - use_mmap: true,
    - use_mlock: false,
    - num_thread: 8

        }

    },

---
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-inferenceChaining.md)