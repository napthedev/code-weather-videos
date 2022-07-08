export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  minutely: MinutelyItem[];
  hourly: HourlyItem[];
  daily: DailyItem[];
}
interface Current {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherItem[];
  rain: Rain;
}
interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}
interface Rain {
  "1h": number;
}
interface MinutelyItem {
  dt: number;
  precipitation: number;
}
interface HourlyItem {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherItem[];
  pop: number;
  rain?: Rain;
}
interface DailyItem {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: Feels_like;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: WeatherItem[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}
interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
interface Feels_like {
  day: number;
  night: number;
  eve: number;
  morn: number;
}
