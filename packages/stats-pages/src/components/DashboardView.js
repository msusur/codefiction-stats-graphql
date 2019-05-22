import React, { Component } from 'react';
import { Grid, Tab, Tabs } from 'react-bootstrap';
import EpisodesChart from './EpisodesChart';
import Loading from './Loading';
import EpisodesTabView from './tabs/EpisodesTabView';
import TotalListensTabView from './tabs/TotalListensTabView';
import OverallValuesTabView from './tabs/OverallValuesTabView';

import styles from './DashboardView.module.scss';
import WhatsUpToday from './WhatsUpToday';

export class DashboardView extends Component {
  constructor() {
    super();
    this.state = { activeTab: 1 };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab,
    });
  }

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
        <Grid>
          <Tabs
            activeKey={this.state.activeTab}
            onSelect={this.handleSelect}
            id="dashboard-tabs"
            className="dashboard-tabs"
          >
            <Tab eventKey={1} title="Dinlenme Detayları">
              <TotalListensTabView
                episodes={podcasts[0].episodes}
                youtubeVideos={youtube.videos}
              />
            </Tab>
            <Tab eventKey={2} title="Toplam Dinlenme">
              <EpisodesTabView
                episodes={podcasts[0].episodes}
                videos={youtube.videos}
              />
            </Tab>
            <Tab eventKey={3} title="Aylık Dinlenme">
              <EpisodesChart podcast={podcasts[0]} />
            </Tab>
          </Tabs>
        </Grid>
      </main>
    );
  }
}

export default DashboardView;
