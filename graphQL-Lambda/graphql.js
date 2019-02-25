const { ApolloServer } = require('apollo-server-lambda');

const resolvers = require('./resolvers/index');

const typeDefs = require('./schema/index');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.graphqlHandler = server.createHandler({ cors: {
  origin: true,
  credentials: true,
}});