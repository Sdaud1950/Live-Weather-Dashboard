import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = 'c0e973a60e75a0a9f146264a6f45119c';

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('Pune');
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Live Weather Dashboard - India</h1>
      </header>

      <main>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => fetchWeather(city)}>Get Weather</button>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-card">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
      </main>

      <footer>
        <p>Powered by OpenWeather API</p>
      </footer>
    </div>
  );
};

export default App
