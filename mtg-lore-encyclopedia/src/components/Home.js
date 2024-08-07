import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the MTG Lore Encyclopedia</h1>
      <nav>
        <ul>
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/planeswalkers">Planeswalkers</Link></li>
          <li><Link to="/add-character">Add Character</Link></li>
          <li><Link to="/add-planeswalker">Add Planeswalker</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
