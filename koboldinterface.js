class KoboldClient {
  constructor(baseURL, handler, callback, returnSummary, notify) {
    this.baseURL = baseURL;
    this.handler = handler;
    this.currentRequest = "Joe Biden, Wake Up!";
    this.callback = callback;
    this.notify = notify;
    this.returnSummary = returnSummary;
    //this.setupRequest()
  }

  send(text, params){
    params.prompt = text;
    //this.params = params;
    //this.currentRequest = params
    this.sendKoboldRequest(params);
  }
  getSummary(params){
    sendrequestsummaryRequest(this.baseURL, data, this.returnSummary, this.handler, this.notify);
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
  sendKoboldRequest(data) {
     this.notify("ready");
    console.log("to API: "+data.prompt);
    sendPostRequest(this.baseURL, data, this.callback, this.handler, this.notify);
  }
}
async function sendPostRequest(apiUrl, data, callback, handler, notify) {
  try {
    const response = await handler.post(apiUrl, data);
    //console.log(`Response status: ${response.status}`);
    //var text = JSON.stringify(response.data.results[0].text)
    var text = response.data.results[0].text
    //console.log(`Response data: ${text}`);
    callback(text);
  } catch (error) {
    notify("error");
    console.error(`Error sending request: ${error}`);
  }
}

module.exports = KoboldClient;
// the quick brown fox ||| jumped over the lazy dog