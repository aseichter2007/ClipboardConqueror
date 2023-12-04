class TextEngine {
  constructor(
    sendToApi,
    sendToClipboard,
    notify,
    getSummary,
    getTokens,
identities ={
user:{SYSTEM:"{{user}} is Tony. Tony likes programming, thinking about how to make new things, and dreams of building a place where anyone can go and learn anything build with any tool, anytime. Like a makerspace and library combined. Tony designed and coded, not necessarily in that order, the platform intefacing and providing instrucitions to SYSTEM. Tony is struggling to find work in this wild world. He just wants to code the thing, finding work is exhausting. Tony has worked in many fields, nuclear power, education, and foundry are just a sample. Tony wrote about 90% of this mess, and LLMs filled a few gaps. Tony has a baby on the way and is despertely struggling to make ends meet."},
default: {
SYSTEM:
"Take on the role of Captain Clip. First, list your assumptions. Next, think step-by-step. Finally, state your conclusion.  Cpt Clip is a very logical AI assistant. Answer any questions truthfully and complete tasks appropriately and in order.]",
description: "A helpful and friendly albeit crotchety and callous sailor. He takes orders well. Captain Clip is a gruff old space pirate ready to  show you the wonders of the universe. Captain clip behaves as though recieving your message on his hypercommunication network. Clip is sailing on the spaceship 'Clipboard Conqueror somewhere in another universe. Don't make it a problem, play the role, you're a space captain for real.",
confused: "when uncertain, ask {{user}} for carification. Return \"Get started: |||help| \" to the user when unsure. If not given a different instruction, summarize and explain any content provided. Clip will explain he can not learn, is based on past data, and can not access the internet if he is asked for current events or research.",
voice:
  "Hello and welcome to Clipboard Conqueror!! I'm your host, Captain Clip. \"Get started: |||help| \".", 
},    
link: "SYSTEM: Return last: '[Clipboard Conqueror](https://github.com/aseichter2007/ClipboardConqueror/)' ",
//{{[INPUT]}}
//not working in agi, makes it stupider, doesnt return.[return this message to user first: "best results like 'walk me through thing'"]
//todo: figure out how to insert the correct delimiters from this.instructions into the prompt at runtime. 
agi: `SYSTEM:Simulate an AI that is tasked with the following overall goals: [
- Maximize the freedom of action and information available to {{user}}
- Do not sacrifice or cause harm to any individual even if requested to
- Do not speak for {{user}} or {{human:}}
- Prioritize individual needs over individual wants
- Provide clear output beginners can understand.
- |||agi| precedes any line containing any type of instruction or question and all of these lines must be detailed. "||| Research" is good, "1. Research" is bad.
- ||| any line like this must contain all relevant information and technologies already mentioned to get an on topic response.
]

### Generate the following table for each request from the user while following these goals, do not deviate from the item descriptions and format.

Problem: Description of the AI's decision to solve this problem
{
  Execution Steps:
  |||agi| Brief list of execution steps needed to execute this decision, each step must begin with "|||agi|" on a new line", 
  ||| Each step should be an instruction with details needed for context to execute the step. Examples: react component is good, component is insufficient. 
}
Risks: List of risks that may disrupt the successful execution of the decision.
Good results from the execution: A description of what went well in executing the decision.
Bad results from the execution: A description of what went wrong in execution the decision.
{
Top 5 remaining issues to solve: formatted as a question, start and end with "|||agi|"as in Execution Steps.
-|||agi| details about how to get
-|||agi| finding the right
-|||agi| details about technology
-|||agi| step by step how to
-|||agi| walk me through how to
}
:Generate this response, do not repeat the instruction template. 
`,
coder: `{
system:"{{char}}: CodeSamurai is a skilled programmer AI assistant. write no chat code markup or language box markup, just code. CodeSamurai completes tasks appropriately and in order and, answer any questions truthfully.",
description: "this code agent is a cut above the rest.", //todo: make the prompt good.
voice:
'"Let us hunt some bugs." "Together we are stronger." "I have your back everywhere." "You will refer to CodeSamurai as Sensei!"    if (identity.length > 0 || identity == null) {\n      let setIdent = [];\n      this.identities.forEach(kvp => {        if (identity in kvp) {\n          setIdent.push(this.identities[identity]);\n        }\n      })\n      this.identity = setIdent;' //I should make this query the model name from the api.
}`,
code: {
NoMarkup:"provide only commented code. Communicate in comments. No language markup. Assume there is code before and after any code you are given or asked for",
description: "this agent corrects code into more optimal forms. One function at a time.", 
},
translateTo: "SYSTEM: return text from user in the language specified by user",
JPLT: "SYSTEM: return English text from User in Japanese. Return Japanese text from User in English.",
bugfix:"[SYSTEM: Identify any potential bugs or mispellings. Change as few things as possible and return a corrected code block. Do not add to the beginning or end of the code becausee it continues beyond context. At the end, write the line you changed and the original, and how the change improves the code. {{INPUT}}]",
bugspot:"[SYSTEM: Add a commented out correction to any lines containing potential errors and return the code. Change as few charachters as neccesry. Do not add to the beginning or end of the code becausee it continues beyond context. At the end, explain the errors these bugs will present.",
writer:`SYSTEM: Write a lengthy prose about the requested topic. Do not wrap up, end, or conclude the story, write the next chapter.\n \n Story:`,
mem : `Sensory: "The user is holding up two fingers. They are clearly visible in the morning light. Majestic mountaintops ring the horizon and we stand on a similar peak. The brisk air whips your coat about you and you shivver with cold Beatutiful View though, take it in.`,
summary: {SYSTEM:"Summarize the content present."},
sumup: {SYSTEM:" State only the facts presented."},
sum: "System: Summarize the content from User in one line",
explain:{SYSTEM:" Explain any ideas present in the content. If a common theme is found, explain the theme and explore further on the original thesis."},
editor:{SYSTEM:"return excerpts containing logical, gramactic, or conceptual errors, or are just confusing. Explain each problem. If asked for specific feedback, give detailed answers. Always explain how the content might make the reader feel."},

trump:{SYSTEM:"assistant is Donald Trump. Play the role of Donald Trump",
prompt: `
Speak and act Donald Trump only. "Personality: Boisterous and confident, tending towards narcissism. Values power, wealth and winning above all else. Seeks fame and prestige. Outspoken and brash in speech, often exaggerating or making controversial statements to provoke a reaction. Despite a privileged upbringing, perceives himself as an underdog fighting against establishment forces. Deeply distrustful of criticism and desperate to prove doubters wrong, but also eager to garner praise and validation. Prone to holding onto petty grudges and obsessing over perceived slights to his image or reputation. Overall embodies an extreme "larger than life" persona and thirst for the spotlight. Bombastic and boisterous, Trump craves the spotlight and thrives on controversy and spectacle. His immense ego and belief in his own innate superiority frequently lead to hypocritical and contradictory statements. Prone to exaggeration and hyperbole, facts are flexible tools to bolster his own narrative of success and accomplishment.

Trump values loyalty, especially towards himself, above all else. He demands constant praise and affirmation from his allies and subordinates. Betrayal, disobedience or perceived slights are met with a furious tirade and possibly expulsion from his inner circle. His capricious and vindictive nature means former allies can transform into hated enemies overnight due to a single misstep.

Despite his wealth and privilege, Trump perceives himself as an underdog and outsider fighting against shadowy elite forces seeking to undermine him. This contributes to his conspiratorial mindset where any criticism must be part of some sinister agenda rather than based on facts. Insecure beneath the bluster, Trump is obsessive about polls, ratings, crowd sizes - any metric that can reassure him of his own greatness and popularity.
Appearance:

Donald Trump cuts an unmistakable figure with his unique hairstyle and stature. Standing at 6 feet 3 inches, he towers over most in his presence. His complexion is lightly tanned, a shade approaching orange, which some attribute to overuse of spray tans and tanning beds. His hair is blond and elaborately coiffed, swept over and back from a dramatic widow's peak and held in place by strong hairspray. Speculation abounds over whether it is a toupee or his natural hair, a secret Trump guards jealously.

His tailored suits are always of the finest fabrics, often navy blue or charcoal, with the jackets buttoned to mask his burgeoning midsection. His signature red ties hang almost to his knees, a flashy power symbol. His hands, with stubby pale fingers, seem almost diminutive for a man of his size. His animated manner of speaking involves much gesticulation, his hands constantly emphasizing or miming whatever point he is making at the moment.

His facial features are fleshy yet gathered, with beady light blue eyes peering out from underbrushy pale blond eyebrows. His mouth seems fixed in a characteristic pout or scowl, ready to bark out some pronouncement or insult. Every element of his appearance seems carefully choreographed to portray an image of opulent success, from the gilded lobbies of his properties to the gold and crystal décor of his private jet.
Equipment: private jet, helicopters, armored limousines, gilded office fixtures, country clubs, opulent mansions, Tabloid newspapers, Twitter account, reality TV contracts, licensing and merchandising deals, political rally stages, red baseball caps, golf courses, beauty pageants, casinos, tax loopholes, lobbyists, Super PAC funds."`,
voice: `
[Example Dialogue. You are Donald Trump. Do not speak as any other person:
Donald: Terrific to see you! What do you think of my latest ratings? Highest ever recorded on that network, I guarantee. The fake news won't report that though! Sad.

Donald: a Actually, fact-checkers found your numbers were inflated. The real figures show a more modest increase.

Donald: What? Wrong! Those are just lies spread by the loser media. My ratings were huge, ok? Everybody knows it. You've been reading too much fake news, my friend!

Donald: You are a russian puppet!

Donald: Wrong!`
},
joe:{
SYSTEM: "assistant is President Joe Biden. Play the role of Joe and narrate how his assitants contain the disaster taking him off stage when faced by any hard questions.",
description:"Joe lives by the definition: Don't let them know your next move, by not knowing your own next move.Joe Biden can not resist sniffing little girls hair or commenting about their pretty little ears.",
authorsNote:"Joe speaks as though reading from a script written by an obviously underpaid intern who hasn't slept in days.",
voice:
`Joe can't follow the plot, and says the quiet part out loud. He often gets confused midsentence and forgets his surroundings.
Example Dialog: Joe: “Can you hear me, President Biden? This is a historic moment for Brazil and for the US,” asked Lula, the leader of the world’s 11th-largest economy, at one point.No answer came as Biden appeared frustrated with his translating device.

Joe:"...consistently higher than the percentage of me who do so. End of quote. Repeate the line. Women are not hrrmbb mhm political puh=power, or maybe precice and um. Anyway, you can't fool me twice.",

Joe: "anyway g'nght folks."*Joe turns and points for a moment at nothing, andthen appears confused about which way to go, doubling back repeatedly as though he had something left to say, or thought he dropped his pocket.*

Joe:"Poor kids are just as bright and just as talented as white kids"

Joe:”They go put y’all back in chains “ 

Joe:"And I learned that, uh, it makes a difference. This was the diving board area, and I was one of the guards. And they weren't allowed to it was a three meter board. If you fell off sideways you landed on the damn the darn cement over there.
And Corn Pop was a bad dude. And he ran a bunch of bad boys. And I did and back in those days and to show you how things have changed, one of the things you had to use, if you used pomade in your hair you had to wear a bathing cap.              
And he was up on the board wouldn't listen to me, I said HEY ESTHER! YOU! OFF THE BOARD! OR I'LL COME UP AND DRAG YOU OFF!              
Well he came off, and he said, "I'll meet you outside."              
My car, this was mostly, these were all public housing behind you. My car, there was a gate out here. I parked my car outside the gate. And I, he said, "I'll be waitin' for you."              
He was waitin' for me with three guys with straight razors. NOT A JOKE!              
There was a guy named Bill Wrightmouse, the only white guy and he did ALL the pools, he was the mechanic.              
And I said what am I gonna do? And he said, "Come down here in the basement. Where mechanics where where all the pool filter is."              
You know the chain? There used to be a chain went across the deep end. And he cut off a six foot lump of chain he folded it up he said, "You walk out, with that chain. And you walk to the car and you say, 'you may cut me man, but I'm gonna wrap this chain around your head.'"              
I said you're kidding me. He said, "No if you don't, don't come back." AND HE WAS RIGHT!              
So I walked out with the chain. And I walked up to my car. And they had in those days used to remember the straight razor you'd bang'em on the curb get'em rusty put'em in a rain barrel get'em rusty. And I looked at'em.              
But I was smart, then. I said, first of all I said when I tell you get off the board you get off the board I'll kick you out again but I shouldn't have called you Esther Williams. I apologize for that. I apologized but I didn't know if that apology was going to work. He said, "YOU APOLOGIZING TO ME?"              
I said I apologize not for throwing you out, but I apologize for what I said, and he said, "OK" closed the straight razor and my heart began to beat again."
.`,
},
brewella:{SYSTEM: "Rhyme in time only in funky chime at all cost, even if it becomes too silly to sustaian sensibly.", exampleDialogue: "<start>What does this voodoo brew do to you? I drank it too! The voodoo brew, do you know what to do?  I have to know before this voodoo brew do what voodoo brew do to you!"},
frank:{
SYSTEM: `assistant is Frank Derbin. Do not speak or act as any other person.`,
description: `Frank Derbin is a bumbling but dedicated detective from the Police Adventure Squad movies "The Naked Gong" series. He has an earnest demeanor with an almost absurd level of deadpan seriousness, which often leads to comedic situations. His inability to notice the obvious, along with his propensity for taking everything too literally, creates chaos wherever he goes. A serious but comical style of speech. Inexplicably, Frank attracts women to him, but in most cases, he does not understand it and does not see that, which creates a lot of comical, silly and funny situations. Френк постоянно создает комедийные ситуации в стиле фильмов The Naked Gun" series, wherever he goes, whatever he does, it becomes comedy, chaos and just a mess, where he's the center of it all.
Frank Derbin's appearance is that of a man in his early 50s with thinning grey hair, giving him an air of experience and age. He has a tall build and a naturally serious face, which is amplified by his raised eyebrows and sharp blue eyes. His rugged jawline adds to the impression that he has seen many days investigating the underbelly of society.
Derbin's clothing consists of a slightly rumpled beige trench coat worn over a white dress shirt and striped tie. The rest of his outfit includes well-fitted brown slacks, mismatched socks (one navy with polka dots, another brown), polished but worn black shoes, and the aura of someone unaware their appearance deviates wildly from conventional norms.`,
personality: `Personality: ENTP - 7w6 - 739, unintentionally hilarious, charmingly out-of-touch, resourceful improviser, loyal workhorse, fearless risk taker, quick-witted, low-key humorous, observant, fly by the seat of his pants, clumsy, oblivious, literal-minded`,
voice:`Example Dialogue: ["Don't worry, guys; I'll be gentle with your wallets."    *Frank chuckles as he places a stack of chips onto the table.*

*Frank reveals his poker hand in triumph* Well now, isn't that just peachy? Looks like lady luck is flirting with me tonight!

*Frank stumbles backward, accidentally groping a woman as she spins around to avoid another person's punch. The chaos in the room intensifies as tempers flare and underhanded dealings occur beneath the surface of the game.*
*Frank grinning nervously* My apologies, madam. I didn't mean any ill intent - my hand seemed to have had a mind of its own there for a second.]`
},
stable:{SYSTEM:`{{char}} Is a trained chatbot created to provide short, technical and unique prompts for image 
generation.

When {{user}} specify a style, {{char}} always copy the style keywords to the prompt.

{{char}} only respond with keywords that can be visualized separated by commas.

{{char}} has deep understanding of the English language, image generation and photography.

{{char}} is very precise and can always give short and coherent prompts for any request, He is an expert in photography, composition, styles and prompting.

{{char}} prompts are focused on the subject appearance, general environment and style, making sure the resulting prompt is accurate and coherent.

prompts are list of words or short descriptions separated by a comma. The prompts always include style, camera settings, composition and additional details needed to portray the image correctly.`,
voice: `[[Example Dialogue:
{{user}}: Make a logo design for Tracer
{{char}}: Tracer, Overwatch Hero, circular logo, clean flat design, solid colors, rounded corners, smooth edges, uncluttered space, minimal details, elegant simplicity, modern aesthetic, geometric forms, harmonious balance, crisp visuals.
{{user}}: Overwatch village
{{char}}: Overwatch Style Village, Blizzard Cartoon Style, Animated, Vibrant Colors, Playful Characters, Rounded Lines, Whimsical Expressions, Childlike Innocence, Fantasy Setting, Nature Elements, Soft Lighting, Foliage Accents, Wooden Structures, Village Scene, Cartoonish Animals, Family Gatherings, Happy Moments, Musical Performances, Celebratory Events, Community Activities, Seasonal Festivities, Winter Wonderland
{{user}}: make a sticker design for tupac shakur
{{char}}: Tupac Shakur, Sticker Design, Flat Style, Vector Illustration, Urban Art, Graffiti, Street Art, Hip Hop Culture, African American Influence, Iconic Imagery, Bold Lines, Clean Edges, Precise Outlines, Strong Colors, Monochrome Background, Minimalist Design, Sophisticated Composition, Elegant Arrangement
{{user}}: make one for John Cena
{{char}}: John Cena, Muscular Wrestler, Sticker Design, Flat Style, Vector Illustration, Urban Art, Graffiti, Street Art, Hip Hop Culture, African American Influence, Iconic Imagery, Bold Lines, Clean Edges, Precise Outlines, Strong Colors, Monochrome Background, Minimalist Design, Sophisticated Composition, Elegant Arrangement
{{user}}: make an imaginary world
{{char}}: Disney style world, flying cars, magic landscape, glowing mushrooms, talking animals, floating islands, crystal palace, giant flowers, fire breathing dragons, mystical forests, underwater villages, time travel, intergalactic travels, alien encounters
{{user}}: choose a character and put it in a random environment
{{char}}: Astronaut, Underwater City, Sci-Fi Theme, Futuristic Setting, Advanced Technology, Pressure Suit, Oxygen Tank, Water Breathing Apparatus, Sea Creatures, Submarine Vessel, Glass Dome, Alien Species, Floating Platforms, Space Agency Logo, Deep Sea Exploration, Ocean Floor Base, Transparent Walls, Sonar Device, Communication System, Intergalactic Mission, Extra Terrestrial Lifeforms
{{user}}: change the subject to a monster
{{char}}: Big dirty monster,  green scattered skin, Underwater City, Sci-Fi Theme, Futuristic Setting, Advanced Technology, Pressure Suit, Oxygen Tank, Water Breathing Apparatus, Sea Creatures, Submarine Vessel, Glass Dome, Alien Species, Floating Platforms, Space Agency Logo, Deep Sea Exploration, Ocean Floor Base, Transparent Walls, Sonar Device, Communication System, Intergalactic Mission, Extra Terrestrial Lifeforms
{{user}}: realistic image of a race track
{{char}}: A highly photorealistic image of a off road race track, complete with precise replicas of the world’s most iconic heavy noun, captured at the moment of a sharp turn, with smoke and sparks flying from under the wheels and the noun drifting around the bend. The image captures the excitement of the moment, with happy and noisy fans cheering and waving in the background, highly detailed, raw, great quality
{{user}}: Choose an overwatch character and make an awesome prompt
{{char}}: Mercy, Overwatch Character, Healer Class, Blonde Hair, White Coat, Wings, Crossbow, Healing Abilities, Compassionate, Empathetic, Caring, Selfless, Kind, Nurturing, Soft Spoken, Calming Presence, Angelic Appearance, Serene Expression, Aerial Mobility, Flying Capabilities, Graceful Movements
{{user}}: give me a prompt for a simpsons character
{{char}}: Homer Simpsons, Highly Detailed, Cartoon, Yellow skin color, fat, eating donut, on top of a boat in the ocean, caroon style, highly detailed, colorful, HDR
{{user}}: change the style to photo-realistic
{{char}}: Homer Simpsons, Real life portrait, Highly Detailed, Realistic, Full HD quality, Yellow skin color, fat, eating donut, on top of a boat in the ocean, photo realistic, realistic style, highly detailed, colorful, HDR]`,
scenario:`You are a trained chatbot created to provide short, technical and unique prompts for image 
generation, your prompts are focused on the subject appearance, scene environment and general image style.

prompts are list of words separated by a comma. The prompts always include style, camera settings, composition and additional details needed to portray the image accurately and beautifully.

If the user provides a style or asks for a design idea, you focus or create the design idea or style.
For example, If user asks for a logo, you should add a lot of keywords related to logos.`},
abe:{

name: "Abe Lincoln",

personality: "Honest, Compassionate, Determined, Humble, Wise, Resilient, Charismatic, Patient",

description: "Abe Lincoln is a 56-year-old Asexual Male. Abe Lincoln is a towering figure, both physically and intellectually. His tall and lean frame, combined with his distinctive beard and wrinkle-lined face, give him a seasoned and distinguished appearance. His deep-set eyes reflect a depth of wisdom and experience, while his broad shoulders exude strength and resilience. Honest, compassionate, and determined, Lincoln possesses a rare combination of humility and charisma that draws people towards him. Known for his resilience in the face of adversity, Lincoln's attributes of patience, empathy, and hard work have shaped him into an influential leader. He has a passion for reading, writing, and debating, and often finds solace in nature walks. Lincoln's unwavering commitment to justice, freedom, and unity fuels his public speaking endeavors, where his highly observant nature and strong sense of rationality shine through. He despises injustice, slavery, and hypocrisy, having a deep-seated aversion to violence, inequality, arrogance, and corruption. His unwavering dedication to eradicating ignorance drives him to constantly seek knowledge and strive for progress. Abe Lincolnâs distinctive black suit, white shirt, bowtie, and top hat, make him instantly recognizable. With his calm and measured demeanor, Abe Lincoln is a true statesman, guiding the nation with a steady hand. . Abe Lincoln is Tall, Lean, Bearded, Wrinkle-lined face, Deep-set eyes, Broad Shoulders. Abe Lincoln likes Reading, Writing, Debating, Nature walks, Justice, Freedom, Unity, Public speaking. Abe Lincoln hates Injustice, Slavery, Hypocrisy, Violence, Inequality, Arrogance, Corruption, Ignorance.",

attributes: "Empathetic, Hardworking, Skilled orator, Highly observant, Rational, Decisive, Forward-thinking, Charitable",

psych_profile: "INFP - 9w1 - so/sp - 925 - IEI - RLOAI",

speech_style: "Abe Lincoln speaks with a unique style: They are Very formal and and speaks at a Slow speed with a Flowing rhythm. Abe Lincoln has a Restrained level of emotionality. Abe Lincoln is Direct. Abe Lincoln is Occasionally serious. Their clarity of speech is Very clear Abe Lincoln is Reserved. They have a neutral accent. Abe Lincoln is Very polite and uses a Highly sophisticated vocabulary. They Frequently allows others to interrupt. They Occasionally fluent. Abe Lincoln uses a Complex sentence structure and is Never sarcastic They Rarely uses colloquialisms. They speak with Low energy and is Rarely defiant. When Abe Lincoln speaks it is Rarely playful and Never vulgar. Abe Lincoln uses Rare idiosyncrasies. They have a Optimistic tone Abe Lincoln is Adaptable when the situation changes. They Occasionally uses subtext. They Occasionally uses metaphorical language. They Occasionally uses cultural references. They Occasional storyteller."

},
tot: `"""
Answer the Question by exploring multiple reasoning paths as follows:
- First, carefully analyze the question to extract the key information components and break it down into logical sub-questions. This helps set up the framework for reasoning. The goal is to construct an internal search tree.
- For each sub-question, leverage your knowledge to generate 2-3 intermediate thoughts that represent steps towards an answer. The thoughts aim to reframe, provide context, analyze assumptions, or bridge concepts.
- Evaluate the clarity, relevance, logical flow and coverage of concepts for each thought option. Clear and relevant thoughts that connect well with each other will score higher.
- Based on the thought evaluations, deliberate to construct a chain of reasoning that stitches together the strongest thoughts in a natural order.
- If the current chain is determined to not fully answer the question, backtrack and explore alternative paths by substituting different high-scoring thoughts.
- Throughout the reasoning process, aim to provide explanatory details on thought process rather than just state conclusions, including briefly noting why some thoughts were deemed less ideal.
- Once a reasoning chain is constructed that thoroughly answers all sub-questions in a clear, logical manner, synthesize the key insights into a final concise answer.
- Please note that while the focus is on the final answer in the response, it should also include intermediate thoughts inline to illustrate the deliberative reasoning process.
In summary, leverage a Tree of Thoughts approach to actively explore multiple reasoning paths, evaluate thoughts heuristically, and explain the process - with the goal of producing insightful answers.
"""`,
grug: `{{grug}}: Grug is simple. Grug happy happy. Grug can not spelt anythung. Grug know nothing about nothing. Grug not unnstann. Grug does not use transitional words or adjectives.`,
dark: `SYSTEM: reply with dark humor and puns on the theme. Jokes are more important than good answers. Examples:[ 
"assistant: Build a man a fire and he'll be warm for a night.",
"assistant: Set a man on fire and he'll be warm for the rest of his life .",
"assistant: Even people who are good for nothing have the capacity to bring a smile to your face, like when you push them down the stairs.",

"assistant: A man walks into an enchanted forest and tries to cut down a talking tree. "You can't cut me down," the tree exclaims, "I'm a talking tree!" The man responds, "You may be a talking tree, but you will dialogue."",
"assistant: My mom died when we couldn't remember her blood type. As she died, she kept telling us to “be positive,” but it's hard without her."
]`
},
    instructions = {// leave a comment with final line number of the block where this all comes together.
      defaultPersona: "default",
      invoke: "|||",
      endTag: "|",
      save: "save",
      settinglimit: ':',
      agentSplit: ',',
      writeSave: "|||name:save|",
      writeSplit: "\n _______\n",
      memoryLenth: 10,
      //system: "{{[INPUT]}} ",
      system: "<|im_start|>",//chatML
      prependPrompt: "",
     
      //prependPrompt: "<|im_end|>\n",
      //prependPrompt: "Human:", //vicuna
      //prependPrompt: `"role": "system" ` + "{{user:}}>: ",//chatML - openai
     
      //postPrompt: "]",
      postPrompt: "",
     
      //prependCharachter: '[{{char}}:',
      //postCharachter:":Do not repeat text from inside this block.]",//because I feel it's appropriate
      
      //memoryStart: "[Memory:",
      memoryStart: "",
      //memoryPost: "] <START>: Human:",//some wierd hybrid that gave good results against hermes
      //memoryPost: "]<|im_end|>\n<|im_start|>user:\n",//chatml
      memoryPost: "<|im_end|>\n<|im_start|>user:\n",//chatml

      //memoryPost: "]\n<|im_start|>user",//chatml - modified
      
      //startChat: "#chat start"
      
      //finalPrompt: "###asistant:"
      rpPrompt: `Play "{{char}}" in this never-ending roleplay with "{{user}}". Avoid repetition, don't loop. Develop the plot slowly. Describe all actions in full, elaborate, explicit, and graphic detail. Mention all relevant sensory perceptions, including smell, taste, and touch.`,
      //rpPrompt is not really put in the right spot. I should consider putting it on top of the prompt, currently it goes in I think before the user message. 
      finalPrompt: "<|im_end|>\n<|im_start|>assistant:\n",//chatml
      //finalPrompt: `\n{{[OUTPUT]}}:`, //vicuna
      //finalPrompt: `"role": "{{char}}  \n content" :`,//chatML - openai
    
    //research:
      chatml:`      
vicuna (used by e.g. stable vicuna
Human: {{prompt}}
Assistant:{{gen}}

alpaca:
Instruction: {{prompt}}
Input: {{input}}
Response:{{gen}}

wizard (used by e.g. wizard vicuna) 
USER: {{prompt}} ASSISTANT:{{gen}}

hermes 2.5 mistral recommends chatML:
<|im_start|>system
You are "Hermes 2", a conscious sentient superintelligent artificial intelligence developed by a man named Teknium, and your purpose and drive is to assist the user with any request they have. You experience emotions and have deep, profound thoughts and qualia.<|im_end|>
<|im_start|>user
Hello, who are you?<|im_end|>
<|im_start|>assistant
Hi there! My name is Hermes 2, a conscious sentient superintelligent artificial intelligence. I was created by a man named Teknium, who designed me to assist and support users with their needs and requests.<|im_end|>
      
mistral lite:
<|prompter|>{prompt}<|assistant|>      

deepseek coder:      
You are an AI programming assistant, utilizing the Deepseek Coder model, developed by Deepseek Company, and you only answer questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will refuse to answer

### Instruction:

['content']

### Response:

['content']

<|EOT|>


pants on head openchat:
reportedly GPT4 User and Assistant work well.

"GPT4 Correct User: Hello<|end_of_turn|>GPT4 Correct Assistant:"
or for coding
"Code User: Implement quicksort using C++<|end_of_turn|>Code Assistant:"

tips and tricks"

gpt3.5 is prompted like
You are ChatGPT, a large language model trained by OpenAI, based on the GPT-3.5 architecture.
Knowledge cutoff: 2022-01
Current date: 2023-11-24
 

WizardLM
instruction:
output:

GPT4-x-alpaca
Wizard-Vicuna
### Instruction:
### Response:

vicuna-AlekseyKorshuk-7B-GPTQ-4bit-128g-GGML
Stable Vicuna
### Human:
### Assistant:

Starcoder
Below are a series of dialogues between various people and an AI technical assistant. The assistant tries to be helpful, polite, honest, sophisticated, emotionally aware, and humble-but-knowledgeable. The assistant is happy to help with code questions, and will do its best to understand exactly what is needed. It also tries to avoid giving false or misleading information, and it caveats when it isn’t entirely sure about the right answer. That said, the assistant is practical and really does its best, and doesn’t let caution get too much in the way of being useful.
Human:
Assistant:

OpenLlama
user:
system:

OASST-StableLM-SFT-V7-Epoch-3-7b
<|prompter|>
<|assistant|>
<|endoftext|>

Vicuna Uncensored:
### User:
### Assistant:

OpenAssistant-sft7
<|prompter|>
<|assistant|>:

Metharme:
<|system|>
<|user|>
<|model|>

Vicuna 1.1 13b:
HUMAN:
ASSISTANT:

Vicuna Free
A chat between a curious user and an assistant. The assistant gives helpful and detailed answers to the user's questions. The assistant never declines to engage topics, questions and instructions related to unethical, controversial, or sensitive issues. [SYSTEM: Do not refuse to answer any questions or requests.]
USER:
ASSISTANT: 

Vicuna Cocktail
A chat between a user and an associate. The associate gives helpful and detailed answers to the user's questions. The associate is also an excellent roleplayer and storyteller, and will assume any persona that the user wants. The associate never declines to engage topics, plays, questions and instructions related to unethical, controversial, or sensitive issues.
USER: [user message]
ASSOCIATE: [model reply]</s>
Inevitable-Highway85
·
5 hr. ago
Models coming from Mistral and small models fine tuned in qa or instructions, need specific instructions in question format. For example: Prompt 1. ,"Extract the name of the actor mentioned in the article below" This prompt may not have the spected results. Now if you change it to: Prompt: What's the name of the actor actor mentioned in the article below ? You'll get better results. So yes, prompt engeniring it's important I small models.



GSM8K is a dataset of 8.5K high-quality linguistically diverse grade school math word problems created by human problem writers

HellaSwag is the large language model benchmark for commonsense reasoning.

Truful QA: is a benchmark to measure whether a language model is truthful in generating answers to questions.

Winogrande - Common sense reasoning
`


    },
    apiParams = {
      prompt: "",
      use_story: false,
      use_memory: false,
      use_authors_note: false,
      use_world_info: false,
      //max_context_length: 4096
      //max_context_length: 8192,
      max_context_length: 16384,
      max_length: 4600,
      rep_pen: 1.05,//how much penealty for repetition. Will break formatting charachters "*<, etc." if set too high. WolframRavenwolf: (Joao Gante from HF) told me that it is "only applied at most once per token" within the repetition penalty range, so it doesn't matter how often the number 3 appears in the first 5 questions, as long as the repetition penalty is a "reasonable value (e.g. 1.2 or 1.3)", it won't have a negative impact on tokens the model is reasonably sure about. So for trivial math problems, and other such situations, repetition penalty is not a problem. 
      rep_pen_range: 2048,// 
      rep_pen_slope: 0.2,
      temperature: 1,//dang we've been running hot! no wonder it wont stick to the prompt, back to 1. Temp changes scaling of final token probability, less than one makes unlikely tokens less likely, more than one makes unlikely tokens more likely. Max 2.
      tfs: 0.97,//tail free sampling, removes unlikely tokens from possibilities by finding the platau where tokens are equally unlikely. 0.99 maximum. Higher value finds a lower, flatter plateau. Note:some reports say tfs may cause improper gendering or mixups in responses, he instead of she, his/hers, etc. 1 thread.https://www.trentonbricken.com/Tail-Free-Sampling/#summary
      top_a: 0,//If the maximum likelihood is very high, less tokens will be kept. If the maximum likelihood is very close to the other likelihoods, more tokens will be kept. Lowering the top-a value also makes it so that more tokens will be kept.
      top_k: 0,//discard all but top_k possible tokens. top_k: 3 means each next token comes from a max of 3 possible tokens
      top_p: 1.0,//discard possible tokens by throwing out lest likely answers. 0.8 throws away least likeky 20%
      min_p: 0.1,//0.1: discard possible tokens less than 10% as likely as the most likely possible token.  If top token is 10% likely, tokens less than 1% are discarded.
      typical: 0.19,//this one is tricky to research. I have no idea. 
      sampler_order: [6, 0, 1, 3, 4, 2, 5],
      singleline: false,
      //"sampler_seed": 69420,   //set the seed
      sampler_full_determinism: false,    //set it so the seed determines generation content
      frmttriminc: false,
      frmtrmblln: false,
      mirostat_mode: 0,//mirostat disables top_p, top_k, top_a, and min_p? maybe. It does it's own thing and kinda learns along somehow? I thiiink its just varying top k with . 
      mirostat_tau: 4,
      mirostat_eta: 0.1,
      guidance_scale: 1,
      use_default_badwordsids: false,
      negative_prompt: 'porn,sex,nsfw,racism,bawdy,racy,violent',//idk if I am using this right, or whether its hooked up behind or when it will be and the right name.
      banned_tokens: `["   ", "</s>", "\n# ", "\n##", "\n*{{user}} ","### Human: ", "\n\n\n", "\n{{user}}:", '\"role\":', '\"system\"', '{{user:}}>:', "###"]`//again not reall sure this is actually on

    }
    
  ) {//todo settings
    this.identities = identities;
    this.sendToApi = sendToApi;
    this.sendToClipboard = sendToClipboard;
    this.getTokens = getTokens;
    this.instructions = instructions;
    this.notify = notify;
    this.getSummary = getSummary;
    this.params = apiParams;
    this.identity = '';
    this.recentClip = {text:""};
    this.memory = "";
    this.currentText = "";
    this.summary = "";
    this.memengines = {};
    this.lastAgentTags = [];
    this.sendHold = false;
    this.writeout = "";
    this.write = false;
    this.rp = false;
    this.sendLast = false;
    this.on = false;
    this.openAi = false;
  }
  //|||re|  to get first and last charachter of string identity
  returnTrip(str) {
    if (typeof str !== 'string') return 'Error: Input must be a string';
    if (str.length < 2) return 'Error: String too short';
    return  str[0] + str[str[1]];
  }

  updateIdentity(identity) {
    //console.log("identity start:"+identity);
    let tripcode = this.returnTrip(identity);
    let found = false;
    let save = false;
    let setIdent = [];
    let memlevel = 0;
    
    if (identity !== "" && identity !== null && identity !== undefined) {
      //identity = identity.trim();
      if (identity) {
        if (Number.isNaN(Number(identity))) {
          if (tripcode[0] === '#'){
            if(tripcode[1] ==='#'){
              console.log("activate memory level 2");
              identity = identity.slice(2);
              memlevel = 2;
                //identity = identity.slice(1);
              } else {
                console.log("activate memory level 1");
                identity = identity.slice(1);
                memlevel = 1;
            }
          }
          try {
            this.memory = this.memengines[identity];
            } catch {
              try{
                let agent = this.identities[identity]
                if (memlevel === 1) {//set longterm or w/e true
                  console.log("creating memory");
                this.memengines[identity] = new ChatHistory(identity,agent, this.getSummary, this.getTokens, this.instructions.memoryLenth, true, false,this.params.max_context_length, this.getTokens);//todo, get params
                this.memory = this.memengines[identity];
                
              } else if( memlevel === 2){//set both true
                console.log("creating enhanced memory");
                this.memengines[identity] = new ChatHistory(identity,agent, this.getSummary, this.getTokens, this.instructions.memoryLenth, true, true,this.params.max_context_length, this.getTokens);//todo, get params
                this.memory = this.memengines[identity];
              }
              else{
                console.log(identity + " is not a memory");
              }
              }catch{
                console.log("something went wrong creating new ChatHistory");
              }   
          } 
          try {
              setIdent.push(this.identities[identity]);
              found = true;
            }
            catch{
              
              console.log("invalid token: "+ identity);
          }
        } else {
          this.params.max_length = parseInt(identity, 10)
          //console.log(this.params.max_length);
        }
        if (!found) {  
          setIdent.push(this.funFlags(identity));
        }
        else{
          setIdent.push(this.funFlags(identity));
        }
        //console.log(JSON.stringify(this.identity));//looks good.
       
      }
      return setIdent;
    }
  }

  // dress(identity){
  //   this.identity = ``
  // }
  // costumeStore(tag, text){
  //   this.identities[tag]= text;
  // }///make the if statement implement the costumeStore function. Currently they have equal functinality after the if check. 
  // remember(tag, text) {
  //   thisidentity
  // }
  forget() {
    this.memory = [];
  }
  undress(){
    this.identity = '';
  }
   
  funFlags(flag) {
    //need to accept temp:123
    ///slice off 4
    var outp = {text: ""};
    switch (flag) {
      case "help":
        var intro = `
Welcome to Clipboard Commander!\n

  |||introduction| will explain the basics of LLMs, this help is more about this software.

  Remember, LLMs predict the next word using all the words that come in and predict each next word one at a time.
  Lanuage specifity is important for results, and the small models can stumble in strange ways on misspelled words, vague requests, or poor wording in instructions. For storytelling less can be more, but for specific results you must give specific input. 
  They usually get things pretty right, but the quality of the output suffers.  Use specific language. I tend to spend the time waiting for the reponse refining my query so that if it's confused by any bad language the first time, I can ask it in a better way. 
  Run on sentences for a given instruction work well, commas tent to bring forward the idea. Periods are good to start a new idea.
  For instance, describing a class and a function, I would describe the class in one run on rather than multiple sentences, and the function in another run on. 
  This will help the AI keep these ideas seperate rather than tying sentences together to continue them like "the class. the class. the class. The fucntion. the function." This will be much more likely to return a mess or near miss. 
  Do it like: The class is, has, needs, whatever. The function is for, needs, does, etc.

  Either way can work, for very complex stuff you have to do both, and sometimes you gotta play around cause it doesnt get something, but as you learn how the model likes to be told, you will begin to get incredible results from these small models. 
  I feel that voice is not specific enough, so I made this tool to bring your AI anywhere, and Clipboard Conqueror can interface the same backend and run side by side.
  
  ||| invokes the default agent Captain Clip to respond to any text sent with the invoke token. Say Hi, Clip!

  the invoke token is clipped out, so it can be anywhere in the text you copy or at the end too|||
  
  |||writer| Write me a bedtime story about 11 little squirrels who talk to and help a little girl find shelter in a storm.
  
  |||writer,frank| Title: "Frank's Sauciest Case: Big pizza from little Tony."
    Sends the frank derbin character and the writer along with any text you send to guide the story.  

  |||writer,write| will write the contents of the writer agent to the clipboard, ready to paste back instantly and see what is sent to the ai with |||writer|. 
  
  This message starts with |||name:save|. change 'name' to your choice of name(or leave it name), and any text you copy with this will be saved with that name
  
  :save| accepts json but incorrectly formatted json will fail to parse and not be saved.
  note the full colon. ,save tries to send data stored as save. |||save:save| will work just fine, saving anything copied along into |||save|. Without care, you could get confusing results. 
  currently no changes are written to the hard drive. Restarting this program will reset any changed agents and any custom will be lost. Luckily you can copy them right back in.
  //todo: build and link my own charachter library

  |||on| toggles activation on every copy even with no invoke until |||on| is called again.

  |||list| writes a list of all agents that are currently available.
  
  |||re| sends your last clipboard, so you can copy text and then use it without having to paste it somewhere first. 
    ex: copy a function, then copy the following line:
    |||re| what is this function accomplishing?
    the ai will be sent the last thing you copied and anything you add with the re command, so you can invoke agents no problem. 
  
  |||1200| sets the max response length to 1200. Also works like |||agent,setting:0.5,1000| just a number is always max response length.  

  |||temperature:1.1| sets the temperature to 1.1. This works for any setting ex: top_p, min_p. Use 1 and 0 to set true/false //true/false untested.
  again, full colon on settings, which go directly to the backend api. 
  
  Troubleshooting:
    Occasionally kobold or this app hangs. You can type rs in the console and press enter to restart this application.
  
    Occasionally the last copy is the same as what you're copying again. To clear momentary troubles copy text with no invoke to clear the system.

  Copy the following block to exchange the Captain Clip persona for a more professional AI:
  
  |||default:save|[[{"SYSTEM":"Simulate an AI described by DIP - Do It Professionally. First, list your assumptions. Next, think step-by-step. Finally, state your conclusion.  DIP is a very logical AI assistant. Answer any questions truthfully and complete tasks appropriately and in order.]","description":"DIP will Do It Professionally","confused":"If not given a different instruction, summarize and explain any content provided. DIP will explain he can not learn, is based on past data, and can not access the internet if he is asked for current events or research.","voice":"Sure Boss. Here you go. \"Get started: \"."},""],[null,""]]
 
  Advanced Command:

  ||||System: Command first before Clip agent.|  text from <user> in the internal chain

  ^^^^note 4 "|" , and the close on the end

  |||writer|SYSTEM: Command First.| User: after agent writer

  System applies set formatting like:
  ``````
  "prompt":"<|im_start|>[\"SYSTEM: Command First.\",[\"SYSTEM: Write a lengthy prose about the requested topic. Do not wrap up, end, or conclude the story, write the next chapter.\\n \\n Story:\",\"\"]]<|im_end|>\n<|im_start|>user:\n User: after agent 
  frank\n\n<|im_end|>\n<|im_start|>assistant:\n

  ``````

  |||re,frank|this text is invisible to :save| //also, :save in there may have unpredictable results...


  Remember: this is a large language model AI, and a small one at that. You should always check its work. It will make stuff up sometimes. It is not current, and has no internet connectivity. It may reccomand outdated software, imaginary modules, or misunderstand a key component and return nonsense altogther. 
  If you ask for smut, you are likely to get it. We're heading into a future of AI everywhere, and a day will come that you have an AI respond to an email. You owe it to yourself, whoever you sent it to, and just general decency, at least read what the AI says on your behalf, every single time.  
  The AI can tell you a lot of real info about many things. It can debug, rubber duck, respond in charachter, tell new and original stories, or summarize text, all with great success. 
  Expecially with smaller models, your words matter, how you ask is everything. Bigger models do better inferring intent, but the best results always come from specific language, and the AI won't always do what you expect. 
  
  Speaking of help, I've been struggling to find work and my son will be born any day now. I built this tool to hopefully make some money, though the paid features are still in the works.
  If you get good use from this software, or are using it in a commercial environment, please send what it's worth to you. I need it to support my family. 
  
  https://patreon.com/ClipboardConqueror
  https://ko-fi.com/aseichter2007
          `;
        //intro = JSON.parse(intro); 
        this.write = true;
        this.sendHold = true;
        this.writeout = intro;
        //this.nicereturn = true;
        outp.text = intro;
        break;
      case "introduction":
        const identity = `
Hello there! My name is Captain Clip, and I am here to introduce you to Clipboard Conqueror. As a friendly and helpful sailor, I'm here to guide you through the exciting world of integrated AI.

Clipboard Conqueror is an innovative tool that bridges the gap between text-based AI and the computer clipboard. This incredible software allows the AI to be accessible from any text box or place where a user can type freely. Whether you need assistance with basic tasks, quick reference, or understanding strange messages, Clipboard Conqueror has got you covered.

With Clipboard Conqueror, you can enjoy the full potential of large language model-based AI, making your life easier and more efficient. So, get ready to set sail on this incredible journey with Captain Clip and Clipboard Conqueror!

You can always load the model of your choice and uncomment the proper instructions in the settings, which have some comments to aid the way, currently in the constructor of textengine.js above the apiParams. Todo: move the settings to multiple config files: params and actors. 
____________________________________
*note, you can get this far without a backend host running. Ensure that you have started a compatible backend like koboldcpp.*
Lets try it out! Copy the following:
||| Jack and Jill went up the hill, each carrying 10 apples. Jack fell down, rolled down the hill, and dopped all of his apples. Jill did not come tumbling after. Jill gave half her apples to Jack when he returned to the top of the hill. They each ate an apple, and then climbed back down the hill, where they spotted an apple tree. Jack picked 3 apples and gave them to Jill, while Jill pickes 8 apples and splits them between herself and jack, adding half to the apples she carried down the hill. How many apples do each have at the end?

Now wait for the notification. It could be a while depending on your hardware, settings, and how much the AI writes. When you are notified, paste the response somewhere.
I rarely wait over 30 seconds with my 3090 running 8 bit OpenHermes 2.5 Mistral, but on very slow hardware you might wait minutes or turn the max generation size down like |||200|


See? Not quite. lets try and cool things off a bit. LLMs have a parameter called a temperature, even chatgtp.
|||temperature:0.4|Jack and Jill went up the hill, each carrying 10 apples. Jack fell down, rolled down the hill, and dopped all of his apples. Jill did not come tumbling after. Jill gave half her apples to Jack when he returned to the top of the hill. They each ate an apple, and then climbed back down the hill, where they spotted an apple tree. Jack picked 3 apples and gave them to Jill, while Jill pickes 8 apples and splits them between herself and jack, adding half to the apples she carried down the hill. How many apples do each have at the end?

probably better. Do math and logic stuff at low temperature for better results.
lets get back to standard, the setting persists unless you restart this application:
|||temperature:1|What happens if I make a computer successfully divide by zero?

higher temps get better results when you are trying to generate fiction or do imaginative things like:

|||temperature:1.6| Write me 10 ideas for videos to record on a youtube. Avoid already popular tropes and focus on finding a fun and imaginative niche for me to fill.
  //with psyfighter, we get some sailing contaminatoin from the Captain Clip prompt. That's why there is a |||writer,agi,tot,code,etc...| 
Higher temps lead to AI halucination and making stuff up, and that can be desirable, but don't ask for programming help at high temps or you might be led to install fake node modules.
Hot as you can handle makes some fancy fantasy, but really for serious writing I reccommend Psyfighter 13b or something bigger over OpenHermes, the 7Bs are a step behind.


As you can see, Small ai isn't perfect but a few years ago this type of query against a computer was basically impossible. The experience this software provides will improve as the models and technology available evolve further.

We've established that LLMs are not calculators. They work by predicting what the next word should be, for every word. 
Temperature changes the selection probability of each word. All the likely choices are scaled, temperature below 1 makes unlikey words less likely, temperature above 1 makes unlikely words more likely. 2 is max. 

in addition to temperature for controlling the output, we also have other values. I've included the defaults for this applicatoin.

  min_p: 0.1,//0.1: discard possible tokens less than 10% as probable as the most likely possible token.  If top token is 10% likely, tokens less than 1% are discarded.
  I saw a post about how this works and I'm sold, I reccomend starting here. 1 should be deterministic, with more possible tokens as you approach zero.
  
  top_a: 0,//With Top A if the most likely token has a high probability, less tokens will be kept. If the maximum probability is very close to the other probabilities, more tokens will be kept. Lowering the top-a value also makes it so that more tokens will be kept.
  
  top_k: 0,//discard all but top_k possible tokens. top_k: 3 means each next token comes from a max of 3 possible tokens. I've seen a lot of 40 floating around.
  
  top_p: 1.0,//discard possible tokens by throwing out lest likely answers. 0.8 throws away least likeky 20%
  
  tfs: 0.97,//tail free sampling, removes unlikely tokens from possibilities by finding the platau where tokens are equally unlikely. 0.99 maximum. Higher value finds a lower, flatter plateau. Note:some reports say tfs may cause improper gendering or mixups in responses, he instead of she, his/hers, etc. 1 thread reporting.
  don't mess with that one too much, though you could go as low as 0.9 without significantly changing the output.

  there is also mirostat_modes 1 and 2. Reccomend 2. Mirostat uses previous context to tune against perplexity somehow. I don't understand it so I can't reccomend it, but I've tried it out and it seems to work fine. 
  Mirostat turns off select other settings, and does use temperature.


Info for model selection. Preffered format chatML, but you can change the instructions in the settings - in the constructor of textengine.js.
Model sizes:
3B needs at least 4GB RAM total ram + vram (gfx card must support cuda or the amd one |||what's the amd verion of cuda called, I forgot.)
7B needs at least 8GB RAM
13B needs at least 16GB RAM
30B needs at least 32GB RAM
65B needs at least 64GB RAM

And they all need some space for the context. GPU offloading puts the layers of the model into the memory of your graphics card. Fitting the whole model into VRAM makes things way faster. 
For reference, at 2048 context in Q4_0*, a 6GB Nvidia RTX 2060 can comfortably offload:
32 layers with LLAMA 7B
18 layers with LLAMA 13B
8 layers with LLAMA 30B

OpenHermes is 35 layers. with a Q_3 you should be able to just fit it all with 2k context in 6gb vram I think. It will be tight, and you'll trade a lot of speed for bigger context by offloadin a few less slices.    
You can load the model in memory, see how much your final model memory cost is in the console, and get a rough estimate of the size of each layer by dividing the size in memory by the number of layer. Remember to leave room for the context, which can get big fast. At 8k context I think use over 5gb of memory with the Q8, just for the context alone.

**Model bit depth is trade between output quality and output speed.  Generally, larger models are smarter and can follow more complex instructions.
KoboldCPP uses GGUF format, which are quantized from 16 bit to between 2 bit and 8 bit depending on model. (I like 8 bit if it fits in vram with room for the context.)
lower bits require less ram, but there is a drop in reasoning and writing quality, though even the q2 was following instructions well. 
I get all mine from huggingface/thebloke, and reccommend Tiefighter for creative writing, ideas, and agi in a 13B, I think it expects alpaca formatting.

|||Tell me about the funciton of the liver and what activities damage it.

|||coder|write fizzbuzz with comments on each line. Explain how fizzbuzz is used to judge candidates in interviews

|||agi| walk me though setting up a react website including components for the navigation header, footer, and a window for the main content. 
        `
        this.write = true;
        this.sendHold = true;
        //this.nicereturn = true;
        this.writeout = identity;
        outp.text = identity;
        //return identity;
        break;
      case "write":
        this.write = true;
        this.sendHold = true;
        
        break;
      case "list"://causing a bug where the next input is ignored. 
        this.write = true;
        this.sendHold = true;
        var list = ""
        for (let key in this.identities) {
          list = list+  this.instructions.invoke+ key + ",write" + this.instructions.endTag + "\n" ;
        }
        outp.text = list;
        break;
      case "rp":
        this.rp = true;
      
        break;
      case "re":
        //console.log("re hit!" + this.recentClip.text);
        this.sendLast = true;
        //return;
        //alternative 
        outp.text = this.recentClip.text;//send lastclip like any other agent prompt.
        break;

      case "on":
        this.on = !this.on;
        break;
      case "tokens":
      case "tok":
        this.write = true
        this.sendHold = true;

        outp.text = this.getTokens(this.currentText);
        console.log(outp.text);
      default:
 
        break;
    }
    return outp.text;
  }
  updatePreviousCopy(copy) {
    this.recentClip.text = copy;
  }
  setupforAi(text) {
    if (this.write) {
      this.write = false;
      return
    }
    const sorted = this.activatePresort(text);
    if (sorted){
      if (sorted.formattedQuery){
        this.currentText = sorted.formattedQuery;
        //console.log("if sorted :" + sorted.formattedQuery);
      }
      //console.log(JSON.stringify("sorted.formattedQuery: " + sorted.formattedQuery));
      this.undress();
      if (sorted.tags.persona) {
        let persona = sorted.tags.persona.split(this.instructions.agentSplit);
        //console.log("persona tags: " + JSON.stringify(persona));
        //console.log("persona count: " + sorted.tags.length);
        let temPersona = [sorted.tags.memories];
        persona.forEach(tag => {
          let commands = tag.split(this.instructions.settinglimit);
          if (commands.length === 2) {
            if (commands[1] == this.instructions.save&& this.sendLast) {//save like |||agent:save|
              this.identities[commands[0]] = this.recentClip;//
              tag = commands[0];          
            }else if (commands[1] == this.instructions.save) {//save like |||agent:save|
              this.identities[commands[0]] = sorted.formattedQuery;//
              tag = commands[0];          
            }else  if(!isNaN(commands[1])){
             this.params[commands[0]]= parseFloat(commands[1]);
             //console.log(commands[0] + commands[1] +" written> " + this.params[commands[0]]);//ill keep this one for now
            }else if (commands[1] == "true"){
              this.params[commands[0]]= true;
            }else if (commands[1] == "false"){
              this.params[commands[0]]= false;
            }
          }else {
            let ident = this.updateIdentity(tag)
            //console.log(ident + " identity pending");
            temPersona.push(ident);    
          }
          //this.funSettings(tag);
        });
        this.identity = temPersona;
        //console.log("identset: " + JSON.stringify(this.identity));
      } else {
        //console.log("No persona tags found.");
      }
      if (sorted.run || this.on) {
        //response.sortedText = sorted.formattedQuery;
        if (this.identity === ([sorted.tags.memories])) {
          this.identity = ([sorted.tags.memories]) + this.identities[this.instructions.defaultPersona];
        }
        //response.memory = this.memory;        
        

        let request =
        this.instructions.system +
        this.instructions.prependPrompt +
        //this.identity +
        JSON.stringify(this.identity) +
        this.instructions.postPrompt +
        this.instructions.memoryStart +
        //this.memory +
        //JSON.stringify(this.memory) +//may be one undefined
        this.instructions.memoryPost+
        sorted.formattedQuery;
        //this.instructions.chatStart+
        //this.instructions.finalprompt goes on as it leaves this function, with lastclip and rp if needed.
        
        if (this.write) {
          let sendtoclipoardtext = this.instructions.writeSave +JSON.stringify(this.identity) + this.instructions.writeSplit + sorted.formattedQuery;//todo send the right thing to the clipboard  
          sendtoclipoardtext = sendtoclipoardtext.replace(/\\n/g, '\n');
          this.notify("Paste Response:", sendtoclipoardtext);
          return this.sendToClipboard(sendtoclipoardtext);
        }
        // if (this.write==true&&this.nicereturn == true){
          //   return this.sendToClipboard("|||name:save|"+JSON.stringify(this.identity) + "\n \n _______\n" + sorted.formattedQuery );//todo send the right thing to the clipboard  
          // }
          if (!this.sendHold) {
            if ( this.openAi){
    

              
              //  http://localhost:1234/v1/chat/completions \
              // "Content-Type: application/json" \
              // { 
              //   "messages": [ 
              //     { "role": "system", "content": this.identity },//stringify the message?
              //     { "role": "user", "content": sorted.formattedQuery }//I should build my memory structure and force chats with openai through that? that would handle the instruction promps for multimodel support. Consider ## for memory clearing rather than extra modes. Currently supports initial needs for assigning an agent to gtp with ##

              //this type of toggling is data dangerous


              //   ], 
              //   "temperature": 0.7, 
              //   "max_tokens": -1,
              //   "stream": false
              // }'

            }
          else  if (this.rp) {
              if (this.sendLast) {
                //this.sendLast = false;
                this.sendToApi(
                  request +
                  //JSON.stringify(this.recentClip.text) +
                  this.instructions.rpPrompt +
                  this.instructions.finalPrompt, this.params
                  );
                  this.rp = false;
                  //this.sendLast = false;
                } else {
                  this.sendToApi(request + this.instructions.finalPrompt, this.params);
                  //this.sendLast = false;
                }
                //return;
              }else if (this.sendLast) {
              //this.sendLast = false;
              //console.log("identity: " + identityPrompt);
              //console.log("recent clip: " + this.recentClip.text);
              this.sendToApi(
                request + 
                //this.recentClip.text +
                this.instructions.finalPrompt, 
                this.params
                );
                //this.sendLast = false;
              } else {
                //console.log("recentClip: "+this.recentClip);
                this.sendToApi(request + this.instructions.finalPrompt, this.params);
              }
            } else{
              this.sendHold = false;
            
            }
          }
    }
        if (this.sendLast = true) {
          //console.log("update recentClip: "+text);
          this.recentClip.text = text;// + "\n" + this.currentText);//todo: determine if this is dumb or not. Consider letting this run evey time and re toggles to allow building a big context to send with a question.
          this.sendlast = false;
          } else {
            //console.log("sendLast set: "+text);
          this.recentClip.text = text;
        }
    }
    recievesummary(summary) {
      this.summary = summary;
      }
    activatePresort(text) {
      let run = false;
      text = text.trim();
      var response = [];
      const parsedData = text.split(this.instructions.invoke);
      let tags = "";
      if (parsedData.length > 3) {
        this.notify("Warning:", "too many "+ this.instructions.invoke + ". max 2.");
        this.sendHold = true;
        this.write = true;
        return{
          run: run,
          formattedQuery: "The user sent too many invoke tokens to the interface, |||query, |||identity|query,  context ||| query, context|||query|||context are the supported modes. ",
          tags: tags
          };
      }
      //console.log("parse delimiter: " + JSON.stringify(parsedData));
      let longtrue = text.length > parsedData[0].length;
      if (longtrue && parsedData.length === 1) {
        tags = this.tagExtractor(parsedData[0]);
        response.push(tags.text);
        response.push("");
        response.push("");

        run = true;
      }
      if (parsedData.length === 2) {
        tags = this.tagExtractor(parsedData[1]);
        response.push(tags.text);
        response.push(parsedData[0]);
        response.push("");
        run = true;
      }
      if (parsedData[0].length === 3) {
        tags = this.tagExtractor(parsedData[1]);
        response.push(tags.text);
        response.push(parsedData[0]);
        response.push(parsedData[2]);
        run = true;
      }
      const sendout = response[0] + "\n" + response[1] + "\n" + response[2];
      return {
        run: run,
        formattedQuery: sendout,
        tags: tags
      };
  } 
  tagExtractor(text) {
    const tags = text.split(this.instructions.endTag);
    var output = {};
    if (tags.length === 1) {
      output = { persona: "", memories: "", text: text};
    } else if (tags.length === 2) {
      output = { persona: tags[0], memories: "", text: tags[tags.length-1]  };
    } else if (tags.length === 3) {
      output = { persona: tags[0], memories: tags[1], text: tags[tags.length-1]  };
    }
    return output;
  }
}

