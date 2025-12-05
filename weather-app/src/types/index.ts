export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  country: string;
}

export interface CityWeather {
  id: number;
  name: string;
  weather: Weather[];
  main: MainWeather;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
}

export interface WeatherResponse {
  list: CityWeather[];
}
