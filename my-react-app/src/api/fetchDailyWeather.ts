import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface ForecastResponse {
    list:{
        main:{
            temp_min: number;
            temp_max: number;
        };
    }[];
}
export async function fetchDailyWeather(lat: number, lon: number) {
   try{
    const {data} =await axios.get<ForecastResponse>(
        'https://api.openweathermap.org/data/2.5/forecast',
        {
            params:{
                lat,
                lon,
                units:"metric",
                cnt: 8,
                appid: API_KEY,
            },
        }
    );
    const temps = data.list.map(item=> item.main);
    const min = Math.min(...temps.map(t => t.temp_min));
    const max = Math.max(...temps.map(t => t.temp_max));
    return {min, max};
   } catch(error){
    console.error("Error fetching daily weather", error);
    return { min: null, max: null};
   }
}