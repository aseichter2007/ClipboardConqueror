![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Multiple Backend Support
=============================
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [Chaining Inference](Readme-inferenceChaining.md), [Setup.js](Readme-Setup.md)

---
  Switch Endpoints
  ---
  Clipboard Conqueror supports infinite configurable endpoints. You can add as many as you like. 

  CC supports multiple parameter sets to ease multiple inference endpoint configurations.

  It can support anything that takes either a string completion or "messages" openAI chat api style input. 
  
  Feedback and issues about compatibility are appreciated.

  The verbosity of Text Generation WebUI leaves something to be desired. I prefer KoboldCpp because it exposes the text recieved, and there is better indication that the query is being processed, and how much longer that might take. 
  
  Ollama should work, but becuse it uses a different structure for generation parameters they must be set in setup.js and quick settings are not supported. Ollama chat doesn't spec a jinja adapter either, so prefer the completion endpoint.  Many features of Clipboard Conqueror do not work through the openAI api compatible endpoint. 

  Move your favorites to the top in setup.js and invoke them by |||$| from top to |||$$$...| at bottom. Or use the key names like `|||kobold|` , `|||tgw|`, `|||lmstudio|` or `|||ollama|`

 ### On inference endpoint switching, You're left talking to the last endpoint you accessed.
 Changing inference endpoints may change the current params and overwrite settings changes like |||450,temperature:0.7|. There is a per endpoint setting to prevent this behavior.

 
  >|||$|this message will go to the first configured endpoint in setup.js or 0endpoints.json if settings files are enabled
  
  >|||$| will set the desired endpoint until you change to a new endpoint. 
 
  >|||$$|this will go to the second configured endpoint
 

  >|||tgwchat|this will go to the Text Generation WebUi openAI chat compatible endpoint. 

//todo: fix jinja templating, it's not sending the start of assistant responses. This may be a limitation of the Text Generation Web UI software and out of my control, or I may have to deliberately malform the jinja templater function to sidestep the issue. Do other inference engines support using jinja templates? (I may have misunderstood the jinja template implemntation too.)

>|||ooba| or |||tgw| will go to the Text Generation Webui completion endpoint for full feature support. 


  Add endpoints and parameters in settings.js or 0endpoints.json if settings files are enabled. File writing is off by default, the settings files are more for use with binaries.

  ### Data Protection Policy Compliance:

  When using these commands, be aware that data may be sent to outside systems. This may be a breach of your company's data protection policy. Remove undesirable endpoints from setup.js to prevent sending data to unauthorized systems by mistake. 
. 

  ---
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [Chaining Inference](Readme-inferenceChaining.md), [Setup.js](Readme-Setup.md)