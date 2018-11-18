import React, { Component } from 'react';
import { Grid, Row, Col, Tab, Tabs } from 'react-bootstrap';
import EpisodesChart from './EpisodesChart';
import Header from './Header';
import Loading from './Loading';
import EpisodesTabView from './tabs/EpisodesTabView';
import TotalListensTabView from './tabs/TotalListensTabView';
import SocialMediaTabView from './tabs/SocialMediaTabView';
import OverallValuesTabView from './tabs/OverallValuesTabView';

export class DashboardView extends Component {
  state = {
    activeTab: 1
  };
  handleSelect = this.handleSelect.bind(this);

  render() {
    const {
      results: { twitter, overallTimeSeries, podcasts, youtube }
    } = this.props;

    if (!podcasts) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <OverallValuesTabView
          overallTimeSeries={overallTimeSeries}
          youtube={youtube}
          twitter={twitter}
          podcasts={podcasts}
        />
        <SocialMediaTabView overallTimeSeries={overallTimeSeries} />
        <Grid>
          <Row>
            <Col md={12}>
              <Tabs
                activeKey={this.state.activeTab}
                onSelect={this.handleSelect}
                id="dashboard-tab"
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
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

  handleSelect(selectedTab) {
    this.setState({
      activeTab: selectedTab
    });
  }
}

export default DashboardView;
