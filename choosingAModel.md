![Clipboard Conqueror Graphic logo. The letters are clouds and buildings on a lush estate.](CCfinal.jpg)
Clipboard Conqueror - Choosing A Model:
=============================
[Home](readme.md), [install](install.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)

--- 

There are plenty of models to try out, maybe one designed for your use case. 
At the bottom there are links, first, lets explain the language:

file formats and keywords:
---
Quants: Quantized models, see below. 

GGUF: files are single files, can be split between ram and vram. They work great with Koboldcpp.

exl2: files are fast to inference and support 4 bit quantized context. Supported by TextGenWebUi and exllamav2

fp16: full precision 16 bit unquantized models, though there are also some fp32 rumblings.

imatrix: gguf quantization can use imatrix text to create preserve precision of particular vocabulary

K quants(Qn_k_): basic quantizations, fast on cpu.  Basically tokens are grouped and within the group some bits are cut off.

I quants (IQn): Advanced quantization that attempts to approximate the original weight precision. They can be slower on cpu but generally the speed difference is negligeable on most GPUs.


Quantization:
-----
A compression strategy for LLM data. 

Here is the download on quantization as I understand it.

You take a 16 bit number, and you don't shorten it.

You collect all the numbers that are constituent or very near to the token vector, and you cut those off small and package them together in a table referenced by the full number

The collected tokens retain some information from their original vector, they arent simply collected, they are compressed with some loss.

Then you cut off bits from the full number's end but preserve its beginning and vector orientation, so rather than a rife bullet and bullseye you have instead a shotgun shell with shot to hit a wide target on the vector. The words still fly roughly the right direction, but there is more variance in how they land, leading to loss of which word was optimal and instead landing on a whole cloud of "should be close enough" Effectively the same words are presented at 2 bit and 16 bit when the samplers run, but they have less fidelity in the model, many words weight the same on the final selection instead of the natural best word having a highest value.


Because we choose from that selection randomly anyway, the detectable loss is very low, but lower bit depth is generalizing more words and concepts together more closely than 16 bit.

Think about a radius, a ray pointing from center out inside a sphere. Unquantized it is a line to a word. Quantization makes that ray become a cone with the wide base on the sphere's surface centered on the original vector point. Words inside the cone are treated like the same word, but that is slightly oversimplified.

extreme quantization works because even if you make the sphere sides a binary choice, you're still beating enough tokens against it that the result is narrowed to a small enough vector to hit the concepts, but it loses accuracy and ability to be specific other than by luck and elimination of actively poor words rather than choosing best like an unquantized or less compressed model.

Because 8Bit still carries enough data to maintain distinct accuracy even packaged, the loss is effectively negligible as the distinctions aren't as aggressively bundled and boiled down.

Base models vs Finetunes:
----
In the world of LLMs there are two kinds of models. 

Base models - these models are completion models, they respond well to: "sure, here is a code block containing fizzbuzz in javascript:" it will complete the statement you start.

Finetuned models can, depending on how they have been tuned, make sense of more direct orders: "write Fizzbuzz in javascript". Not all finetunes are instruct models, read model descriptions to learn what a model is designed for.

Finetuning typically means creating a lora, but often the entire model is merged with the lora for distribution rather than distributing the lora alone, I expect because loras will be model specific or wildly unpredictable when applied to different bases.

Base models are not fully cooked, they have some training room remaining to allow finetuning of the output. 

Finetunes are finished models that can't be further trained without detrimental effects. 

The models I have recommended are all finetunes, because you can speak to them more naturally and get good results. Base models take a little more thinking to interact with till you're used to it. 


Model Merges
---
Some models, "monster merges" are different model layers shuffled together with various levels of strategy and I think a bit of finetuning on top.

Other techniques average the weights of a model with another. 

Then there is distillation, which I have yet to dig into. 

Model merges often result in odd sizes, so not all models fit the typical 3/7/13/30/65 progression. 

M-O-E
---
Mixture of Experts are "sparse" models that have many layers and gate which layers are used for each token. Each layer contains different combinations of "experts" tuned on different tasks. I believe Mixtral 8x7b has 256 layers or something and to save on compute at inference time many layers are skipped, different ones each token. This strategy should help specific accuracy by breaking the model into smaller pieces and training each for different knowledge sets. I think this also possibly reduces training memory requirements or could.

Technologies differ:
---
Not all models use the same underpinnings, for example, most 13B models dont us Grouped Query Attention(GQA) so context takes up more ram.

