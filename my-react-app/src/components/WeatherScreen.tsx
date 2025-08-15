import React,{useEffect, useState} from 'react';
import {
  faTemperatureLow,
  faDroplet,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { WeatherData } from '../types/weather.ts';
import { fetchDailyWeather } from '../api/fetchDailyWeather.ts';


interface WeatherScreenProps {
  data: WeatherData | null;
}

const degToDirection = (deg: number): string=> {
const direction = ["N","NE","E","SE","S","SW","W","NW"];
const index = Math.round(deg/45) % 8;
return direction[index];
}

const WeatherScreen: React.FC<WeatherScreenProps> = ({ data }) => {
const [dailyMin, setDailyMin] = useState<number | null>(null);
const [dailyMax, setDailyMax] = useState<number | null>(null);

useEffect(() => {
  if (data) {
    fetchDailyWeather(data.coord.lat, data.coord.lon)
    .then(({min, max}) => {
      console.log("Daily Weather Response:");
      setDailyMin(min);
      setDailyMax(max);
    });
    
  }
},[data]);

  if (!data) return <p className="text-white text-start">No data</p>;

  return (
    <div className="text-white weatherScreenCont">
      <h3 className="text-center font-roboto">{data.name}</h3>
      <h3 className="text-center sm:text-start font-roboto text-white text-lg ">
        {data.weather[0].description}
      </h3>

      <div className="flex flex-row justify-between text-center mx-auto">
        <p className="text-white/70 font-roboto text-lg opacity-50 text-start  w-3/4 mx-auto my-4">
          Temp: {Math.round(data.main.temp)}°C  ( Fell like: {Math.round(data.main.feels_like)}°C)
        </p>
        <FontAwesomeIcon icon={faTemperatureLow} className="text-white/70 text-lg icon" />

      </div> 
      {dailyMax !==null &&(
           <div className="flex flex-row justify-between items-center text-start">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
         Temp Max: {Math.round(dailyMax)}°C
        </p>
        <FontAwesomeIcon icon={faTemperatureLow} className="text-[#DFA1A1] text-lg icon" />
      </div>
      )}   
        {dailyMin !==null &&(
           <div className="flex flex-row justify-between items-center text-start">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
         Temp Min: {Math.round(dailyMin)}°C
        </p>
        <FontAwesomeIcon icon={faTemperatureLow} className="text-[#6D97CA] text-lg icon" />
      </div>
        )}
          

      <div className="flex flex-row justify-between items-center text-start">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
          Humidity: {data.main.humidity}%
        </p>
        <FontAwesomeIcon icon={faDroplet} className="text-white/70 text-lg icon" />
      </div>


      <div className="flex flex-row justify-between items-center text-start">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
          Wind: {data.wind.speed} km/h ({degToDirection(data.wind.deg)}) 
        </p>
        <FontAwesomeIcon icon={faWind} className="text-white/70 text-lg icon" />
      </div>
    </div>
  );
};

export default WeatherScreen;