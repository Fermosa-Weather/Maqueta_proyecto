import React, { useState } from 'react';
import Nav from './components/Navbar/Nav';
import Landing_page from './components/Home/Landin_page';

function Home() {
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

export default Home;
