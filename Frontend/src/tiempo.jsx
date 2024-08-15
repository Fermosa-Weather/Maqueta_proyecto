import React from 'react'
import WeatherForecast from "./components/Tiempo_Formosa/WeatherForecast"
import Tiempo_map from './components/Tiempo_Formosa/tiempo_map'
import Nav from './components/Navbar/Nav'
import Tiempo_contenedor from './components/Tiempo_Formosa/tiempo_contenedor'
import Noticias from './noticias'


export function Tiempo() {

  return (
      <div style={{ backgroundColor: '#34495e'}} className='fondo'>
        <Nav></Nav>
        <Tiempo_map></Tiempo_map>
        <WeatherForecast /> 
        <Tiempo_contenedor></Tiempo_contenedor>
        <Noticias></Noticias>
      </div>
  )
}
