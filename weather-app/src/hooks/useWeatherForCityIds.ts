import { useQuery } from '@tanstack/react-query';
import type { WeatherResponse } from '../types';
import { fetchWeatherByCityIds } from '../api/openWeather';

export function useWeatherForCityIds(ids: number[]) {
  return useQuery<WeatherResponse>({
    queryKey: ['weather', ids],
    queryFn: () => fetchWeatherByCityIds(ids),
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });
}
