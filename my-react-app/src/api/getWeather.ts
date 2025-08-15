
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
