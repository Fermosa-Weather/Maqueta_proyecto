import React, { useState, useRef } from 'react';
import "../../stilos/perfil.css";

export default function Añadir_foto_modal({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleContentClick = (e) => {
    e.stopPropagation(); // Evita que el clic dentro del modal cierre el modal
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Simula un clic en el input de archivo
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose} // Cierra el modal si se hace clic fuera del contenido
    >
      <div
        className="max-w-xl mx-auto text-white p-6 rounded-lg relative contenedor-modal-perfil"
        onClick={handleContentClick} // Detiene la propagación del evento de clic
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl text-dark font-semibold">Añade tu foto de perfil</h2>
          <div className="contedor-añadir-img">
            <img
              src={selectedImage || "../../../src/images2/arrastra.jpg"}
              alt="Profile"
              className="object-cover"
            />
          </div>
          <p className='text-dark'>o</p>
          <button className="boton-form-añadir-foto" onClick={handleButtonClick}>
            Cargar una imagen
          </button>
        </div>

        <div className='contenedor-form-añadir-foto-botones'>
          <button className="boton-form-añadir-foto" onClick={onClose}>
            Cancelar
          </button>
          <button className="boton-form-añadir-foto" onClick={handleButtonClick}>
            Cargar
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
