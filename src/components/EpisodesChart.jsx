import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { HorizontalBar } from 'react-chartjs-2';
import { Loading } from './Loading';

const QUERY_EPISODES = title => gql`
  {
    podcasts {
      title
      episodes {
        title
        stats(timeframe: all) {
          data {
            date
            listens
          }
        }
      }
    }
  }
`;

const dataset = () => {
  return {
    label: 'Total Listens',
    backgroundColor: 'rgba(255,99,132,0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    hoverBorderColor: 'rgba(255,99,132,1)',
    data: []
  };
};

export class EpisodesChart extends Component {
  render() {
    const dataValues = {
      labels: [],
      datasets: []
    };
    return (
      <Query query={QUERY_EPISODES()}>
        {result => {
          if (!result.data || !result.data.podcasts) {
            return <Loading />;
          }
          const months = {};
          result.data.podcasts.map(podcast => {
            const set = dataset();
            podcast.episodes.map(episode => {
              return episode.stats.data.map(item => {
                months[item.date] =
                  (months[item.date] ? months[item.date] : 0) + item.listens;
              });
            });
            for (let key in months) {
              dataValues.labels.push(key);
              set.data.push(months[key]);
            }
            dataValues.datasets.push(set);
            return true;
          });
          return <HorizontalBar data={dataValues} />;
        }}
      </Query>
    );
  }
}

export default EpisodesChart;
