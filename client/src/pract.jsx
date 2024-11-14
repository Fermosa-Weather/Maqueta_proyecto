// Ejemplo de uso en un componente
import React from 'react';
import { useUser } from './contex/userContext';

export const Pro = () => {
  const { userData } = useUser();

  return (
    <div>
      {/* <img src={userData.fotoUser} alt="Foto de usuario" /> */}
      <h2>{userData.nombre_completo}</h2>
      <h2>{userData.username}</h2>
      <p>{userData.email}</p>
    </div>
  );
};


