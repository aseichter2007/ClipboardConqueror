![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)

Clipboard Conqueror - Installation:
=============================

[Home](readme.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-Inference-Chaining.md), [Setup.js](Readme-Setup.md)

---

### Installation Instructions:

1. **Install Node.js**: If you don't have Node.js installed, visit the official [Node.js website](https://nodejs.org/) and download the installer that corresponds to your operating system. Follow the on-screen prompts to complete the installation.

2. **Choose a Backend**: Clipboard Conqueror is most powerful with [KoboldCPP](http://www.github.com/LostRuins/koboldcpp/), [Text Generation WebUI](https://github.com/oobabooga/text-generation-webui), [Ollama](https://www.ollama.com), or [LMStudio](https://lmstudio.ai) or any inference supplier via  completion endpoints. Any openAI compatible API should work fine, but may not support all features of Clipboard Conqueror.

3. **Download a Model**: I recommend [Llama 3 GGUFs](https://huggingface.co/bartowski/Meta-Llama-3-8B-Instruct-GGUF). Choose a model that fits in your RAM with at least 2GB extra for context ingestion and basic Windows stuff. (4k context is generally around 1 GB)

4. Run and test your backend of choice with your chosen model to verify that everything is working correctly.

5. [**Download Clipboard Conqueror**](https://github.com/aseichter2007/ClipboardConqueror/archive/refs/heads/main.zip) from this repository and unzip it.

### Install Dependancies:

- **Windows**: Run `z-installCC.bat`
- **Linux**: Run `xy-linux-mac-install.sh`
- **Mac** Run `xy-linux-mac-install.sh`
- **CLI** run `npm install` from the Clipboard Conqueror directory.

### Running Clipboard Conqueror:

- **Windows**: run `z-runCC.bat` or `z-runCCnodeMon.bat`.
- **Linux**: run `y-linux-start-no-nodemon.sh` or `y-linux-start-nodemon.sh` 
- **Mac**: run `x-mac-start-no-nodemon.sh` or `x-mac-start-nodemon.sh.`
- **CLI**:  run `npm win`, `npm linuxnomon` or `npm macnomon` from the Clipboard Conqueror directory. 
- **CLI with node-monitor** run `npm start`, `npm linux`, or `npm mac` from the Clipboard Conqueror directory.

Node Monitor or "nodemon" detects file changes in the directory and restarts CC after saving file changes. This is useful as it allows you to edit settings in the setup.js file without having to restart CC manually, but uses a bit more ram. It's still much smaller than a web browser. 

Linux/Mac Notes: 
----
  The notification when generation is finished works but there may be no audible sound. This is a limitation of the fallbaack notification system "Growl".

### Troubleshooting:

- If Clipboard Conqueror closes on launch, ensure you have Node installed and have run the appropriate installation script.
- If Clipboard Conqueror seems unresponsive, close and re-launch CC. If you are running with nodemon, type `rs` in the console and hit enter to restart Clipboard Conqueror.
- For API errors, make sure Koboldcpp or your choice of backend is running, and that it is set as the defaultClient in setup.js.

### Making Quick Launch Shortcuts:

I provide sampleLaunchKoboldBat.bat and hermes16.kcpps to ease making quick launch shortcuts to quickly launch diffent models. They need to be changed to match your system, and the scripts need to be in the same folder as both koboldcpp.exe and hermes16.kcpps.



Talk to AI Anywhere:
---
 Copy this line: `|||introduction|` and paste into a text field. The introduction is packed with information, and is a good way to verify that the basic system is working before making an inference request. 
 
 If you want to skip the introduction, you can get right to things like:
 ```
  |||what is an inverse square root and how is it useful?
 ``` 
Have fun and remember you can always ask for `|||help|` or `|||qr|` for a quick review of common Clipboard Conqueror functions, or try `|||h| How can I do x with Clipboard Conqueror?` to use the experimental conversational help. The performance will depend on your model, and it needs some more tuning before I will say it works.

Once you have everything working, head to [Basic Use](Readme-How-To-Use-CC.md).

---

[Home](readme.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-Inference-Chainingg.md), [Setup.js](Readme-Setup.md)