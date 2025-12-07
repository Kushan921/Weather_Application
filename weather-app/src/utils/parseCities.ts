import cities from '../assets/cities.json';

interface City {
  CityCode?: number | string;
  id?: number | string;
  city_id?: number | string;
  ID?: number | string;
  [key: string]: any;
}


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
