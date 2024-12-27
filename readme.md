# Clipboard Conqueror: Your Personal AI Copilot

Welcome to Clipboard Conqueror, a powerful tool that brings the power of Artificial Intelligence to your fingertips. Whether you're a developer, writer, student, or just someone who loves to explore, Clipboard Conqueror is here to help.

![Clipboard Conqueror Logo](CCfinal.jpg)

[Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-Inference-Chaining.md), [Setup.js](Readme-Setup.md)

## What is Clipboard Conqueror?

Clipboard Conqueror is a copy paste Large Language Model interface that works as a personal universal copilot. It simply works anywhere. No need to sign in, no required keys. CC allows you to leverage cutting-edge Artificial Intelligence models to enhance your productivity and creativity. Almost everything is configurable.

With Clipboard Conqueror, you can simply copy three pipes "`|||`" and a question or command, and it will generate a response into the clipboard that you can paste directly into any text field.

Clipboard Conqueror works out of the box with 
- [KoboldCPP](http://www.github.com/LostRuins/koboldcpp/),
- [Text Generation WebUI](https://github.com/oobabooga/text-generation-webui),
- [Ollama](https://www.ollama.com),
- [LMStudio](https://lmstudio.ai)<sup>*closed source</sup>

 These local inference servers are generally considered secure and reliable, and can be invoked simply like "|||ollama|" or "|||tgw|". They do not require an internet connection or any sensitive data to be sent on the network. Clipboard Conqeror is very configurable and should be compatible with any inference server.

CC works online via: 
- [Novita AI](https://novita.ai/model-api/product/llm-api?utm_source=ClipboardConqueror&utm_medium=github_readme&utm_campaign=link)
- [01.AI](https://platform.01.ai/)
- [Anyscale](https://www.anyscale.com/)
- [Claude](https://docs.anthropic.com/en/docs/about-claude/models)
- [Fireworks](https://fireworks.ai/)
- [Groq](https://groq.com/)
- [Openrouter](https://openrouter.ai/)
- [Together](https://www.together.ai/) 
- [OpenAI's API](https://platform.openai.com/docs/overview)

Put your key into the appropriate [endpoint.key](https://github.com/aseichter2007/ClipboardConqueror/blob/6e5a09613a27007ae2cf928fceeee3b7c77a2143/setup.js#L310) in setup.js.

## Key Features

### Summon any text right where you need it.

- **Control Every Part of LLM Prompts:** Manage and customize every aspect of your AI without leaving your current workspace.

- **Quickly Prototype Prompts:** Test and refine your prompts quickly for deployment in production environments.

- **Locally Run Models:** Trust your data with locally run models that do not phone home or report any metrics.

- **Supports Multiple Inference Endpoints:** Flexibly interface with your favorite inference engines.

- **No-code Multi-hop Inference Framework** Prepare powerful chain-of-inference prompts for superior responses or prototype workflows for use in multi-step agentic frameworks.

- **Desktop Platforms** Clipboard Conqueror is designed to work seamlessly across multiple desktop platforms including Windows, macOS, and Linux. It has been gently tested to ensure stability and compatibility.

- **OpenAI Compatible** local inference engines are not strictly required to use Clipboard Conqueror, it works against ChatGPT API and other internet inference sources.

- CC provides a whole toolbox of predefined and targeted assistants, ready to work for you. 

- Save system prompts on the fly to draft, define, translate, think, review, or tell jokes. 



## Getting Started

1. [Installing Clipboard Conqueror](Readme-Install.md)
2. [Choosing a Model](Readme-Choosing-A-Model.md)
3. [Basic Use](Readme-How-To-Use-CC.md)
4. [Prompt Reference](Readme-Prompt-Reference.md)
5. [Prompt Formatting](Readme-Prompt-Formatting.md)
6. [API Switching](Readme-Endpoints.md)
7. [Chain of Inference](Readme-Inference-Chaining.md)
8. [Setup.js](Readme-Setup.md)


## Privacy Policy
Clipboard Conqueror does not collect any metrics or send any data behind the scenes. When used with local LLMs, no data leaves the local machine. When used with online APIs, please refer to the privacy policy of your chosen host.

## Additional Resources

- [Prompt Tower](https://github.com/backnotprop/prompt-tower)

  This VSCode extension is excellent for building and arranging code prompts, and works seamlessly with CC, just add an invocation to the top of the prompt tower and click Copy Prompt. 

- [Toggle Design Mode Bookmarklet](https://www.reddit.com/r/bookmarklets/comments/d8pqe2/toggle_design_mode/)

  Morph the web on demand as you browse.
- [Effects of Basic Sampling Parameters](https://artefact2.github.io/llm-sampling/index.xhtml)
- [Unofficial Kobold Guide and Model Suggestions](https://docs.google.com/document/d/1I1r-NGIxo3Gt0gfOeqJkTxTQEgPQKmy7UZR5wh_aZlY/edit?pli=1)
- [AMD GPU Resources](https://llm-tracker.info/howto/AMD-GPUs)
- [The Hitchhiker's Guide to LLMs](https://osanseviero.github.io/hackerllama/blog/posts/hitchhiker_guide/)
- [LLMs: How Do They Work?](https://bbycroft.net/llm)
- [OpenHermes 2.5 Mistral Prompting Ideas](https://www.reddit.com/r/LocalLLaMA/comments/18j59g1/you_are_a_helpful_ai_assistant/)
- [Llama 3 Quant Loss](https://github.com/matt-c1/llama-3-quant-comparison)
- [Visual Guide to Quantization](https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization)

## Videos
Quick Start Jam, Reccomended:

[![YouTube Video](https://i.ytimg.com/vi/fcM8dDtVTYQ/hqdefault.jpg)](https://youtu.be/fcM8dDtVTYQ)

Quick demo: 

[![YouTube Video](https://i.ytimg.com/vi/n8tQJlne3qs/hqdefault.jpg)](https://youtu.be/n8tQJlne3qs)

Using Clipboard Conqueror to mutate content, and Installation: 


[![Youtube Video](https://i.ytimg.com/vi/NqnpBi0MHsc/hqdefault.jpg)](https://youtu.be/NqnpBi0MHsc)


 - *note in this video I mention context leaking with Context Shift, that was my mistake, for a bit I had a bug where |||re| was persisting unexpectedly. 

## Support the Developer, Please!

I would very much appreciate a donation and am open to prompt engineering consultation on Fridays. Send me an [email](mailto:aseichter2007@gmail.com?subject=I%20have%20an%20offer%20you%20might%20be%20interested%20in.&body=Hello%2C%20I%20am%20reaching%20out%20to%20inquire%20about%20contracting%20your%20services%20for) if I can help you in any way.

- [Patreon](https://patreon.com/ClipboardConqueror)

- [Ko-fi](https://ko-fi.com/aseichter2007)

or coin: 
- BTC: bc1qqpfndachfsdgcc4xxtnc5pnk8y58zjzaxavu27
- DOGE: D7JQNfq2ybDSorYjP7xS2U4hs8PD2UUroY

If CC really gets rolling and meets my financial needs, I will host a dedicated cluster of my own to ensure free LLM access for anyone on secure and transparent terms with any excess.

## Contact

For bug reports, feature requests, or any other inquiries, please contact me at [clipboard.aseichter2007@gmail.com](mailto:clipboard.aseichter2007@gmail.com?subject=I%20have%20a%20problem%20or%20feature%20request%20regarding%20Clipboard%20Conqueror&body=Hello%2C%0AI%20am%20trying%20to%20%5Bgoal%5D%0A%0Abut%20instead%20%5Bproblem%5D%0A) or open an issue on GitHub.  

If you have a good idea for adding a proper gui to CC, fork it and show me how it's done. I'd like to avoid a heavy web framework.

## Acknowlegements

I'd like to give a special  thank you to the creators of KoboldAi, KoboldCPP, Meta, ClosedAi, and the communities that made all this possible to figure out. 

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=aseichter2007/ClipboardConqueror&type=Date)](https://star-history.com/#aseichter2007/ClipboardConqueror&Date)

Large Language Models:
---

### Every LLM is a little different, it takes some time to get used to how each model should be talked to for the best results. 

LLMs are powerful tools but it's important to understand how they work. The input text is vectorized and put through matrix multiplications and a big complex vector is built up. Then each word is added to that vector as it is chosen in turn one at a time, with some randomity to get better speech flavor, until the next probable token is a stop token or max length is exceeded.

In an LLM every word is a cloud of numbers that represent how that token relates to other words, concepts or phrase structures. By turning words into numbers, we can then beat them with math and determine which numbers probably are appropriate to go next.

It doesn't really reason, it doesn't really think, it amplifies patterns and guesses using probabilities and random, each next word chosen with such accuracy and literate complexity that kind of functionally it simulates having thought.  An important note: LLMs return a list of probable tokens and their probability, and after the LLM has done the math, one word is selected by user set rules from the returned set.  

LLM models don't make the choice, sampling happens after they do the magic, and then the machine is asked for the next tokens to choose from, ev-ery -to-ke-n - however the words are sliced.

It's weird, but they have no state, it's data-crunch-out every word in turn, no real consideration. 

Use them effectively within their limits to succeed in 2024.

You can go find the right data and paste the text at an LLM and it can use that data, but no LLM should be trusted implicitly, just as a first resort, right here aboard the Clipboard Conqueror.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

Please use Clipboard Conqueror responsibly and respect copyright and laws in your country while generating content. Misuse of this tool might lead to unintended consequences and breaches of privacy or intellectual property rights. I hold no responsibility for the data that passes through this tool on any system.

[Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-Inference-Chaining.md), [Setup.js](Readme-Setup.md)

I solemnly promise that this application and at least one compatible backend will function in the absence of internet connectivity.
One of my design inspirations for this application is to spread LLM models to as many computers as possible. I want to ensure at least one intact system is recovered by future archaeologists, a time capsule of culture, science, and data.  We should be sending intelligent boxes to deep space too. Our knowledge and posterity must not go to waste. 
