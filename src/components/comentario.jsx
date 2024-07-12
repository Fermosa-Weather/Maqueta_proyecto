import React from 'react';
import { Link } from 'react-router-dom';
import '../stilos/Comentario.css'; // Asegúrate de importar tu archivo CSS

function Comentario() {
  return (
    <div className="comentario-container">
      <h1>Comentarios</h1>
      <textarea className="form-control" rows="3" placeholder="Escribe tu comentario aquí..."></textarea>
      <button type="button" className="btn btn-primary mt-2">Enviar</button>
      <Link to="/comments">
        <button type="button" className="btn btn-link view-comments-button mt-4">Ver comentarios anteriores</button>
      </Link>
    </div>
  );
}

export default Comentario;
