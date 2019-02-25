const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers/index');

const typeDefs = require('./schema/index');

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });

const app = express();
server.applyMiddleware({ app });
app.use('/', express.static('build'));

module.exports = {
  app,
  server,
};
