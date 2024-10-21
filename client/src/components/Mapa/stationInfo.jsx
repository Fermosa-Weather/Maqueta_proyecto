import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../src/stilos/stacion_info.css";

const iconMapper = {
  temperature: "fas fa-thermometer-half",
  humidity: "fas fa-tint",
  pressure: "fas fa-tachometer-alt",
  windSpeed: "fas fa-wind",
  precipitation: "fas fa-cloud-rain",
};

const otroIcon = {
  temperature: "wi wi-thermometer",
  humidity: "wi wi-humidity", // Alternativa al ícono de humedad
  pressure: "wi wi-barometer",
  windSpeed: "wi wi-strong-wind",
  precipitation: "wi wi-rain",
};

const StationInfo = ({ averages, stations }) => {
  const getIcon = (key) => (
    <i
      className={`${iconMapper[key] || "fas fa-question-circle"} widget-icon`}
    ></i>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Card general con promedios */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">
                Información General de Formosa
              </h5>
              <div className="d-flex justify-content-around">
                {Object.entries(averages).map(([key, value]) => (
                  <div key={key} className="widget">
                    {getIcon(key)}
                    <p className="widget-text">
                      <strong>{traducirClave(key)}:</strong> {value}{" "}
                      {getUnidad(key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas para cada estación */}
        {stations.map((station) => (
          <div className="col-md-4 mb-3" key={station.id}>
            <div className="card h-100 shadow-sm">
              <div
                className="card-header"
                style={{ backgroundColor: station.color }}
              >
                <h5 className="card-title text-white">{station.name}</h5>
              </div>
              <div className="card-body">
                <p className="card-text">{station.info}</p>
                <ul className="list-group list-group-flush">
                  {Object.entries(station).map(([key, value]) =>
                    iconMapper[key] ? (
                      <li className="list-group-item" key={key}>
                        {getIcon(key)} <strong>{traducirClave(key)}:</strong>{" "}
                        {value} {getUnidad(key)}
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Función para traducir las claves
const traducirClave = (key) => {
  const traducciones = {
    temperature: "Temperatura",
    humidity: "Humedad",
    pressure: "Presión",
    windSpeed: "Velocidad del Viento",
    precipitation: "Precipitación",
  };
  return traducciones[key] || key;
};

// Función para obtener la unidad correcta
const getUnidad = (key) => {
  switch (key) {
    case "temperature":
      return "°C";
    case "humidity":
      return "%";
    case "pressure":
      return "hPa";
    case "windSpeed":
      return "m/s";
    case "precipitation":
      return "mm";
    default:
      return "";
  }
};

export default StationInfo;
