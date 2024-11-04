import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserInfo } from "../Function/infoToken"; // Ensure this function is correctly imported
import "../../stilos/perfil.css";

import { FaUserFriends, FaCog, FaSignOutAlt, FaMoon } from 'react-icons/fa';

export default function Perfil_modal({ onClose }) {
  const [userData, setUserData] = useState({
    email: '',
    photoUrl: '',
    name: ''
  });

  const handleContentClick = (e) => {
    e.stopPropagation(); // Prevent clicking inside the modal from closing it
  };

  // Fetch user info when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token) // Use your fetchUserInfo function with the token
        .then(data => {
          console.log(data)
          // Assuming 'data' contains the fields 'email', 'photoUrl', and 'name'
          setUserData({
            email: data.email || 'email@example.com', // Default email if not provided
            photoUrl: data.fotoUser || '../../../src/images2/yuichi.jpg', // Default image
            name: data.username || 'Nombre de Usuario' // Default name if not provided
          });
        })
        .catch(error => console.error("Error fetching user info:", error.message));
    }
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose} // Close the modal if clicked outside
    >
      <div
        className="max-w-xs mx-auto bg-[#6a0dad] text-white p-6 rounded-lg relative"
        onClick={handleContentClick} // Stop propagation of click event
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
              src={userData.photoUrl || "../../../src/images/usuario.jpg"} // Use fetched photoUrl
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-sm text-gray-300">{userData.email}</p>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4">
          <ul className="space-y-1">
            <Link to="/configuracion_cuenta" className='no-underline'>
              <li className="flex items-center space-x-3 p-2 rounded-md hover:bg-[#4a00a6]">
                <FaCog className="w-5 h-5" /> {/* Configuración */}
                <span>Configuración de la cuenta</span>
              </li>
            </Link>
            <li className="flex items-center space-x-3 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
              <FaMoon className="w-5 h-5" /> {/* Tema */}
              <span className="no-underline">Cambiar Tema</span>
            </li>
            <Link to="/cambiar_cuenta" className='no-underline'>
              <li className="flex items-center space-x-3 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
                <FaUserFriends className="w-5 h-5" /> {/* Cambiar de cuenta */}
                <span className="no-underline">Cambiar de cuenta</span>
              </li>
            </Link>
            <Link to="/cerrar_sesion" className='no-underline'>
              <li className="flex items-center space-x-3 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
                <FaSignOutAlt className="w-5 h-5" /> {/* Cerrar sesión */}
                <span className="no-underline">Cerrar sesión</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
