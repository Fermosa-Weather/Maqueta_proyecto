import { useEffect, useState } from 'react';
import { FaUser, FaUserAlt, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import { fetchUserInfo } from "../Function/infoToken";
import axios from "axios";
import "../../stilos/perfil.css";
import Añadir_foto_modal from './añadir_foto';
import { useTheme } from '../../context';  // Importa el hook useTheme

async function updateUser(token, userId, updatedData) {
  try {
    const response = await axios.put(`http://localhost:4000/api/upload/editar/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);
    throw new Error("No se pudo actualizar la información del usuario");
  }
}

export default function Editar_perfil() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    username: '',
    location: '',
    email: '',
    profileImage: '',
    fotoUser: null
  });
  const { theme } = useTheme();  // Obtén el tema actual


  // Función para establecer la imagen predeterminada si `fotoUser` es `null`
  const foto = () => {
    setUserInfo(prevState => ({
      ...prevState,
      fotoUser: prevState.fotoUser || "../../../src/images/usuario.jpg"
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetchUserInfo(token)
        .then(data => {
          setUserInfo({
            id: data._id,
            name: data.nombre_completo,
            username: data.username,
            location: data.location,
            email: data.email,
            profileImage: data.profileImage,
            fotoUser: data.fotoUser,
          });
          foto(); // Llamar a `foto` después de cargar la información
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  }, []);

  const handleImageUpload = (imageUrl) => {
    setUserInfo(prevState => ({
      ...prevState,
      profileImage: imageUrl,
      fotoUser: null // Borra `fotoUser` para asegurar que solo se muestre `profileImage`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const updatedData = {
      nombre_completo: userInfo.name,
      username: userInfo.username,
      profileImage: userInfo.profileImage
    };

    try {
      await updateUser(token, userInfo.id, updatedData);
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error(error.message);
      alert("Error al actualizar el perfil");
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen p-2 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 ${theme === 'dark' ? 'bg-gray-800' : ''} `} >
        <div className="space-y-4 " >
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer" onClick={openModal}>
                <img
                  src={userInfo.fotoUser || userInfo.profileImage}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-4 border-primary group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center icono-camara">
                  <FaCamera className="text-black text-3xl" />
                </div>
              </div>
              <div className="space-y-1">
              <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-black' : 'text-black'}`}>
                  {userInfo.name || 'Nombre no disponible'}
               </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-700' : 'text-gray-800'}`}>{userInfo.email || 'Email no disponible'}</div>
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
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  placeholder="Ingrese su nombre completo"
                  className={`mt-1 block w-full border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar`}
                />
              </div>
              <div className="relative">
                <FaUserAlt className="absolute top-1 left-2 text-gray-500" />
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 ml-7">
                  Username
                </label>
                <input
                  id="username"
                  value={userInfo.username}
                  onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                  placeholder="Ingrese su username"
                  className={`mt-1 block w-full border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar`}
                />
              </div>
              <div className='contenedor-form-editar-botones'>
                <button type="button" className="boton-form-editar-perfil" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="boton-form-editar-perfil">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </form>
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

      {isModalOpen && <Añadir_foto_modal onClose={closeModal} onImageUpload={handleImageUpload} />}
    </div>
  );
}
