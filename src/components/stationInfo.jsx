// src/components/StationInfo.jsx
import React from "react";

const StationInfo = ({ station }) => {
  return (
    <div>
      <h5>Información de la Estación</h5>
      <p>Nombre: {station.name}</p>
      <p>Temperatura: {station.temperature}°C</p>
      <p>Humedad: {station.humidity}%</p>
      <p>Presión: {station.pressure} hPa</p>
      <p>Velocidad del Viento: {station.windSpeed} m/s</p>
      <p>Precipitación: {station.precipitation} mm</p>
    </div>
  );
};

export default StationInfo;