import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { WeatherDetailsProps } from '../types/weather';


const DetailsWeather: React.FC<WeatherDetailsProps> = ({ weatherDescription, details }) => {
  return (
    <div  >
      <p className='text-white font-roboto text-start text-lg opacity-80 mt-16 ps-5'>Weather Details...</p>
      <h2 className='text-start font-roboto text-white text-lg mt-10'>{weatherDescription}</h2>
      
      {details.map((detail, index) => (
        <div
          key={index}
          className='text-white/70 font-roboto text-lg opacity-50  flex flex-row justify-between w-3/4 mx-auto my-4'
        >
          <p>{detail.label}</p>
          <span>
            {detail.value}
            <FontAwesomeIcon icon={detail.icon} style={{ color: detail.color }}  className=' text-lg ml-2' />
          </span>
        </div>
      ))}
    </div>
  );
};

export default DetailsWeather;