import React, { useEffect, useState } from "react";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiShowers,
} from "react-icons/wi"; // Importar íconos
import "../../stilos/WeatherCard.css"; // Asegúrate de tener este archivo CSS
import soleado from "../../assets/widgett/soleado.mp4";
import nublado from "../../assets/widgett/noche_nublado.mp4";
import lluvia from "../../assets/widgett/lluvia.mp4";
import chubascos from "../../assets/widgett/noche_lluvia.mp4";
import tormenta from "../../assets/widgett/atardecer.mp4";
import noche from "../../assets/widgett/noche.mp4";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Simular datos de clima
    setTimeout(() => {
      const simulatedWeatherData = {
        location: "Buenos Aires",
        temperature: 22,
        humidity: 60,
        windSpeed: 5,
        condition: "soleado", // Estado del clima
      };
      setWeather(simulatedWeatherData);
      setLoading(false); // Desactivar carga
    }, 1500); // Retraso de 1.5 segundos
  }, []);

  // Función para obtener el ícono según la condición del clima
  const getBackgroundVideo = (condition) => {
    switch (condition.toLowerCase()) {
      case "soleado":
        return soleado;
      case "nublado":
        return nublado;
      case "lluvia":
        return lluvia;
      case "chubascos":
        return chubascos;
      case "tormenta":
        return tormenta;
      default:
        return noche;
    }
  };

  return (
    <div className="weather-widget">
      <video
        className="background-video"
        autoPlay
        loop
        muted
        src={getBackgroundVideo(weather?.condition)}
      />
      {loading ? (
        <div className="loading-spinner">Cargando...</div>
      ) : (
        <>
          <div className="weather-location">{weather.location}</div>
          <div className="weather-status">
            Clima Actual {getWeatherIcon(weather.condition)}
          </div>
          <div className="weather-info">
            <div className="weather-box">
              <span className="weather-label">Temperatura</span>
              <span className="weather-value">{weather.temperature}°C</span>
            </div>
            <div className="weather-box">
              <span className="weather-label">Humedad</span>
              <span className="weather-value">{weather.humidity}%</span>
            </div>
            <div className="weather-box">
              <span className="weather-label">Viento</span>
              <span className="weather-value">{weather.windSpeed} m/s</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
