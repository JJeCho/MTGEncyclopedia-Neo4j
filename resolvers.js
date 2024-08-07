const { v4: uuidv4 } = require('uuid');

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
    }
  },
  Mutation: {
    addCharacter: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'CREATE (c:Character {id: $id, name: $name, description: $description}) RETURN c',
        { id: uuidv4(), name: args.name, description: args.description }
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
        'CREATE (p:Planeswalker {id: $id, name: $name, abilities: $abilities}) RETURN p',
        { id: uuidv4(), name: args.name, abilities: args.abilities }
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
    addRelationship: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'MATCH (a:Character {id: $fromCharacterId}), (b:Character {id: $toCharacterId}) ' +
        'CREATE (a)-[r:RELATIONSHIP {id: $id, type: $type}]->(b) RETURN r',
        { id: uuidv4(), fromCharacterId: args.fromCharacterId, toCharacterId: args.toCharacterId, type: args.type }
      );
      return result.records[0].get('r').properties;
    },
    updateRelationship: async (parent, args, context) => {
      const session = context.driver.session();
      const result = await session.run(
        'MATCH ()-[r {id: $id}]->() SET r.type = $type RETURN r',
        { id: args.id, type: args.type }
      );
      return result.records[0].get('r').properties;
    },
    deleteRelationship: async (parent, args, context) => {
      const session = context.driver.session();
      await session.run(
        'MATCH ()-[r {id: $id}]->() DELETE r',
        { id: args.id }
      );
      return true;
    }
  }
};

module.exports = { resolvers };
