import React, { Component } from 'react';
import DashboardView from './components/DashboardView';
import { graphql } from 'react-apollo';
import DashboardQuery from './queries/dashboard.query';

export class App extends Component {
  render() {
    return <DashboardView results={this.props.data} />;
  }
}

export default graphql(DashboardQuery, {
  options: {
    onError: ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(async err => {
          console.log(`[GraphQL error]: ${err.extensions.code}`);
          console.log('CONTEXT', operation, forward);
          return forward(operation);
        });
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    },
  },
})(App);
