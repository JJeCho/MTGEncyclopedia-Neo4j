import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import styles from '../styles/Global.module.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className={styles.searchContainer}>
      <TextField
        label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default Search;
