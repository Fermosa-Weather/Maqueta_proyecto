import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserInfo } from "../Function/infoToken"; // Adjust the path as needed
import '../../stilos/perfil.css';

export default function Perfil() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage or other secure storage

    if (token) {
      fetchUserInfo(token)
        .then(data => {
          setUserInfo(data);
          console.log("data: ", data)
          setError(null); // Clear error if successful
        })
        .catch(error => {
          console.error("Error loading user info:", error);
          setError("No se pudo obtener la información del usuario. Verifica tu conexión o intenta nuevamente.");
        });
    } else {
      setError("No se encontró el token de autenticación.");
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Perfil y visibilidad
      </h1>

      {error && <p className="text-red-500 mb-6 text-center">{error}</p>}

      {userInfo ? (
        <>
          <div className="w-full max-w-4xl text-center mb-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Acerca de ti
            </h2>
            
            <div className="p-4 bg-purple-500 text-white mx-auto bloque_perfil">
              <p className="text-lg font-medium mb-2">Muestra tu foto de perfil</p>
              <div className="flex justify-center mb-4">
                <img
                  src="../../../src/images2/yuichi.jpg"
                  alt="Foto de perfil"
                  className="w-24 h-24 rounded-full border-2 border-blue-700"
                />
              </div>
              <p className="mb-2 text-black">Nombre completo: {userInfo.nombre_completo}</p>
              <p className="mb-2 text-black">Username: {userInfo.username}</p>
              <p className="mb-2 text-black">Zona: Buenos Aires</p>
              <Link to={`/editar-perfil/${userInfo._id}`}>
                <button className="boton-editar-perfil">
                  Editar perfil
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full max-w-4xl text-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Contacto
            </h2>
            
            <div className="p-4 bg-purple-500 text-white mx-auto bloque_perfil">
              <p className="text-lg font-medium mb-2">Dirección de correo electrónico</p>
              <p className="mb-2 text-black">Correo: {userInfo.email}</p>
            </div>
          </div>
        </>
      ) : !error && (
        <p>Cargando información del perfil...</p>
      )}
    </div>
  );
}
