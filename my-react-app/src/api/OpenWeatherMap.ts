import axios from 'axios';

// const API_KEY = 'b006ea4218a58ab56086dd0e6b0ef834';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export async function getHourlyForecast(city: string) {
  const response = await axios.get<any>(API_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'en',
    },
  });
  
  return response.data.list; 
}