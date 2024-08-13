import React from 'react';
import { Link } from 'react-router-dom';
import '../../stilos/pagina_bienvenida.css';

const Bienvenida = () => {
  return (
    <section className="inicio" >
      <div className="content">
        <h3>Raf</h3>
        <span>Estaciones</span>
        <p>
          En RAF nos dedicamos a proporcionar datos climáticos precisos y en tiempo real de toda la provincia de Formosa, recopilados de nuestras 10 estaciones meteorológicas. Nuestro objetivo es mejorar los pronósticos del tiempo, desarrollar modelos agrícolas y generar estadísticas climáticas confiables, contribuyendo así al conocimiento y la gestión del cambio climático.
        </p>
        <Link to="/home" className="btn">Ver más</Link>
      </div>

      <div className="imagen">
        <img src="../../../src/images/panel.jpg"  alt="Estación meteorológica" />
      </div>
    </section>
  );
};

export default Bienvenida;
