import React, {useState} from 'react'
import Nav from './components/Navbar/Nav'
import Noticia from "./components/Noticias/NewsWidget"
import { NavBar } from './components/Navbar/navBar';


function Noticias() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <Nav onSearch={setSearchTerm} />
      <Noticia searchTerm={searchTerm} />
    </div>
  );
}

export default Noticias