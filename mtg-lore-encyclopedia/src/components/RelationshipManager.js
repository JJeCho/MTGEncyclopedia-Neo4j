import { gql, useMutation } from '@apollo/client';
import { Button, Container, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from '../styles/Global.module.css';

const ADD_RELATIONSHIP = gql`
  mutation AddRelationship($fromCharacterId: ID!, $toCharacterId: ID!, $type: String!) {
    addRelationship(fromCharacterId: $fromCharacterId, toCharacterId: $toCharacterId, type: $type) {
      id
      type
    }
  }
`;

const UPDATE_RELATIONSHIP = gql`
  mutation UpdateRelationship($id: ID!, $type: String!) {
    updateRelationship(id: $id, type: $type) {
      id
      type
    }
  }
`;

const DELETE_RELATIONSHIP = gql`
  mutation DeleteRelationship($id: ID!) {
    deleteRelationship(id: $id)
  }
`;

const RelationshipManager = ({ characterId, relationships }) => {
  const [fromCharacterId] = useState(characterId);
  const [toCharacterId, setToCharacterId] = useState('');
  const [type, setType] = useState('');
  const [selectedRelationship, setSelectedRelationship] = useState(null);

  const [addRelationship] = useMutation(ADD_RELATIONSHIP);
  const [updateRelationship] = useMutation(UPDATE_RELATIONSHIP);
  const [deleteRelationship] = useMutation(DELETE_RELATIONSHIP);

  const handleAdd = async () => {
    await addRelationship({ variables: { fromCharacterId, toCharacterId, type } });
    setToCharacterId('');
    setType('');
  };

  const handleUpdate = async () => {
    await updateRelationship({ variables: { id: selectedRelationship.id, type } });
    setSelectedRelationship(null);
    setType('');
  };

  const handleDelete = async (id) => {
    await deleteRelationship({ variables: { id } });
    setSelectedRelationship(null);
    setType('');
  };

  return (
    <Container className={styles.container}>
      <Typography variant="h5">Manage Relationships</Typography>
      <Paper className={styles.paper}>
        <TextField
          label="To Character ID"
          value={toCharacterId}
          onChange={(e) => setToCharacterId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>Add Relationship</Button>
      </Paper>
      <Typography variant="h6" gutterBottom>Existing Relationships</Typography>
      {relationships.map((rel) => (
        <Paper key={rel.id} className={styles.paper}>
          <Typography>{rel.type} - {rel.relatedCharacter.name}</Typography>
          <Select
            value={selectedRelationship && selectedRelationship.id === rel.id ? type : ''}
            onChange={(e) => {
              setSelectedRelationship(rel);
              setType(e.target.value);
            }}
            displayEmpty
          >
            <MenuItem value="" disabled>Update Type</MenuItem>
            <MenuItem value="FRIENDS">Friends</MenuItem>
            <MenuItem value="ENEMIES">Enemies</MenuItem>
            <MenuItem value="ALLIES">Allies</MenuItem>
            <MenuItem value="RIVALS">Rivals</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(rel.id)}
          >
            Delete
          </Button>
        </Paper>
      ))}
      {selectedRelationship && (
        <Button variant="contained" color="primary" onClick={handleUpdate}>Update Relationship</Button>
      )}
    </Container>
  );
};

export default RelationshipManager;
