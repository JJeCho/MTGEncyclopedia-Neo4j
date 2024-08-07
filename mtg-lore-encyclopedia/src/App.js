import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import PlanesWalkerDetail from './components/PlanesWalkerDetail'
import PlanesWalkerList from './components/PlanesWalkerList'
import GraphVisualization from './components/GraphVisualization';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';

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
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
