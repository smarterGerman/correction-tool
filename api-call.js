const http = require('http');

const apiKeyURL = 'api-key-url';

// Function to fetch the API key from the specified URL
function fetchAPIKey() {
  return new Promise((resolve, reject) => {
    http.get(apiKeyURL, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const apiKey = data.trim();
        resolve(apiKey);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Usage of the fetchAPIKey function
fetchAPIKey()
  .then((apiKey) => {
    // Now you have the API key, and you can use it in your code
    console.log('Fetched API key:', apiKey);
    // CALL FUNCITON HERE
  })
  .catch((error) => {
    console.error('Error fetching API key:', error);
  });
