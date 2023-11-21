class KoboldClient {
  constructor( handler, apiresponse, returnSummary, notify, baseURL = "http://127.0.0.1:5001/") {
    this.handler = handler;
    this.callback = apiresponse;
    this.returnSummary = returnSummary;
    this.baseURL = baseURL;
    this.generate = "api/v1/generate/";
    this.getMaxContext = "";
    this.stats = "extra/perf";
    this.abort = 'extra/abort';
    this.currentRequest = "Joe Biden, Wake Up!";
    this.notify = notify;
    this.tokencount= "extra/tokencount"
    //this.setupRequest()
    
  }
  getstats(datareturn, tag ){
    sendPostPerfRequest(this.baseURL + this.stats, datareturn, this.handler, this.notify, tag)
  }
  getTokenCount(text, target, callback){
    sendPostTextRequest(this.baseURL + this.tokencount,{prompt: text}, callback, this.handler, this.notify, target)

  }

  send(text, params, agent){
    params.prompt = text;
    //this.params = params;
    //this.currentRequest = params
    this.sendKoboldRequest(params, agent);
  }
  abort(){
    sendPostTextRequest(this.baseURL + this.abort, ()=> {console.log("aborting");}, this.handler, this.notify, "none")
  }
  
  getSummary(params, agent){
    sendrequestsummaryRequest( this.baseURL + this.generate , params, this.returnSummary, this.handler, this.notify, agent);
  }
  // setupRequest( ) {
  //   const example= {
  //     temp: 0.7,
  //     top_p: 0.5,
  //     top_k: 40,
  //     top_a: 0,
  //     tfs: 1,
  //     epsilon_cutoff: 0,
  //     eta_cutoff: 0,
  //     typical_p: 1,
  //     rep_pen: 1.2,
  //     rep_pen_range: 0,
  //     no_repeat_ngram_size: 0,
  //     penalty_alpha: 0,
  //     num_beams: 1,
  //     length_penalty: 1,
  //     min_length: 0,
  //     encoder_rep_pen: 1,
  //     freq_pen: 0,
  //     presence_pen: 0,
  //     do_sample: true,
  //     early_stopping: true,
  //     seed: -1,
  //     preset: 'Default',
  //     add_bos_token: true,
  //     stopping_strings: [],
  //     truncation_length: 2048,
  //     ban_eos_token: false,
  //     skip_special_tokens: true,
  //     streaming: false,
  //     streaming_url: 'ws://127.0.0.1:5005/api/v1/stream',
  //     mirostat_mode: 2,//mirostat disables top_p, top_k. It does it's own thing and kinda learns along somehow?. 
  //     mirostat_tau: 4,
  //     mirostat_eta: 0.1,
  //     guidance_scale: 1,
  //     negative_prompt: 'porn,sex,nsfw,racism,bawdy,racy',//I dont think this is implemented yet
  //     grammar_string: '',
  //     banned_tokens: `["   ", "</s>", "\n# ", "\n##", "\n*{{user}} ","### Human: ", "\n\n\n", "\n{{user}}:", '\"role\":', '\"system\"', '{{user:}}>:',]`

  //     //type: textgen_types.OOBA,
  // }
  // }
  sendKoboldRequest(data, agent) {
     //this.notify("ready");
    console.log("to API: "+data.prompt);
    sendPostTextRequest(this.baseURL+this.generate , data, this.callback, this.handler, this.notify, agent);
  }
}
async function sendPostTextRequest(apiUrl, data, callback, handler, notify, agent) {
  try {
    console.log(JSON.stringify(data));
    const response = await handler.post(apiUrl, data);
    //console.log(`Response status: ${response.status}`);
    //var text = JSON.stringify(response.data.results[0].text)
    var text = response.data.results[0].text
    var tokens = response;
    //console.log(`Response data: ${JSON.stringify(response.data)}`);//todo: get tokens  THERE IS NO STATS NOOO
    callback(text, agent, tokens);
  } catch (error) {
    //notify("error");
    console.log(`Error sending request: ${error}`);
  }
}
async function sendPostPerfRequest(apiUrl, callback, data, handler, notify, tag) {
  let error = ""
  try {
    const response = await handler.post(apiUrl, data);
    //console.log(`Response status: ${response.status}`);
    //var text = JSON.stringify(response.data.results[0].text)
    var text = response.last_token_count;
    //console.log(`Response data: ${text}`);
    callback(text, tag);
  } catch (error) {
   // notify("error:", error);
    console.log(`Error sending request: ${error}`);
  }
}

module.exports = KoboldClient;
// the quick brown fox ||| jumped over the lazy dog