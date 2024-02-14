class ResponseEngine {
    constructor(invoke =  "<|call|>", invokeTerminator = "<|/call|>",  terminators = ["asdfghjkl"], remove= /<\|[^|]*\|>/g){
        this.Invoke= invoke;
        this.terminators = terminators;
        this.remove = remove;
    }

    removeChatML(text) {

      return text.replace(this.remove, '');
    }   
    callFuncion(text){
        //Check if the message contains the invoke token
        if (text.includes(this.Invoke)) {
            // Do something
        } else {
            // Do something else
        }
    }        
    
    
    recieveMessageFindTerminatorsAndTrim(text) {
        let totals = []
        text = this.removeChatML(text);
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