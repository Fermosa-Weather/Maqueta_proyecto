import React from 'react'
import Tiempo from './tiempo'
import NewsWidget from "./components/Noticias/NewsWidget"
import WeatherForecast from "./components/Tiempo_Formosa/WeatherForecast"
import Tiempo_map from './components/Tiempo_Formosa/tiempo_map'
import { Nav } from './components/Navbar/Nav'


export function Home() {

  return (
    <div style={{ backgroundColor: '#34495e', minHeight: '100vh' }} className='fondo'>
        <Nav></Nav>
        <Tiempo_map></Tiempo_map>
        <WeatherForecast /> 
        <Tiempo></Tiempo>
        <NewsWidget /> 
    </div>
  )
}
