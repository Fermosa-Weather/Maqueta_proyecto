import { useState } from 'react';
import { FaUser, FaUserAlt, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import "../../stilos/perfil.css";
import Añadir_foto_modal from './añadir_foto';

export default function Editar_perfi() {
  // Estado del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={openModal} // Manejador de click en el contenedor
            >
              <img
                src="../../../src/images2/yuichi.jpg"
                alt="Profile"
                className="h-24 w-24 rounded-full border-4 border-primary group-hover:opacity-40 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center icono-camara">
                <FaCamera className="text-black text-3xl" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-semibold">John Doe</div>
              <div className="text-sm text-gray-500">jonh13@gmail.com</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-7">
                Nombre completo
              </label>
              <input
                id="name"
                placeholder="Ingrese su nombre completo"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className="relative">
              <FaUserAlt className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 ml-7">
                Username
              </label>
              <input
                id="username"
                placeholder="Ingrese su username"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className="relative">
              <FaMapMarkerAlt className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 ml-7">
                Location
              </label>
              <input
                id="location"
                placeholder="Ingrese su localidad"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className='contenedor-form-editar-botones'>
              <button className="boton-form-editar-perfil">
                cancelar
              </button>
              <button className="boton-form-editar-perfil">
                Save Changes
              </button>
            </div>
          
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="../../../src/images2/editar3.jpg"
            alt="Edit Profile"
            className="w-full max-w-[400px] rounded-lg bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Agregar el modal aquí */}
      {isModalOpen && <Añadir_foto_modal onClose={closeModal} />}
    </div>
  );
}
