import { Link } from "react-router-dom";
import '../../stilos/perfil.css'; // Importa el archivo CSS

export default function Perfil() {

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Perfil y visibilidad
      </h1>
      <p className="text-black mb-6 text-center">
        Administra tu información personal y controla a qué información pueden acceder otras personas y aplicaciones.
      </p>
      
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
          <p className="mb-2 text-black">Nombre completo: Juan Pérez</p>
          <p className="mb-2 text-black">Username: juanperez</p>
          <p className="mb-2 text-black">Zona: Buenos Aires</p>
          <Link to="/editar-perfil">
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
          <p className="mb-2 text-black">Correo: Bresanovichaxel43@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
