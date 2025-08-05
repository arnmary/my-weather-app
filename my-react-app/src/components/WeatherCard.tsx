
import React from 'react';
// import { WeatherCardProps } from '@/types/weather';
import type { WeatherCardProps } from '../types/weather';


const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, description,icon }) => {
  return (
    <div className=" bg-opacity-0 ps-[116px] p-6 rounded-xl max-w-sm w-full text-start flex flex-row items-center gap-4">
      <p className="text-9xl font-roboto font-semibold text-white *">{temperature}°</p>
        <h2 className="text-6xl font-roboto font-normal text-white * mb-2">{city}</h2>
      <p className="text-lg text-white *">{description}</p>
      <img
  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
  alt="weather icon"
  className="w-20 h-20"
/>
    </div>
  );
};

export default WeatherCard;