const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
  }
`;

const resolvers = {
  Query: {
    characters: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run('MATCH (c:Character) RETURN c');
      return result.records.map(record => record.get('c').properties);
    },
    character: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'MATCH (c:Character {id: $id}) RETURN c',
        { id: args.id }
      );
      const character = result.records[0].get('c').properties;

      const relationshipsResult = await session.run(
        'MATCH (c:Character {id: $id})-[r]->(related:Character) RETURN r, related',
        { id: args.id }
      );

      character.relationships = relationshipsResult.records.map(record => ({
        id: record.get('r').identity.low,
        type: record.get('r').type,
        relatedCharacter: record.get('related').properties,
      }));

      return character;
    },
    planeswalkers: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run('MATCH (p:Planeswalker) RETURN p');
      return result.records.map(record => record.get('p').properties);
    },
    planeswalker: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'MATCH (p:Planeswalker {id: $id}) RETURN p',
        { id: args.id }
      );
      return result.records[0].get('p').properties;
    },
    nodes: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'MATCH (n) RETURN n.id AS id, labels(n)[0] AS label'
      );
      return result.records.map(record => ({
        id: record.get('id'),
        label: record.get('label'),
      }));
    },
    links: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'MATCH (a)-[r]->(b) RETURN a.id AS source, b.id AS target, type(r) AS type'
      );
      return result.records.map(record => ({
        source: record.get('source'),
        target: record.get('target'),
        type: record.get('type'),
      }));
    },
  },
  Mutation: {
    addCharacter: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'CREATE (c:Character {id: apoc.create.uuid(), name: $name, description: $description}) RETURN c',
        { name: args.name, description: args.description }
      );
      return result.records[0].get('c').properties;
    },
    updateCharacter: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'MATCH (c:Character {id: $id}) SET c.name = $name, c.description = $description RETURN c',
        { id: args.id, name: args.name, description: args.description }
      );
      return result.records[0].get('c').properties;
    },
    deleteCharacter: async (parent, args, context) => {
      const session = context.driver.session();
      await session.run(
        'MATCH (c:Character {id: $id}) DETACH DELETE c',
        { id: args.id }
      );
      return true;
    },
    addPlaneswalker: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'CREATE (p:Planeswalker {id: apoc.create.uuid(), name: $name, abilities: $abilities}) RETURN p',
        { name: args.name, abilities: args.abilities }
      );
      return result.records[0].get('p').properties;
    },
    updatePlaneswalker: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'MATCH (p:Planeswalker {id: $id}) SET p.name = $name, p.abilities = $abilities RETURN p',
        { id: args.id, name: args.name, abilities: args.abilities }
      );
      return result.records[0].get('p').properties;
    },
    deletePlaneswalker: async (parent, args, context) => {
      const session = context.driver.session();
      await session.run(
        'MATCH (p:Planeswalker {id: $id}) DETACH DELETE p',
        { id: args.id }
      );
      return true;
    },
  },
};

module.exports = { typeDefs, resolvers };
