import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { getWeatherByCity } from '../api/getWeather';
import type { WeatherData } from '../types/weather';

type InputProps = {
  onSearch: (city: string, data: WeatherData) => void;
};

  const Input: React.FC<InputProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    try {
      const data = await getWeatherByCity(trimmedCity) as WeatherData;
      console.log('Weather data:', data);
      onSearch(trimmedCity, data); // ✅ pass city and weather data
      setCity(''); // clear input
    } catch (error) {
      alert('City not found or error occurred');
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <>
        <div className="flex flex-row items-center font-roboto justify-between bg-white/0 py-2 px-3 w-full max-w-sm inputCont">
      <input
        type="text"
        placeholder="Search Location"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        className="ps-10 pb-2 input  font-roboto text-xl bg-transparent border-b border-b-white  text-white"
      />

      <MagnifyingGlassIcon
        onClick={handleSearch}
        className="flex-shrink-0 h-8 w-8 pb-3 text-white border-b text-lg border-b-white mr-2 cursor-pointer"
      />
      
    </div>
    
    </>

    
  );
};

export default Input;