import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Helmet from 'react-helmet';
import DashboardView from './components/DashboardView';
import DashboardQuery from './queries/dashboard.query';
import Navigation from './components/Navigation';
import './App.scss';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDarkThemeEnabled: false,
    };
  }

  componentDidMount() {
    const theme = localStorage.getItem('theme');
    if (theme && theme === 'dark') {
      this.setState({
        isDarkThemeEnabled: true,
      });
    } else {
      this.setState({
        isDarkThemeEnabled: false,
      });
    }
  }

  changeTheme = () => {
    this.setState(oldState => {
      const { isDarkThemeEnabled } = oldState;

      if (!isDarkThemeEnabled) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }

      return {
        isDarkThemeEnabled: !isDarkThemeEnabled,
      };
    });
  };

  render() {
    const { isDarkThemeEnabled } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <body className={isDarkThemeEnabled ? 'dark-theme' : 'light-theme'} />
        </Helmet>
        <Navigation changeTheme={this.changeTheme} theme={isDarkThemeEnabled} />
        <main className="content">
          <DashboardView results={this.props.data} />
        </main>
      </React.Fragment>
    );
  }
}

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
