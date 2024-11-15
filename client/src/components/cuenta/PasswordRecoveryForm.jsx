import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/password-recovery/request', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error al enviar el correo de recuperación');
    }
  };

  return (
    <div>
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Recuperar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordRecoveryForm;
