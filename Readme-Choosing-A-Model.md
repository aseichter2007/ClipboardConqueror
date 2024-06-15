![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Choosing A Model:
=============================
[Home](readme.md), [Install](Readme-Install.md), [Basic Use](Readme-How-To-Use-CC.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-inferenceChaining.md), [Setup.js](Readme-Setup.md)

--- 

There are plenty of [LLM models](https://huggingface.co/models?sort=likes) to try out, maybe one designed for your use case. 
At the bottom I provide some links to my favorites, first, lets explain the language you will encounter:

**Ram vs. Vram**: Ram is system ram accessible to the cpu, Vram is video ram on your graphics card (GPU). Memory bandwidth of Vram is roughly ten times as fast as Ram. LLMs are almost always memory bandwidth bottlenecked, so faster memory is faster infernce.

**Prompt Format**: Models are trained with different formats. The most popular are ChatML and Alpaca. Generally, models work with improper formats, but perform best with what they were trained with.

**Context**: the number of tokens that can be processed during inference. Your requested token count uses some context, so if you ask for three thousand tokens while running a model at 4k context, three quarters of the entire context are reserved for your response and input may be discarded or trimmed.  Context of transformers models grows non-linearly, twice as much context takes four times as much memory. 

**RoPe Scaling**: Rope is a method of extending the context of a model. Most models will scale, but eventually degrade at long context. Lllama 3 does quite poorly past 16k.  Rope is lossy scaling, so bigger scaling will reduce quality and instruction folowing performance.

**Quants**: Quantized models, which use compression techniques to reduce memory usage and model file size.

**GGUF**: A  format providing single unified files for inference. GGUFs can be split between ram and vram. They work great with Koboldcpp. I strongly prefer GGUF models over other formats because they are easier to download and manage.

**EXL2**: a format optimized for fast inference that supports 4 bit quantized context. Supported by TextGenWebUi via exllamav2. GPU only.  EXL2 files generally specify their average bit depth.

**fp16**: half precision 16 bit unquantized models. GGUFs can contain fp16 precision models. fp32 is full precision but you don't see those around much as a 7B model in fp32 would take 28ish gigabytes to load, and the performance of the same model in 8 bits takes only 7ish GB with imperceptible loss in quality or 3.5 GB at Q4. There are performance trades as well, as multiplying bigger numbers takes a lot more calculating and a lot more memory transfer.

**imat**: Importance Matrix, a strategy for prioritizing vocabulary to preserve performance after quantization.

**K quants(Qn_K_S)**: basic quantizations, fast on cpu.  Basically, tokens are grouped and within the group some bits are cut off. K quants can use an importance matrix to reduce the performance loss, but not all GGUFs are created using one.  _K_S is small, _K_M is medium, and _K_L is large. The suffix relates to the average bit depth of the weights.  Generally, anything bigger than Q4 has very low/negligeable loss in quality.

**I quants (IQn_S)**: Advanced quantization that attempts to approximate the original weight precision during inference. They can be compute limited on cpu but generally the speed difference is negligeable on most GPUs because the time to move memory is much longer than the additional calculation. Again the suffix relates to the bit depth. IQn_XXS is n.06 bits per weight. n_XS is n.31ish bpw, S is .5, M is .7

**Flash Attention**: I slightly different attention strategy which reduces the memory required for context. Most inference engines these days support 4bit quantized context with Flash Attention, requiring about 1/4th of the memory as standard unquantized context with minimal quality loss.

**N-Dimensional Latent Space**: LLM tokens generally represent 128 distinct vectors. It's difficult to think usefully about this other than as layers of nuance or multiple meanings depending on context. A bit like a chord, how it sounds depends on what other notes are being played.

Quantization:
-----
A compression strategy for LLM data. 

Here is the download on quantization as I understand it.

Think about a radius, a ray pointing from center out inside a sphere. Unquantized it is a line to a word or concept space. Quantization makes that ray become a cone with the wide base on the sphere's surface centered on the original vector point. Words inside the cone are treated like the same word, but that is slightly oversimplified.

Extreme quantization works because even if you reduce the sphere to a binary choice, you're still beating enough vectors together that the result is narrowed to a small enough window to hit the concepts, but it loses accuracy and ability to be specific other than by luck and elimination of actively poor words rather than choosing best like an unquantized or less compressed model.

Because 8Bit still carries enough data to maintain distinct accuracy even packaged, the loss is effectively negligible as the distinctions aren't aggressively muddied and boiled down.

Base models vs Finetunes:
----
In the world of LLMs there are two kinds of models. 

Base models - these models are completion models, they respond well to: "sure, here is fizzbuzz in javascript:" it will complete the statement you start.

Finetuned models can, depending on how they have been tuned, make sense of more direct orders: "write Fizzbuzz in javascript". Not all finetunes are instruct models, read model descriptions to learn what a model is designed for.

Finetuning typically means creating a lora, but often the entire model is merged with the lora for distribution rather than distributing the lora alone, I expect because loras will be model specific or wildly unpredictable when applied to different bases. 


The models I have recommended are all finetunes, because you can speak to them more naturally and get good results. Base models take a little more thinking to interact with till you're used to it. 


[Model Merges](https://huggingface.co/blog/mlabonne/merge-models)
---
Some models, "monster merges" are different model layers shuffled together with various levels of strategy and I think a bit of finetuning on top.

Other techniques average the weights of a model with another. (SLERP)  

Then there is [distillation](https://www.ibm.com/topics/knowledge-distillation), where you train a model with the logit outputs of another model making the same predicion. 

Model merges can result in odd sizes, so not all models fit the typical base sizes 3/7/8/13/30/34/65/70. 

[M-O-E](https://huggingface.co/blog/moe)
---
Mixture of Experts are "sparse" models that have many layers and gate which layers are used for each token. Each layer contains different combinations of "experts" tuned on different tasks. I believe Mixtral 8x7b has 256 layers or something and to save on compute at inference time many layers are skipped, different ones each token. This strategy should help specific accuracy by breaking the model into smaller pieces and training each for different knowledge sets. I think this also possibly reduces training memory requirements or could.

[Clown Car MOE](https://goddard.blog/posts/clown-moe/)
---
Distinct models can be compressed and merged into a single model using a similar gating strategy (or not) to MOE models. [Laserxtral](https://huggingface.co/cognitivecomputations/laserxtral-GGUF) is my favorite of these that I have tried. 


Technologies May Differ Per Model:
---
Not all models use the same underpinnings, for example, many older 13B and 20B models dont use Grouped Query Attention(GQA) so context takes much more ram. 


**Alright, now the bit you came here for.**

Model Reccomendations:
---
Most of links below are to OpenHermes 2.5 Mistral 7B. [Llama 3 Instruct 8B](https://huggingface.co/bartowski/Meta-Llama-3-8B-Instruct-GGUF) is more lively. I also liked Llama 3 8B [Hermes 2 Theta](https://huggingface.co/NousResearch/Hermes-2-Theta-Llama-3-8B-GGUF), [Hermes 2 Pro](https://huggingface.co/NousResearch/Hermes-2-Pro-Llama-3-8B-GGUF), and [SFR](https://huggingface.co/leafspark/SFR-Iterative-DPO-LLaMA-3-8B-R-lora)

OpenHermes-2.5-Mistral 7b 16k.gguf follows the system prompt and instructions very well. It supports 16384 context, a decent few pages. 

If it seems slow, reduce your context to 8k. If the problem persists, select a smaller Quantization.

hardware("token speed")  [fast = 20+ tokens/sec, medium =  ~<10 tokens/sec. slow = <2tokens/sec]* Lower on this chart is smarter. Partial offloading the video ram is possible but costs speed. I prefer to only run models that fit entirely in vram.

```
In the world of inference, some macs can approach medium with even very large models because they have a unified ram + vram memory access structure. Metal. 
```

## Quant links:


  ### CPU Only

  **16gb ram and no graphics card, or laptop with shared gfx memory**(slow, notable quality loss): 

  [Q3_K_M 8k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf)VRAM used: 5429.57 MB (model: 3301.56 MB, context: 2128.01 MB) + a bit for ingestion, use lower quants for less than  16gb  RAM consider Rocket 3B//untested

  _

  **32gb ram and not using graphics card**(slow): 

  [Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf)  RAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)


  **On CPU and Ram, you will quickly get below 1 token/sec with higher parameter models.**

  ### GPU Only

  **Less than 8gb gfx cards**(fast-medium, notable quality loss): 

  [Q3_K_M 8k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf)VRAM used: 5429.57 MB (model: 3301.56 MB, context: 2128.01 MB)


  _

  **8gb gfx cards**(medium, prompt ingestion might not fit in vram. If it feels slow, consider reducing to 4k context, or partial offload a few layers to regular ram to keep context processing fast): 

  [Q6_K_M 8k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q6_K_M.gguf) total VRAM used: 7691.57 MB (model: 5563.56 MB, 8k context: 2128.01 MB)

  Q6 is almost lossless with most models. There is little reason to use larger quants.

  **12gb vram**(fast): 

  [Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf) total VRAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

  _

  **24gb vram**(fast): 

  [Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf) total VRAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

### Partial offloading to ram:
  GGUF models can be split between ram and vram and still get 2-10 tokens per second. This way you can load much bigger models and maintain acceptable speeds.

Other Good Models:
---------
Minimum hardware: [rocket_3B](https://huggingface.co/TheBloke/rocket-3B-GGUF) should be chatML, I havent messed with it much.

Phi 3 is surely better, but I havent messed with it yet. 

[Nous-Hermes-2-SOLAR](https://huggingface.co/TheBloke/Nous-Hermes-2-SOLAR-10.7B-GGUF) total VRAM used: 11652.35 MiB (model: 8294.06 MiB, 16k context: 3358.29 MiB) 

[psyonic-cetacean](https://huggingface.co/TheBloke/psyonic-cetacean-20B-GGUF) psyonic-cetacean-20b.Q4_K_M.gguf total VRAM used: 22001.74 MiB (model: 11395.73 MiB, 8k context: ) It's great at creative writing. This model doesn't use GQA so it uses almost an order of magnitue more memory for the context. With Flash Attention and 4 bit quantized context, context could be reduced from 10606.00 MiB to around 2600.00 MiB.

[Codestral 22B](https://huggingface.co/bartowski/Codestral-22B-v0.1-GGUF) is a great coding and technical writing model.  CUDA0 buffer size = 17248.90 MiB KV self size  = 1848.00 Total: 19,097 MB. (kobold changed the memory reporting a bit. Todo: update the others.)
 

For large models, set the batch size lower in kobold to keep the working context memory requirements smaller. I like 128 these days. 4-5 threads on a 6 core system to preserve responsiveness.
         

  >OpenHermes 2.5 is simply decent and fast, even tested on a friend's old 1080, under one minute for complex queries but with no gfx acceleration on 16gb ram it can be painfully slow to ingest, a few minutes for a large query and response.  Smaller batch size in Koboldcpp helps you see it progressing to be confident its not hung up. This is a major reason I prefer Kobold over Text Genreation Web UI.

  let me know about your hardware and token speed and i will make this reflect the general experience better. 

  
  Model sizes:
  ---
  8 bit quants:
 - 3B needs at least 4GB RAM total ram + vram (gfx card must support cuda or rcom so super old stuff isn't that useful)
 - 7B needs at least 8GB RAM
 - 13B needs at least 16GB RAM
 - 30B needs at least 32GB RAM
 - 65B needs at least 64GB RAM

They all need some space for the context. GPU offloading puts the layers of the model into the memory of your graphics card. Fitting the whole model into VRAM makes things way faster. 

 You can load the model in memory, see how much your final model memory cost is in the console, and get a rough estimate of the size of each layer by dividing the size in memory by the number of layers. Remember to leave room on the GPU for the context, which can get big fast. At 8k context I think use over 3gb of memory with the Q8, just for the context alone.

>*Model bit depth is trade between output quality and output speed.  Generally, larger parameter number models are smarter and can follow more complex instructions.
KoboldCPP uses GGUF format, which are quantized from 16 bit to between 2 bit and 8 bit depending on model. (I like 8 bit if it fits in vram with room for 8k context.)
lower bits require less ram, but there is a drop in reasoning and writing quality, though even the Q2 was following instructions well. 

Not all models support chatML format, and most wont perform optimally without their expected format.


This info belongs here somewhere:

Understanding Leaderboard Scores
---

GSM8K is a dataset of 8.5K high-quality linguistically diverse grade school math word problems created by human problem writers

HellaSwag is a benchmark for common sense reasoning.

Truful QA is a benchmark to measure whether a language model is truthful in generating answers to questions.

Winogrande is another benchmark for common sense reasoning

//Todo, collect more and better test descriptions.

---
[Home](readme.md), [Install](Readme-Install.md), [Choosing a Model](Readme-Choosing-A-Model.md), [Prompt Reference](Readme-Prompt-Reference.md), [Prompt Formatting](Readme-Prompt-Formatting.md), [API Switching](Readme-Endpoints.md), [Chaining Inference](Readme-inferenceChaining.md), [Setup.js](Readme-Setup.md)