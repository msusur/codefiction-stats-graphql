import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import history from './history';
import Auth from './auth/authentication';
import App from './App';
import { LoginPage } from './components/LoginPage';
import Callback from './components/callback/Callback';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://codefiction-stats.herokuapp.com/graphql',
  }),
  cache: new InMemoryCache(),
});

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const isAuthenticated = () => {
  return auth.isAuthenticated();
};

export const createMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={() => <Redirect to="/login" />} />
        <Route
          path="/dashboard"
          render={props =>
            isAuthenticated(props) ? (
              <ApolloProvider client={client}>
                <App auth={auth} {...props} />
              </ApolloProvider>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          path="/login"
          component={props => <LoginPage auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};

export default createMainRoutes;
