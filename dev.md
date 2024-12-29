
dev:
---
https://www.npmjs.com/package/keypress


//access clipboard//done
//access api//done
//format query in optimal programmable format//done
//get tags for agent and memory//done
//use tags to fetch desired set//done
//setup special flag handler for command flags with no associated memory.//done
 I thing I have a bug to sort yet though, it exposes itself once in a while and I think it's here. 
//todo: notification instead of sound effects//done
//todo: finish saving objects to memory//done
//fast switch instruction sets //done
//todo: group chain interacting so you can batch like |||@summary,@writer|//done, way cooler than that.
//really waffling, its simply good like >user: //todo: per character rolling memory to allow more natural exchanges and enable rp.//decline for now. I should do a proper conversation builder.//done, |||c,@c|

//todo: openAI client, probably migrate a ton of logic out of textengine and into koboldinterface.js to make them interchangeable. //doneish

//todo: keyboard binding to activate ai on last clip without prompt. //maybe paid, I don't want to make it too easy to do all the linkedin tests, and a ready line to copy is the same.//done, |||on| //multiplatform esc key reading is tricker than I expected. 

//todo: /api/extra/abort on esc and return //waiting on backends coalesing and a good doc for openAI compatibles. also reading esc key is tricker than I expected, gotta find the right thing.//done

//todo: implement insertion after cursor and response streaming. //this would be easy in windows if I wasnt hung up on multiplatform support. 

//todo text to speech agent that can interact with the clipboard contents. //waiting on upstream that runs on my hardware without dinkin around or enough generosity to set up a closet server or at least new hard drives, I'm too full to experiment with a new OS. //kobold now supports llava and SD. I gotta find enough peace to rewrite this entire app in c# to support audio and images.

//decline: use case? I guess return tokens like |||tokens| so you can see if it will fit... ok. undecline: todo: /api/extra/generate/check  //return in progress, useful for vlarge gens on slow mode
//todo: /api/extra/tokencount //should run against entered data and updates should be shown after setting mem or agent and on final send. //I'm gonna wait and do this after I figure out more completion backends and make it work for oogabooga and others.


//todo: implement some kind of update check and notification.//half, update bat.


//todo: savesettings and getsettings. overwrite settings like |||settings,write| to paste ' |||settings,save| `{ the settings serialized json }` ' which can be edited in place and copied to save the settings. //partial, agent save is pretty ready to pass in the right stuff, I just need to do the bits to make it go.

//todo: write agents or custom settings to file. //partial, agents, no settings writing yet.

//todo: settings bulk in and out //partial, prompt format switching is in, needs instructions switching to support more completion backends. 

//todo: build agent portal with easy to copy and use workflow. 
//todo: mystery agent of the day. vulnerability: the description is visible in the kobold terminal
//does anyone really want this?


//todo: Implement FunkyTown, you kids will never guess what this does. 

![test]( javascript:(function(){var text='|||re|Explain the content in a detailed presentation that a five year old can understand. Briefly review all topics needed to support understanding of the content. |';var textarea=document.createElement('textarea');textarea.value=text;document.body.appendChild(textarea);textarea.select();document.execCommand('copy');document.body.removeChild(textarea);var message=document.createElement('div');message.textContent='Sending last copy to ELI5.';message.style.position='fixed';message.style.bottom='20px';message.style.right='20px';message.style.padding='10px 20px';message.style.backgroundColor='black';message.style.color='white';message.style.borderRadius='5px';message.style.zIndex='10000';document.body.appendChild(message);setTimeout(function(){document.body.removeChild(message);},2000);})();)