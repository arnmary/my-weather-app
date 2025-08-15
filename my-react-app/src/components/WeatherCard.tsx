
import React from 'react';
import type { WeatherCardProps } from '../types/weather';


const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature,icon }) => {
  return (
    <div className=" bg-opacity-0  scroll-ms-px flex flex-row items-center gap-6">
        <p className="text-9xl font-roboto font-semibold text-white * mainTemp">{temperature}°</p>
        <h2 className="font-semibolt text-6xl font-roboto  text-white * leading-tight break-words ">{city}</h2>
      <img 
         src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
         alt="weather icon"
         className="w-20 h-20"/>
    </div>
  );
};

export default WeatherCard;