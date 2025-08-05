// import axios from 'axios';

// const API_BASE = 'https://api.openweathermap.org/data/2.5/weather';

// export const getWeatherByCity = async (city: string) => {
//   const apiKey = process.env.REACT_APP_WEATHER_API_KEY; // ✅ for CRA

//   if (!apiKey) {
//     throw new Error('API key is missing');
//   }

//   const response = await axios.get(API_BASE, {
//     params: {
//       q: city,
//       appid: apiKey,
//       units: 'metric',
//     },
//   });

//   return response.data;
// };
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const getWeatherByCity = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather');
  }

  return await response.json();
};
