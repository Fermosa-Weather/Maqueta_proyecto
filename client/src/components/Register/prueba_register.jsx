import { FaEnvelope, FaTag, FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../stilos/soporte.css";
import contactoImage from '../../../src/images2/contacto3.jpg';

export function Prueba_register() {
    const [loading, setLoading] = useState(false);  // Estado para el botón
    const [message, setMessage] = useState('');  // Estado para mostrar mensajes
    const [formData, setFormData] = useState({
        name: '',
        correo: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        // Lógica para iniciar sesión aquí...
        // Simulación de error o éxito:
        setTimeout(() => {
            setLoading(false);
            setMessage('Registro completado con éxito.'); // Ejemplo de mensaje
        }, 2000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="text-center space-y-4 contactanos">
                    {/* <h1 className="text-2xl font-bold text-gray-800">Crear Cuenta</h1> */}
                        <h2 className="text-3xl md:text-3xl font-bold">
                        Regístrate para obtener una cuenta
                        </h2>
                    </div>
                    <main>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="space-y-4">
                                <div className="relative">
                                    <FaUser className="absolute top-1 left-2 text-gray-500" />
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-7">
                                        Nombre completo
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        placeholder="Ingrese su nombre completo"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                    />
                                </div>
                                <div className="relative">
                                    <FaEnvelope className="absolute top-1 left-2 text-gray-500" />
                                    <label htmlFor="correo" className="block text-sm font-medium text-gray-700 ml-7">
                                        Correo electrónico
                                    </label>
                                    <input
                                        id="correo"
                                        name="correo"
                                        placeholder="Ingrese su correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                    />
                                </div>
                                <div className="relative">
                                    <FaTag className="absolute top-1 left-2 text-gray-500" />
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-7">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Ingrese su contraseña"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                    />
                                </div>

                                <div className="relative">
                                    <FaTag className="absolute top-1 left-2 text-gray-500" />
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 ml-7">
                                        Confirmar contraseña
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirme su contraseña"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                    />
                                </div>

                                {message && <p className="error-message">{message}</p>}

                                <button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300"
                                    disabled={loading}
                                >
                                    {loading ? 'Registrando...' : 'Registrarse'}
                                </button>
                            </div>

                            <div className="flex items-center">
                                <input id="terms" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" required />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    Acepto los términos y condiciones
                                </label>
                            </div>
                        </form>
                    </main>
                    <footer className="px-6 py-3 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                        <p className="text-center text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{' '}
                            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                                Iniciar Sesión
                            </Link>
                        </p>
                    </footer>
                </div>

                <div className="flex items-center justify-center">
                    <img
                        src={contactoImage}
                        alt="Edit Profile"
                        className="w-full max-w-[400px] rounded-lg bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]"
                        style={{ aspectRatio: "600/600", objectFit: "cover" }}
                    />
                </div>
            </div>
        </div>
    );
}
