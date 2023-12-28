const fs = require('fs');
const express = require('express');
const { open } = require('out-url');
const app = express();
const port = 3090;
const parentPath = require('path').resolve(__dirname, '..')
//console.log(parentPath);
const endPoints = require(parentPath + '\\0endpoints.json');//needs to access directoy above project
const instructions  = require(parentPath + '\\0instructions.json');
const params = require(parentPath + '\\0generationSettings.json');
const identities = require(parentPath + '\\0identities.json');
// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
//app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json()); // Parse JSON bodies (as sent by AJAX)
app.get('/', (req, res) => {
    //build page and send it.
    res.send(pagebuilder("start"));
});


app.get('/:page', (req, res) => {
    //build page and send it.
    const page = pagebuilder(req.params.page)
    //console.log(page);
    res.send(page);
});

app.post('/save/:type', (req, res) => {
    // This route handles the submission of form data from the HTML page
    console.log([req.params.type]);
    console.log(req.body);
    //let savedata = JSON.parse(req.body)//I think this is where my extra formatting is coming from. Maybe if else this.
    Object.entries(req.body).forEach(([key, value]) => {
        console.log(key);
        let deleteflag = false;
        if (value == "") {
            deleteflag = true;
      }
        switch (req.params.type) {
            case "identities":
                identities[key] = value;
                break;
            case "endpoints":
                endPoints[key] = value;
                break;
            case "instructions":
                instructions[key] = value;
                break;
            case "generationSettings": 
                params[key] = value;
            default:
                break;
        }
        writeSettingsToFile(req.params.type);
    })
    const name = req.body.name; 
    res.status(200).send("ok"); 
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
open(`http://localhost:${port}`);

function pagebuilder(page){
    
    const pageOut = {}
    pageOut.content = contentBuilder(page);
    pageOut.header = `<!DOCTYPE html>
    <html>
    <head>
    <title>Clipboard Conqueror Settings</title>
    </head>
    <body>
    <header>
    <nav>
    <ul>
    <li><a href="./identities">Agents</a></li>
    <li><a href="./endpoints">routing</a></li>
    <li><a href="./instructions">Instruction Format</a></li>
    <li><a href="./generationSettings">Generation Settings</a></li>
    </ul>
    </nav>
    </header>
    <form id="new" action="/submit" method="post">
    <label for="fname">name:</label></br>
    <input type="text" value="test" id="fname" name="fname"> </br>
    <label for="message"></label>
    <textarea id="newtext" name="message" rows="4" cols="50">{"test": "test content"}</textarea>
    
    <br>
    <div id="newtest">...untested...</div>
    <input type="submit" value="submit">
    <div>Errors will reset to defaults.  Check before saving</div>
    <button type="button" onclick="newSetting();" >Save</button>
    </form>
    `
    pageOut.footer = `
    
    <script>
    ${pageOut.content.javascript}
    function saveSetting(setting){
        

        const text = document.getElementById(setting + 'message').value;
        console.log(setting);
        console.log(text);
        const send = {};
        send[setting] = text;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:${port}/save/${page}");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(send, null, 2));
        console.log(JSON.stringify(send, null, 2));
        alert("Saved!");
        return
    }

    function newSetting(){
       
        const name = document.getElementById('fname').value;
        let newtext = document.getElementById("newtext").innerHTML;         
        const saveNew = {};
        saveNew[name] = newtext;
        console.log(name);
        console.log(saveNew);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:${port}/save/${page}");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify( saveNew, null, 2));
        console.log(JSON.stringify( saveNew , null, 2));
        alert("Saved!");
        return
    }
    document.getElementById('new').addEventListener('submit', function(event) {
      
    event.preventDefault(); // Prevents the form from submitting in the traditional way
    const text = document.getElementById("newtext").value;

    var message = document.getElementById('newtest').value;
    try {
        JSON.parse(text);
        document.getElementById('newtest').innerHTML  = '<div>Valid <code>JSON</code> ✅<div/>';
    } catch (e) {
        document.getElementById('newtest'` + ").innerHTML = `<div>Invalid <code>JSON</code> ❌ at ${e.message.split(' at ')[1]}<div/>`;\n" +
    "}});" + `
        </script>
    </body>
    </html>`
    return pageOut.header + pageOut.content.data + pageOut.footer;
}
function contentBuilder(pageType){
    switch (pageType) {
        
        case "start":
           return startPage()
           break;
        case "endpoints":            
            return contentCompiler(endPoints,"endpoints")   
            break;
        case "instructions":
            return contentCompiler(instructions,"instructions")
            break
        case "generationSettings":
            return contentCompiler(params,"generationSettings")
            break
        case "identities":
            return agentCompiler(identities, "identities")
            break;
                        
        default:
        return contentCompiler({select:"a tab from navigation"})
        break;
    }
}
function agentCompiler(dataObject,pageType) {
    let html = '';
    let script = '';

    Object.entries(dataObject).forEach(([key, value]) => {
        const stringvalue = JSON.stringify(value);
        //console.log(stringvalue);
        html += `
        <form id="${key}" action="/submit" method="post">
        <label for="message">${key}:</label>
        <textarea id="${key}message" name="message" rows="4" cols="50">${stringvalue}</textarea>
        
        <br>
        <div id="${key}test">...untested...</div>
        <input type="submit" value="submit">
        <div>Errors will reset to defaults.  Check before saving</div>
        <button type="button" onclick="saveSetting('${key}')">Save</button>
        </form>
        `;
        script += `  
        document.getElementById('${key}').addEventListener('submit', function(event) {
            
        event.preventDefault(); // Prevents the form from submitting in the traditional way
        const text = document.getElementById("${key}message").value;
  
        var message = document.getElementById('${key}test').value;
        try {
            JSON.parse(text);
            document.getElementById('${key}test').innerHTML  = '<div>Valid <code>JSON</code> ✅<div/>';
        } catch (e) {
            document.getElementById('${key}test'` + ").innerHTML = `<div>Invalid <code>JSON</code> ❌ at ${e.message.split(' at ')[1]}<div/>`;\n" +
        "}});";
                            
                            // Perform any additional processing or submit the data using AJAX, etc.
        //console.log('Submitted message:', html);
    }); 
   let outp = {data: html, javascript: script};
    return outp;
/*methods: {
    updateMainMessage: function(e) {
        this.mainMessage = e.target.innerText;
    }
}*/

}
function contentCompiler(dataObject,pageType) {
    let html = '';
    let script = '';
    if (pageType === "identities") {
        
        Object.entries(dataObject).forEach(([key, value]) => {
            const stringvalue = JSON.stringify(value, null, 2);
            //console.log(stringvalue);
            html += `
            <form id="${key}" action="/submit" method="post">
            <label for="message">${key}:</label>
            <textarea id="${key}message" name="message" rows="4" cols="50">${stringvalue}</textarea>
            
            <br>
            <div id="${key}test">...untested...</div>
            <input type="submit" value="submit">
            <div>Errors will reset to defaults.  Check before saving</div>
            <button type="button" onclick="saveSetting('${key}');">Save</button>
            </form>
            `;
            script += `  
            document.getElementById('${key}').addEventListener('submit', function(event) {
                
            event.preventDefault(); // Prevents the form from submitting in the traditional way
            const text = document.getElementById("${key}message").value;
      
            var message = document.getElementById('${key}test').value;
            try {
                JSON.parse(text);
                document.getElementById('${key}test').innerHTML  = '<div>Valid <code>JSON</code> ✅<div/>';
            } catch (e) {
                document.getElementById('${key}test'` + ").innerHTML = `<div>Invalid <code>JSON</code> ❌ at ${e.message.split(' at ')[1]}<div/>`;\n" +
            "}});";
                                
                                // Perform any additional processing or submit the data using AJAX, etc.
            //console.log('Submitted message:', html);
        }); 
    } else {
        Object.entries(dataObject).forEach(([key, value]) => {
            //const stringvalue = JSON.stringify(value, null, 2);
            //console.log(stringvalue);
            html += `
            <form id="${key}" action="/submit" method="post">
            <label for="message">${key}:</label>
            <textarea id="${key}message" name="message" rows="4" cols="50">${value}</textarea>
            
            <br>
            <div id="${key}test">...untested...</div>
            <input type="submit" value="submit">
            <div>Errors will reset to defaults.  Check before saving</div>
            <button type="button" onclick="saveSetting('${key}');">Save</button>
            </form>
            `;
            script += `  
            document.getElementById('${key}').addEventListener('submit', function(event) {
                
            event.preventDefault(); // Prevents the form from submitting in the traditional way
            const text = document.getElementById("${key}message").value;
      
            var message = document.getElementById('${key}test').value;
            try {
                JSON.parse(text);
                document.getElementById('${key}test').innerHTML  = '<div>Valid <code>JSON</code> ✅<div/>';
            } catch (e) {
                document.getElementById('${key}test'` + ").innerHTML = `<div>Invalid <code>JSON</code> ❌ at ${e.message.split(' at ')[1]}<div/>`;\n" +
            "}});";
                                
                                // Perform any additional processing or submit the data using AJAX, etc.
            //console.log('Submitted message:', html);
        });
    }
   let outp = {data: html, javascript: script};
    return outp;
}
function startPage(){
    let html = '';
    let script = '';

    html += ` Welcome to the Clipboard Conqueror Settings Application.
    
    It's currently quite rough. Take care not to save an agent or setting with no name.
    
    agents written here don't save. choose a page from the navigation menu.
    settings in particular should be name "value" rather than all in the box. test {"name": "value"} is wrong.
        
    For now, there are better results to be had by directly editing the files. it's currently picking up formatting as though i am double stringifying.
    `
    let outp = {data: html, javascript: script};
    return outp;
}

function writeSettingsToFile(setting){

// const parentPath = require('path').resolve(__dirname, '..')
// console.log(parentPath);
// const endPoints = require(parentPath + '\\0endpoints.json');//needs to access directoy above project
// const instructions  = require(parentPath + '\\0instructions.json');
// const params = require(parentPath + '\\0generationSettings.json');
// const identities = require(parentPath + '\\0identities.json');
    switch (setting) {
        case "identities":
            writeObjectToFileAsJson(identities, "0identities.json");
            break;
        case "endpoints":
            writeObjectToFileAsJson(endPoints, "0endpoints.json");
            break;
        case "instructions":
            writeObjectToFileAsJson(instructions, "0instructions.json");
            break;
        case "generationSettings":
            writeObjectToFileAsJson(params, "0generationSettings.json");
            break;    
        default:
            break;
    }
}
function writeObjectToFileAsJson(object, fileName) {
    try {
      const data = JSON.stringify(object, null, 2); // Convert the object to a pretty-printed JSON string
      fs.writeFileSync(`${parentPath}/${fileName}`, data, 'utf8'); // Write the JSON string to the specified file
      console.log(`Successfully wrote object to ${fileName}`);
    } catch (error) {
      console.error(`Error writing to file: ${error.message}`);
    }
  }



