import React, { useState } from 'react';

function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
