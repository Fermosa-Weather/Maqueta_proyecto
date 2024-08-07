import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WeatherForecast from "./components/Tiempo_Formosa/Tiempo-grafico";
import Tiempo_por_hora from "./components/Tiempo_Formosa/tiempo_por_hora";
import Weather_details from "./components/Tiempo_Formosa/Tiempo_detalles";
import "./stilos/tiempo_general.css"

const Tiempo = () => {
  const [selectedView, setSelectedView] = useState('resumen');

  const renderComponent = () => {
    if (selectedView === 'resumen') {
      return <WeatherForecast />;
    } else if (selectedView === 'por_hora') {
      return <Tiempo_por_hora />;
    } else if (selectedView === 'detalles') {
      return <Weather_details />;
    }
  };

  return (
    <div className="general">
      <div className="weather-container">
        <div className="weather-header">
          <Link to="/" onClick={() => setSelectedView('resumen')}>Resumen</Link>
          <Link to="/" onClick={() => setSelectedView('por_hora')}>Por horas</Link>
          <Link to="/" onClick={() => setSelectedView('detalles')}>Más detalles</Link>
        </div>
        <div className="contenedor_tiempo_por_hora">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Tiempo;
