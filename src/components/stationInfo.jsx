import React from "react";
import { Link } from 'react-router-dom';

const StationInfo = ({ averages }) => {
  return (
    <div className="col-md-3">
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
      <div className="p-3 bg-light rounded shadow mt-4 d-flex justify-content-center align-items-center flex-column">
        <Link className="btn btn-primary m-2 w-75" to="/estadistica_tiempo_real">
          Generar estadística
        </Link>
        <button className="btn btn-success m-2 w-75">
          Ver todas las estaciones
        </button>
      </div>
    </div>
  );
};

export default StationInfo;
