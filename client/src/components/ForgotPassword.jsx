import React, { useState } from 'react';
import axios from '../api/axiosInstance';
import Swal from 'sweetalert2';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/forgot-password', { email });
      Swal.fire('Correo enviado', 'Revisa tu correo para restablecer tu contraseña.', 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo enviar el correo. Inténtelo de nuevo.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Ingrese su correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Enviar enlace de recuperación</button>
    </form>
  );
}

export default ForgotPassword;
