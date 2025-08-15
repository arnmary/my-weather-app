export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

export interface TemperatureInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;

}
export interface WindInfo {
   speed: number;
   deg: number;
}

export interface WeatherData {
  coord: Coordinates;
  name: string;
  main: TemperatureInfo;
  weather: WeatherCondition[];
  wind: WindInfo;
  dt: number;
}

export interface HourlyData {
  time: string;  
  description: string;     
  temperature: string; 
  iconUrl: string;    
}

export interface WeatherDetailItem {
  label: string;
  value: string;
  color: string;
  icon: any;
}

export interface WeatherDetailsProps {
  weatherDescription: string;
    details: WeatherDetailItem[];
}
export interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
}