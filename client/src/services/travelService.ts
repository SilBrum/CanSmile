// travelService.ts
import axios from 'axios';

const API_URL = 'http://localhost:6000/api/travel';

export const getFlights = async (destination: string) => {
  const response = await axios.get(`${API_URL}/flights`, { params: { destination } });
  return response.data;
};

export const getHotels = async (destination: string) => {
  const response = await axios.get(`${API_URL}/hotels`, { params: { destination } });
  return response.data;
};
