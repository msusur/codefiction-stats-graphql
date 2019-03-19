import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { EpisodeStatsService } from '../api/episode-stats-service';

const dataset = () => ({
  label: 'Total Listens per Month',
  backgroundColor: 'rgba(255,99,132,0.2)',
  borderColor: 'rgba(255,99,132,1)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  hoverBorderColor: 'rgba(255,99,132,1)',
  data: [],
});

export class EpisodesChart extends Component {
  render() {
    const dataValues = {
      labels: [],
      datasets: [],
    };
    const set = dataset();

    const stats = new EpisodeStatsService();
    const statValues = stats.getTimeSeries(this.props.podcast.episodes);
    dataValues.labels = statValues.labels;
    set.data = statValues.values;
    dataValues.datasets.push(set);

    return <HorizontalBar data={dataValues} />;
  }
}

export default EpisodesChart;
