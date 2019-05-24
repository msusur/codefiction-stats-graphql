import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './OverallStatsTimeSeries.module.scss';

const OverallStatsTimeSeries = ({ title, data, dataKey }) => {
  const chartProps = {
    title,
    items: data,
    key: dataKey,
  };

  if (!chartProps.items || chartProps.items.length === 0) {
    return <div>Henuz yeterli veri yok.</div>;
  }

  return (
    <ResponsiveContainer height={170} className={styles.chartContainer}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="createdOn" hide />
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
};

export default OverallStatsTimeSeries;
