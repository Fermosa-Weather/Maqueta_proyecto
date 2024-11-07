import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchUserInfo } from "../Function/infoToken";
import "../../stilos/perfil.css";

export default function Cambiar_cuenta() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUserInfo(token)
        .then(data => setUserInfo(data))
        .catch(error => console.error("Error al obtener la información del usuario:", error));
    }
  }, []);

  return (
    <div className="max-w-sm mx-auto bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg spacer">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
          <img
            src="../../../src/images/logo-cifor.png"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-center">Elegir o añadir una cuenta</h2>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-2">
        <ul className="space-y-2">
          {userInfo && (
            <li className="flex items-center space-x-3 p-2 rounded-md transition-all duration-200 cuenta">
              <img src={userInfo.fotoUser || "../../images/usuario.jpg"} alt="" className='w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm' />
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{userInfo.username}</div>
                <div className="text-sm text-gray-300">{userInfo.email}</div>
              </div>
            </li>
          )}
        </ul>
        <ul className="space-y-2 ">
          {userInfo && (
            <li className="flex items-center space-x-3  p-2 rounded-md transition-all duration-200 cuenta">
              <img src={userInfo.fotoUser || "../../images/usuario.jpg"} alt="" className='w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm' />
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{userInfo.username}</div>
                <div className="text-sm text-gray-300">{userInfo.email}</div>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="mt-2 border-t border-gray-200 pt-2">
        <ul className="space-y-2">
          <Link to="/registro" className='no-underline'>
            <li className="flex items-center justify-center space-x-2  p-2 rounded-md transition-all duration-200 cuenta">
              <FaUserFriends className="w-5 h-5" />
              <span className="font-medium">Añadir otra cuenta</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="mt-2 border-t border-gray-200 pt-2">
        <ul className="space-y-2">
          <Link to="/cerrar_sesion" className='no-underline'>
            <li className="flex items-center justify-center space-x-2 t-black p-2 rounded-md transition-all duration-200 cuenta">
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Cerrar sesión</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
