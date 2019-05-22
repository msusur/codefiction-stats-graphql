import React, { Component } from 'react';
import OverallValue from '../OverallValue';
import Card from '../ui/Card';
import { Sun } from '../Icons';
import styles from './OverallValuesTabView.module.scss';
import OverallStatsTimeSeries from '../OverallStatsTimeSeries';

export class OverallValuesTabView extends Component {
  render() {
    const { overallTimeSeries, twitter, youtube, podcasts } = this.props;

    return (
      <div className={styles.cards}>
        <Card title="Twitter">
          <OverallValue
            valueKey="twitter"
            series={overallTimeSeries}
            value={twitter ? twitter.followersCount : null}
          />
          <OverallStatsTimeSeries
            data={overallTimeSeries}
            dataKey="twitter"
            title="Twitter Trend"
          />
        </Card>
        <Card title="Youtube" icon={Sun}>
          <OverallValue
            valueKey="youtube"
            series={overallTimeSeries}
            value={
              youtube.statistics ? youtube.statistics.subscriberCount : null
            }
          />
          <OverallStatsTimeSeries
            data={overallTimeSeries}
            dataKey="youtube"
            title="Youtube Followers Trend"
          />
        </Card>
        <Card title="Podcast">
          <OverallValue
            valueKey="podcast"
            series={overallTimeSeries}
            value={podcasts ? podcasts[0].overallStats.total_listens : null}
          />
          <OverallStatsTimeSeries
            data={overallTimeSeries}
            dataKey="podcast"
            title="Podcast Listeners Trend"
          />
        </Card>
      </div>
    );
  }
}

export default OverallValuesTabView;
