import React, { Component } from 'react';
import DashboardView from './components/DashboardView';
import { graphql } from 'react-apollo';
import DashboardQuery from './queries/dashboard.query';

export class App extends Component {
  render() {
    return <DashboardView results={this.props.data} />;
  }
}

export default graphql(DashboardQuery)(App);
