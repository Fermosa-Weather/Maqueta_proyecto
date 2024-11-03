import React, { useState } from 'react';
import { LockIcon, MailIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Importar Link y useNavigate para navegación
import axios from '../api/axiosInstance'; // Ajusta la ruta según la ubicación de tu archivo
import '../../stilos/login.css'; // Ajusta la ruta según la ubicación de tu archivo CSS

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Enviar una solicitud POST al backend con las credenciales del usuario
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      // Guarda el token en el almacenamiento local
      localStorage.setItem('token', response.data.token);

      // Redirige o realiza otras acciones después de un inicio de sesión exitoso
      navigate('/'); // Redirige a la página principal usando useNavigate
    } catch (error) {
      setMessage(error.response?.data.error || 'Error en el inicio de sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <header className="login-header">
          <h1 className="login-title">Bienvenido</h1>
          <p className="login-subtitle">Inicia sesión en tu cuenta</p>
        </header>
        <main>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <div className="input-container">
                <MailIcon className="icon" size={18} />
                <input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <div className="input-container">
                <LockIcon className="icon" size={18} />
                <input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-actions">
              <div className="remember-me">
                <input id="remember" type="checkbox" className="checkbox" />
                <label htmlFor="remember" className="checkbox-label">Recordarme</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</Link>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
            {message && <p className="error-message">{message}</p>}
          </form>
        </main>
        <footer className="login-footer">
          <p className="signup-text">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="signup-link">
              Regístrate
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}