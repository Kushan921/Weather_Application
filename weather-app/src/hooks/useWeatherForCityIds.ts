import { useQuery } from '@tanstack/react-query';
import type { WeatherResponse } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_OPENWEATHER_API_URL;

async function fetchWeatherByIds(ids: number[]): Promise<WeatherResponse> {
  if (!ids.length) return { list: [] } as WeatherResponse; // fallback

  const res = await fetch(
    `${BASE_URL}/group?id=${ids.join(',')}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return res.json();
}

export function useWeatherForCityIds(ids: number[]) {
  return useQuery<WeatherResponse>({
    queryKey: ['weather', ids],
    queryFn: () => fetchWeatherByIds(ids),
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    gcTime: 10 * 60 * 1000,
    retry: 1, // optional: retry once on failure
  });
}
