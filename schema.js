const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar JSON

  type Character {
    id: ID!
    name: String!
    description: String
    relationships: [Relationship]
  }

  type Relationship {
    id: ID!
    type: String!
    relatedCharacter: Character
  }

  type Planeswalker {
    id: ID!
    name: String!
    abilities: [String]
  }

  type Node {
    id: ID!
    label: String!
  }

  type Link {
    source: String!
    target: String!
    type: String!
  }

  type Query {
    characters: [Character]
    character(id: ID!): Character
    planeswalkers: [Planeswalker]
    planeswalker(id: ID!): Planeswalker
    nodes: [Node]
    links: [Link]
  }

  type Mutation {
    addCharacter(name: String!, description: String!): Character
    updateCharacter(id: ID!, name: String, description: String): Character
    deleteCharacter(id: ID!): Boolean
    addPlaneswalker(name: String!, abilities: [String]!): Planeswalker
    updatePlaneswalker(id: ID!, name: String, abilities: [String]): Planeswalker
    deletePlaneswalker(id: ID!): Boolean
    addRelationship(fromCharacterId: ID!, toCharacterId: ID!, type: String!): Relationship
    updateRelationship(id: ID!, type: String!): Relationship
    deleteRelationship(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };
