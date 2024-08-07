import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_PLANESWALKER = gql`
  mutation AddPlaneswalker($name: String!, $abilities: [String]!) {
    addPlaneswalker(name: $name, abilities: $abilities) {
      id
      name
      abilities
    }
  }
`;

function AddPlaneswalker() {
  const [name, setName] = useState('');
  const [abilities, setAbilities] = useState('');
  const [addPlaneswalker, { data }] = useMutation(ADD_PLANESWALKER);

  const handleSubmit = (e) => {
    e.preventDefault();
    const abilitiesArray = abilities.split(',').map(ability => ability.trim());
    addPlaneswalker({ variables: { name, abilities: abilitiesArray } });
    setName('');
    setAbilities('');
  };

  return (
    <div>
      <h2>Add a New Planeswalker</h2>
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
          <label>Abilities (comma separated)</label>
          <input
            type="text"
            value={abilities}
            onChange={(e) => setAbilities(e.target.value)}
          />
        </div>
        <button type="submit">Add Planeswalker</button>
      </form>
    </div>
  );
}

export default AddPlaneswalker;
