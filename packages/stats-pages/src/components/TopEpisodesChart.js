import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { compareTwoStrings } from 'string-similarity';
import { Grid, Row, Col } from 'react-bootstrap';
import EpisodeStatsService from '../api/episode-stats-service';
import Loading from './Loading';

import './TopEpisodesChart.scss';

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
      data: [],
    },
  ],
};

export class TopEpisodesChart extends Component {
  render() {
    if (!this.props.episode.length) {
      return <strong>Hiçbi şey seçmeden olmaz ki ama :( </strong>;
    }
    const episodeStats = new EpisodeStatsService();
    const youtubeVideos = this.props.videos.filter(video => {
      const episodeTitle = this.props.episode[0].title;
      return compareTwoStrings(video.snippet.title, episodeTitle) * 100 > 60;
    });
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
          return (
            <Grid className="dashboard--items-container">
              <Row>
                <Col md={4}>
                  <div className="dashboard--items">
                    Youtube İzlenme Sayisi:{' '}
                    <span className="dashboard--value">
                      {youtubeVideos.length
                        ? youtubeVideos[0].statistics.viewCount
                        : 'BULAMADI :('}
                    </span>
                  </div>
                </Col>
                <Col md={4}>
                  Podcast İzlenme Sayisi:
                  <span className="dashboard--value">
                    {this.props.episode[0].stats.total_listens}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <Line data={data} />
                </Col>
              </Row>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default TopEpisodesChart;
