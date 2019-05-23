import React, { Component } from 'react';
import Loading from './Loading';
import TotalListensTabView from './tabs/TotalListensTabView';
import OverallValuesTabView from './tabs/OverallValuesTabView';
import EpisodesTabView from './tabs/EpisodesTabView';

import styles from './DashboardView.module.scss';
import WhatsUpToday from './WhatsUpToday';

export class DashboardView extends Component {
  render() {
    const {
      results: { twitter, overallTimeSeries, podcasts, youtube },
    } = this.props;

    const whatsUpTodayContext = {
      twitter,
      overallTimeSeries,
      podcasts,
      youtube,
    };

    if (!podcasts) {
      return <Loading />;
    }
    return (
      <main className="container">
        <div className={styles.summary}>
          <WhatsUpToday results={whatsUpTodayContext} />
          <OverallValuesTabView
            overallTimeSeries={overallTimeSeries}
            youtube={youtube}
            twitter={twitter}
            podcasts={podcasts}
          />
        </div>
        <div className={styles.summary}>
          <TotalListensTabView
            episodes={podcasts[0].episodes || null}
            youtubeVideos={youtube.videos}
          />
        </div>
        <EpisodesTabView
          episodes={podcasts[0].episodes}
          videos={youtube.videos}
        />
        {/* <EpisodesChart podcast={podcasts[0]} /> */}
      </main>
    );
  }
}

export default DashboardView;
