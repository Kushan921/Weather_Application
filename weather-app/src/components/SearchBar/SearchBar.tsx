import { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { geoDirectSearch } from '../../api/openWeather';

// Define the shape of a city result from Geo API
interface CityResult {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}

interface SearchBarProps {
  onSelect: (city: CityResult) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<CityResult[]>([]);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (q: string) => {
        if (!q) {
          setResults([]);
          return;
        }
        try {
          const res = await geoDirectSearch(q, 5);
          setResults(res);
        } catch (err) {
          console.error('Search failed:', err);
          setResults([]);
        }
      }, 300),
    []
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTerm(e.target.value);
    debouncedSearch(e.target.value);
  }

  function handleSelectCity(city: CityResult) {
    onSelect(city);
    setTerm('');
    setResults([]);
  }

  return (
    <div className="search-bar">
      <input 
        value={term} 
        onChange={handleChange} 
        placeholder="Search city..." 
        type="text"
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((r) => (
            <li 
              key={`${r.lat}-${r.lon}`} 
              onClick={() => handleSelectCity(r)}
              className="search-result-item"
            >
              <span>
                {r.name}
                {r.state ? `, ${r.state}` : ''} — {r.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
