import React from 'react';
import { Link } from 'react-router-dom';
import '../../../src/stilos/about.css'; // Asegúrate de que esta ruta sea correcta
//import misionImage from '../../images2/laslomitas.jpg'; // Asegúrate de que la ruta a la imagen sea correcta
//import visionImage from '../../images2/laslomitas.jpg'; // Asegúrate de que la ruta a la imagen sea correcta

const Acerca_Nosotros = () => {
  return (
      <div className="acerca-nosotros-content">
        <h1 className="acerca-nosotros-header">Sobre CIFOR</h1>
        
        <div className="acerca-nosotros-block">
          <p className="acerca-nosotros-paragraph">
            En <strong>CIFOR</strong> nos dedicamos a proporcionar datos climáticos precisos y en tiempo real de toda la provincia de Formosa, obtenidos de distintos servicios de estaciones meteorológicas. A través de la recopilación y análisis de estos datos, buscamos mejorar la precisión de los pronósticos del tiempo, desarrollar modelos agrícolas más efectivos y generar estadísticas climáticas confiables. Nuestro objetivo es ofrecer herramientas útiles para la toma de decisiones en actividades cotidianas, como la agricultura y el turismo, y contribuir al conocimiento y la gestión del cambio climático en la región. De este modo, aspiramos a proporcionar a la comunidad información valiosa para enfrentar los retos climáticos y promover un desarrollo sostenible.
          </p>
        </div>

        <section className="acerca-nosotros-block acerca-nosotros-mision">
          <h2 className="acerca-nosotros-section-header">Nuestra Misión</h2>
      
          <p className="acerca-nosotros-paragraph">
          Nuestro objetivo es mejorar la precisión de los pronósticos meteorológicos para la provincia de Formosa mediante el consumo y análisis de datos obtenidos de diversas APIs meteorológicas. Queremos brindar a los usuarios comunes, especialmente a los habitantes de la región, información confiable y actualizada sobre las condiciones climáticas. Nuestra app está diseñada para facilitar la planificación de actividades cotidianas, como el trabajo agrícola o el turismo, ofreciendo pronósticos precisos que ayuden a tomar decisiones informadas y a optimizar el tiempo según las condiciones climáticas.
          </p>
        </section>

        <section className="acerca-nosotros-block acerca-nosotros-vision">
          <h2 className="acerca-nosotros-section-header">Nuestra Visión</h2>
      
          <p className="acerca-nosotros-paragraph">
            Ser la principal fuente de datos climáticos en Formosa, expandiendo nuestras capacidades y mejorando continuamente la calidad 
            y precisión de nuestras predicciones. Buscamos ser un referente en la investigación y desarrollo de soluciones para el cambio 
            climático y el manejo agrícola.
          </p>
        </section>

        <section className="acerca-nosotros-block acerca-nosotros-contacto">
          <h2 className="acerca-nosotros-section-header">Contáctanos</h2>
          <p className="acerca-nosotros-paragraph">
            Nuestro equipo de soporte está aquí para ayudarte. Revisaremos tu consulta con la mayor prontitud posible y nos pondremos en contacto contigo a la brevedad.
          </p>
          <div className="button-container">
            <Link to="/contacto">
              {/* <i className="bi bi-envelope"></i> Contacto */}
              <button className="acerca-nosotros-contact-button bi bi-envelope"> Ir a Contacto</button>
            </Link>
          </div>
        </section>
      </div>
  );
};

export default Acerca_Nosotros;