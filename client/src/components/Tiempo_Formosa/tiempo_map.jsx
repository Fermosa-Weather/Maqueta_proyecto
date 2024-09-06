import React from 'react';
import WeatherCard from './WeatherCard';
import MiniMap from '../Mapa/MiniMap';
import "../../../src/stilos/tiempo_map.css"

const weatherInfo = {
    location: "Formosa, Argentina",
    temperature: "13°C",
    feelsLike: "Sensación térmica: 11°C",
    windSpeed: "Viento: 15 km/h",
    humidity: "Humedad: 58%",
    visibility: "Visibilidad: 20 km",
    pressure: "Presión: 1024 mbar",
    dewPoint: "Punto de rocío: 5°C",
};

function Tiempo_map() {
    return (
        <div className="tiempo-map__container">
            <div className="tiempo-map__row">
                <div className="tiempo-card__col">
                    <WeatherCard data={weatherInfo} />
                </div>
                <div className="tiempo-map__col">
                    <MiniMap />
                </div>
            </div>
        </div>
    );
}

export default Tiempo_map;
