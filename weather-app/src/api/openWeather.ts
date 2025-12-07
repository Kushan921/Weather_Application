import { apiClient, geoClient } from './client';

export async function fetchWeatherByCityIds(ids: number[]) {
  const results = [];

  for (const id of ids) {
    const { data } = await apiClient.get('/weather', {
      params: { id, units: 'metric' }
    });
    results.push(data);
  }

  return { cnt: results.length, list: results };
}

export async function geoDirectSearch(q: string, limit = 5) {
  const { data } = await geoClient.get('/direct', {
    params: { q, limit }
  });
  return data;
}
