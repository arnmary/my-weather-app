import React from 'react';
import logo from '../logo1.svg';

const Logo:React.FC = () => {
  return (
    <div className='mt-[-40px]'>
        <a href="/" className='hover:opacity-80 transition'>
                  <img src={logo} alt="Logo" className='h-12 w-auto mt-0'/>
        </a>

    </div>
  )
}

export default Logo;