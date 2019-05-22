import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
// import { Line } from 'react-chartjs-2';

// const randomRgba = () => {
//   const num = Math.round(0xffffff * Math.random());
//   const r = num >> 16;
//   const g = (num >> 8) & 255;
//   const b = num & 255;
//   return `rgb(${r}, ${g}, ${b})`;
// };

// const produceChartdataset = title => {
//   const randomColor = randomRgba();
//   return {
//     label: title,
//     fill: false,
//     lineTension: 0.1,
//     backgroundColor: randomColor,
//     borderColor: randomColor,
//     borderCapStyle: 'butt',
//     borderDash: [],
//     borderDashOffset: 0.0,
//     borderJoinStyle: 'miter',
//     pointBorderColor: randomColor,
//     pointBackgroundColor: '#000',
//     pointBorderWidth: 1,
//     pointHoverRadius: 5,
//     pointHoverBackgroundColor: randomColor,
//     pointHoverBorderColor: 'rgba(220,220,220,1)',
//     pointHoverBorderWidth: 2,
//     pointRadius: 1,
//     pointHitRadius: 10,
//     data: [],
//   };
// };

export class OverallStatsTimeSeries extends Component {
  render() {
    const { title, data, dataKey } = this.props;
    console.log(data, dataKey);
    const chartProps = {
      title,
      items: data,
      key: dataKey,
    };

    if (!chartProps.items || chartProps.items.length === 0) {
      return <div>Henuz yeterli veri yok.</div>;
    }

    return (
      <ResponsiveContainer height={200}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdOn" />
          <Tooltip />
          <Line
            type="basis"
            dataKey={dataKey}
            stroke="#8884d8"
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default OverallStatsTimeSeries;
