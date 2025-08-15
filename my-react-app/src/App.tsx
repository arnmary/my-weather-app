import { useState, useEffect } from 'react';
import './App.css';
import './style.css';
import WeatherCard from './components/WeatherCard';
import DateTimeDisplay from './components/DateTimeDisplay';
import HourlyForecast from './components/HourlyForecast';
import Header from './components/Header';
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

 // Restore from localStorage
  useEffect(()=>{
    const savedWeather = localStorage.getItem('weatherData');
    const savedHourly = localStorage.getItem('hourlyData');
    const savedTime = localStorage.getItem('weatherDataTimestamp');

    if(savedWeather && savedHourly && savedTime){
      const now = Date.now();
      const diff =now -Number(savedTime);
      if (diff< 60 * 60 * 1000) {
       setWeatherData(JSON.parse(savedWeather));
       setHourlyData(JSON.parse(savedHourly));
       return;
      }
    }

     fetchHourly('Lviv');

  },[])

  //Save to LocalStorage
  useEffect(()=>{
    if (weatherData) {
      localStorage.setItem('weatherData',JSON.stringify(weatherData));
      localStorage.setItem('weatherDataTimestamp', Date.now().toString());
    }
  },[weatherData]);

  useEffect(()=>{
    if (hourlyData.length > 0) {
      localStorage.setItem('hourlyData', JSON.stringify(hourlyData));
    }
  },[hourlyData]);

// get weather from api
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
  // search processing
  const handleSearch = (city: string, data: WeatherData) => {
    setWeatherData(data);
    fetchHourly(city); 
  };
  useEffect(() => {
    fetchHourly('Lviv');
  }, []);

  return (
    <>

    <div className="
    bg-[url('/bg-mobile.png')] 
    sm:bg-[url('/bg-tablet.png')] 
    lg:bg-[url('/bg-desktop.png')] bg-cover bg-center min-h-screen flex flex-col">
      <div className='w-full flex flex-row justify-between'>
           <Header onSearch={handleSearch} />
      </div>

<div className='mainPart flex flex-row justify-between items-center flex-1'>
   <div className="weatherCard flex flex-col items-center justify-between gap-9 h-auto">
   

          <div className="relative w-1/3">
            {weatherData?.weather[0] &&(
                <WeatherCard
                 city={weatherData.name}
                  temperature={Math.round(weatherData.main.temp)} description={weatherData.weather[0].description
                  } 
                  icon={weatherData.weather[0].icon}
                  />
            )

            }
          
            <span className="absolute bottom-2 right-[-230px] dateInfo">
              <DateTimeDisplay />
            </span>
          </div>
        </div>


        <div className="rightPart  w-1/3 bg-white/0 backdrop-blur-sm me-0 ml-auto pt-[37px]">
          <WeatherScreen data={weatherData} />
          <div className='ceparat z-50 bg-slate-50 h-[1px]  m-6 w-[90%]'>
          
          </div>
          <div className=" backdrop-blur-sm  w-full hourlyBlock ">
            <h3 className="text-white text-center sm:text-start text-xl  w-3/4 ">
           Today’s Weather Forecast...
            </h3>
            <HourlyForecast data={hourlyData} />
          </div>
        </div>
      </div>
</div>
     
    </>
  )
}

export default App
