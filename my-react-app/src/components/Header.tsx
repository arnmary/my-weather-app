import React from 'react'
import Logo from './Logo';
import Input from './Input';
import type {WeatherData } from '../types/weather';

interface HeaderProps {
  onSearch: (city: string, data: WeatherData) => void;
}

const Header: React.FC<HeaderProps> = ({onSearch}) =>{

  return (
    <>
      <div className=' flex flex-row justify-between items-center absolute w-[86%] max-[968px]:w-[75%] top-[10%] left-[8.1%] z-[1000] header'>
      <Logo/>
      <Input onSearch={onSearch} />

    </div>
 
    </>
  ) 
}
export default Header;