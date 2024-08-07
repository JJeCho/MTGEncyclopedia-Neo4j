import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CharacterDetail from './components/CharacterDetail';
import CharacterList from './components/CharacterList';
import CreateCharacter from './components/CreateCharacter';
import CreatePlaneswalker from './components/CreatePlaneswalker';
import GraphVisualization from './components/GraphVisualization';
import Home from './components/Home';
import Navigation from './components/Navigation';
import PlanesWalkerDetail from './components/PlanesWalkerDetail';
import PlanesWalkerList from './components/PlanesWalkerList';

const client = new ApolloClient({
  uri: `http://localhost:4000/graphql`,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetail />} />
            <Route path="/planeswalkers" element={<PlanesWalkerList />} />
            <Route path="/planeswalker/:id" element={<PlanesWalkerDetail />} />
            <Route path="/graph" element={<GraphVisualization />} />
            <Route path="/add-character" element={<CreateCharacter />} />
            <Route path="/add-planeswalker" element={<CreatePlaneswalker />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
