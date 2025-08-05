import React from 'react';
import {
  faTemperatureLow,
  faDroplet,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { WeatherData } from '../types/weather.ts';


interface WeatherScreenProps {
  data: WeatherData | null;
}

const degToDirection = (deg: number): string=> {
const direction = ["N","NE","E","SE","S","SW","W","NW"];
const index = Math.round(deg/45) % 8;
return direction[index];
}


const WeatherScreen: React.FC<WeatherScreenProps> = ({ data }) => {
  if (!data) return <p className="text-white text-start">No data</p>;

  return (
    <div className="text-white border-b border-b-white pb-5 w-3/4">
      <h2 className="text-center font-roboto">{data.name}</h2>
      <p className="text-start font-roboto text-white text-lg mx-3 pl-5 mt-10">
        {data.weather[0].description}
      </p>

      <div className="flex flex-row justify-between items-center">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
          Temp: {Math.round(data.main.temp)}°C  ( Fell like: {Math.round(data.main.feels_like)}°C)
        </p>
        <FontAwesomeIcon icon={faTemperatureLow} className="text-white/70 text-lg" />

      </div>    
           <div className="flex flex-row justify-between items-center">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
         Temp Max: {Math.round(data.main.temp_max)}°C
        </p>
        <FontAwesomeIcon icon={faTemperatureLow} className="text-[#DFA1A1] text-lg " />
      </div>
           <div className="flex flex-row justify-between items-center">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
         Temp Min: {Math.round(data.main.temp_min)}°C
        </p>
        <FontAwesomeIcon icon={faTemperatureLow} className="text-[#6D97CA] text-lg " />
      </div>

      <div className="flex flex-row justify-between items-center">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
          Humidity: {data.main.humidity}%
        </p>
        <FontAwesomeIcon icon={faDroplet} className="text-white/70 text-lg" />
      </div>


      <div className="flex flex-row justify-between items-center">
        <p className="text-white/70 font-roboto text-lg opacity-50 w-3/4 mx-auto my-4">
          Wind: {data.wind.speed} km/h ({degToDirection(data.wind.deg)}) 
        </p>
        <FontAwesomeIcon icon={faWind} className="text-white/70 text-lg" />
      </div>
    </div>
  );
};

export default WeatherScreen;