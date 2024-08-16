import React from 'react';
import '../../../src/stilos/about.css'; // Asegúrate de crear e incluir estilos CSS adecuados

const About = () => {
  return (
    <div className="about-container">
      <h1>Sobre RAF Estaciones</h1>
      <p>
        En <strong>RAF</strong> nos dedicamos a proporcionar datos climáticos precisos y en tiempo real de toda la provincia de Formosa, 
        recopilados de nuestras 10 estaciones meteorológicas. Nuestro objetivo es mejorar los pronósticos del tiempo, desarrollar modelos 
        agrícolas y generar estadísticas climáticas confiables, contribuyendo así al conocimiento y la gestión del cambio climático.
      </p>
      <section className="about-mission">
        <h2>Nuestra Misión</h2>
        <p>
          Mejorar la precisión de los pronósticos meteorológicos para la provincia de Formosa mediante la recopilación y análisis de datos 
          de nuestras estaciones meteorológicas. Queremos apoyar a los agricultores y a la comunidad en general con información confiable 
          para la gestión del cambio climático.
        </p>
      </section>
      <section className="about-vision">
        <h2>Nuestra Visión</h2>
        <p>
          Ser la principal fuente de datos climáticos en Formosa, expandiendo nuestras capacidades y mejorando continuamente la calidad 
          y precisión de nuestras predicciones. Buscamos ser un referente en la investigación y desarrollo de soluciones para el cambio 
          climático y el manejo agrícola.
        </p>
      </section>
      <section className="about-contact">
        <h2>Contáctanos</h2>
        <p>
          Si tienes preguntas, sugerencias o deseas saber más sobre nuestras estaciones meteorológicas y servicios, contáctanos en 
          <a href="mailto:info@rafestaciones.com"> info@rafestaciones.com</a>.
        </p>
      </section>
    </div>
  );
};

export default About;