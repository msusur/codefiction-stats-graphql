import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import DashboardView from './components/DashboardView';
import DashboardQuery from './queries/dashboard.query';
import Navigation from './components/Navigation';
import Loading from './components/Loading';

export const App = () => {
  const { loading, data } = useQuery(DashboardQuery, {
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
  });

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  const toggleTheme = () =>
    setTheme(oldTheme => {
      const newTheme = oldTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });

  return (
    <>
      <Helmet>
        <body className={`${theme}-theme`} />
      </Helmet>
      <Navigation toggleTheme={toggleTheme} isThemeDark={theme === 'dark'} />
      {loading ? <Loading /> : <DashboardView results={data} />}
    </>
  );
};

export default App;
