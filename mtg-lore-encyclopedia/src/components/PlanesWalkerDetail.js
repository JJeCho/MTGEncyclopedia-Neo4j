import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Global.module.css';

const GET_PLANESWALKER = gql`
  query GetPlaneswalker($id: ID!) {
    planeswalker(id: $id) {
      id
      name
      abilities
    }
  }
`;

const UPDATE_PLANESWALKER = gql`
  mutation UpdatePlaneswalker($id: ID!, $name: String!, $abilities: [String]!) {
    updatePlaneswalker(id: $id, name: $name, abilities: $abilities) {
      id
      name
      abilities
    }
  }
`;

const PlaneswalkerDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PLANESWALKER, { variables: { id } });
  const [updatePlaneswalker] = useMutation(UPDATE_PLANESWALKER);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [abilities, setAbilities] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { id: planeswalkerId, name: planeswalkerName, abilities: planeswalkerAbilities } = data.planeswalker;

  const handleEdit = () => {
    setIsEditing(true);
    setName(planeswalkerName);
    setAbilities(planeswalkerAbilities.join(', '));
  };

  const handleSave = async () => {
    const abilitiesArray = abilities.split(',').map(ability => ability.trim());
    await updatePlaneswalker({ variables: { id, name, abilities: abilitiesArray } });
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent>
          {isEditing ? (
            <div>
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
              <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
              <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <div>
              <Typography variant="h4" component="h2">{planeswalkerName}</Typography>
              <Typography color="textSecondary" gutterBottom>Abilities: {planeswalkerAbilities.join(', ')}</Typography>
              <Typography variant="body2">ID: {planeswalkerId}</Typography>
              <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaneswalkerDetail;
