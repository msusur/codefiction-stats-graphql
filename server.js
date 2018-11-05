const express = require('express');

const { ApolloServer, gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });

const app = express();
app.set('port', process.env.PORT || 4000);
server.applyMiddleware({ app });
app.listen(app.get('port'), () =>
  console.log(
    `Server ready at http://localhost:${app.get('port')}${server.graphqlPath}`
  )
);
