import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_PLANESWALKER = gql`
  query GetPlaneswalker($id: ID!) {
    planeswalker(id: $id) {
      id
      name
      abilities
    }
  }
`;

function PlaneswalkerDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PLANESWALKER, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error :(</p>;
  }

  const { name, abilities } = data.planeswalker;

  return (
    <div>
      <h2>{name}</h2>
      <h3>Abilities:</h3>
      <ul>
        {abilities.map((ability, index) => (
          <li key={index}>{ability}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlaneswalkerDetail;
