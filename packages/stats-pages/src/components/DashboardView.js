import React from 'react';
import TotalListensTabView from './tabs/TotalListensTabView';
import OverallValuesTabView from './tabs/OverallValuesTabView';
import EpisodesTabView from './tabs/EpisodesTabView';
import EpisodesChart from './EpisodesChart';

import styles from './DashboardView.module.scss';
import WhatsUpToday from './WhatsUpToday';

export const DashboardView = ({ results }) => {
  const { twitter, overallTimeSeries, podcasts, youtube } = results;
  const whatsUpTodayContext = {
    twitter,
    overallTimeSeries,
    podcasts,
    youtube,
  };

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
      <div className={styles.summary}>
        <EpisodesTabView
          episodes={podcasts[0].episodes}
          videos={youtube.videos}
        />
      </div>
      <div className={styles.summary}>
        <EpisodesChart podcast={podcasts[0]} />
      </div>
    </main>
  );
};

export default DashboardView;
