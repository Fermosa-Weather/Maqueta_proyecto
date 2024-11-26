import { useState, useEffect } from 'react';
import "../../../src/stilos/Plantilla_slider2/css/style2.css";
import "../../stilos/Plantilla_slider2/css/bootstrap2.css";
import "../../stilos/Plantilla_slider2/css/responsive2.css";
import { Link } from 'react-router-dom';

export function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '../../../src/stilos/Plantilla_slider2/images/clima2.jpg',
    '../../../src/stilos/Plantilla_slider2/images/tormenta.jpg',
    '../../../src/stilos/Plantilla_slider2/images/estadistica.jpg',
    '../../../src/stilos/Plantilla_slider2/images/estacion.jpg',
    '../../../src/stilos/Plantilla_slider2/images/Noticias.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 13000); // Cambiar de imagen cada 15 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div className="contenedor_slider">
      <section className="slider_section position-relative">
        <div className="slider_bg-container"></div>
        <div className="slider-container">
          <div className="detail-box">
            <a className="carousel-control-prev" onClick={prevSlide} role="button">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" onClick={nextSlide} role="button">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>

            <h1>Descubre Nuestra Plataforma Meteorológica</h1>
            <p>
            Nuestro sistema proporciona información sobre el tiempo en la provincia de Formosa. Se obtienen datos de 10 estaciones meteorológicas ubicadas a lo largo de la provincia. La aplicación cuenta con dashboards, mapas de las estaciones, un modelo de predicción con inteligencia artificial y noticias sobre el clima en diferentes localidades. La aplicación mostrará datos como humedad, precipitaciones, calidad del aire, entre otros.            </p>
            <div>
              <Link to="/contacto">
                <span className="slider-link">CONTACT US</span>
              </Link>
            </div>
          </div>
          <div className="img-box">
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide}
                alt="Slider"
                className={`img-fluid ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
