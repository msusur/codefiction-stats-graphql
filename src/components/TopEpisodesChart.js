import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import EpisodeStatsService from '../api/episode-stats-service';
import Loading from './Loading';

const QUERY_EPISODES_STATS = title => gql`
  {
    podcasts {
      episodes(title: "${title}") {
        stats {
          data {
            date
            listens
          }
        }
      }
    }
  }
`;
const data = {
  labels: [],
  datasets: [
    {
      label: '',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

export class TopEpisodesChart extends Component {
  render() {
    if (!this.props.episode.length) {
      return <Line data={data} />;
    }
    const episodeStats = new EpisodeStatsService();
    return (
      <Query query={QUERY_EPISODES_STATS(this.props.episode[0].title)}>
        {result => {
          if (!result.data || !result.data.podcasts) {
            return <Loading />;
          }
          const series = episodeStats.getTimeSeries(
            result.data.podcasts[0].episodes
          );
          data.labels = series.labels;
          data.datasets[0].data = series.values;
          data.datasets[0].label = this.props.episode[0].title;
          return <Line data={data} />;
        }}
      </Query>
    );
  }
}

export default TopEpisodesChart;
