import React from 'react';
import { Route, Router } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import history from './history';
import Auth from './auth/authentication';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://codefiction-stats.herokuapp.com/graphql',
  }),
  cache: new InMemoryCache(),
});

const auth = new Auth();

export const createMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          path="/dashboard"
          render={props => (
            <ApolloProvider client={client}>
              <App auth={auth} {...props} />
            </ApolloProvider>
          )}
        />
      </div>
    </Router>
  );
};

export default createMainRoutes;
