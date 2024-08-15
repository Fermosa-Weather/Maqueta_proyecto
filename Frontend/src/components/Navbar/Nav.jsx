import React from 'react';
import Cargar_nav from './Cargar_nav';
import { NavBar } from './navBar';

function Nav({ onSearch }) {
  return (
    <div>
      <Cargar_nav />
      <NavBar onSearch={onSearch} />
    </div>
  );
}

export default Nav;
