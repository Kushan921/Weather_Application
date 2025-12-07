import { useState } from 'react';
import { getInitialCityIds } from './utils/parseCities';
import { useWeatherForCityIds } from './hooks/useWeatherForCityIds';
import { useFavorites } from './hooks/useFavorites';
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
  useFavorites(); // Hook into favorites context to trigger re-renders on changes

  async function handleSearchSelect(city: SearchResult) {
    try {
      // Fetch weather for the searched city using lat/lon
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      if (!res.ok) throw new Error('Failed to fetch weather');
      const weatherData: CityWeather = await res.json();
      
      // Add to searched cities if not already present
      setSearchedCities((prev) => {
        const exists = prev.some((c) => c.id === weatherData.id);
        return exists ? prev : [...prev, weatherData];
      });
    } catch (err) {
      console.error('Error fetching weather for searched city:', err);
    }
  }

  const allCities = [...(data?.list || []), ...searchedCities];

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
