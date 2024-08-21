// utils/vinDecoder.js
const axios = require('axios');

const arr = [];
let count = 0;
const currentTime = new Date().getTime();

if(count < 5) {  
  arr.push(currentTime);
  const decodeVin = async (vin) => {
    try {
      const response = await axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`);
      const results = response.data.Results;

      // Extract (manufacturer, model, year) data from the response
      const manufacturer = results.find(item => item.Variable === 'Make')?.Value;
      const model = results.find(item => item.Variable === 'Model')?.Value;
      const year = results.find(item => item.Variable === 'Model Year')?.Value;

      // Check if the required data is available
      if (!manufacturer || !model || !year) {
        throw new Error('Vehicle details not available');
      }

      return { manufacturer, model, year };
    } 
    catch (error) {
      throw new Error('Failed to decode VIN');
    }
  };

  module.exports = decodeVin;
} 
else if (((currentTime - firstRequestTime) / 1000 / 60) > 1 ){
  arr.shift();
  arr.unshift(currentTime);
}
else {
  console.log("too many requests!!");
}

