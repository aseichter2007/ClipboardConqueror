class ResponseEngine {
    constructor(invoke =  "|/",  terminators = ["####"]) {
        this.Invoke= invoke;
        this.terminators = terminators;
    }
    recieveMessageFindTerminatorsAndTrim(text){
        let totals = []
        this.terminators.forEach(element => {
            
            const limited = text.split(element);
            totals.push(limited.length);
        });
        let low = 100000;
        let LowPosition = 0
       for (let index = 0; index < totals.length; index++) {
           const element = totals[index]> low;
           if (element < low) {
                low = element;
                LowPosition = index;
            }
       }
       let response = text.split(this.terminators[LowPosition])
       return response[0];
    }
  
}
module.exports =ResponseEngine;
//todo: this will allow the bot to call a few funtions. I intend to change the message recieved sound so that the ai can emote at the user. Not execute code, but i'm considering some form of RAG