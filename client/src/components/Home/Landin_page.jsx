import React from 'react';
import { Link } from 'react-router-dom'; 
import { useTheme } from '../../contex/themaContext'; // Importa el hook useTheme
import "../../stilos/inicio.css"; 
import {Slider} from './slider';



const Landing_page = ({ searchTerm }) => {
  const { theme, toggleTheme } = useTheme();  // Accede al tema y la función para cambiarlo

  return (
    <div className={`contenedor_landing ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>

      <Slider />
    

 
    </div>
  );
};

export default Landing_page;
