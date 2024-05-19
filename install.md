![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Installation:
=============================
[Home](readme.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)

---

[Install Node](https://nodejs.org/) Clipboard Conqueror requires Node to run. If nothing happens when you click the scripts, you likely need node.

Clipboard Conqueror reccomends [KoboldCPP](http://www.github.com/LostRuins/koboldcpp/releases/) for Windows users. Kobold does the actual AI LLM processing, Clipboard Conqueror bridges kobold with the clipboard for use anywhere. 

[OpenHermes 2.5 Mistral 7B 16K Context.GGUF](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF)

Get a model that fits in your graphics card or system ram, more details in installation, below. 

[Download Clipboard Conqueror](https://github.com/aseichter2007/ClipboardConqueror/archive/refs/heads/main.zip). Unzip it.


Run the install script first, it gets the dependencies installed. 

Windows:
---
Install:
> z-instalCC.bat

Run 
> z-runCC.bat

I like z-runCCnodeMon.bat because it automatically restarts and loads changes in setup.js. Unless settings files are enabled, that gets clunky. 


linux
---

xy-linux-mac-install.sh

y-linux-start-no-nodemon.sh

Mac
---

xy-linux-mac-install.sh

x-mac-start-no-nodemon.sh

---
Installation with more details:
---
Currently there are no built binaries and Node is required to run Clipboard Conqueror.

|||how to to install node for normies. Use markdown suitable for a .MD for links

1. Assumption: You are seeking instructions on how to install Node.js for someone with little technical knowledge and would like the explanation to be in a Markdown format suitable for a .md file.

    Step 1: Visit the official Node.js website [Get Node](https://nodejs.org/) and download the installer that corresponds to your operating system. Node 20 is sufficient.

    Step 2: Double-click on the downloaded installer file to start the installation process.

    Step 3: Follow the on-screen prompts to complete the installation. Ensure to check the box for "Add to PATH" during the installation to have Node.js available globally on your system.

    Step 4: Once installed, test Node.js by running the following command in your terminal or command prompt: `node -v`




2. Clipboard Conqueror is most powerful with [KoboldCPP](http://www.github.com/LostRuins/koboldcpp/releases/),or a kobold compatible API. [openAI compatible API](https://github.com/oobabooga/text-generation-webui) 

    Koboldcpp is a standalone executable, easy to get started with. 

CC works with either or both! or just an openAI key. Or even more! I'd love to hear how you connect your choice of backend for a compatibility list and maybe adding your settings to the defaults.


For macOS get KoboldAi, TextGenerationWebUi or anything that hosts a completion or chat api. //Notes below for linux and mac, thank Herro.

I supply a sample batch file for loading a model with your settings file after you get koboldcpp dialed in from the launcher. Edit and go. My desktop has icons for a dozen models to load depending on what I want back.

    a kobold or openAI compatible api must be running to use Clipboard Conqueror, or you can connect to an online service such as the official Open Ai api to access chatGPT.


Kobold needs a model. I like GGUF because it is one file rather than a folder of mess.
   Here are my reccomendations 4/30/24:[Llama 3 GGUFs](https://huggingface.co/bartowski/Meta-Llama-3-8B-Instruct-GGUF) get one that fits in your ram with 1.5gb free for context and basic windows stuff. 

   CUDA0 buffer size =  7605.33 MiB : this is the memory size of the Q8 quant for Llama 3 8B

   CUDA0 KV buffer size =  1036.00 MiB 8192(8k) context. 

   With some extra stuff open(web browser, vsCode, etc) I'm at 11 GB vram utilized in total. Without using a graphics card, this would all be in regular ram.

Text-Generation-WebUI downloads models in the model page, paste your link, check the file list, and let it do it's thing. 


    Most of my prompts are tuned against OpenHermes 2.5 Mistral 7b with chatML. Some against Llama 3 8B.
    

     
  

Finally, [download](https://github.com/aseichter2007/ClipboardConqueror/archive/refs/heads/main.zip) Clipboard Conqueror from this repository and unzip it. 

windows:
---

run z-instalCC.bat

Mac and linux:
---
xy-linux-mac-install.sh



after it finishes run:

z-runCC.bat

or 

z-runCCnodeMon.bat. nodemon: file changes restart CC and clear memory while updating settings from setup.js.

linux
---
y-linux-start-no-nodemon.sh

or

y-linux-start-nodemon.sh

Mac
---

x-mac-start-no-nodemon.sh

or

x-mac-start-nodemon.sh


or from a terminal at the folder:
--
npm i

then choose the appropriate from:

    npm run linux 

    npm run linuxnomo //no-monitoring or nodemon

    npm run mac

    npm run macnomon //no-monitoring or nodemon

    npm run win

    npm start //windows, nodemon: file changes restart and clear memory.




Troubleshooting:
---

If Clipboard Conqueror closes on launch, check to be sure you have Node installed and have run z-runCC.bat,xy-linux-mac-install.sh, or npm i.

The most common issue with setup is people who expect they have node but do not. 

If Clipboard Conqueror seems unresponsive, close and re-launch CC.  If you are running with nodemon, type rs in the console and hit enter to restart the app.

For API errors make sure Koboldcpp or your choice of backend is running, and that it is set as the defaultClient in setup.js. I always get impatient and beat the API to the ready mark. I should finish squasing the API error problems so it doesn't hang, but I gotta figure out why I can't hit LMstudio first.


If CC seems hung, copy text with no invoke and try again. When using Text Generation Webui, it's can be hard to tell if it's working. Consider asking for fewer tokens until you know it's working. 
Sometimes models take up to a few minutes to respond. If it is taking longer, make sure you aren't running out of memory. There is a setting in the nvidia control panel that controls how memory overflows are handled. The default setting starts offloading a before memory is all the way full, so I disable this, in favor of crashes over very slow generation. 

currently the entire settings for my app are in setup.js.
setup.js writes files for each type of setting. If formatting errors are introduced in those files, they are overwritten with the defaults. 


Quick launch shortcuts:
---


I provide sampleLaunchKoboldBat.bat and hermes16.kcpps to ease making quick launch shortcuts. They need to be changed to match your system, and the bat expects to be in the same folder as both koboldcpp.exe and hermes16.kcpps.  hermes16.kcpps contains a full path that must match the model location, I recommend loading and saving the file to change the target. Also, lately I have found smaller batch sizes is better when I am pushing my memory limits, 512 and higher end up putting context on the hard drive at large contexts.

--------------------------------
Begin elevated computeration. 
--------------------------------

Copy this line:
```
|||introduction|
```
paste in a text field, a big one. The introduction is jam packed with information.

three pipes invokes the AI. If you want to skip the introduction you can get right to things like:
```
|||what is an inverse square root and how is it useful. 
```
Have fun and remember you can always ask for
```
|||help|
```
and paste a quick review of common Clipboard Conqueror functions. 

If you have all the bits going, head to [Basic Use](useClipboardConqueror.md),
---
[Home](readme.md), [Choosing a model](choosingAModel.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)