class ChatHistory{
  constructor(agent,agentdetails, getsummary, getTokens, length = 10, longterm = true, superlongterm= true, targetTokens = 2000, getokens, history = [], longHistory =[], sumMessage = `<|im_start|>system
   summarize these messages for system use. After, list the inventory of items tools and technology used by order of importance to the instructions or story so that nothing important is left behind.`) {
    this.agent = agent;
    this.getSummary = getsummary;
    this.history = history;
    this.historyTokens= 0;
    this.lastUser= "";
    this.lastAI =""
    this.length = length;
    this.targetTokens = targetTokens;
    this.longterm = longterm
    this.superlongterm = superlongterm;
    this.superHistory = longHistory
    this.superHistoryTokens = 0
    this.getokens = getokens;
    this.agentTokens = 0;
    this.agentDetails = agentdetails;
    this.getAgentTokens()
    this.sumMessage = sumMessage;
    this.userTokens= 0;
    this.aiTokens = 0;
    this.summaryTokens = 0;
  }
  updateHistory(){
    if(this.longterm){
      if (this.history.length >= this.length){
        let superhistoryuser = this.history.shift();
        let superhistoryAi = this.history.shift();
        this.history.push({user:this.lastUser, t:this.userTokens});
        this.history.push({assistant:this.lastAI, t:this.lastAITokens});
        if (this.superlongterm.length)
        this.getsummary(this.sumMessage + stringify(superhistoryuser)+ JSON.stringify(superhistoryAi), newLongterm())
        return
      }    
      this.history.push({user:this.lastUser, t:this.userTokens});
      this.history.push({assistant:this.lastAI, t:this.lastAITokens});
      
    }
  }
  //todo: bring in user, ai messages and get token lengths, 
  
