import axios from "axios";

const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// Weather API client (for /data/2.5/* endpoints)
export const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: { appid: OPENWEATHER_KEY }
});

// Geo API client (for /geo/1.0/* endpoints)
export const geoClient = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
  params: { appid: OPENWEATHER_KEY }
});
