import React from 'react';
import type { CityWeather } from '../../types';

interface CityCardProps {
  city: CityWeather;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;

  return (
    <div className="city-card">
      <h2>{city.name}, {city.sys.country}</h2>
      <img src={iconUrl} alt={city.weather[0].description} />
      <p>{Math.round(city.main.temp)}°C</p>
      <p>{city.weather[0].description}</p>
    </div>
  );
};

export default CityCard;
