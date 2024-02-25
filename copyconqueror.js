const clipboardListener = require('clipboard-event');
const ncp = require('copy-paste');
const notifier = require('node-notifier');
const axios = require('axios');
const SendEngine = require('./textengine.js');
const RecieveEngine = require('./responsengine.js');
const fs = require('fs');
//const path = require("path");

//setup all settings//
//const write = true;
const write = false; // this value controls whether the files are written to disk.
const endPointConfig = {};
const instructions  ={};
const params = {}
const identities = {};
const formats = {};
const format = {};
const {setup} = require('./setup.js');
setup( endPointConfig, instructions, params,identities, formats, format, fs, write);
//end settings//
const recieveEngine = new RecieveEngine();
function testing(){//hooked into changehandler, copy to execute
    
}

const InferenceClient = require('./inferenceInterface.js');
const {saveSettings} = require('./settingSaver.js');
const client = new InferenceClient( axios, recieveApiResponse, returnSummary, NotificationBell, formats.formats, params, endPointConfig.routes);//todo, this doesnt really belong like this.

client.setPromptFormat(format.format);
const sendEngine = new SendEngine(client, ncp.copy, recieveApiResponse, NotificationBell, endPointConfig.routes, identities.identities, instructions.instructions, params, formats.formats, saveSettings, fs);
function notify(title = "Paste Ready", text = "The response is ready."){
// Define the notification
if (title == ''){
    title = "empty response";
}
if (text == ''){
    text = "The response was blank.";
}{
    
}
const notification = {
    title: title,
    message: text,
    icon: './icon.jpg', // Optional
    sound: true,// Optional, plays a sound with the notification
    //looping: false, 
    //I have a hypothesis that on linux we need to specify a sound file.
    //audio_src: 'ms-winsoundevent:Notification.sms', //I think this is only for windows phone, also, I think my access is one layer out, I may have to dig into my dependancy.
    
};
// Display the notification
notifier.notify(notification, function (err, response) {

  // Handle errors or response if needed
  if (err) {
    console.log(err);
    //maybe someone on linux will get an error back now.
  }
});
}
function returnSummary(text){
    text = text.replace(/\\n/g, '\n');
    let Response = recieveEngine.recieveMessageFindTerminatorsAndTrim(text);
    sendEngine.recievesummary(Response);
    //client.getstats(sendData, "summary");
}
function recieveProcessedClip(identity, query, params) {
    client.formatQueryAndSend(identity, query, params);
}
function recieveApiResponse(text){
    text = text.replace(/\\n/g, '\n');
    NotificationBell("Paste Response:", text);   
    sendEngine.blockPresort = true;
    sendEngine.recentClip.text = text;
    ncp.copy(recieveEngine.recieveMessageFindTerminatorsAndTrim(text));
}
// To start listening
// function sendData(data, destination) {
//     const flags = ['summary', 'user']; // Define your list of available destinations here
//     //console.log(JSON.stringify(data));
//     try {
//         switch (destination) {
//             case flags[0]:
//                 console.log(`Sending data to summary`);
//                 break;
//             case flags[1]:
//                 console.log(`Sending data to ai memory`);
//                 break;
//             default:
//                 //return to agent memory
//                 //throw new Error('Invalid destination');
//                 break;
//         }

//         // Send data to the chosen destination
//         console.log(`Sent ${data} to ${destination}`);
//     } catch (error) {
//         console.error(`Error sending data: ${error.message}`);
//     }
// }


clipboardListener.on('change', () => {
    ncp.paste(clipboardChangeHandler)
    //console.log('Clipboard changed');
});
function clipboardChangeHandler(err,text){
    //console.log(JSON.stringify(text));
    console.log("ClipboardChangeHandler: " +text);
    if (err) {
        NotificationBell("error: ", err+text); 
        return console.log(err+text);
    }
    sendEngine.setupforAi(text);
}
//sounds spooky
function NotificationBell(title, text) {
    notify(title, text);        
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

