const clipboardListener = require("clipboard-event");
const ncp = require("copy-paste");
const notifier = require("node-notifier");
const axios = require("axios");
const SendEngine = require("./textengine.js");
const RecieveEngine = require("./responsengine.js");
const fs = require("fs");
//const path = require("path");

//setup all settings//
//const write = true;
const endPointConfig = {};
const appSettings = {};
const params = {};
const identities = {};
const formats = {};
const format = {};
const { setup } = require("./setup.js");
setup(
  endPointConfig,
  appSettings,
  params,
  identities,
  formats,
  format,
  fs,
  false
);
//end settings//
const recieveEngine = new RecieveEngine(appSettings);

const InferenceClient = require("./inferenceInterface.js");
const { saveSettings } = require("./settingSaver.js");
const client = new InferenceClient(
  axios,
  recieveApiResponse,
  /*returnSummary,*/ notify,
  formats.formats,
  params,
  endPointConfig.routes
); //todo, this doesnt really belong like this.
//setup default format.

const sendEngine = new SendEngine(
  client,
  ncp.copy,
  recieveApiResponse,
  notify,
  endPointConfig.routes,
  identities.identities,
  appSettings.appSettings,
  params,
  formats.formats,
  saveSettings,
  fs
);
sendEngine.initialize(endPointConfig.routes.defaultClient,format.format);
clipboardListener.startListening();
//cleanup listener
process.on("SIGINT", () => {
  console.log("Received SIGINT signal. Cleaning up and exiting...");
  // Perform any cleanup or dismounting necessary for your event handler here
  clipboardListener.stopListening(); // Remove all event listeners to prevent memory leaks
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM signal. Cleaning up and exiting...");
  // Perform any cleanup or dismounting necessary for your event handler here
  clipboardListener.stopListening(); // Remove all event listeners to prevent memory leaks
  process.exit(0);
});

/**
 * Displays a notification with the provided title and text.
 *
 * @param {string} title - The title of the notification. Default is "Paste Ready".
 * @param {string} text - The text of the notification. Default is "The response is ready.".
 * @returns {void}
 */
function notify(title = "Paste Ready", text = "The response is ready.") {
  // Define the notification
  if (title == "") {
    title = "empty response";
  }
  if (text == "") {
    text = "The response was blank.";
  }
  title = removeNullBytes(title);
  text = removeNullBytes(text);
  const notification = {
    title: title,
    message: text,
    icon: "./icon.jpg", // Optional
    sound: true, // Optional, plays a sound with the notification
    wait: false
    //looping: false,
    //there is no support for notification sounds on linux. 
  };
  notifier.notify(notification, function(err, response) {
    if (err) {
      console.log(err);
    }
  });
}
function removeNullBytes(str) {
  // Replace null bytes (represented as \u0000 in JavaScript) with an empty string
  return str.replace(/\u0000/g, '');
}
// function returnSummary(text){
//this is intended for automatic history condensation. It's currently out of scope.
//     text = text.replace(/\\n/g, '\n');
//     let Response = recieveEngine.recieveMessageFindTerminatorsAndTrim(text);
//     sendEngine.recievesummary(Response);

// }
/**
 * Processes the API response text, replaces newline characters, displays a notification, updates the send engine's clip text, and copies the trimmed text to the clipboard.
 *
 * @param {string} text - The API response text to process.
 * @returns {void}
 */
function recieveApiResponse(text) {
  text = text.replace(/\\n/g, "\n"); //change \n to newlines for output
  notify("Paste Response:", text);
  sendEngine.blockPresort = true;
  sendEngine.recentClip.text = text;
  ncp.copy(recieveEngine.recieveMessageFindTerminatorsAndTrim(text));
}
clipboardListener.on("change", () => {
  ncp.paste(clipboardChangeHandler);
});
/**
 * This is a callback function that handles changes in the clipboard.
 *
 * @param {Error} err - An error object if an error occurred.
 * @param {string} text - The new text copied to the clipboard.
 *
 * If an error occurs, it logs the error message to the console and triggers a notification.
 * If no error occurs, it logs the new copied text to the console and sets up the sendEngine for AI interaction with the new text.
 */
function clipboardChangeHandler(err, text) {
  console.log(color("New Copy: ", "green") + text);
  if (err) {
    notify("error: ", err + text);
    return console.log(err + text);
  }
  sendEngine.setupforAi(text);
}

/**
 * This function takes a string and a color as arguments, and returns the string with the specified color.
 *
 * @param {string} text - The text to be colored.
 * @param {string} color - The color to apply to the text. Must be a valid color name in lowercase.
 * @returns {string} - The colored text.
 */
function color(text, color) {
  switch (color.toLowerCase()) {
    case "red":
      return `\x1B[31m${text}\x1B[0m`;
    case "green":
      return `\x1B[32m${text}\x1B[0m`;
    case "yellow":
      return `\x1B[33m${text}\x1B[0m`;
    case "blue":
      return `\x1B[34m${text}\x1B[0m`;
    case "white":
      return `\x1B[37m${text}\x1B[0m`;
    case "black":
      return `\x1B[30m${text}\x1B[0m`;
    case "magenta":
      return `\x1B[35m${text}\x1B[0m`;
    case "cyan":
      return `\x1B[36m${text}\x1B[0m`;
    case "gray":
      return `\x1B[90m${text}\x1B[0m`;
    case "light gray":
      return `\x1B[38m${text}\x1B[0m`;
    // Add other colors here
    case "purple":
      return `\x1B[91m${text}\x1B[0m`;
    case "brown":
      return `\x1B[92m${text}\x1B[0m`;
    case "orange":
      return `\x1B[93m${text}\x1B[0m`;
    case "pink":
      return `\x1B[94m${text}\x1B[0m`;
    case "turquoise":
      return `\x1B[95m${text}\x1B[0m`;
    case "lime":
      return `\x1B[96m${text}\x1B[0m`;
    case "gold":
      return `\x1B[97m${text}\x1B[0m`;
    case "silver":
      return `\x1B[98m${text}\x1B[0m`;
    case "maroon":
      return `\x1B[99m${text}\x1B[0m`;
    default:
      return text;
  }
}
