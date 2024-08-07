import { gql, useMutation } from '@apollo/client';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../styles/Global.module.css';

const ADD_CHARACTER = gql`
  mutation AddCharacter($name: String!, $description: String!) {
    addCharacter(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

const CreateCharacter = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addCharacter, { data }] = useMutation(ADD_CHARACTER);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCharacter({ variables: { name, description } });
  };

  return (
    <Container className={styles.container}>
      <Paper className={styles.card}>
        <Typography variant="h5" gutterBottom>Create New Character</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">Create</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateCharacter;
