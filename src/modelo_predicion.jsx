import React from 'react'
import {NavBar} from './components/Navbar/navBar'
import PredictionForm from './components/Modelo_predicion/PredictionForm'; // Importa sin llaves

export function Modelo_predicion() {
  
  return (
    <div>
        <NavBar></NavBar>
        <PredictionForm />
    </div>
  )
}
