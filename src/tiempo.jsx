import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tiempo_por_hora from "./components/tiempo_por_hora";
import WeatherForecast from "./components/Tiempo-grafico";

const Tiempo = () => {
  const [selectedView, setSelectedView] = useState('resumen');

  const renderComponent = () => {
    if (selectedView === 'resumen') {
      return <WeatherForecast />;
    } else if (selectedView === 'por_hora') {
      return <Tiempo_por_hora />;
    }
  };

  return (
    <div className="general">
      <div className="weather-container">
        <div className="weather-header">
          <Link to="/" onClick={() => setSelectedView('resumen')}>Resumen</Link>
          <Link to="/" onClick={() => setSelectedView('por_hora')}>Por horas</Link>
          <Link to="/tiempo_detalles">Más detalles</Link>
        </div>
        <div className="contenedor_tiempo_por_hora">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Tiempo;
