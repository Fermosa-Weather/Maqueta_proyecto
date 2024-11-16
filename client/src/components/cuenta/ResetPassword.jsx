import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/reset-password/${token}`, { newPassword: password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.error || 'Error al restablecer la contraseña.');
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Actualizar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
