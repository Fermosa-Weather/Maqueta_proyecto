import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../stilos/perfil.css"

export default function Añadir_foto_modal({ onClose }) {
  const handleContentClick = (e) => {
    e.stopPropagation(); // Evita que el clic dentro del modal cierre el modal
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose} // Cierra el modal si se hace clic fuera del contenido
>
      <div
        className="max-w-xs mx-auto text-white p-6 rounded-lg relative contenedor-modal-perfil"
        onClick={handleContentClick} // Detiene la propagación del evento de clic
      >
        
        <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold">Añade tu foto de perfil</h2>
          <div className="contedor-añadir-img">
            <img
              src="../../../src/images2/arrastra.jpg"
              alt="Profile"
              className="object-cover"
            />
          </div>
        </div>

        <div className='contenedor-form-añadir-foto-botones'>
              <button className="boton-form-añadir-foto" onClick={onClose}>
                cancelar
              </button>
              <button className="boton-form-añadir-foto">
                Cargar una imagen
              </button>
        </div>

      </div>
    </div>
  );
}