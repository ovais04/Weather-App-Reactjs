import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flipContainer, setFlipContainer] = useState(false);

  const apiKey = '76e8a46c94162af9704c19a19dfd9a89'; // Replace with your API key

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found or invalid API key. Please try again.');
    } finally {
      setLoading(false);
    }
    setCity('');
  };

  const handleButtonClick = () => {
    setFlipContainer(true);
    fetchWeather();

    setTimeout(() => {
      setFlipContainer(false);
    }, 600);
  };

  return (
    <div className={`weather-container ${flipContainer ? 'flip' : ''}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleButtonClick}>
          Search
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-info">
          <div className="weather-details">
            <div className="temp">
            <h1>{weatherData.name}</h1>
            <p>{weatherData.sys.country}</p>
              <h2>{Math.round(weatherData.main.temp)}°C</h2>
              <p>{weatherData.weather[0].description}</p>
            </div>

            <div className="additional-info">
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind: {Math.round(weatherData.wind.speed)} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
