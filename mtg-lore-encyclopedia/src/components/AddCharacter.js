import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_CHARACTER = gql`
  mutation AddCharacter($name: String!, $description: String!) {
    addCharacter(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

function AddCharacter() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [addCharacter, { data }] = useMutation(ADD_CHARACTER);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCharacter({ variables: { name, description } });
    setName('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add a New Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Character</button>
      </form>
    </div>
  );
}

export default AddCharacter;
