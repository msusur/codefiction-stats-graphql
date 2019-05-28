/**
 *
 * This server is only for local development
 * Actual server implementation is in graphql.js
 *
 */

// Read the local environment variables from .env file.
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers/index');
const typeDefs = require('./schema/index');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
  },
});

const app = express();
app.set('port', process.env.PORT || 4000);
server.applyMiddleware({ app });
app.use('/', express.static('build'));
app.listen(app.get('port'), () =>
  console.log(
    `Server ready at http://localhost:${app.get('port')}${server.graphqlPath}`
  )
);
