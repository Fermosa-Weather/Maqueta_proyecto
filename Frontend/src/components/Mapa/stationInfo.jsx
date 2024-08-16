import React from "react";
import { Link } from 'react-router-dom';
import "../../../src/stilos/stacion_info.css";

const StationInfo = ({ averages }) => {
  return (
    <div className="col-md-3 station-info">
      <div className="p-3 bg-light rounded shadow">
        <h2 className="mb-4">Información General de Formosa</h2>
        <div className="mb-3">
          <p>
            <strong>Temperatura Promedio:</strong>{" "}
            <span className="float-end">{averages.temperature} °C</span>
          </p>
        </div>
        <div className="mb-3">
          <p>
            <strong>Humedad Promedio:</strong>{" "}
            <span className="float-end">{averages.humidity} %</span>
          </p>
        </div>
        <div className="mb-3">
          <p>
            <strong>Presión Promedio:</strong>{" "}
            <span className="float-end">{averages.pressure} hPa</span>
          </p>
        </div>
        <div className="mb-3">
          <p>
            <strong>Velocidad del Viento Promedio:</strong>{" "}
            <span className="float-end">{averages.windSpeed} km/h</span>
          </p>
        </div>
        <div className="mb-3">
          <p>
            <strong>Precipitación Promedio:</strong>{" "}
            <span className="float-end">{averages.precipitation} mm</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StationInfo;
