import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDisplay = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios.get('/predicciones.json')
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  const weatherDisplayStyles = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  };

  const stationStyles = {
    backgroundColor: '#f4f4f4',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '8px',
  };

  const stationHeadingStyles = {
    color: '#2c3e50',
  };

  const stationTextStyles = {
    margin: '5px 0',
    fontSize: '16px',
  };

  return (
    <div style={weatherDisplayStyles}>
      <h1>Pronóstico del clima</h1>
      {weatherData.map((station) => (
        <div key={station.station_id} style={stationStyles}>
          <h2 style={stationHeadingStyles}>Estación: {station.station_id}</h2>
          <p style={stationTextStyles}>Fecha: {station.date}</p>
          <p style={stationTextStyles}>Temperatura: {station.data.temperature} °C</p>
          <p style={stationTextStyles}>Humedad: {station.data.humidity} %</p>
          <p style={stationTextStyles}>Lluvia en 24 horas: {station.data.rain24h} mm</p>
          <p style={stationTextStyles}>Velocidad del viento: {station.data.windSpeed ?? 'No disponible'} m/s</p>
          <p style={stationTextStyles}>Ubicación: {station.data.location.latitude}, {station.data.location.longitude}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherDisplay;
