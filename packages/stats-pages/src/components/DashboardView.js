import React, { Component } from 'react';
import { Grid, Row, Col, Tab, Tabs } from 'react-bootstrap';
import EpisodesChart from './EpisodesChart';
import Loading from './Loading';
import EpisodesTabView from './tabs/EpisodesTabView';
import TotalListensTabView from './tabs/TotalListensTabView';
import SocialMediaTabView from './tabs/SocialMediaTabView';
import OverallValuesTabView from './tabs/OverallValuesTabView';

import './DashboardView.scss';
import WhatsUpToday from './WhatsUpToday';
import Divider from './ui/Divider';

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
      <React.Fragment>
        <Grid fluid>
          <Row>
            <Col md={12} className="first--column">
              <WhatsUpToday results={whatsUpTodayContext} />
              <Divider />
              <OverallValuesTabView
                overallTimeSeries={overallTimeSeries}
                youtube={youtube}
                twitter={twitter}
                podcasts={podcasts}
              />
              <SocialMediaTabView overallTimeSeries={overallTimeSeries} />
            </Col>
          </Row>
        </Grid>
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
      </React.Fragment>
    );
  }
}

export default DashboardView;
