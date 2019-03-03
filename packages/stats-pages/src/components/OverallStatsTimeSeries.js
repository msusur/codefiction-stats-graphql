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
    data: [],
  };
};

export class OverallStatsTimeSeries extends Component {
  render() {
    const chartProps = {
      title: this.props.title,
      items: this.props.data,
      key: this.props.dataKey,
    };

    if (!chartProps.items || chartProps.items.length === 0) {
      return <div>Henuz yeterli veri yok.</div>;
    }

    const chartData = {
      labels: [],
      datasets: [],
    };

    const itemDataSet = produceChartdataset(chartProps.title);
    chartProps.items.forEach(item => {
      chartData.labels.push(item.createdOn);
      itemDataSet.data.push(item[chartProps.key]);
    });
    chartData.datasets.push(itemDataSet);

    return <Line data={chartData} />;
  }
}

export default OverallStatsTimeSeries;
