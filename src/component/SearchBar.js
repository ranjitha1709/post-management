import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch, initialValue }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={() => onSearch(searchTerm)}>Search</button>
    </div>
  );
}

export default SearchBar;
