function saveSettings(setting,identities,target,notify,fs) {

  let savedSettings = {};

  try {
    
    savedSettings = require('./0prompts.json')
    savedSettings = { ...savedSettings, ...setting };
    fs.writeFileSync(target, JSON.stringify(savedSettings));
    console.log("0identies.json updated.");
  } catch (err) {
    try {    
      notify("file doesn't exist, writing:", err.message);
      console.log(`file doesn't exist, writing: ${err.message}`);
      fs.writeFileSync(target, JSON.stringify(identities));
      console.log("0identies.json written.");
    } catch (error) {
      console.log("error writing " + target + " : " + error);

    }
  }


}
exports.saveSettings = saveSettings;