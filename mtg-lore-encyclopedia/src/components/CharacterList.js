import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Global.module.css';
import Search from './Search';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      id
      name
      description
    }
  }
`;

const CharacterList = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    if (data && !filteredCharacters.length) {
      setFilteredCharacters(data.characters);
    }
  }, [data, filteredCharacters.length]);

  const handleSearch = (query) => {
    if (data) {
      const searchResults = data.characters.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCharacters(searchResults);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>Characters</Typography>
      <Search onSearch={handleSearch} />
      <Grid container spacing={3}>
        {filteredCharacters.map(character => (
          <Grid item xs={12} sm={6} md={4} key={character.id}>
            <Card className={styles.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Link to={`/character/${character.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {character.name}
                  </Link>
                </Typography>
                <Typography color="textSecondary">
                  {character.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CharacterList;
