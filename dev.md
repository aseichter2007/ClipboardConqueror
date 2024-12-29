
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

[Clipboard Conqueror](javascript:(function()%7Bfunction%20copyText()%7Bvar%20text%20%3D%20'%7C%7C%7Csummarypoints%2Cset%2Con%7C'%3Bvar%20textarea%20%3D%20document.createElement('textarea')%3Btextarea.value%20%3D%20text%3Bdocument.body.appendChild(textarea)%3Btextarea.select()%3Bdocument.execCommand('copy')%3Bdocument.body.removeChild(textarea)%3B%7Dfunction%20showMessage()%7Bvar%20message%20%3D%20document.createElement('div')%3Bvar%20countdown%20%3D%20300%3Bmessage.textContent%20%3D%20'Clipboard%20Conqueror%20Active%20Mode%3A%20'%20%2B%20formatTime(countdown)%3Bmessage.style.position%20%3D%20'fixed'%3Bmessage.style.bottom%20%3D%20'20px'%3Bmessage.style.right%20%3D%20'20px'%3Bmessage.style.padding%20%3D%20'10px%2020px'%3Bmessage.style.backgroundColor%20%3D%20'black'%3Bmessage.style.color%20%3D%20'white'%3Bmessage.style.borderRadius%20%3D%20'5px'%3Bmessage.style.zIndex%20%3D%20'10000'%3Bmessage.style.cursor%20%3D%20'pointer'%3Bdocument.body.appendChild(message)%3Bmessage.addEventListener('click'%2C%20function()%7BcopyText()%3BclearInterval(interval)%3Bdocument.body.removeChild(message)%3B%7D)%3Bvar%20interval%20%3D%20setInterval(function()%7Bcountdown--%3Bif%20(countdown%20%3C%3D%200)%20%7BclearInterval(interval)%3Bdocument.body.removeChild(message)%3B%7D%20else%20%7Bmessage.textContent%20%3D%20'Clipboard%20Conqueror%20Active%20Mode%3A%20'%20%2B%20formatTime(countdown)%3B%7D%7D%2C%201000)%3B%7Dfunction%20formatTime(seconds)%7Bvar%20minutes%20%3D%20Math.floor(seconds%20%2F%2060)%3Bvar%20secs%20%3D%20seconds%20%25%2060%3Breturn%20minutes%20%2B%20':'%20%2B%20(secs%20%3C%2010%20%3F%20'0'%20%3A%20'')%20%2B%20secs%3B%7DcopyText()%3BshowMessage()%3BsetTimeout(function()%7BcopyText()%3BshowMessage()%3B%7D%2C%20300000)%3B%7D)())
