import React from 'react';
import WeatherForecast from "./components/Tiempo_Formosa/WeatherReport";
import Nav from './components/Navbar/Nav';
//import TiempoContenedor from './components/Tiempo_Formosa/tiempo_contenedor';
import Estaciones from './components/Info_estaciones/info_estaciones';

export function Tiempo() {
  return (
    <div style={{ backgroundColor: '#34495e' }} className='fondo'>
      <Nav />
      {/* Uncomment the line below if you want to display information about the stations */}
      {/* <Estaciones /> */}

      <WeatherForecast /> 
   
    </div>
  );
}