Model Reccomendations:
---
Most of links below are to OpenHermes 2.5 Mistral 7B. Llama 3 8B is more lively. I also liked Llama 3 [Hermes 2 Pro.](https://huggingface.co/NousResearch/Hermes-2-Pro-Llama-3-8B-GGUF)

OpenHermes-2.5-Mistral 7b 16k.gguf supports 16384 context, a decent few pages. 

If it seems slow, reduce your context to 8k. If the problem persists, select a smaller Quantization.

hardware("token speed")  [fast = 20+ tokens/sec, medium =  ~<10 tokens/sec. slow = <2tokens/sec]* Lower on this chart is smarter. Partial offloading the video ram is possible but costs speed. 

```
In the world of inference, some macs can approach medium with even very large models. Metal. 
```

Quant links:
---
16gb ram and no graphics card, or laptop with shared gfx memory(slow, notable quality loss): 

[Q3_K_M](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf)VRAM used: 5429.57 MB (model: 3301.56 MB, context: 2128.01 MB) + a bit for ingestion, use lower quants for less than  16gb  RAM consider Rocket 3B//untested


.

Less than 8gb gfx cards(fast-medium, notable quality loss): 

[Q3_K_M](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b.Q3_K_M.gguf)VRAM used: 5429.57 MB (model: 3301.56 MB, context: 2128.01 MB)


.

8gb gfx cards(medium, prompt ingestion might not fit in mem. If slow, consider as low as 4k context if faster, or partial offload a few layers to keep context processing fast): 

[Q5_K_M 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q5_K_M.gguf)VRAM used: 7691.57 MB (model: 5563.56 MB, 8k context: 2128.01 MB)//I think this data is for Q6


.

12gb gfx cards (fast): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf) total VRAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

.

24gb vram(fast): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf) total VRAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

.

32gb ram and not using graphicss card(slow): 

[Q8_0 16k context](https://huggingface.co/TheBloke/OpenHermes-2.5-Mistral-7B-16k-GGUF/blob/main/openhermes-2.5-mistral-7b-16k.Q8_0.gguf)  RAM used: 9333.84 MB (model: 7205.84 MB, 8k context: 2128.01 MB) 11413.84 MB (model: 7205.84 MB, 16k context: 4208.01 MB)

other models:
---------
minimum hardware:[rocket_3B](https://huggingface.co/TheBloke/rocket-3B-GGUF) should be chatML I havent messed with it much.

Phi 3 is surely better, but I havent messed with it yet. 

[Nous-Hermes-2-SOLAR](https://huggingface.co/TheBloke/Nous-Hermes-2-SOLAR-10.7B-GGUF) total VRAM used: 11652.35 MiB (model: 8294.06 MiB, 16k context: 3358.29 MiB) This might be my new favorite. 

[Solar 10B](https://huggingface.co/TheBloke/SOLAR-10.7B-Instruct-v1.0-GGUF) this one is impressing me. solar-10.7b-instruct-v1.0.Q6_K.gguf total VRAM used: 10123.63 MiB (model: 8294.05 MiB, 8k context: 1829.58 MiB) Works great with default chatML instruct

[psyonic-cetacean](https://huggingface.co/TheBloke/psyonic-cetacean-20B-GGUF) psyonic-cetacean-20b.Q4_K_M.gguf total VRAM used: 22001.74 MiB (model: 11395.73 MiB, 8k context: 10606.00 MiB)
 

For large models, set the batch size lower in kobold to keep the working context memory requirements smaller. I like 128 these days. 5 threads on a 6 core system to preserve responsiveness.
         

  >I thought about recommending other models, but OpenHermes 2.5 is simply decent and fast, even tested on a friend's old 1080, under one minute for complex queries and with no gfx acceleration on 16gb ram its painfully slow to ingest, a few minutes for a large query and response.  smaller batch size helps you be sure its not hung up. 

  let me know about your hardware and token speed and i will make this reflect the general experience better. 

  
  Model sizes:
  ---
  8 bit quants:
 - 3B needs at least 4GB RAM total ram + vram (gfx card must support cuda or the amd one so super old stuff isn't that useful)
 - 7B needs at least 8GB RAM
 - 13B needs at least 16GB RAM
 - 30B needs at least 32GB RAM
 - 65B needs at least 64GB RAM

  And they all need some space for the context. GPU offloading puts the layers of the model into the memory of your graphics card. Fitting the whole model into VRAM makes things way faster. 
  
  For reference, at 2048 context in Q4_0*, a 6GB Nvidia RTX 2060 can comfortably offload:
  - 32 layers with LLAMA 7B
  - 18 layers with LLAMA 13B
  - 8 layers with LLAMA 30B

 You can load the model in memory, see how much your final model memory cost is in the console, and get a rough estimate of the size of each layer by dividing the size in memory by the number of layers. Remember to leave room for the context, which can get big fast. At 8k context I think use over 5gb of memory with the Q8, just for the context alone.

>*Model bit depth is trade between output quality and output speed.  Generally, larger parameter number models are smarter and can follow more complex instructions.
KoboldCPP uses GGUF format, which are quantized from 16 bit to between 2 bit and 8 bit depending on model. (I like 8 bit if it fits in vram with room for 8k context.)
lower bits require less ram, but there is a drop in reasoning and writing quality, though even the Q2 was following instructions well. 

Not all models support chatML format, and most wont perform optimally without their expected format.


---
[Home](readme.md), [install](install.md), [Basic Use](useClipboardConqueror.md), [Agents](agents.md), [Prompt Formatting](promptFormatting.md), [Backend Switching](multipleEndpoints.md), [Chaining agents](agentChaining.md)