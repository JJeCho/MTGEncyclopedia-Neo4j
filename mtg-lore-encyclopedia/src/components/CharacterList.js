import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Search from './Search';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      id
      name
      description
    }
  }
`;

function CharacterList() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error :(</p>;
  }

  const filteredCharacters = data.characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Search onSearch={setSearchQuery} />
      {filteredCharacters.map(character => (
        <div key={character.id}>
          <h2>
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </h2>
          <p>{character.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CharacterList;
