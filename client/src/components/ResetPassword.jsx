import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';
import Swal from 'sweetalert2';

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/auth/reset-password/${token}`, { newPassword });
      Swal.fire('Éxito', 'Contraseña restablecida correctamente.', 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo restablecer la contraseña.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Ingrese su nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Restablecer contraseña</button>
    </form>
  );
}

export default ResetPassword;
