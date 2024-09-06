import React, { useState } from 'react';
import axios from '../../api/axiosInstance'; // Ajusta la ruta según la ubicación de tu archivo
import { LockIcon, MailIcon, UserIcon } from 'lucide-react';
import '../../stilos/register.css'; // Ajusta la ruta según la ubicación de tu archivo CSS
import { toast } from 'react-toastify'; // Importa toast desde react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS para las notificaciones

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden'); // Mostrar error
      return;
    }

    try {
      // Enviar los datos del formulario al backend
      const response = await axios.post('/auth/register', formData);
      toast.success('Usuario registrado con éxito'); // Mostrar éxito
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error al registrar'); // Mostrar error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
        <div className="p-6">
          <header className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Crear Cuenta</h1>
            <p className="text-gray-600 mt-1">Regístrate para obtener una cuenta</p>
          </header>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  id="name" 
                  type="text" 
                  placeholder="Tu nombre" 
                  value={name}
                  onChange={handleChange}
                  required 
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email}
                  onChange={handleChange}
                  required 
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  id="password" 
                  type="password" 
                  placeholder="******"
                  value={password}
                  onChange={handleChange}
                  required 
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="******"
                  value={confirmPassword}
                  onChange={handleChange}
                  required 
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input id="terms" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" required />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Acepto los términos y condiciones
              </label>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300"
            >
              Registrarse
            </button>
          </form>
        </div>
        <footer className="px-6 py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <a href="/cuenta" className="font-medium text-purple-600 hover:text-purple-500">
              Iniciar Sesión
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
