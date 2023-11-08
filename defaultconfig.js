function configs(){ var config =  {   
    
    //api:"koboldLocal", //koboldRunning //if koboldcpp.exe is not present get, a model, and it and run it // openai? maybe openai is better as a supplement, make it it's own command tree to hit multiple apis including gpt-4
    api:"koboldRunning",//a kobold compatible server is already running
    apiUrl: "http://127.0.0.1:5001/api/v1/generate",
    AIActivator: "|||",
    volume: 100,
    username: "Tony",
    userdetails: "Tony is a hoopy frood who knows where his towel is",
    memory: {
        mem1:"the quick brown fox jumped over the lazy dog",
    },
    actor: {
        coder: {prompt:"[Coder = assists {{user}} with coding-related questions, providing simple valid code commented  on the tail of each line and within markdown codeblocks.] ",
                style:"[example message from Coder: ",
                },
            }, 

    Premium:{
        key: "key",
        actorVault: { 
            coder: {prompt:"[Coder = assists {{user}} with coding-related questions, providing simple valid code commented  on the tail of each line and within markdown codeblocks.] ",
        style:"[example message from Coder: ",
        },
        },
        memoryVault: {
            mem: "",
            key:""

        }
    },
    specialFunctions: {
        help:{clip:"Welcome to Clipboard Conqueror!", api:false},
        introduction: {prepend:"Welcome to Clipboard Conqueror!", api:false},
        re:{prepend:{lastmessage: true}, api:true},
    },
    instructions:{
        system: "### ",
        //prependPrompt:"### Human:",//vicuna
        //prependPrompt: `###"role": "system"` + "{{user:}}>: ",//hybrid mode
        prependPrompt: `"role": "system"` + "{{user:}}>: ",//chatML - openai
        postPrompt: ":Do not repeat text from inside this block.]",
        rpPrompt: `Play "{{char}}" in this never-ending roleplay with "{{user}}". Avoid repetition, don't loop. Develop the plot slowly. Describe all actions in full, elaborate, explicit, and graphic detail. Mention all relevant sensory perceptions, including smell, taste, and touch.`,
        prependCharachter: '[Charachter Description:',
        postCharachter:":Do not repeat text from inside this block.]",//because I feel it's appropriate
        memoryStart: "[Memory:",
        memoryPost: "]",
        //finalPrompt:"### Assistant:",//vicuna
        finalPrompt: `"role": "{{char}}  \n content" :`,//chatML - openai
        customStop : ["   ", "</s>", "\n# ", "\n##", "\n*{{user}} ","### Human: ", "\n\n\n", "\n{{user}}:", '\"role\":', '\"system\"', '{{user:}}>:',]
   },

    //chatML?
//     [{"role": "system", 
//       "content" : "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible.\nKnowledge cutoff: 2021-09-01\nCurrent date: 2023-03-02"},
//  {"role": "user", 
//       "content" : "How are you?"},
//  {"role": "assistant", 
//       "content" : "I am doing well"},
//  {"role": "user", 
//       "content" : "What is the mission of the company OpenAI?"}],
    generation:{
        temp: 0.7,//increase perplexity. Scales reproducible an deterministic at low temp, more randomness, creativity as temo increases.  Most models start to fall apart after 1.5 and definitely don't do math at high temp.
        top_p: 0.8,//discard least likely 20% of tokens when set at 0.8, temp and top_p are linked in that less optimal tokens are more likely to be picked at high temp, and top_p limits the pool of options. 
        top_k: 0,//more agressive culling of randomness, i think? lets ask. ||| explain top_k
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
        mirostat_mode: 0,
        mirostat_tau: 5,
        mirostat_eta: 0.1,
        guidance_scale: 1,
        negative_prompt: '',
        grammar_string: '',
        banned_tokens: '',}
    }
    
    return config;
}
module.exports = configs();