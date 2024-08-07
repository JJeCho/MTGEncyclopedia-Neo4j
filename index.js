const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs} = require('./schema');
const { resolvers } = require('./resolvers');
const neo4j = require('neo4j-driver');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
  );
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { driver },
  });
  
  server.start().then(() => {
    server.applyMiddleware({ app });
  
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
    });
  });