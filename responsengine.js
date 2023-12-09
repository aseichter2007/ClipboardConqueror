class ResponseEngine {
    constructor(invoke =  "|/",  terminators = ["asdfghjkl"], remove= /<\|[^|]*\|>/g){
        this.Invoke= invoke;
        this.terminators = terminators;
        this.remove = remove;
    }

    //###code#javascript function that takes a string "text"(example: ["<|im_start|>", "<|im_end|>"]), and removes each string from  []"this.eliminate" from the original string with regex
  removeChatML(text) {
      // Convert the eliminateArray to a regex pattern with | as the separator

      
      return text.replace(this.remove, '');
    }
    
    recieveMessageFindTerminatorsAndTrim(text){
        text = this.removeChatML(text);
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