import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Global.module.css';
import Search from './Search';

const GET_PLANESWALKERS = gql`
  query GetPlaneswalkers {
    planeswalkers {
      id
      name
      abilities
    }
  }
`;

const PlaneswalkerList = () => {
  const { loading, error, data } = useQuery(GET_PLANESWALKERS);
  const [filteredPlaneswalkers, setFilteredPlaneswalkers] = useState([]);

  const handleSearch = (query) => {
    const searchResults = data.planeswalkers.filter(planeswalker =>
      planeswalker.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlaneswalkers(searchResults);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const planeswalkersToDisplay = filteredPlaneswalkers.length ? filteredPlaneswalkers : data.planeswalkers;

  return (
    <div className={styles.container}>
      <Typography variant="h4" gutterBottom>Planeswalkers</Typography>
      <Search onSearch={handleSearch} />
      <Grid container spacing={3}>
        {planeswalkersToDisplay.map(planeswalker => (
          <Grid item xs={12} sm={6} md={4} key={planeswalker.id}>
            <Card className={styles.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  <Link to={`/planeswalker/${planeswalker.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {planeswalker.name}
                  </Link>
                </Typography>
                <Typography color="textSecondary">
                  {planeswalker.abilities.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PlaneswalkerList;
