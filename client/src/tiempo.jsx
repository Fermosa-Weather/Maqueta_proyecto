import React from 'react'
import WeatherForecast from "./components/Tiempo_Formosa/WeatherForecast"
import Tiempo_map from './components/Tiempo_Formosa/tiempo_map'
import Nav from './components/Navbar/Nav'
import Tiempo_contenedor from './components/Tiempo_Formosa/tiempo_contenedor'
import Layout from './components/Info_estaciones/layaout'
import Estaciones from './components/Info_estaciones/estaciones'


export function Tiempo() {

  return (
      <div style={{ backgroundColor: '#34495e'}} className='fondo'>
        <Nav></Nav>
        <Layout>
          <Estaciones>
          </Estaciones>
        </Layout>
        <Tiempo_map></Tiempo_map>
        <WeatherForecast /> 
        <Tiempo_contenedor></Tiempo_contenedor>
      </div>
  )
}
