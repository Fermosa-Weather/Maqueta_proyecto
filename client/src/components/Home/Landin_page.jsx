import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import "../../stilos/inicio.css"; 
import {Slider} from './slider';
import Ventana_clima from './venta_clima';
import Clima_manos from './clima_manos';
import Características_principales from './caracteristica_principales';

const Landing_page = ({ searchTerm }) => {
  
  return (
    <div>
      <Slider></Slider>
      <Ventana_clima></Ventana_clima>
      <Clima_manos></Clima_manos>
      <Características_principales></Características_principales>
    </div>
  );
};

export default Landing_page;
