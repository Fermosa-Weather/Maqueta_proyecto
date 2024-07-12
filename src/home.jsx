import React from 'react'
import {NavBar} from './components/navBar'
import Tiempo_grafico from './Tiempo-grafico'
import NewsWidget from "./components/NewsWidget"
import WeatherForecast from "./components/WeatherForecast"
import Tiempo_map from './tiempo_map'


export function Home() {

  return (
    <div style={{ backgroundColor: '#34495e', minHeight: '100vh' }} className='fondo'>
        <NavBar></NavBar>
        <Tiempo_map></Tiempo_map>
        <WeatherForecast /> {/* Componente WeatherForecast debajo de los botones */}
        <Tiempo_grafico></Tiempo_grafico>
        <NewsWidget /> {/* Componente NewsWidget */}
    </div>
  )
}
