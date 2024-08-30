import { FaUserFriends, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importa los íconos que necesitas
import { Link } from 'react-router-dom';
import "../../stilos/perfil.css"

export default function Cambiar_cuenta() {
  return (
    <div className="max-w-xs mx-auto bg-[#6a0dad] text-white p-6 rounded-lg relative mt-32"> {/* Añadido mt-12 */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
          <img
            src="../../../src/images/logo.png"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold">Elegir o añadir una cuenta</h2>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-2">
        <ul className="space-y-1">
          <li className="flex items-center space-x-0 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
            <img src="../../../src/images2/yuichi.jpg" alt="" className='w-16 h-16 rounded-full object-cover foto_perfil'/>
            <div className="grid gap-0 pl-3"> 
              <div className="text-lg font-semibold">John Doe</div>
              <div className="text-sm text-muted-foreground">john@example.com</div>
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-2 border-t border-gray-200 pt-2">
        <ul className="space-y-2">
          <Link to="/register" className='no-underline'>
            <li className="flex items-center justify-center space-x-0 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
              <FaUserFriends className="w-5 h-5" /> {/* Icono de usuario */}
              <span>Añadir otra cuenta</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="mt-2 border-t border-gray-200 pt-2"> 
        <ul className="space-y-2"> 
          <Link to="/cerrar_sesion" className='no-underline'>
            <li className="flex items-center justify-center mb-0 space-x-1 hover:bg-[#4a00a6] hover:text-black p-2 rounded-md cursor-pointer">
              <FaSignOutAlt className="w-5 h-5" /> {/* Cerrar sesión */}
              <span>Cerrar sesión</span>
            </li>
          </Link>
        </ul>
      </div>
      
    </div>
  );
}
