![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Multiple Backend Support
=============================
[Home](readme.md), [Install](install.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Chaining agents](agentChaining.md)

---
  Switch Endpoints
  ---
  Clipboard Conqueror supports infinite configurable endpoints. You can add as many as you like. 
  CC supports multiple parameter sets to ease multiple backend configurations.

  It can support anything that takes either a string or "messages" openAI api style input. LMstudio and Koboldcpp's openai api endpoints return cryptic errors. Something about SSLv3 and a generic bad request refusal. Any insights would be appreciated.

  The verbosity of TGWUI leaves something to be desired. Prefer KoboldCpp because there is better indication that the query is being processed, and how much longer that might take. Feedback and issues about compatibility are appreciated.
  
  Ollama should work, but becuse they have a different structure for their generation parameters they must be set in setup.js and quick settings are not supported. Ollama chat doesn't spec a jinja adapter either, so prefer the completion endpoint.  Many features of Clipboard Conqueror do not work through the openAI api compatible endpoint. 

  Move your favorites to the top in setup.js and invoke them by |||$| from top to |||$$$...| at bottom. Or just use the key names like `|||kobold|` or `|||tgwchat|`  

  ```
  |||$|this message will go to the first configured endpoint in setup.js or 0endpoints.json if settings files are enabled
  ```

  ```
  |||$$|this will go to the second configured endpoint
  ```
  ```
  |||tgwchat|this will go to the Text Generation WebUi openAI endpoint. //todo: fix jinja templating, it's not sending the start of assistant responses
  ```
```
|||ooba| or |||tgw| will go to the Text Generation Webui completion endpoint for full feature support. 
```

  Add endpoints and parameters in settings.js or 0endpoints.json if settings files are enabled. File writing is off by default, the settings files are more for use with binaries.

  When using these commands, be aware that data may be sent to outside systems. This may be a breach of your company's data protection policy.

  |||$,set| will behave as expected and send to the compatible endpoint until |||set| to release. //todo: determine if this is broken.


  You can safely use any other command to query sensitive data, and depending on your configuration, gpt commands can be sent locally as well. 

  ---
  [Home](readme.md), [Install](install.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Chaining agents](agentChaining.md)
