const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function downloadFile(url, destination) {
  const response = await axios({
    method: 'get',
    url: url,
    responseType: 'stream',
  });

  const fileStream = fs.createWriteStream(destination);

  response.data.pipe(fileStream);

  return new Promise((resolve, reject) => {
    fileStream.on('finish', resolve);
    fileStream.on('error', reject);
  });
}

async function checkAndDownloadFile(huggingfaceUrl, destinationPath) {
  try {
    // Check if the file already exists
    await fs.access(destinationPath);
    console.log('File already exists.');
  } catch (error) {
    // File doesn't exist, download it
    console.log('File not found. Downloading...');

    try {
      await downloadFile(huggingfaceUrl, destinationPath);
      console.log('Download complete.');
    } catch (downloadError) {
      console.error('Error downloading the file:', downloadError.message);
    }
  }
}

// Example usage:
const huggingfaceUrl = 'https://huggingface.co/some-model/raw/main/model.zip';
const destinationPath = path.join(__dirname, 'model.zip');

checkAndDownloadFile(huggingfaceUrl, destinationPath);
