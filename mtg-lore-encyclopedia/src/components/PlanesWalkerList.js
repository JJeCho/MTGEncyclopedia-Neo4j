import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Search from './Search';

const GET_PLANESWALKERS = gql`
  query GetPlaneswalkers {
    planeswalkers {
      id
      name
    }
  }
`;

function PlaneswalkerList() {
  const { loading, error, data } = useQuery(GET_PLANESWALKERS);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error :(</p>;
  }

  const filteredPlaneswalkers = data.planeswalkers.filter(planeswalker =>
    planeswalker.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Search onSearch={setSearchQuery} />
      {filteredPlaneswalkers.map(planeswalker => (
        <div key={planeswalker.id}>
          <h2>
            <Link to={`/planeswalker/${planeswalker.id}`}>{planeswalker.name}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
}

export default PlaneswalkerList;
