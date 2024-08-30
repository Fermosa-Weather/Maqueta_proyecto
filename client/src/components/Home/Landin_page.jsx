import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import "../../stilos/inicio.css"; 
import {Slider} from './slider';
import Ventana_clima from '../Info_estaciones/venta_clima';
import Clima_manos from '../Info_estaciones/clima_manos';
import Características_principales from '../Info_estaciones/caracteristica_principales';

const Landing_page = ({ searchTerm }) => {
  
  // const features = [
  //   {
  //     title: "🗺️ Mapa Interactivo de Estaciones",
  //     image: "../../../src/images/Mapa_formosa.jpg",
  //     description: "Explora la ubicación de nuestras 10 estaciones meteorológicas. Haz clic en cada una para obtener información detallada sobre su ubicación y los datos que recopila.",
  //     link: "/mapa"  
  //   },
  //   {
  //     title: "🤖 Predicción con Inteligencia Artificial",
  //     image: "../../../src/images/IA.avif",
  //     description: "Nuestro modelo de IA analiza patrones climáticos históricos para ofrecerte predicciones precisas. ¡Planifica tus actividades con confianza!",
  //     link: "/modelo_prediccion"  // Internal link
  //   },
  //   {
  //     title: "📰 Noticias Climáticas Locales",
  //     image: "../../../src/images/Noticas_animado.jpg",
  //     description: "Mantente informado sobre eventos climáticos importantes en tu localidad. Desde alertas por tormentas hasta consejos para días calurosos, te mantenemos al día con información relevante.",
  //     link: "/noticias"  // Internal link
  //   },
  //   {
  //     title: "📊 Dashboards Intuitivos y faciles de usar",
  //     image: "../../../src/images/Grafico_estadistico_animado.jpg",
  //     description: "Visualiza los datos meteorológicos de forma clara y sencilla. Nuestros dashboards te permiten entender el clima de un vistazo.",
  //     link: "/dashboards" 
  //   },
  //   {
  //     title: "📡 Información Detallada de las Estaciones",
  //     image: "../../../src/images/panel.jpg",
  //     description: "Accede a datos meteorológicos precisos obtenidos de nuestras 10 estaciones. Mantente informado con la información más actualizada y relevante.",
  //     link: "/estaciones" 
  //   }
  // ];

  // const filteredFeatures = features.filter(feature =>
  //   feature.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <Slider></Slider>
      <Ventana_clima></Ventana_clima>
      <Clima_manos></Clima_manos>
      <Características_principales></Características_principales>
      {/* <div className="ventana_clima">
        <h2>Tu Ventana al Clima Provincial</h2>
        <p>
          ¿Alguna vez te has preguntado cómo será el tiempo mañana en tu localidad? ¿O si deberías llevar paraguas al trabajo? La Red de Estaciones Meteorológicas de Formosa tiene la respuesta a todas tus preguntas sobre el clima.
        </p>
      </div>

      <div className="pensado_clima">
        <div className="persona_pensando">
          <img src="../../../src/images/pensando.jpg" alt="Estación meteorológica" />
        </div>
        <div className="features">
          <div className="feature">
            <h3>🌡️ Temperatura</h3>
            <p>Obtén datos precisos sobre la temperatura en tu localidad.</p>
          </div>
          <div className="feature">
            <h3>💧 Humedad</h3>
            <p>Consulta los niveles de humedad para estar preparado.</p>
          </div>
          <div className="feature">
            <h3>🌧️ Precipitaciones</h3>
            <p>Conoce la cantidad de lluvia prevista.</p>
          </div>
          <div className="feature">
            <h3>💨 Velocidad del viento</h3>
            <p>Información detallada sobre la velocidad del viento.</p>
          </div>
          <div className="feature">
            <h3>🍃 Calidad del aire</h3>
            <p>Mantente informado sobre la calidad del aire en tu zona.</p>
          </div>
        </div>
      </div> */}

      {/* <div className="clima_en_tus_manos">
        <div className="clima_manos">
          <h2>El Clima en Tus Manos</h2>
          <p>Con la aplicación de la Red Agrometeorologicas de Formosa, tendrás acceso a:</p>
          <div>
            <ul>
              <li>Datos en tiempo real de 10 estaciones</li>
              <li>Predicciones precisas basadas en IA</li>
              <li>Información sobre calidad del aire</li>
              <li>Datos de las estaciones</li>
              <li>Estadística en base a las estaciones</li>
              <li>Noticias locales sobre el clima</li>
            </ul>
          </div>
        </div>
        <div className="manos">
          <img src="../../../src/images/manos.jpg" alt="" />
        </div>
      </div> */}

      {/* <div className="Características_principales">
        <h2>Características Principales</h2>

        <div className="features_principal">
          {filteredFeatures.length > 0 ? (
            filteredFeatures.map((feature, index) => (
              <div key={index} className="feature_principal">
                <Link to={feature.link}>
                  <h3>{feature.title}</h3>
                  <img src={feature.image} alt={feature.title} />
                </Link>
                <p>{feature.description}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron características.</p>
          )}
        </div>
      </div> */}

    </div>
  );
};

export default Landing_page;
