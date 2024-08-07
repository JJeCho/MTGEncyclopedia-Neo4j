import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/Global.module.css';
import RelationshipManager from './RelationshipManager';

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      description
      relationships {
        id
        type
        relatedCharacter {
          id
          name
        }
      }
    }
  }
`;

const UPDATE_CHARACTER = gql`
  mutation UpdateCharacter($id: ID!, $name: String!, $description: String!) {
    updateCharacter(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

const CharacterDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, { variables: { id } });
  const [updateCharacter] = useMutation(UPDATE_CHARACTER);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { id: characterId, name: characterName, description: characterDescription, relationships } = data.character;

  const handleEdit = () => {
    setIsEditing(true);
    setName(characterName);
    setDescription(characterDescription);
  };

  const handleSave = async () => {
    await updateCharacter({ variables: { id, name, description } });
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
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
              <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <div>
              <Typography variant="h4" component="h2">{characterName}</Typography>
              <Typography color="textSecondary" gutterBottom>{characterDescription}</Typography>
              <Typography variant="body2">ID: {characterId}</Typography>
              <Typography variant="h6">Relationships:</Typography>
              <ul>
                {relationships.map(rel => (
                  <li key={rel.id}>
                    {rel.type} - <a href={`/character/${rel.relatedCharacter.id}`}>{rel.relatedCharacter.name}</a>
                  </li>
                ))}
              </ul>
              <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
            </div>
          )}
        </CardContent>
      </Card>
      <RelationshipManager characterId={id} relationships={relationships} />
    </div>
  );
};

export default CharacterDetail;
