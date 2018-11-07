import React, { Component } from "react";
import {Line} from 'react-chartjs-2';

const produceChartdataset = (title) => {
  return {
      label: title,
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
    };
};

export class OverallStatsTimeSeries extends Component {
  render() {
    if(!this.props.data || this.props.data.length === 0){
      return <div>Henuz yeterli veri yok.</div>;
    }

    const chartData = {
      labels: [],
      datasets: []
    };

    const twitterdataset = produceChartdataset('Twitter Overall');
    const podcastdataset = produceChartdataset('Podcast Overall');
    const youtubedataset = produceChartdataset('Youtube Overall');

    this.props.data.forEach((item) => {
      chartData.labels.push(item.createdOn);
      twitterdataset.data.push(item.twitter);
      youtubedataset.data.push(item.youtube);
      podcastdataset.data.push(item.podcast);
    });
    chartData.datasets.push(twitterdataset);
    chartData.datasets.push(podcastdataset);
    chartData.datasets.push(youtubedataset);

    return (
      <Line data={chartData}></Line>
    )
  }
}

export default OverallStatsTimeSeries;