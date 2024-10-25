import React, { useState, useRef } from 'react';
import "../../stilos/perfil.css";

export default function Añadir_foto_modal({ onClose, userId }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleContentClick = (e) => e.stopPropagation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => fileInputRef.current.click();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) {
      alert('Por favor, selecciona una imagen antes de subirla.');
      return;
    }

    const formData = new FormData();
    formData.append('fotoUser', imageFile);

    try {
      const response = await fetch(`/api/upload/${userId}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        onClose();
      } else {
        alert('Error al subir la imagen: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al subir la imagen.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="max-w-xl mx-auto text-white p-6 rounded-lg relative contenedor-modal-perfil" onClick={handleContentClick}>
        <div className="flex flex-col items-center">
          <h2 className="text-xl text-dark font-semibold">Añade tu foto de perfil</h2>
          <div className="contedor-añadir-img" onDragOver={handleDragOver} onDrop={handleDrop}>
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
          <button className="boton-form-añadir-foto" onClick={uploadImage}>
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
