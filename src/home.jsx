import React from 'react'
import {NavBar} from './components/navBar'
import Tiempo_grafico from './Tiempo-grafico'
import Tiempo from "./tiempo"
import NewsWidget from "./components/NewsWidget"
import WeatherForecast from "./components/WeatherForecast"
import WeatherCard from './components/WeatherCard'
import MiniMap from './components/MiniMap'

const weatherInfo = {
  location: "Formosa, Argentina",
  temperature: "13°C",
  feelsLike: "Sensación térmica: 11°C",
  windSpeed: "Viento: 15 km/h",
  humidity: "Humedad: 58%",
  visibility: "Visibilidad: 20 km",
  pressure: "Presión: 1024 mbar",
  dewPoint: "Punto de rocío: 5°C",
};

export function Home() {

  return (
    <div>
        <NavBar></NavBar>
        <WeatherCard data={weatherInfo}></WeatherCard>
        <MiniMap></MiniMap>
        <WeatherForecast /> {/* Componente WeatherForecast debajo de los botones */}
        <NewsWidget /> {/* Componente NewsWidget */}
        <Tiempo_grafico></Tiempo_grafico>
    </div>
  )
}
