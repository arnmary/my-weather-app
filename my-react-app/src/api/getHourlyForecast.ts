
export async function getHourlyForecast(city: string) {
  const API_KEY = 'b006ea4218a58ab56086dd0e6b0ef834'; 
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch hourly forecast. Status: ${response.status}`);
  }

  return await response.json();
}