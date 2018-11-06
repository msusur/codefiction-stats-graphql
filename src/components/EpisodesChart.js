import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { Loading } from './Loading';

const dataset = () => {
  return {
    label: 'Total Listens per Month',
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
    const podcast = this.props.podcast;

    const months = {};

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

    return <HorizontalBar data={dataValues} />;
  }
}

export default EpisodesChart;
