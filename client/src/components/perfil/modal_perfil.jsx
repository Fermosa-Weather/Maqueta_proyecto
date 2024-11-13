import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchUserInfo } from "../Function/infoToken";
import "../../stilos/perfil.css";
import { FaUserFriends, FaCog, FaSignOutAlt, FaMoon } from 'react-icons/fa';

export default function Perfil_modal({ onClose }) {
  const [userData, setUserData] = useState({
    email: '',
    photoUrl: '../../../src/images/usuario.jpg',
    name: ''
  });

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleLogout = () => {
    // Oculta temporalmente los datos del usuario
    setUserData({
      email: '',
      photoUrl: '../../../src/images/usuario.jpg',
      name: ''
    });
  
    // Pregunta al usuario si quiere confirmar el cierre de sesión
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si confirma, elimina el token y recarga la página
        localStorage.removeItem('token');
        Swal.fire('Se ha cerrado sesión correctamente', '', 'success').then(() => {
          window.location.reload();
        });
      } else {
        // Si cancela, restaura los datos del usuario
        fetchUserInfo(localStorage.getItem('token')).then(data => {
          setUserData({
            email: data.email || 'email@example.com',
            photoUrl: data.fotoUser || '../../../src/images/usuario.jpg',
            name: data.username || 'Nombre de Usuario'
          });
        }).catch(error => console.error("Error fetching user info:", error.message));
      }
    });
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token)
        .then(data => {
          setUserData({
            email: data.email || 'email@example.com',
            photoUrl: data.fotoUser || '../../../src/images/usuario.jpg',
            name: data.username || 'Nombre de Usuario'
          });
        })
        .catch(error => console.error("Error fetching user info:", error.message));
    }
  }, []);

  const token = localStorage.getItem('token');

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        style={{ width: '350px' }}
        className="max-w-lg mx-auto bg-[#6a0dad] text-white p-6 rounded-lg relative"
        onClick={handleContentClick}
      >
        <button className="absolute top-4 right-4 text-white" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
            <img
              src={userData.photoUrl}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">{token ? userData.name : 'Iniciar sesión'}</h2>
          <p className="text-sm text-gray-300">{token ? userData.email : ''}</p>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4">
          <ul className="space-y-1">
            {token ? (
              <>
                <Link to="/configuracion_cuenta" className='no-underline'>
                  <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#4a00a6]">
                    <FaCog className="w-5 h-5" />
                    <span>Configuración de la cuenta</span>
                  </li>
                </Link>
                <li className="flex items-center space-x-3 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
                  <FaMoon className="w-5 h-5" />
                  <span className="no-underline">Cambiar Tema</span>
                </li>
                <Link to="/cambiar_cuenta" className='no-underline'>
                  <li className="flex items-center space-x-3 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
                    <FaUserFriends className="w-5 h-5" />
                    <span className="no-underline">Cambiar de cuenta</span>
                  </li>
                </Link>
                <Link to="/home" onClick={handleLogout} className='no-underline'>
                  <li className="flex items-center space-x-3 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
                    <FaSignOutAlt className="w-5 h-5" />
                    <span className="no-underline">Cerrar sesión</span>
                  </li>
                </Link>
              </>
            ) : (
              <>
                <li className="flex items-center space-x-3 p-2 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
                  <FaMoon className="w-5 h-5" />
                  <span className="no-underline">Cambiar Tema</span>
                </li>
                <Link to="/cuenta" className='no-underline'>
                  <li className="flex items-center space-x-3 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
                    <FaSignOutAlt className="w-5 h-5" />
                    <span className="no-underline">Iniciar sesión</span>
                  </li>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
