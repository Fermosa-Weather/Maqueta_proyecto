import React, { useState } from 'react';
import "../../stilos/search.css"

export function Search({ onSearch }) {
  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => {
    setShowInput(prevShowInput => !prevShowInput);
  };

  return (
    <div>
      <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
        <button 
          type="button" 
          className="btn my-2 my-sm-0 nav_search-btn" 
          onClick={toggleInput}
        >
          <i className="fas fa-search"></i>
        </button>
        {showInput && (
          <input 
            type="text" 
            placeholder="Buscar..." 
            className='buscador'
            id="buscador"
            onChange={onSearch}
          />
        )}
      </form>
    </div>
  );
}
