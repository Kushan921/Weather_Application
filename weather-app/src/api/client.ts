import axios from "axios";

const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_API_URL = import.meta.env.VITE_OPENWEATHER_API_URL;
const OPENWEATHER_GEO_API_URL = import.meta.env.VITE_OPENWEATHER_GEO_API_URL;

export const apiClient = axios.create({
  baseURL: `${OPENWEATHER_API_URL}`,
  params: { appid: OPENWEATHER_KEY }
});

export const geoClient = axios.create({
  baseURL: `${OPENWEATHER_GEO_API_URL}`,
  params: { appid: OPENWEATHER_KEY }
});
