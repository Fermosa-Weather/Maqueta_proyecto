import React, { useState } from 'react';
import Nav from '../Navbar/Nav';
import Landing_page from './Landin_page';

function Inicio() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Nav onSearch={handleSearch} />
      <Landing_page searchTerm={searchTerm} />
    </div>
  );
}

export default Inicio;
