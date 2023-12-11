let botresponse = false
const path = require("path");
const openAiConfig = require("./openai.json");
const {findSettings} = require("./setup.js");
const clipboardListener = require('clipboard-event');
const SendEngine = require('./textengine.js');
const RecieveEngine = require('./responsengine.js');
const ncp = require('copy-paste');
const recieveEngine = new RecieveEngine();
const axios = require('axios');
const fs = require('fs');
const settings = findSettings();
const notifier = require('node-notifier');
function testing(){//hooked into changehandler, copy to execute
    
}
var client =  {};
var lastClip = "";
var lastResponse = "";
var lastgen = "";
var memout = '';
const KoboldClient = require('./koboldinterface.js');
//if (configs.client== "kobold")
{
    client = new KoboldClient( axios, recieveApiResponse, returnSummary, NotificationBell);//todo, this doesnt really belong like this, should be created directly into textengine constructor and eliminate all this mess running across the main program. Needed before adding openAI, untangling this will make that much easier. 
    
}   
const sendEngine = new SendEngine(recieveProcessedClip, ncp.copy, recieveApiResponse, NotificationBell, getSummary, client.getTokenCount, openAiConfig);
function notify(title = "Paste Ready", text = "The response is ready"){
// Define the notification
const notification = {
    title: title,
    message: text,
    icon: './icon.jpg', // Optional
    sound: true, // Optional, plays a sound with the notification
};
// Display the notification
notifier.notify(notification, function (err, response) {

  // Handle errors or response if needed
  //console.log(response);
});
}
function getSummary(text, params) {
   // client.send(text, params)
}
function returnSummary(text){
    text = text.replace(/\\n/g, '\n');
    let Response = recieveEngine.recieveMessageFindTerminatorsAndTrim(text);
    sendEngine.recievesummary(Response);
    //client.getstats(sendData, "summary");
}
function recieveProcessedClip(text, params, lastTag) {
    //console.log("clipback: " + text);
    client.send(text, params, lastTag);
}
function recieveApiResponse(text, agent){
    text = text.replace(/\\n/g, '\n');
    NotificationBell("Paste Response:", text);
    botresponse = true
    lastResponse = recieveEngine.recieveMessageFindTerminatorsAndTrim(text);//I don't think this ever activates but it will support function calling maybe.
    lastClip = "";
    ncp.copy(lastResponse);
    //client.getTokenCount(lastResponse, agent, sendData);
}
// To start listening
function sendData(data, destination) {
    const flags = ['summary', 'user']; // Define your list of available destinations here
    //console.log(JSON.stringify(data));
    try {
        switch (destination) {
            case flags[0]:
                console.log(`Sending data to summary`);
                break;
            case flags[1]:
                console.log(`Sending data to ai memory`);
                break;
            default:
                //return to agent memory
                //throw new Error('Invalid destination');
                break;
        }

        // Send data to the chosen destination
        console.log(`Sent ${data} to ${destination}`);
    } catch (error) {
        console.error(`Error sending data: ${error.message}`);
    }
}


clipboardListener.on('change', () => {
    ncp.paste(clipboardChangeHandler)
    //console.log('Clipboard changed');
});
function clipboardChangeHandler(err,text, debug = true){
    //console.log(JSON.stringify(text));
    console.log("ClipboardChangeHandler: " +text);
    if (err) {
        NotificationBell("error: ", err+text); 
        return console.log(err+text);
    }
    let out = text.trim();
    if (lastClip !== out && lastResponse !== out&& !botresponse) {
        sendEngine.setupforAi(out);
        lastClip = out;
        //console.log(JSON.stringify(out));//|||coder|
        if(debug){
            //NotificationBell("text copied", lastClip);
            testing();
        }
    }

    botresponse = false;
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