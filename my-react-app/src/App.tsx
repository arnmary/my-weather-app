import { useState, useEffect } from 'react';

import './App.css';
import Logo from './components/Logo';
import WeatherCard from './components/WeatherCard';
import DateTimeDisplay from './components/DateTimeDisplay';
import HourlyForecast from './components/HourlyForecast';
import Input from './components/Input';
import WeatherScreen from './components/WeatherScreen';
import type { WeatherData } from './types/weather';
import type { HourlyData } from './types/weather';
import { getHourlyForecast } from './api/getHourlyForecast';


const hourlyMockData = [
  { time: '13:00', description: 'snow', temperature: '+24°', iconUrl: 'https://openweathermap.org/img/wn/10d.png' },
  { time: '14:00', description: 'snow', temperature: '+25°', iconUrl: 'https://openweathermap.org/img/wn/10d.png' },
  { time: '15:00', description: 'snow', temperature: '+26°', iconUrl: 'https://openweathermap.org/img/wn/04d.png' },
  { time: '16:00', description: 'snow', temperature: '+25°', iconUrl: 'https://openweathermap.org/img/wn/03d.png' },
  { time: '17:00', description: 'snow', temperature: '+23°', iconUrl: 'https://openweathermap.org/img/wn/01d.png' },
  { time: '18:00', description: 'snow', temperature: '+21°', iconUrl: 'https://openweathermap.org/img/wn/02d.png' },
];


const mockWeatherData: WeatherData ={
  name:'Lviv',
  weather:[{
    description:'Clear Sky',
    icon:'02d',
    main: 'Clouds',
  }
],
main:{
  temp: 22,
  feels_like: 21,
  temp_min: 19,
  temp_max: 24,
  pressure: 1012,
  humidity: 60,
},
wind: {
speed: 5,
deg: 250,
},

dt:0,
coord:{
  lon: 24.0311,
  lat: 49.082,
},

};

function App() {

   const [weatherData, setWeatherData] = useState<WeatherData>(mockWeatherData);
  const [hourlyData, setHourlyData] =useState<HourlyData[]>(hourlyMockData);
 

  const fetchHourly = async (city: string) => {
    try {
      const rawData = await getHourlyForecast(city);
      const formattedData: HourlyData[] = rawData.list.slice(0, 12).map((item: any) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        description: item.weather[0].description,
        temperature: `${Math.round(item.main.temp)}°`,
        iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`
      }));
      setHourlyData(formattedData);
    } catch (error) {
      console.error('Error fetching hourly forecast:', error);
    }
  };
  
  const handleSearch = (city: string, data: WeatherData) => {
    setWeatherData(data);
    fetchHourly(city);
    
  };
  useEffect(() => {
    fetchHourly('Lviv');
  }, []);
  return (
    <>
    <div className="bg-cover bg-center min-h-screen flex justify-between items-center px-0  
      bg-mobile-bg
      sm:bg-tablet-bg
      lg:bg-desktop-bg"
      >
        <div className="flex flex-col items-center justify-between gap-96 h-auto">
          <div className="absolute top-20">
            <Logo />
          </div>
          <div className="relative">
            {weatherData?.weather[0] &&(
                <WeatherCard
                 city={weatherData.name}
                  temperature={Math.round(weatherData.main.temp)} description={weatherData.weather[0].description
                  } 
                  icon={weatherData.weather[0].icon}
                  />
            )

            }
          
            <span className="absolute bottom-9 right-[-117px] ">
              <DateTimeDisplay />
            </span>
          </div>
        </div>

        <div className="rightPart w-1/3 bg-white/0 backdrop-blur-sm me-0 ml-auto">
          <Input onSearch={handleSearch} />
          <WeatherScreen data={weatherData} />
          <div className=' z-50 bg-slate-50 h-[1px] ml-3 mr-6 w-3/4'></div>
          <div className=" mt-10 pt-6 backdrop-blur-sm  w-full">
            <h2 className="text-white font-roboto text-start text-xl mb-4  w-3/4 mx-3 pl-5">
           Today’s Weather Forecast...
            </h2>
            <HourlyForecast data={hourlyData} />
          </div>
        </div>
      </div>

    </>
  )
}

export default App
