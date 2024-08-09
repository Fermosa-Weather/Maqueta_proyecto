import React from "react";
import "../../stilos/inicio.css"; // Asegúrate de que el archivo de estilo esté en la ruta correcta

const Landing_page = () => {
  return (
    <div>
      <div className="home">
        <div className="somos">
          <h1>RAF(Red Agrometeorologicas de Formosa)</h1>
          <h3>Descubre el Clima de Formosa como Nunca Antes</h3>
          <p>
            Un sistema que proporciona información sobre el tiempo y el clima en la provincia de Formosa. Se recopilan datos de 10 estaciones meteorológicas ubicadas a lo largo de la provincia. La aplicación cuenta con dashboards, mapas de las estaciones, un modelo de predicción con inteligencia artificial, y noticias sobre el clima en diferentes localidades. La aplicación mostrará datos como humedad, precipitaciones, calidad del aire, entre otros.
          </p>
        </div>
        <div className="imagen">
        <img src="../../../src/images//fondoClima.avif" alt="Estación meteorológica" />
        </div>
      </div>

      <div className="ventana_clima">
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
      </div>

      <div className="clima_en_tus_manos">
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
      </div>

      <div className="Características_principales">
        <h2>Características Principales</h2>

        <div className="features_principal">
          <div className="feature_principal">
            <h3>📊 Dashboards Intuitivos y faciles de usar</h3>
            <img src="../../../src/images/Grafico_estadistico_animado.jpg" alt="" />
            <p>
              Visualiza los datos meteorológicos de forma clara y sencilla. Nuestros dashboards te permiten entender el clima de un vistazo.
            </p>
          </div>
          <div className="feature_principal">
            <h3>🗺️ Mapa Interactivo de Estaciones</h3>
            <img src="../../../src/images/Mapa_formosa.jpg" alt="" />
            <p>
              Explora la ubicación de nuestras 10 estaciones meteorológicas. Haz clic en cada una para obtener información detallada sobre su ubicación y los datos que recopila.
            </p>
          </div>
          <div className="feature_principal">
            <h3>🤖 Predicción con Inteligencia Artificial</h3>
            <img src="../../../src/images/IA.avif" alt="" />
            <p>
              Nuestro modelo de IA analiza patrones climáticos históricos para ofrecerte predicciones precisas. ¡Planifica tus actividades con confianza!
            </p>
          </div>
          <div className="feature_principal">
            <h3>📰 Noticias Climáticas Locales</h3>
            <img src="../../../src/images/Noticas_animado.jpg" alt="" />
            <p>
              Mantente informado sobre eventos climáticos importantes en tu localidad. Desde alertas por tormentas hasta consejos para días calurosos, te mantenemos al día con información relevante.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing_page;
