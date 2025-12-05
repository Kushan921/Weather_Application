import axios from "axios";

const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const apiClient = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: { appid: OPENWEATHER_KEY }
});
