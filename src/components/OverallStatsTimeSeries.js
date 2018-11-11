import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const random_rgba = () => {
  const num = Math.round(0xffffff * Math.random());
  const r = num >> 16;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

const produceChartdataset = title => {
  const randomColor = random_rgba();
  return {
    label: title,
    fill: false,
    lineTension: 0.1,
    backgroundColor: randomColor,
    borderColor: randomColor,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: randomColor,
    pointBackgroundColor: '#000',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: randomColor,
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: []
  };
};

export class OverallStatsTimeSeries extends Component {
  render() {
    if (!this.props.data || this.props.data.length === 0) {
      return <div>Henuz yeterli veri yok.</div>;
    }

    const chartData = {
      labels: [],
      datasets: []
    };

    const twitterdataset = produceChartdataset('Twitter Overall');
    const podcastdataset = produceChartdataset('Podcast Overall');
    const youtubedataset = produceChartdataset('Youtube Overall');
    this.props.data.forEach(item => {
      chartData.labels.push(item.createdOn);
      twitterdataset.data.push(item.twitter);
      youtubedataset.data.push(item.youtube);
      podcastdataset.data.push(item.podcast);
    });
    chartData.labels = chartData.labels.sort();
    chartData.datasets.push(twitterdataset);
    chartData.datasets.push(podcastdataset);
    chartData.datasets.push(youtubedataset);

    return <Line data={chartData} />;
  }
}

export default OverallStatsTimeSeries;
