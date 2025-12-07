// src/utils/parseCities.ts
import cities from '../assets/cities.json';

interface City {
  CityCode?: number | string;
  id?: number | string;
  city_id?: number | string;
  ID?: number | string;
  [key: string]: any; // allow other properties without TS errors
}

/**
 * Extracts initial city IDs from cities.json
 * @param limit Maximum number of city IDs to return (default 50)
 * @returns Array of numeric city IDs
 */
export function getInitialCityIds(limit = 50): number[] {
  const ids: number[] = [];

  for (const city of (cities as any).List as City[]) {
    
    const rawId = city.CityCode ?? city.id ?? city.city_id ?? city.ID;
    const id = Number(rawId);

    if (!Number.isNaN(id)) {
      ids.push(id);
    }

    if (ids.length >= limit) {
      break;
    }
  }

  return ids;
}
