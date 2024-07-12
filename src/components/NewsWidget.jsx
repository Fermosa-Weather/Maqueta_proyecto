import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import '../stilos/NewsWidget.css'; 
import lasLomitasImage from '../images2/laslomitas.jpg';
import capitalImage from '../images2/ciudadformosa.jfif';
import alertaRafagasImage from '../images2/clorinda.jpg';
import herraduraImage from '../images2/herradura.jpg';
import ibarretaImage from '../images2/ibarreta.jpg';
import Comentario from './comentario';

const NewsWidget = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(null);

  const handleShowModal = (index) => {
    setCurrentNewsIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentNewsIndex(null);
  };

  const newsData = [
    {
      "title": "Se esperan lluvias intensas en Las Lomitas",
      "description": "Para este fin de semana se pronostican lluvias fuertes en Las Lomitas.",
      "imageUrl": lasLomitasImage
    },
    {
      "title": "En la capital formoseña el clima seguirá frío para los próximos días",
      "description": "Se prevén bajas temperaturas durante los próximos días en la ciudad.",
      "imageUrl": capitalImage
    },
    {
      "title": "Alerta por ráfagas de viento en Clorinda",
      "description": "Se emite alerta por ráfagas de viento en Clorinda y sus alrededores.",
      "imageUrl": alertaRafagasImage
    },
    {
      "title": "Fuerte granizada sorprende a Herradura",
      "description": "Los habitantes de Herradura se sorprendieron esta mañana con una fuerte granizada que cubrió las calles de blanco.",
      "imageUrl": herraduraImage
    },
    {
      "title": "Aumento significativo de temperatura en Ibarreta",
      "description": "Ibarreta experimentará un aumento significativo de temperatura durante la próxima semana, alcanzando máximas históricas para esta época del año.",
      "imageUrl": ibarretaImage
    }
  ];

  return (
    <div className="News-widget">
      <h2 className='title_noticia'>Noticias sobre el Clima en Formosa</h2>
      <div className="News-container">
        {newsData.map((item, index) => (
          <div key={index} className="News-item">
            {item.imageUrl && (
              <img src={item.imageUrl} alt={item.title} className="News-image" />
            )}
            <div className="News-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="News-actions">
                <FontAwesomeIcon icon={faThumbsUp} className="action-icon" />
                <FontAwesomeIcon icon={faThumbsDown} className="action-icon" />
                <FontAwesomeIcon icon={faComment} className="action-icon" onClick={() => handleShowModal(index)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{newsData[currentNewsIndex].title}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <Comentario />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsWidget;
