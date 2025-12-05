import { apiClient } from './client';

// Batch get by city ids (max 20 per request per doc historically — check quota)
export async function fetchWeatherByCityIds(ids: number[]) {
  const idParam = ids.join(',');
  const { data } = await apiClient.get('/data/2.5/group', {
    params: { id: idParam, units: 'metric' }
  });
  return data;
}

// Geocoding direct search for typeahead
export async function geoDirectSearch(q: string, limit = 5) {
  const { data } = await apiClient.get('/geo/1.0/direct', {
    params: { q, limit }
  });
  return data;
}
