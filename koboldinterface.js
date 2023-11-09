class KoboldClient {
  constructor(baseURL, handler, callback, notify, params = "") {
    this.baseURL = baseURL;
    this.handler = handler;
    this.currentRequest = "Joe Biden, Wake Up!";
    this.callback = callback;
    this.notify = notify;
    this.params = params;
    this.setupRequest()
  }

  send(text, params){
    params.prompt = text;
    //this.params = params;
    //this.currentRequest = params
    this.sendKoboldRequest(params);
  }

  setupRequest( ) {
    var example = {
      prompt: "",
      use_story: false,
      use_memory: false,
      use_authors_note: false,
      use_world_info: false,
      max_context_length: 8192,
      max_length: 200,
      rep_pen: 1.0,
      rep_pen_range: 8048,
      rep_pen_slope: 0.7,
      temperature: 0.84,
      tfs: 0.97,
      top_a: 0,
      top_k: 0,
      top_p: 0.9,
      typical: 0.19,
      sampler_order: [6, 0, 1, 3, 4, 2, 5],
      singleline: false,
      //"sampler_seed": 69420,   //set the seed
      sampler_full_determinism: false,    //set it so the seed determines generation content
      frmttriminc: false,
      frmtrmblln: false,
      mirostat_mode: 2,//mirostat disables top_p, top_k, top_a It does it's own thing and kinda learns along somehow?. 
      mirostat_tau: 4,
      mirostat_eta: 0.1,
      guidance_scale: 1,
      negative_prompt: 'porn,sex,nsfw,racism,bawdy,racy',
      banned_tokens: ["   ", "</s>", "\n# ", "\n##", "\n*{{user}} ","### Human: ", "\n\n\n", "\n{{user}}:", '\"role\":', '\"system\"', '{{user:}}>:', "###"]

    };
    if (this.params == ""){
      this.params = example;
    }
    example= {
      temp: 0.7,
      top_p: 0.5,
      top_k: 40,
      top_a: 0,
      tfs: 1,
      epsilon_cutoff: 0,
      eta_cutoff: 0,
      typical_p: 1,
      rep_pen: 1.2,
      rep_pen_range: 0,
      no_repeat_ngram_size: 0,
      penalty_alpha: 0,
      num_beams: 1,
      length_penalty: 1,
      min_length: 0,
      encoder_rep_pen: 1,
      freq_pen: 0,
      presence_pen: 0,
      do_sample: true,
      early_stopping: true,
      seed: -1,
      preset: 'Default',
      add_bos_token: true,
      stopping_strings: [],
      truncation_length: 2048,
      ban_eos_token: false,
      skip_special_tokens: true,
      streaming: false,
      streaming_url: 'ws://127.0.0.1:5005/api/v1/stream',
      mirostat_mode: 2,//mirostat disables top_p, top_k. It does it's own thing and kinda learns along somehow?. 
      mirostat_tau: 4,
      mirostat_eta: 0.1,
      guidance_scale: 1,
      negative_prompt: 'porn,sex,nsfw,racism,bawdy,racy',//I dont think this is implemented yet
      grammar_string: '',
      banned_tokens: `["   ", "</s>", "\n# ", "\n##", "\n*{{user}} ","### Human: ", "\n\n\n", "\n{{user}}:", '\"role\":', '\"system\"', '{{user:}}>:',]`

      //type: textgen_types.OOBA,
  }
  }
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
    var text = JSON.stringify(response.data.results[0].text)
    //console.log(`Response data: ${text}`);
    callback(text);
  } catch (error) {
    notify("error");
    console.error(`Error sending request: ${error}`);
  }
}
module.exports = KoboldClient;
// the quick brown fox ||| jumped over the lazy dog