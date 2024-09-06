import React, { useState } from 'react';
import Comentario from '../comentarios/comentario';
import lasLomitasImage from '../../images2/laslomitas.jpg';
import capitalImage from '../../images2/ciudadformosa.jfif';
import alertaRafagasImage from '../../images2/clorinda.jpg';
import herraduraImage from '../../images2/herradura.jpg';
import '../../../src/stilos/NewsWidget.css';

const newsData = [
  {
    title: "Se esperan lluvias intensas en Las Lomitas",
    description: "Para este fin de semana se pronostican lluvias fuertes en Las Lomitas.",
    imageUrl: lasLomitasImage,
    category: "Lluvia"
  },
  {
    title: "En la capital formoseña el clima seguirá frío para los próximos días",
    description: "Se prevén bajas temperaturas durante los próximos días en la ciudad.",
    imageUrl: capitalImage,
    category: "Frío"
  },
  {
    title: "Alerta por ráfagas de viento en Clorinda",
    description: "Se emite alerta por ráfagas de viento en Clorinda y sus alrededores.",
    imageUrl: alertaRafagasImage,
    category: "Viento"
  },
  {
    title: "Fuerte granizada sorprende a Herradura",
    description: "Los habitantes de Herradura se sorprendieron esta mañana con una fuerte granizada que cubrió las calles de blanco.",
    imageUrl: herraduraImage,
    category: "Granizo"
  },
];

const NewsWidget = ({ searchTerm = '' }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(null);

  const handleShowModal = (index) => {
    setCurrentNewsIndex(index);
    setShowModal(true);
  };

  const filteredNews = newsData.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="news-widget">
      <h2 className="news-title">Noticias sobre el Clima en Formosa</h2>
      <div className="news-grid">
        {filteredNews.map((item, index) => (
          <div key={index} className="news-card">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="news-image" />
            )}
            <div className="news-content">
              <span className="news-badge">{item.category}</span>
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">
              {currentNewsIndex !== null && newsData[currentNewsIndex].title}
            </h3>
            <div className="modal-body">
              <Comentario />
            </div>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsWidget;