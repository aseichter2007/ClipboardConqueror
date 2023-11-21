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
  