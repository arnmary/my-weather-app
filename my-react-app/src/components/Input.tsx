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
    <div className="flex items-center font-roboto justify-between bg-white/0 py-2 px-3 w-full max-w-sm backdrop-blur-sm shadow-sm mt-8">
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
        className="ps-10 pb-1 appearance-none font-roboto text-xl bg-transparent border-b border-b-white w-full text-white/70 focus:outline-none"
      />

      <MagnifyingGlassIcon
        onClick={handleSearch}
        className="h-8 w-8 pb-3 text-white border-b text-lg border-b-white mr-2 cursor-pointer"
      />
    </div>
  );
};

export default Input;