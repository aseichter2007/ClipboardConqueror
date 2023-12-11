//todo implement openai endpoint access
class OpenAIAPIHandler {
    constructor(apiKey, apiUrl = 'https://api.openai.com/v1/') {
      this.apiKey = apiKey;
      this.apiUrl = apiUrl;
    }
  
    setApiUrl(url) {
      this.apiUrl = url;
    }
  
    async makeRequest(endpoint, method = 'GET', data = {}) {
      const url = `${this.apiUrl}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      };
  
      const options = {
        method,
        headers,
      };
  
      if (method !== 'GET') {
        options.body = JSON.stringify(data);
      }
  
      const response = await fetch(url, options);
      const jsonResponse = await response.json();
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}: ${jsonResponse.error.message}`);
      }
  
      return jsonResponse;
    }
  
    // Example method for interacting with OpenAI's completions endpoint
    async generateCompletion(prompt, model = 'text-davinci-003') {
      const endpoint = 'completions';
      const data = {
        model,
        prompt,
      };
  
      return this.makeRequest(endpoint, 'POST', data);
    }
  }
  
  // Example usage
  const apiKey = 'YOUR_OPENAI_API_KEY';
  const openaiHandler = new OpenAIAPIHandler(apiKey);
  
  // You can set a custom API URL if needed
  // openaiHandler.setApiUrl('https://custom.api.url/');
  
  // Example usage of the completion generation method
  const prompt = 'Translate the following English text to French: ';
  openaiHandler.generateCompletion(prompt)
    .then(response => {
      console.log('Generated completion:', response.choices[0].text);
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  


    
async function generateCompletion(apiKey, prompt, callback, model = 'text-davinci-003', apiUrl = this.openAiUrl) {
  try {
    const url = apiUrl;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
    const data = {
      model,
      prompt,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    const jsonResponse = await response.json();
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}: ${jsonResponse.error.message}`);
    }
    callback(null, jsonResponse);
  } catch (error) {
    callback(error);
  }
}

//This new function takes four parameters: `apiKey`, `apiUrl`, `prompt`, `model`, and `callback`. The `apiKey` parameter is used to authorize the request, `apiUrl` is the base URL for the OpenAI API (defaulted to 'https://api.openai.com/v1/'), `prompt` is the input text for which we want to generate a completion, and `model` is the OpenAI model to use (defaulted to 'text-davinci-003'). The `callback` parameter is a function that will be called with an error and the generated completion response when the request is complete. If there's an error, the error will be passed as the first argument; otherwise, the response will be passed as the first argument.

const MyApiKey = 'YOUR_OPENAI_API_KEY';
const apiUrl = 'https://custom.api.url/'; // Set a custom API URL if needed
generateCompletion(MyApiKey, apiUrl, 'Translate the following English text to French: ', 'text-davinci-003', (error, response) => {
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Generated completion:'+ response.choices[0].text
  );
  }
});