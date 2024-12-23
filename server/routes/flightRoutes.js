const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();

const FLIGHT_API_KEY = process.env.FLIGHT_API_KEY;
const FLIGHT_API_SECRET = process.env.FLIGHT_API_SECRET;

let accessToken = null;
let tokenExpiry = null; 

// Fetch Access Token because the api requires to create a token to retrieve the flights
const fetchAccessToken = async () => {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('Using cached access token');
    return accessToken;
  }

  try {
    const response = await axios.post(
      'https://api.amadeus.com/v1/security/oauth2/token',
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: FLIGHT_API_KEY,
        client_secret: FLIGHT_API_SECRET,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
    console.log('New Access Token:', accessToken);
    return accessToken;
  } catch (err) {
    console.error('Error fetching access token:', err.response?.data || err.message);
    throw new Error('Failed to fetch access token');
  }
};

// Fetch Airport Code by City Name because the api retrieves the flights based on airport codes, but no one knows the codes, so it's easier to convert the city name
const fetchAirportCode = async (city) => {
    try {
      const token = await fetchAccessToken();
  
      const sanitizedCity = city.split(',')[0].trim();
      console.log(`Searching airport code for city: ${sanitizedCity}`);
  
      const response = await axios.get('https://api.amadeus.com/v1/reference-data/locations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          keyword: sanitizedCity,
          subType: 'AIRPORT,CITY',
        },
      });
  
      console.log('Airport Search Response:', JSON.stringify(response.data, null, 2));
  
      const locations = response.data.data;
  
      if (!locations || locations.length === 0) {
        throw new Error(`No airports found for city: ${city}`);
      }
  
      // Check for primary airport in case the city has different airports
      const primaryAirport = locations.find((loc) => loc.subType === 'AIRPORT' && loc.iataCode);
      if (primaryAirport) {
        return primaryAirport.iataCode;
      }
  
      // Fallback to city code if no airport found
      return locations[0].iataCode;
    } catch (err) {
      console.error('Error fetching airport code:', {
        message: err.message,
        status: err.response?.status,
        data: JSON.stringify(err.response?.data, null, 2),
      });
      throw new Error(`Failed to fetch airport code for city: ${city}`);
    }
  };
  

// Flight Search Route
router.get('/search', async (req, res) => {
    const { origin, destination, departureDate } = req.query;
  
    if (!origin || !destination || !departureDate) {
      return res.status(400).json({ message: 'Origin, destination, and departure date are required.' });
    }
  
    try {
      const originCode = await fetchAirportCode(origin);
      const destinationCode = await fetchAirportCode(destination);
  
      console.log('Converted City to Airport Codes:', { originCode, destinationCode });
  
      const token = await fetchAccessToken();
  
      const params = {
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate,
        adults: 1,
        currencyCode: 'CAD',
      };
  
      const response = await axios.get('https://api.amadeus.com/v2/shopping/flight-offers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });
  
      const simplifiedFlights = response.data.data.map((flight) => ({
        price: flight.price.total,
        currency: flight.price.currency,
        departure: flight.itineraries[0].segments[0].departure,
        arrival: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival,
        duration: flight.itineraries[0].duration,
        carrierCode: flight.validatingAirlineCodes[0],
      }));
  
      res.json(simplifiedFlights);
    } catch (err) {
      console.error('Error fetching flights:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      res.status(500).json({
        message: 'Failed to fetch flight data',
        details: err.response?.data || 'No additional details available',
      });
    }
  });
  

// Autocomplete Route to avoid spelling mistakes or users entering symbols that are not recognized by the api
router.get('/autocomplete', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required for autocomplete.' });
  }

  try {
    const token = await fetchAccessToken();

    console.log(`Autocomplete search for query: ${query}`);
    const response = await axios.get('https://api.amadeus.com/v1/reference-data/locations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        keyword: query,
        subType: 'AIRPORT,CITY',
        view: 'LIGHT',
      },
    });

    const suggestions = response.data.data.map((location) => ({
      name: location.name,
      code: location.iataCode,
      type: location.subType,
    }));

    res.json(suggestions);
  } catch (err) {
    console.error('Error fetching autocomplete data:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
    res.status(500).json({
      message: 'Failed to fetch autocomplete data',
      details: err.response?.data || 'No additional details available',
    });
  }
});

module.exports = router;
