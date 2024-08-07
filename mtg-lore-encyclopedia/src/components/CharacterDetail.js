import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

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

function CharacterDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error :(</p>;
  }

  const { name, description, relationships } = data.character;

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <h3>Relationships:</h3>
      <ul>
        {relationships.map(relationship => (
          <li key={relationship.id}>
            {relationship.type}: <a href={`/character/${relationship.relatedCharacter.id}`}>{relationship.relatedCharacter.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterDetail;
