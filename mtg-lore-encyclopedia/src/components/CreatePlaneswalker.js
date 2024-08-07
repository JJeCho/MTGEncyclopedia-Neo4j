import { gql, useMutation } from '@apollo/client';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../styles/Global.module.css';

const ADD_PLANESWALKER = gql`
  mutation AddPlaneswalker($name: String!, $abilities: [String]!) {
    addPlaneswalker(name: $name, abilities: $abilities) {
      id
      name
      abilities
    }
  }
`;

const CreatePlaneswalker = () => {
  const [name, setName] = useState('');
  const [abilities, setAbilities] = useState('');
  const [addPlaneswalker, { data }] = useMutation(ADD_PLANESWALKER);

  const handleSubmit = (e) => {
    e.preventDefault();
    const abilitiesArray = abilities.split(',').map(ability => ability.trim());
    addPlaneswalker({ variables: { name, abilities: abilitiesArray } });
  };

  return (
    <Container className={styles.container}>
      <Paper className={styles.card}>
        <Typography variant="h5" gutterBottom>Create New Planeswalker</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Abilities (comma separated)"
            value={abilities}
            onChange={(e) => setAbilities(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Create</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePlaneswalker;
