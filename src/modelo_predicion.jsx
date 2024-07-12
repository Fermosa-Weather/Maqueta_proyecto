import React from 'react'
import {NavBar} from './components/navBar'
import PredictionForm from './components/PredictionForm'; // Importa sin llaves

export function Modelo_predicion() {
  
  return (
    <div>
        <NavBar></NavBar>
        <PredictionForm />
    </div>
  )
}
