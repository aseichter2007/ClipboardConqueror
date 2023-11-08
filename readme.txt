Clipboard Commander - Readme
=============================

Clipboard Commander is a powerful tool that harnesses the capabilities of locally run large language models to process and generate content, right from your clipboard. 
With Clipboard Commander, you can leverage the AI's abilities by invoking it with `|||` and providing commands or requests for information.

Usage:
------

1. Enter `|||` followed by your request or command.
2.Copy the text to your clipboard. For example:
```
   - ||| Say hello
   - |||character|Say hello
   - |||clintEastwood|mem| how many fingers am I holding up?
  Note: Four pipes (||||) are used for memory tags and instructions. *
   - ||||noban| (overrides banned tokens)
   - ||||memory,save| overwrites memory with this text:"overwrites memory with this text:"
   - ||||memory,save,re| overwrites memory with the previous clipboard contents
   - |||coder|re| what is this code doing? - sends the code you copied last, prepended by this query, and invokes the coder assistant to help frame the output format and preconceptions. 
   
      *save is the only command supported like `|||save, agent|memory,memory| {"description":"description"}`  - this does not save memory into the agent persona. It saves a persona called with the iternal(ai can't see tag, sees the entire object you send though.) flag "agent" defined like: {"description":"description"}.  Must use json format. Listen to the audio feedback to indicate success or failure. 
```
3. Optionally, include a memory tag or command tag after the initial `|||`. For example:
```
   - |||coder,mute|re,memone,stevesdayoff
       > This command will insert the coder card, apply the mute card to silence comments and explanations, then append the contents of memone and stevesdayoff. The AI will interpret these tags as instructions to create software, since it's using the coder persona.
```
Note: Remember to use four pipes (`||||`) for memory tags. They help to store data and instructions for later use. Chaining multiple tags is also possible, like `|||noban|memtag|Remember this message`.

Key Features:
--------------
* Locally run large language models for powerful text processing.//todo install tutorial.
* Combines user-supplied text with AI output for precise customization.//done
* Supports multiple languages and contexts for diverse applications.//sure
* Can utilize various personas and roles for different tasks.//done
* Capable of mimicking voices and generating unique content.

Supported Platforms:
--------------------
Clipboard Commander is designed to work seamlessly across multiple platforms including Windows, macOS, and Linux. It has been rigorously tested and optimized to ensure stability and compatibility.

Notice:
--------
Please use Clipboard Commander responsibly and respect copyright laws while generating content. Misuse of this tool might lead to unintended consequences and breaches of privacy or intellectual property rights.

Additional Resources:
You can train Clipboard Commander to better understand your needs by providing examples of usage and instructional feedback. Personalizing your AI experience allows for more accurate results tailored specifically to your requirements. To train the AI, simply enter `|||train` followed by a description of the improvement you desire.

Advanced Example:
```
   - |||newAgent, save| {  
  "yourtag": \"Corporal Clip\",
  description: "A helpful and friendly army man. He takes orders well.",
  ExampleDilogue: ["Hello and welcome to the world of integrated AI!! I'm your host, Cpl Clip, so happy to be here!", "I'd take a bullet for you, if I had a body.]"
}
will add that agent to the memory until next run. You can purchase a licence to the full version here: //todo: build website. 
```"

Bug Reports and Feature Requests:
---------------------------------
If you encounter any issues while using Clipboard Commander or have suggestions for future improvements, please report them via our support forum at [https://support.clipboardcommander.ai](https://support.clipboardcommander.ai). Our dedicated team of developers will work diligently to address and resolve any concerns.

Conclusion:
-----------
Embrace the power of Clipboard Commander and unlock endless possibilities with its advanced natural language processing capabilities. Take advantage of its flexible design and ease of use to improve your productivity, creativity, and communication. Join the ranks of users who have transformed their daily lives with the help of this remarkable AI assistant.
