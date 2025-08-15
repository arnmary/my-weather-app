import React from 'react';
import logo from '../logo1.svg';

const Logo:React.FC = () => {
  return (
    <>
        <a href="/" className='hover:opacity-80 transition'>
                  <img src={logo} alt="Logo" className='h-12 w-auto mt-0'/>
        </a>

    </>
  )
}

export default Logo;