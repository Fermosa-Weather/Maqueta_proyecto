import React, { useState } from 'react';
import "../../stilos/search.css";
import { sugerencias } from "./sugerencias"; 

export function Search({ onSearch }) {
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const toggleInput = () => {
    setShowInput(prevShowInput => !prevShowInput);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      const filtered = sugerencias.filter(sug => 
        sug.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }

    onSearch(e);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setFilteredSuggestions([]); // Oculta las sugerencias después de seleccionar una
    onSearch({ target: { value: suggestion } }); // Dispara el evento onSearch con la sugerencia seleccionada
  };

  return (
    <div className="search-form">
      <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
        <button 
          type="button" 
          className="btn my-2 my-sm-0 nav_search-btn" 
          onClick={toggleInput}
        >
          {/* <i className="fas fa-search"></i> */}
        </button>
        {showInput && (
          <div>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="buscador"
              id="buscador"
              onChange={handleSearch}
              value={searchTerm}
            />
            {filteredSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {filteredSuggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="suggestion-item" 
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
