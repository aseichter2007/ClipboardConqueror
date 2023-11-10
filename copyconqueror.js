const path = require("path");
const sound = require('sound-play');
const myconfig = require("./defaultconfig.js");
const {findSettings} = require("./setup.js");
const clipboardListener = require('clipboard-event');
//const player = require('sound-play')(opts = {});
const SendEngine = require('./textengine.js');
const RecieveEngine = require('./responsengine.js');
const ncp = require('copy-paste');
const recieveEngine = new RecieveEngine();
const sendEngine = new SendEngine(recieveProcessedClip,ncp.copy,NotificationBell, getSummary);
const axios = require('axios');
const fs = require('fs');
const settings = findSettings();
//const {playAudioFile} = require('audic');
//console.log(settings);
function testing(){//hooked into changehandler, copy to execute
let test = "string";
let out = JSON.stringify(test);
console.log(out);
let rec = JSON.parse(out);
console.log(JSON.stringify(rec));
}
var client =  {};
var lastClip = "";
var lastResponse = "";
const KoboldClient = require('./koboldinterface.js');
//if (configs.client== "kobold")
{
    client = new KoboldClient("http://127.0.0.1:5001/api/v1/generate/", axios, recieveApiResponse, returnSummary, NotificationBell);
    
}   

function getSummary(text, params) {
    client.send(text, params, true)
}
function returnSummary(text){
    text = text.replace(/\\n/g, '\n');
    lastResponse = recieveEngine.recieveMessageFindTerminatorsAndTrim(text);
    sendEngine.recievesummary();
}
function recieveProcessedClip(text, params) {
    //console.log("clipback: " + text);
    client.send(text, params);
}
function recieveApiResponse(text){
    NotificationBell("received");
    text = text.replace(/\\n/g, '\n');
    lastResponse = recieveEngine.recieveMessageFindTerminatorsAndTrim(text);
    ncp.copy(lastResponse);
}
// To start listening
function getSummary(text){

}


clipboardListener.on('change', () => {
    ncp.paste(clipboardChangeHandler)
    //console.log('Clipboard changed');
});
function clipboardChangeHandler(err,text, debug = true){
    //console.log(JSON.stringify(text));
    console.log("ClipboardChangeHandler: " +text);
    if (err) {
        NotificationBell("error"); 
        return console.log(err+text);
    }
    let out = text.trim();
    if (lastClip !== out && lastResponse !== out) {
        sendEngine.setupforAi(out, lastClip);
        lastClip = out;
        //console.log(JSON.stringify(out));//|||coder|
        if(debug){
            //NotificationBell("ready");
            testing();
        }
    }
}
//sounds spooky
function NotificationBell(soundAction) {
    const listeningSound = './media/Listening.mp3';
    const replySound = './media/ReplyReady.mp3';
    const sentSound = './media/sent.mp3';
    const errorsound = './media/Error.mp3';
    const readysound = './media/ready.wav';
    switch (soundAction) {
        case "ready":
            playtargetsound(readysound)
            break;
        case "listening":
            playtargetsound(listeningSound)
            break;
        case "received":
            playtargetsound(replySound)
            break;
        case "sent":
            playtargetsound(sentSound)
            break;
        case "error":
            playtargetsound(errorsound)
            break;
        default:
            console.log("unknown sound request");
            break;
    }
}
function playtargetsound(file){
    // player.play(file, (error) => {
    //     if (error) {
    //         return console.error(`Error while playing audio: ${error}`);
    //         }
    //         //console.log('Audio started playing!')
        
    //     });
    sound.play('./media/', file);
}
clipboardListener.startListening();
{//cleanup listener
    process.on('SIGINT', () => {
    console.log('Received SIGINT signal. Cleaning up and exiting...');
    // Perform any cleanup or dismounting necessary for your event handler here
    clipboardListener.stopListening(); // Remove all event listeners to prevent memory leaks
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Cleaning up and exiting...');
    // Perform any cleanup or dismounting necessary for your event handler here
    clipboardListener.stopListening(); // Remove all event listeners to prevent memory leaks
    process.exit(0);
  });
}
// To stop listening
//clipboardListener.stopListening();

// copy(text[, callback]): asynchronously replaces the current contents of the clip board with text. Takes either a string, array, object, or readable stream. Returns the same value passed in. Optional callback will fire when the copy operation is complete.

// paste([callback]): if no callback is provided, paste synchronously returns the current contents of the system clip board. Otherwise, the contents of the system clip board are passed to the callback as the second parameter. The first one being a potential error.

// Note: The synchronous version of paste is not always available. Unfortunately, I'm having a hard time finding a synchronous version of child_process.exec that consistently works on all platforms, especially windows. An error message is shown if the synchronous version of paste is used on an unsupported platform. That said, the asynchronous version of paste is always available.