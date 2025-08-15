import React from 'react';
import type { HourlyData } from '../types/weather';

interface HourlyForecastProps {
  data: HourlyData[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  return (
    <div className="bg-white/0 bg-opacity-0 font-roboto  p-4 rounded-xl w-full overflow-x-auto whitespace-nowrap flex flex-col hourlyCont gap-5">
      {data.map((hour, index) => (
        <div
          key={index}
          className="flex flex-row gap-5 justify-between items-center text-white mx-3  w-full"
        >
             <img src={hour.iconUrl} alt="icon" className="w-8 h-8 my-1 " />
              <div className='flex flex-col '>
                 <p className="text-sm">{hour.time}</p>
                 <p className='text-sm text-white/70 font-roboto '> {hour.description}</p>
            </div>
                <p className="text-md font-semibold">{hour.temperature}</p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;