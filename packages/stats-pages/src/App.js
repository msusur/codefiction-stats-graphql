/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { DashboardView } from './components/DashboardView';
import { DashboardQuery } from './queries/dashboard.query';

export class App extends Component {
  render() {
    return <DashboardView results={this.props.data} />;
  }
}

App.propTypes = {
  data: PropTypes.any,
};

export default graphql(DashboardQuery, {
  options: {
    notifyOnNetworkStatusChange: true,
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(async err => {
          console.log(`[GraphQL error]: ${err.extensions.code}`);
        });
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    },
  },
})(App);
