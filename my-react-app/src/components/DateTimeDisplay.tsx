import React,{ useEffect, useState} from 'react';

const DateTimeDisplay:React.FC = () => {

    const [now,setNow ] = useState (new Date());

    useEffect(()=>{
        const timer = setInterval(()=>{
            setNow(new Date());
        }, 1000 * 60);
        return()=>clearInterval(timer);
    }, []);

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes =now.getMinutes().toString().padStart(2, '0');
    const weekdays = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Suturday',
    ];
    const monthShort =[
        'Jan', ' Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
    ];
    const day = now.getDate();
    const weekday = weekdays[now.getDay()];
    const month = monthShort[now.getMonth()];
    const year = `'${now.getFullYear().toString().slice(-2)}'`;

    return (
        
       <>
<div className='text-white font-roboto text-sm opacity-80'>
{`${hours}:${minutes} - ${weekday}, ${day}  ${month}  ${year}`}
</div>
       </>
    );
};

export default DateTimeDisplay;