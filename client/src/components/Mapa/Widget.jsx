// client/src/components/Mapa/Widget.jsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../stilos/witged.css";
import soleadoDia from "./images/soleado-dia.gif";
import soleadoNoche from "./images/soleado-noche.gif";
import lluviaDia from "./images/lluvia-dia.gif";
import lluviaNoche from "./images/lluvia-noche.gif";
import nubladoDia from "./images/nublado-dia.gif";
import nubladoNoche from "./images/nublado-noche.gif";
import tormentaDia from "./images/tormenta-dia.gif";
import tormentaNoche from "./images/tormenta-noche.gif";

// Función para obtener la hora actual
const isDaytime = () => {
  const hours = new Date().getHours();
  return hours >= 6 && hours < 18; // De 6 AM a 6 PM se considera de día
};

// Selección dinámica del fondo según el clima
const getBackgroundClass = (temperature, precipitation, windSpeed) => {
  const dayTime = isDaytime();

  if (windSpeed > 15) return dayTime ? "stormy-day-bg" : "stormy-night-bg";
  if (precipitation > 5) return dayTime ? "rainy-day-bg" : "rainy-night-bg";
  if (precipitation > 0) return dayTime ? "cloudy-day-bg" : "cloudy-night-bg";
  if (temperature >= 30) return dayTime ? "sunny-day-bg" : "sunny-night-bg";
  if (temperature <= 10) return dayTime ? "stormy-day-bg" : "stormy-night-bg";

  return "default-bg";
};

export const Widget = ({ selectedStation }) => {
  const {
    airTemp: temperature,
    rh: humidity,
    pressure,
    windSpeed,
    rain_last: precipitation,
  } = selectedStation.meta || {};

  const { custom } = selectedStation.name || {};

  const backgroundClass = getBackgroundClass(
    temperature || 0,
    precipitation || 0,
    windSpeed || 0
  );

  return (
    <div className={`widget-container pro ${backgroundClass}`}>
      <div className="widget-header">
        <h3>{custom || "Estación No Seleccionada"}</h3>
        <span>{new Date().toLocaleDateString()}</span>
      </div>

      <div className="widget-content">
        <div className="progress-wrapper">
          <CircularProgressbar
            value={temperature || 0}
            maxValue={50}
            text={`${temperature || 0}°C`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#ffffff",
              trailColor: "rgba(255, 255, 255, 0.3)",
            })}
          />
        </div>

        <div className="weather-details">
          <div className="detail">
            <i className="fas fa-tint"></i>
            <span>Humedad: {humidity || 0}%</span>
          </div>
          <div className="detail">
            <i className="fas fa-wind"></i>
            <span>Viento: {windSpeed || 0} m/s</span>
          </div>
          <div className="detail">
            <i className="fas fa-cloud-sun"></i>
            <span>Precipitación: {precipitation || 0} mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};
