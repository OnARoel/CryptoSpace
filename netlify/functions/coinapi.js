// netlify/functions/coinapi.js
import fetch from 'node-fetch';

export async function handler(event) {
  try {
    // Get the endpoint and parameters from the request
    const { endpoint, params } = JSON.parse(event.body);
    
    // Construct the CoinGecko API URL
    const baseUrl = 'https://api.coingecko.com/api/v3';
    const url = `${baseUrl}${endpoint}${params ? `?${params}` : ''}`;
    
    // Make the request to CoinGecko
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
      },
    });
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}