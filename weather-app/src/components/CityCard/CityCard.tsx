import React, { useCallback, useMemo } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import type { CityWeather } from '../../types';

interface CityCardProps {
  city: CityWeather;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const { favorites, toggle } = useFavorites();
  
  // Memoize isFavorite calculation to ensure it updates when favorites change
  const isFavorite = useMemo(() => {
    return favorites.includes(city.id);
  }, [favorites, city.id]);

  const iconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;

  const handleToggleFavorite = useCallback(() => {
    toggle(city.id);
  }, [city.id, isFavorite, toggle]);

  return (
    <div className="city-card">
      <div className="city-card-header">
        <h2>{city.name}, {city.sys.country}</h2>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          ★
        </button>
      </div>
      <img src={iconUrl} alt={city.weather[0].description} />
      <p className="temperature">{Math.round(city.main.temp)}°C</p>
      <p className="description">{city.weather[0].description}</p>
      <div className="weather-details">
        <span>Humidity: {city.main.humidity}%</span>
        <span>Wind: {city.wind.speed} m/s</span>
      </div>
    </div>
  );
};

export default React.memo(CityCard);
