const fs = require("fs");
const path = require("path");
function findSettings(path, name, callback) {
    const defaultSettingsPath = "./defaultconfig.js";
    // Path to the target settings file
    const settingsPath = "./settings.js";
    
    // Check if the 'settings.js' file exists
    if (fs.existsSync(settingsPath)) {//todo: uncomment //     return require(settingsPath); // } else {
        // Load the existing settings file and merge it with default settings
    //     return require(settingsPath);
    // } else {
        // Copy the default settings file to the target location
        fs.copyFile(defaultSettingsPath, settingsPath, err => {
            if (err) {
                console.error("Error copying default settings:", err);
            } else {
                console.log("Default settings copied to settings.js");
            }
        });
        //const defaultSettings = require("./defaultconfig.js");
        return require(defaultSettingsPath);
  }
}
module.exports.findSettings = findSettings;

// fs.readdir(path, (err, files) => {
//   if (err) {
//     console.error('Error reading directory:', err);
//     return;
//   }

//   if (files.includes(name)) {
//     console.log(`${name} found in the directory.`);
//     const settings = require(path+name)
//     callback(settings);
//   } else {
//     console.log(`${name} not found in the directory.`);
//     callback(defaultSettings);
//   }
// });
