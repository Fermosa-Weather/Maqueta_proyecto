import React from 'react';

function Comentario() {
  return (
    <div className="comentario-container">
    <h1>Comentarios</h1>
      <textarea className="form-control" rows="3" placeholder="Escribe tu comentario aquí..."></textarea>
      <button type="button" className="btn btn-primary mt-2">Enviar</button>
    </div>
  );
}

export default Comentario;