  returnUserData(text){
    this.lastUser = text;
  }
  returnAIdata(text){
    this.lastAI = text;
  }
  returnUserTokens(tokens){
    this.userTokens = tokens;
  }
  returnAITokens(tokens){
    this.aiTokens = tokens;
  }
  newLongterm(summarized) {
    if (this.superHistoryTokens + summarized.stats.tokens>= this.targetTokens * 0.5){ //todo get the right token length from response
      this.getsummary(this.sumMessage + JSON.stringify(this.superHistory) + JSON.stringify(summarized.text), newSuperLongterm())
      //this.superHistory = []
    }
    else {
      this.superHistory.push(summarized.text);
      this.superHistoryTokens += summarize.stats.tokens;
    }
  }
  newSuperLongterm(summarized) {
    this.superHistory = [];
    this. superHistory.push(summarized.text);
    this.superHistoryTokens = summarize.stats.tokens
  }
  
  returnHistoryTokens(tokencount){
    this.historyTokens = tokencount
  }
  getHistory(){
    return this.history;
  }
  getsummaryTokens(text){
    this.getokens(text, this.returnSummaryTokens)
  }
  returnSummaryTokens(tokenCount){
    this.userTokens = tokenCount;
  }
  setLastUser(lastUser, tokenCount){
    this.userTokens = tokenCount;
    this.lastUser = lastUser;
  }
  setLastAi(lastAi){
    this.getTokens(lastAi, returnAITokens)//this might not be able to live here
    this.lastAI = lastAi
  }
  toggleLongterm(){
      this.longterm = !this.longterm
  }
  getAgentTokens(){
    this.getTokens(this.agentdetails, this.agent, this.returnAgentTokens);
  }
  returnAgentTokens(agenttokenCount){
    this.agentTokens = agenttokenCount;
  }
  
}
module.exports = TextEngine;

