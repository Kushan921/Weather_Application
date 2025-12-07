import { apiClient, geoClient } from './client';

// Fetch multiple cities WITHOUT /group (free plan compatible)
export async function fetchWeatherByCityIds(ids: number[]) {
  const results = [];

  // Fetch each city separately using /weather
  for (const id of ids) {
    const { data } = await apiClient.get('/weather', {
      params: { id, units: 'metric' }
    });
    results.push(data);
  }

  // IMPORTANT: Make the response look similar to /group
  return { cnt: results.length, list: results };
}

// Geocoding direct search for typeahead
export async function geoDirectSearch(q: string, limit = 5) {
  const { data } = await geoClient.get('/direct', {
    params: { q, limit }
  });
  return data;
}
