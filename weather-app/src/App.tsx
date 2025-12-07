import { useState, useMemo } from 'react';
import { getInitialCityIds } from './utils/parseCities';
import { useWeatherForCityIds } from './hooks/useWeatherForCityIds';
import { useFavorites } from './hooks/useFavorites';
import { apiClient } from './api/client';
import SearchBar from './components/SearchBar/SearchBar';
import CityCard from './components/CityCard/CityCard';
import type { CityWeather } from './types';

interface SearchResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

function App() {
  const [searchedCities, setSearchedCities] = useState<CityWeather[]>([]);
  const cityIds = getInitialCityIds(20);
  const { data, isLoading, isError, error } = useWeatherForCityIds(cityIds);
  const { favorites, toggle } = useFavorites(); // Subscribe to favorites context changes

  async function handleSearchSelect(city: SearchResult) {
    try {
      const { data: weatherData } = await apiClient.get('/weather', {
        params: {
          lat: city.lat,
          lon: city.lon,
          units: 'metric',
        },
      });

      if (!weatherData || !weatherData.id) {
        throw new Error('Invalid weather data returned');
      }

      const typedWeatherData: CityWeather = weatherData;

      setSearchedCities((prev) => {
        const exists = prev.some((c) => c.id === typedWeatherData.id);
        return exists ? prev : [...prev, typedWeatherData];
      });

      if (!favorites.includes(typedWeatherData.id)) {
        toggle(typedWeatherData.id);
      }
    } catch (err) {
      console.error('Error fetching weather for searched city:', err);
    }
  }

  
  const allCities = useMemo(() => {
    const cityMap = new Map<number, CityWeather>();

    data?.list?.forEach((city) => {
      cityMap.set(city.id, city);
    });

    
    searchedCities.forEach((city) => {
      if (favorites.includes(city.id)) {
        cityMap.set(city.id, city);
      }
    });

    return Array.from(cityMap.values());
  }, [data?.list, searchedCities, favorites]);

  return (
    <div>
      <header>
        <h1>🌤️ Weather App</h1>
        <SearchBar onSelect={handleSearchSelect} />
      </header>
      <main>
        {isLoading && <div>⏳ Loading weather data...</div>}
        {isError && <div>❌ Error loading city weather: {(error as Error)?.message}</div>}

        {!isLoading && !isError && (
          <div className="cities-grid">
            {allCities && allCities.length > 0 ? (
              allCities.map((city) => <CityCard key={city.id} city={city} />)
            ) : (
              <div className="no-cities-msg">📍 No cities available. Try searching for a city!</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
