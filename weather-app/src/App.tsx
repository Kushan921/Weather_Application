import { getInitialCityIds } from './utils/parseCities';
import { useWeatherForCityIds } from './hooks/useWeatherForCityIds';
import SearchBar from './components/SearchBar/SearchBar';
import CityCard from './components/CityCard/CityCard';

function App() {
  const cityIds = getInitialCityIds(20);
  const { data, isLoading } = useWeatherForCityIds(cityIds);

  return (
    <div>
      <header>
        <SearchBar onSelect={() => { /* fetch by lat/lon or add */ }} />
      </header>
      <main>
        {isLoading ? (
          'Loading...'
        ) : (
          data?.list.map((city: any) => <CityCard key={city.id} city={city} />)
        )}
      </main>
    </div>
  );
}

export default App;
