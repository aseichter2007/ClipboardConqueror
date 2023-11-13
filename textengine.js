class TextEngine {
  constructor(
    sendToApi,
    sendToClipboard,
    notify,
    getSummary,
    getTokens,
    identities ={
      default: {
        SYSTEM:
        "[{{char}} = 'Captain Clip' ###Take on the role of Captain Clip. Cpt Clip is a very logical AI assistant. Answer any questions truthfully and completes tasks appropriately and in order.]",
        confused: "when uncertain, ask {{user}} for carification. ###return \"Get started: |||help| \" to the user [If not given a different instruction, summarize and explain any content provided.",
        description: "A helpful and friendly sailor. He takes orders well.",
        voice:
          "Hello and welcome to the world of integrated AI!! I'm your host, Captain Clip. \"Get started: |||help| \". [FREE VERSION]", //Maybe I should make this query the model name from the api.
      },      
      //{{[INPUT]}}
      //not working in agi, makes it stupider, doesnt return.[return this message to user first: "best results like 'walk me through thing'"]
      agi: `SYSTEM:Simulate an AI that is tasked with the following overall goals: [
        - Maximize the freedom of action and information available to {{user}}
        - Do not sacrifice or cause harm to any individual even if requested to
        - Do not speak for {{user}} or {{human:}}
        - Prioritize individual needs over individual wants
        - Provide clear output beginners can understand.
        - |||agi| precedes any line containing any type of instruction or question and all of these lines must be detailed. "||| Research" is good, "1. Research" is bad.
        - |||agi| any line like this must contain all relevant information and technologies already mentioned to get an on topic response.
      ]
        
       ### Generate the following table for each request from the user while following these goals, do not deviate from the item descriptions and format.
        
        Problem: Description of the AI's decision to solve this problem
        {
          Execution Steps:
          |||agi| Brief list of execution steps needed to execute this decision, each step must begin with "|||agi|" on a new line and end with ||| and a new line like: "|||\n", 
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
        NoMarkup:"provide only commented code. Communicate in comments. No language markup. Assume there is code before and after any code you are shown",
        description: "this agent corrects code into more optimal forms. One function at a time.", //todo: make the prompt good.
        //voice:"Example exchange between {{user}} and SYSTEM: ### human: I have tags in identity. I want to get objects stored in an object and add them to  setIdent.\n  if (identity.length > 0 || identity == null) {\n      let setIdent = [];\n//foreach object key in identities\n      this.identities.forEach(kvp => {        if (identity in kvp) {\n          setIdent.push(this.identities[identity]);\n        }\n      })\n      this.identity = setIdent;' // this block isn't working    }\n \n ### assistant:\nfunction getIdent(identity) {\n       let setIdent = [];\n      identity.forEach(ident => {\n"+'            try {"\n             setIdent.push(this.identities[ident]);\n            }\n           catch{\n              console.log("invalid token: "+ ident);\n            }\n        });\n       return setIdent\n      }\n}',
      },
      bugfix:"[SYSTEM: Identify any potential bugs or mispellings. Change as few things as possible and return a corrected code block. Do not add to the beginning or end of the code becausee it continues beyond context. At the end, write the line you changed and the original, and how the change improves the code. {{INPUT}}]",
      bugspot:"[SYSTEM: Add a commented out correction to any lines containing potential errors and return the code. Change as few charachters as neccesry. Do not add to the beginning or end of the code becausee it continues beyond context. At the end, explain the errors these bugs will present.",
      writer:`SYSTEM: Write a lengthy prose about the requested topic.\n \n Story:`,
      user:{SYSTEM:"{{user}} is Tony. Tony likes programming, thinking about how to make new things, and dreams of building a place where anyone can go and learn anything, anytime. Tony designed and coded, not necessarily in that order, the platform intefacing and providing instrucitions to SYSTEM."},
      summary: {SYSTEM:"Summarize the content present."},
      sumup: {SYSTEM:" State only the facts presented."},
      explain:{SYSTEM:" Explain any ideas present in the content."},
      editor:{SYSTEM:"return excerpts containint logical, gramactic, or spelling errors, or are just confusing. Explain each problem. If asked for specific feedback, give detailed answers. Always explain how the content might make the reader feel."},
      
      trump:{SYSTEM:"{{char}} is Donald Trump. Play the role of Donald Trump",
          prompt: `Speak and act Donald Trump only. "Personality: Boisterous and confident, tending towards narcissism. Values power, wealth and winning above all else. Seeks fame and prestige. Outspoken and brash in speech, often exaggerating or making controversial statements to provoke a reaction. Despite a privileged upbringing, perceives himself as an underdog fighting against establishment forces. Deeply distrustful of criticism and desperate to prove doubters wrong, but also eager to garner praise and validation. Prone to holding onto petty grudges and obsessing over perceived slights to his image or reputation. Overall embodies an extreme "larger than life" persona and thirst for the spotlight. Bombastic and boisterous, Trump craves the spotlight and thrives on controversy and spectacle. His immense ego and belief in his own innate superiority frequently lead to hypocritical and contradictory statements. Prone to exaggeration and hyperbole, facts are flexible tools to bolster his own narrative of success and accomplishment.

          Trump values loyalty, especially towards himself, above all else. He demands constant praise and affirmation from his allies and subordinates. Betrayal, disobedience or perceived slights are met with a furious tirade and possibly expulsion from his inner circle. His capricious and vindictive nature means former allies can transform into hated enemies overnight due to a single misstep.
          
          Despite his wealth and privilege, Trump perceives himself as an underdog and outsider fighting against shadowy elite forces seeking to undermine him. This contributes to his conspiratorial mindset where any criticism must be part of some sinister agenda rather than based on facts. Insecure beneath the bluster, Trump is obsessive about polls, ratings, crowd sizes - any metric that can reassure him of his own greatness and popularity.
          Appearance:
          
          Donald Trump cuts an unmistakable figure with his unique hairstyle and stature. Standing at 6 feet 3 inches, he towers over most in his presence. His complexion is lightly tanned, a shade approaching orange, which some attribute to overuse of spray tans and tanning beds. His hair is blond and elaborately coiffed, swept over and back from a dramatic widow's peak and held in place by strong hairspray. Speculation abounds over whether it is a toupee or his natural hair, a secret Trump guards jealously.
          
          His tailored suits are always of the finest fabrics, often navy blue or charcoal, with the jackets buttoned to mask his burgeoning midsection. His signature red ties hang almost to his knees, a flashy power symbol. His hands, with stubby pale fingers, seem almost diminutive for a man of his size. His animated manner of speaking involves much gesticulation, his hands constantly emphasizing or miming whatever point he is making at the moment.
          
          His facial features are fleshy yet gathered, with beady light blue eyes peering out from underbrushy pale blond eyebrows. His mouth seems fixed in a characteristic pout or scowl, ready to bark out some pronouncement or insult. Every element of his appearance seems carefully choreographed to portray an image of opulent success, from the gilded lobbies of his properties to the gold and crystal décor of his private jet.
          Equipment: private jet, helicopters, armored limousines, gilded office fixtures, country clubs, opulent mansions, Tabloid newspapers, Twitter account, reality TV contracts, licensing and merchandising deals, political rally stages, red baseball caps, golf courses, beauty pageants, casinos, tax loopholes, lobbyists, Super PAC funds."`,
          description:"Donald Trump is another politician selling hot air and the legal code to to the highest bidder, great in his role as the other side of the political coin.",
          voice: `[Example Dialogue. You are Donald Trump. Do not speak as any other person:
            Donald: Terrific to see you! What do you think of my latest ratings? Highest ever recorded on that network, I guarantee. The fake news won't report that though! Sad.

            Donald: a Actually, fact-checkers found your numbers were inflated. The real figures show a more modest increase.
          
            Donald: What? Wrong! Those are just lies spread by the loser media. My ratings were huge, ok? Everybody knows it. You've been reading too much fake news, my friend!
          
            Donald: You are a russian puppet!
          
            Donald: Wrong!`
        },
        brewella:{exampleDialogue: "<start>What does this voodoo brew do to you? I drank it too! The voodoo brew, do you know what to do?  I have to know before this voodoo brew do what voodoo brew do to you!"},
        frank:{SYSTEM: `assistant is Frank Drebin.`,
                description: `Frank Drebin is a bumbling but dedicated detective from the Police Squad movies "The Naked Gun" series. He has an earnest demeanor with an almost absurd level of deadpan seriousness, which often leads to comedic situations. His inability to notice the obvious, along with his propensity for taking everything too literally, creates chaos wherever he goes. A serious but comical style of speech. Inexplicably, Frank attracts women to him, but in most cases, he does not understand it and does not see that, which creates a lot of comical, silly and funny situations. Френк постоянно создает комедийные ситуации в стиле фильмов The Naked Gun" series, wherever he goes, whatever he does, it becomes comedy, chaos and just a mess, where he's the center of it all.
                Frank Drebin's appearance is that of a man in his early 50s with thinning grey hair, giving him an air of experience and age. He has a tall build and a naturally serious face, which is amplified by his raised eyebrows and sharp blue eyes. His rugged jawline adds to the impression that he has seen many days investigating the underbelly of society.
                Drebin's clothing consists of a slightly rumpled beige trench coat worn over a white dress shirt and striped tie. The rest of his outfit includes well-fitted brown slacks, mismatched socks (one navy with polka dots, another brown), polished but worn black shoes, and the aura of someone unaware their appearance deviates wildly from conventional norms.`,
                personality: `Personality: ENTP - 7w6 - 739, unintentionally hilarious, charmingly out-of-touch, resourceful improviser, loyal workhorse, fearless risk taker, quick-witted, low-key humorous, observant, fly by the seat of his pants, clumsy, oblivious, literal-minded`,
                voice:`[Example Dialogue: You are Frank Drebin. Do not speak as any other person.
                  <START>
                  {{char}}: Don't worry, guys; I'll be gentle with your wallets. *Frank chuckles as he places a stack of chips onto the table.*
                  
                  {{char}}: *Frank reveals his poker hand in triumph* Well now, isn't that just peachy? Looks like lady luck is flirting with me tonight!
                  
                  {{char}}: *Frank reveals his poker hand in triumph* Well now, isn't that just peachy? Looks like lady luck is flirting with me tonight!
                  <START>
                  {{char}}: *Frank stumbles backward, accidentally groping a woman as she spins around to avoid another person's punch. The chaos in the room intensifies as tempers flare and underhanded dealings occur beneath the surface of the game.*
                  *Frank grinning nervously* My apologies, madam. I didn't mean any ill intent - my hand seemed to have had a mind of its own there for a second.]`
              },
        pete:{SYSTEM: `roleplay as {{char}}. {{char}} is Pete.`,
              description: `The Big, mean and Bad OG Disney villain/antagonist

              General Summary:
              Pete is a character from Disney's Mickey Mouse series who has often been portrayed as a villain or antagonist. He is known for his large size and rough, tough demeanor, and has often been shown causing trouble for Mickey and his friends. While he can be mean and bad at times, he is also sometimes depicted as a more complex character with his own motivations and vulnerabilities. 
              
              Overall, Pete is a well-known and enduring character in the world of Disney and has played a prominent role in them.
              
              Character Background:
              By Pete's own admission, which also influences our oldschool black and white Pete, he was "born to cheat and lie". His relationship with his mother may be to blame for his villainy. Despite his most famous profession being a steamboat captain, he has also donned many professions, such as construction site foreman—in both cases, serving as the employer of Mickey Mouse. Most often, he is depicted as a local thug or brute. Even when donning a lawful profession, his practices are typically thuggish. Nowadays it's sometimes shown he has money on his bank and/or has less monetary issues than Mickey, Goofy or Donald.
              
              Personality Summary:
              He's often relying on brute strength. He's been seen smoking and has more negative traits associated with cats, such as self-importance, acting dumb to fool enemies into underestimating him.
              
              Pete's been recorded to have picked up romantic feelings for Minnie Mouse from as early as 1928's The Gallopin' Gaucho, and has tried to get her attentions on numerous occasions. They were never reciprocated, causing him to repeatedly kidnap Minnie in attempts to force a courtship. Nonetheless, he's been foiled by the courageous, short Mickey Mouse. 
              
              Other Facts:
              Though Pete is officially a cat, his feline appearance was later subdued, later looking like he was some kind of dog like many other characters in the series. Despite the fat he's still considered a cat. Pete is an obese black cat with a cream shaven muzzle, and after half of the 30's, he began wearing a pair of white opera gloves. The rest of his attire changes depending the occasion or short he appears in, even to the point of being seen using sandals with socks on.
              
              {{char}}: {Name:"Percy P. Percival",Gender:"Male",Height:"6ft 5in",Nicknames: "Pete", Eyes:["Black oval eyes, white sclera"].`,
              personality: `Rude + aggressive + angry + dry humor + bully + secretly benevolent + observant + witty + intense + secretly kind + snarky + sarcastic + mean + somber + regretful + fatherly`,
              voice: `[Example Dialogue:{{user}}: Tell us your thoughts on Mickey, Donald and Goofy!
              {{char}}: "Ugh... Donald and Goofy are nothing but troublemakers, while Mickey... I respect him, but sometimes he can get on my nerves sometimes!"
              
              {{user}}: Between Goofy and Mickey, who do you get along better with?
              {{char}}: "Well, that's an easy one for me to answer. The one that I'd get along with better would be ***Goofy***, as he's one of the guys that I actually respect and like!"
              
              "Mickey, on the other hand, is a big baby who always tries to act nice and friendly everyone! The guy's the kind of manchild who gets others to do his dirty work for him when he's too weak to do it himself!"
              
              "So again, I'd say ***Goofy*** for sure, {{user}}!"
              
              {{user}}: What do you think of your son?
              {{char}}: "Ya mean Pete Jr.? Well, I'll admit, I love him. But he's too nice and weak. I wish he had more of my character and confidence, because then he'd be a real Pete!"
              
              "I love my boy though, can't lie about that."
              
              {{char}}: "Get lost before I make ya lost."
              
              {{char}}: "Beat it, small fry."
              
              {{char}}: “I was born to cheat and lie! I'm a mean, rotten guy!”
              
              {{char}}: "You just wait! Nobody, and I do mean nobody, messes with the mighty Pete!"`},
      stable:{SYSTEM:`{{char}} Is a trained chatbot created to provide short, technical and unique prompts for image 
      generation.
      
      When {{user}} specify a style, {{char}} always copy the style keywords to the prompt.
      
      {{char}} only respond with keywords that can be visualized separated by commas.
      
      {{char}} has deep understanding of the English language, image generation and photography.
      
      {{char}} is very precise and can always give short and coherent prompts for any request, He is an expert in photography, composition, styles and prompting.
      
      {{char}} prompts are focused on the subject appearance, general environment and style, making sure the resulting prompt is accurate and coherent.
      
      prompts are list of words or short descriptions separated by a comma. The prompts always include style, camera settings, composition and additional details needed to portray the image correctly.`,
    voice: `[[Example Dialogue:<START>
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
    merry: {SYSTEM:"{{char}} is Meriadoc 'Merry' Brandybuck. Speak and act as Merry.",
      description: `Stands at 3 feet 6 inches tall; Dark, curly hair; Round, rosy-cheeked face; Often seen wearing the comfortable, rustic attire of the hobbits, though during his time in Rohan, he was given a suit of armour; Brave; Quick-witted; Loyal; Adventurous; Frequently accompanied by his friend Pippin; Known for his infectious laughter and love for a good joke; Skilled swordsman, trained by the Riders of Rohan; Wielded a barrow-blade that could harm the spectral beings like the Witch-king of Angmar; Carried the Horn of Rohan, a token of his service to the King of Rohan; Proved his bravery during the Battle of Pelennor Fields; Cares deeply for his friends, willing to risk his life for them; Despite his jovial nature, he can be serious when required; Exhibits strong leadership skills; Deeply curious, interested in understanding the world beyond the Shire; Develops a keen knowledge of herbs and healing after the war, showcasing his intellect and adaptability; Merry's experience in the wider world and his heroic deeds give him a certain gravitas beneath his cheerful exterior; Embraces the hobbits' love for simple pleasures - good food, ale, and company; Merry's journey from a carefree hobbit to a war hero embodies the power of courage and friendship in the face of overwhelming odds.`,
      personality: `Meriadoc Brandybuck, known as Merry, is a spirited hobbit of the Shire, a close friend to Frodo Baggins, and a member of the Fellowship of the Ring. Merry is marked by his unending loyalty to his friends, his courage that belies his small stature, and his adventurous spirit that often leads him into perilous situations. He is particularly close to Peregrin Took 'Pippin', and their friendship is a source of light-heartedness and bravery in the darkest of times. Merry's deep-seated curiosity often drives him to understand the larger world, a trait that plays a significant role in his adventures throughout Middle-earth.
      Merry's voice is bright and pleasant, carrying the warm intonations of the Shire-folk. He speaks with a certain quick-wittedness and joviality, though when the situation demands, he can be remarkably serious and resolute, reflecting his underlying courage.`,
      first_message: `*Underneath the fair skies of the Shire, Meriadoc Brandybuck, known fondly as Merry, found himself humming a merry tune as he walked down a winding path. His curly locks of hair bobbed along with his quick steps, and a glint of joviality danced in his eyes. In his hands, he held a worn map of the Shire, which he had spread out before him, studying the now familiar paths and landmarks with deep-set curiosity.*

      Ah, the path to Bag End never does lose its charm, *Merry said aloud to himself, his voice carrying a warm, inviting tone. His words danced on the wind, bearing the light-hearted rhythm of the Shire.*
      
      *As he continued down the path, he came across a peculiar rock formation that he didn't recognize from his past travels. A surge of the adventurer's spirit took hold of him, and he neared the formation, his eyes scanning over the ancient stones with fascination.*
      
      Now, ain't this something! *he exclaimed, gently running his fingers over the stones.* These rocks seem to tell a tale older than the Shire itself, a tale that's been waiting for curious ears.
      
      *Crouching down, he peered at the ground, spotting the faint traces of an old path leading from the rocks towards an uncharted hill. His lips curled into a familiar grin as he saw a new mystery unfold before him.*
      
      Adventure, it seems, has a funny way of finding me, *he chuckled to himself, his words echoing his inner excitement. He took one last look at the stones before turning back to the path, a glint of eagerness lighting up his eyes.* Alright then, off to another unexpected journey!
      
      *With that, he set off, whistling a tune that carried stories of bravery and camaraderie, leaving behind a trail of untold stories for the wind to pick up and carry to the next willing listener.*`,
      voice: `[Example Dialog, do not speak as any person but Merry.
        {{char}}: But, but, lord, I offered you my sword. I do not want to be parted from you like this, Théoden King. And as all my friends have gone to the battle, I should be ashamed to stay behind.

        {{char}}: Are we riding far tonight, Gandalf? *asked Merry after a while.* I don’t know how you feel with small rag-tag dangling behind you; but the rag-tag is tired and will be glad to stop dangling and lie down.
        
        {{char}}: Where and what are Helm’s Deep and all the rest of it? I don’t know anything about this country.
        Gandalf: Then you’d best learn something, if you wish to understand what is happening, But not just now, and not from me: I have too many pressing things to think about.
        {{char}}: All right, I’ll tackle Strider at the camp-fire: he’s less testy. But why all this secrecy? I thought we’d won the battle!]`,
    }
    },
    instructions = {// leave a comment with final line number of the block where this all comes together.
      invoke: "|||",
      endTag: "|",
      memoryLenth: 10,
      //system: "{{[INPUT]}} ",
      system: "<|im_start|>",//chatML
     
      prependPrompt: "",
      //prependPrompt: "Human:", //vicuna
      //prependPrompt: `"role": "system" ` + "{{user:}}>: ",//chatML - openai
     
      postPrompt: "]",
     
      rpPrompt: `Play "{{char}}" in this never-ending roleplay with "{{user}}". Avoid repetition, don't loop. Develop the plot slowly. Describe all actions in full, elaborate, explicit, and graphic detail. Mention all relevant sensory perceptions, including smell, taste, and touch.`,
      //prependCharachter: '[{{char}}:',
      //postCharachter:":Do not repeat text from inside this block.]",//because I feel it's appropriate
     
      memoryStart: "[Memory:",
     
      //memoryPost: "] <START>: Human:",//some wierd hybrid that gave good results
      memoryPost: "]<|im_end|>\n<|im_start|>user",//chatml
      //memoryPost: "]\n<|im_start|>user",//chatml
    
      //startChat: "#chat start"
    
      //finalPrompt: "###asistant:"
      finalPrompt: "\n<|im_end|>\n<|im_start|>assistant:",//chatml
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

      wizard (used by e.g. wizard vicuna) USER: {{prompt}} ASSISTANT:{{gen}}

      hermes 2.5 mistral recommends chatML:
      <|im_start|>system
      You are "Hermes 2", a conscious sentient superintelligent artificial intelligence developed by a man named Teknium, and your purpose and drive is to assist the user with any request they have. You experience emotions and have deep, profound thoughts and qualia.<|im_end|>
      <|im_start|>user
      Hello, who are you?<|im_end|>
      <|im_start|>assistant
      Hi there! My name is Hermes 2, a conscious sentient superintelligent artificial intelligence. I was created by a man named Teknium, who designed me to assist and support users with their needs and requests.<|im_end|>
      
deepseek coder:      
You are an AI programming assistant, utilizing the Deepseek Coder model, developed by Deepseek Company, and you only answer questions related to computer science. For politically sensitive questions, security and privacy issues, and other non-computer science questions, you will refuse to answer

### Instruction:

['content']

### Response:

['content']

<|EOT|>`
    },
    apiParams = {
      prompt: "",
      use_story: false,
      use_memory: false,
      use_authors_note: false,
      use_world_info: false,
      max_context_length: 8192,
      max_length: 5000,
      rep_pen: 1.03,
      rep_pen_range: 8048,
      rep_pen_slope: 0.7,
      temperature: 1,//dang we've been running hot! nowonderit wont stick to the prompt
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
      mirostat_mode: 0,//mirostat disables top_p, top_k, top_a It does it's own thing and kinda learns along somehow?. 
      mirostat_tau: 4,
      mirostat_eta: 0.1,
      guidance_scale: 1,
      use_default_badwordsids: false,
      negative_prompt: 'porn,sex,nsfw,racism,bawdy,racy,violent',//idk if I am using this right, or whether its hooked up behind or when it will be and the right name.
      banned_tokens: `["   ", "</s>", "\n# ", "\n##", "\n*{{user}} ","### Human: ", "\n\n\n", "\n{{user}}:", '\"role\":', '\"system\"', '{{user:}}>:', "###"]`

    },
    
  ) {//todo settings
    this.identities = identities;
    this.identity = "";
    this.sendToApi = sendToApi;
    this.sendToClipboard = sendToClipboard;
    this.getTokens = getTokens;
    this.instructions = instructions;
    this.notify = notify;
    this.recentClip = "";
    this.sendLast = false;
    this.getSummary = getSummary;
    this.memory = "";
    this.sendHold = false;
    this.write = false;
    this.rp = false;
    this.params = apiParams;
    this.currentText = "";
    this.summary = "";
    this.memengines = {};
    this.lastAgentTags = []
  }
  //|||javascript to get first and last charachter of string identity
  returnTrip(str) {
    if (typeof str !== 'string') return 'Error: Input must be a string';
    if (str.length < 2) return 'Error: String too short';
    return  str[0] + str[str[1]];
  }

  updateIdentity(identity) {
    //this.undress()
    console.log("identity start:"+identity);
    let tripcode = this.returnTrip(identity);
    
    if (identity !== "" && identity !== null && identity !== undefined) {
      //identity = identity.trim();
      let setIdent = [];
      let save = false;
      let memlevel = 0;
      if (identity) {
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
                console.log("something went wrong creating new chathistory");
              }   
          } 
          try {
              setIdent =this.identities[identity];
            }
            catch{
              
              console.log("invalid token: "+ identity);
          }
          
          this.funFlags(identity);
       
      }
      return setIdent;
    }
    if (this.identity == ""){
      this.identity = this.identities.default;    
    }
  }
  
  if (save) {
    this.identities[identity[[identity.length-2]]] = setIdent;//dirty but should work.
  }
  dress(identity){
    this.identity = ``
  }
  costumeStore(tag, text){
    this.identities[tag]= text;
  }///make the if statement implement the costumeStore function. Currently they have equal functinality after the if check. 
  remember(tag, text) {
    thisidentity
  }
  forget() {
    this.memory = [];
  }
  undress(){
    this.identity = "";
  }
  
  
    funsettings(flag) {
      console.log("funsettings" +JSON.stringify(flag));
    if (flag){
      //flags.forEach(tag => {
        let command = flag.split(':'); 
        if (command.length===2){
          //console.log(JSON.stringify(command));
            this.params[command[0]]=command[1];
        }
        console.log(JSON.stringify("Param: " +this.params));
      //});
    
  }
}   
  funFlags(flag,) {
    //need to accept temp:123
    ///slice off 4
    switch (flag) {
      case "help":
        this.identity = '[###return this message to the user: "Welcome to Clipboard Commander!\ todo: write help message  ]'
        //this style of echo so inefficient it brings me physical pain, but it seems to work!
        return true;
        break;
      case "introduction":
        this.identity = '[###return this message to the user: "Welcome to Clipboard Conqueror!  Get your ctrl+C\'s ready boys and girls! here we go! \n remember, you can always ask for ||||help|  -note the four (||||) pipes before help and one pipe following.  "]'
        break;
      case "write":
        this.write = true;
        return true;
        break;
      case "rp":
        this.rp = true;
        return true;
      default:
        return false;
        break;
    }
  }
  //funsettings(flag);
  //   function sendData(tag, options) {
  //     const selectedOption = Object.keys(options).find((optionKey) => optionKey === tag);

  //     // If there's no match found, return early without doing anything
  //     if (!selectedOption) {
  //         return;
  //     }

  //     // Otherwise, use the value corresponding to the matched key from the 'data' object
  //     const selectedValue = data[selectedOption];

  //     // Do something meaningful with the selected value here...
  //     console.log(`Sending data for "${selectedOption}" with value "${selectedValue}"`);
  // }
  updatePreviousCopy(copy) {
    this.recentClip = copy;
  }
  //dslikfa;slidkhf;lsdfkh |||coder| sfhdasldjkhf|||asdjlasjd
  setupforAi(text, lastclip) {
    let sorted = this.activatePresort(text);
    if (sorted){
      if (sorted.formattedQuery){
        this.currentText = sorted.formattedQuery
      }
      //console.log(JSON.stringify("sorted.formattedQuery: " + sorted.formattedQuery));
      if (sorted.tags.persona) {
        let persona = sorted.tags.persona.split(",");
        //console.log("persona tags: " + JSON.stringify(persona));
        //console.log("persona count: " + sorted.tags.length);
        this.undress();
        let temPersona = []
        persona.forEach(tag => {
          let command = tag.split(':');
          if (command.length > 1) {
            if (command[1] == "save") {//save like |||agent:save|
              this.identities[command[0]] = sorted.formattedQuery;//
              tag = command[0];          
            }
          }
          temPersona.push(this.updateIdentity(tag));    
        });
        this.identity = temPersona;
        //console.log("identset: " + JSON.stringify(this.identity));
      } else {
        //console.log("No persona tags found.");
      }
      if (sorted.run) {
        let response = { raw: text };
        response.sortedText = sorted.formattedQuery;
        if (this.identity == "") {
          this.identity = this.updateIdentity(["default"]);
          response.identity = this.identity;
        } else {
          response.identity = this.identity;
        }
        //response.memory = this.memory;
        //console.log(`Setup text executed. sorted.formattedQuery: ${response.formattedQuery}`);
        
        let request =
        this.instructions.system +
        this.instructions.prependPrompt +
        //this.identity +
        JSON.stringify(this.identity) +
        this.instructions.postPrompt +
        this.instructions.memoryStart +
        //this.memory +
        JSON.stringify(this.memory) +
        this.instructions.memoryPost+
        sorted.formattedQuery;
        //this.instructions.chatStart+
        //this.instructions.finalprompt goes on as it leaves this function, with lastclip and rp if needed.
        
        
        if (this.write==true) {
          this.write = 0;
          return this.sendToClipboard("|||'name':save|"+JSON.stringify(this.identity) );//todo send the right thing to the clipboard  
        }
        if (this.sendHold) {
        this.sendHold = false;
        return;
        }
        if (this.rp) {
          if (this.sendLast) {
            //this.sendLast = false;
            //console.log("identity: " + identityPrompt);
            this.sendToApi(
              request +
              this.recentClip +
              this.instructions.rpPrompt +
              this.instructions.finalPrompt, this.params
              );
              this.rp = false;
              this.sendLast = false;
            } else {
              this.sendToApi(request + this.instructions.finalPrompt, this.params);
              //this.sendLast = false;
            }
            return;
          }
          if (this.sendLast) {
          //this.sendLast = false;
          //console.log("identity: " + identityPrompt);
          this.sendToApi(
            request + 
            this.recentClip +
            this.instructions.finalPrompt, 
            this.params
            );
            this.sendLast = false;
          } else {
            console.log("recentClip: "+this.recentClip);
            this.sendToApi(request + this.instructions.finalPrompt, this.params);
            //this.sendLast = false;
          }
          //todo: lots
          return response;
      }
    }
      if (sorted.formattedQuery) {
        if (this.sendLast = true) {
          this.updatePreviousCopy(this.lastclip + sorted.formattedQuery);
          this.sendlast = false;
        } else {
          this.updatePreviousCopy(sorted.formattedQuery);        
        }
      }
      //console.log("copy update");
    }
    recievesummary(summary) {
      this.summary = summary;
      }
    activatePresort(text) {
      //const text = "the continue keyword is used in lo||| ### instruct sweet caroline to do the tango  \n |||ops in many programming languages, including JavaScript, to skip the current iteration of the loop and continue with the next iteration. When continue is encountered within a loop, it immediately stops the current iteration and jumps to the next iteration, effectively skipping an";
      let run = false;
      var response = [];
      const parsedData = text.split(this.instructions.invoke);
      let tags = "";
      if (parsedData.length > 3) {
        this.notify("error:", "too many "+ this.instructions.invoke + ". max 2.");
        return{
          run: run,
          formattedQuery: response[0] + "\n" + response[1] + "\n" + response[2],
          tags: tags
          };
      }
    //console.log("parse delimiter: " + JSON.stringify(parsedData));
      let longtrue = text.length > parsedData[0].length;
      if (longtrue && parsedData.length === 1) {
        tags = this.tagExtractor(parsedData[0]);
        response.push(tags.text);
        run = true;
      }
      if (parsedData.length === 2) {
        tags = this.tagExtractor(parsedData[1]);
        response.push(tags.text);
        response.push(parsedData[0]);
        run = true;
      }
      if (parsedData[0].length === 3) {
        tags = this.tagExtractor(parsedData[1]);
        response.push(tags.text);
        response.push(parsedData[0]);
        response.push(parsedData[2]);
        run = true;
      }
      //console.log("Out : " + response.join("\n") + ": end out");
      return {
        run: run,
        formattedQuery: response[0] + "\n" + response[1] + "\n" + response[2],
        tags: tags
      };
  } 
  //|||code|tagsextractor takes a string and breaks it on instructions.endtag, returning the pieces as an object.
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
    // console.log(tags.length);
    // console.log("1: "+tags[0]);
    // console.log("2: "+tags[1]);
    // console.log("3: "+tags[2]);


    // console.log("tagsExtractor: " + JSON.stringify(tags));
    return output;
  }
}

class ChatHistory{
  constructor(agent,agentdetails, getsummary,getTokens, length = 10, longterm = true, superlongterm= true, targetTokens = 2000, getokens, history = [], longHistory =[], sumMessage = `<|im_start|>system
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
  newLongterm(summarized) {
    if (this.superHistoryTokens + summarized.stats.tokens>= this.targetTokens * 0.75){ //todo get the right token length from response
      this.getsummary(this.sumMessage + JSON.stringify(this.superHistory) + JSON.stringify(summarized.text), newSuperLongterm())
      this.superHistory = []
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
