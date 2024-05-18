class ResponseEngine {
    constructor(
        functionList =  [{start:"<|call|>", end:"<|/endCall|>", func: "call"} ], remove= /<\|[^|]*\|>/g)
        {
        this.functionList= functionList;
        this.remove = remove;
    }
    call(text){
        console.log("Function called text: " + text);
    }
    callFunctions(text){
        this.functionList.forEach( fun => {
            this.functionCheckExecute( text, fun.start, fun.end, this[ fun.func ] )
        });
    }        
    functionCheckExecute(text, functionCall, terminator, callback){
        if (text.includes(functionCall)) {
            const splitText = text.split(functionCall)
            if(splitText.length >=1){
                if (splitText[0].includes(terminator)){
                    const outText = splitText[0].split(terminator);
                    callback(outText[0])
                }
            }
        }
    }
    //Add your funtions as methods in this file. 
    removeChatML(text) {
      return text.replace(this.remove, '');
    }   
    recieveMessageFindTerminatorsAndTrim(text) {
        let totals = []
        this.callFunctions(text);
        text = this.removeChatML(text);
      
    //     let low = 100000;
    //     let LowPosition = 0
    //    for (let index = 0; index < totals.length; index++) {
    //        const element = totals[index]> low;
    //        if (element < low) {
    //             low = element;
    //             LowPosition = index;
    //         }
    //    }
    //    let response = text.split(this.terminators[LowPosition])
    //    return response[0];
    return text;
    }
  
}
module.exports =ResponseEngine;
//todo: this will allow the bot to call a few funtions. I intend to change the message recieved sound so that the ai can emote at the user. Not execute code, but i'm considering some form of RAG