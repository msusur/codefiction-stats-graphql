import React, { Component } from 'react';
import { Grid, Row, Panel, Col, Tab, Tabs } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import EpisodesChart from './EpisodesChart';
import Header from './Header';
import Loading from './Loading';
import TopEpisodesChart from './TopEpisodesChart';
import TopBottomNEpisodes from './TopBottomNEpisodes';
import OverallValue from './OverallValue';
import OverallStatsTimeSeries from './OverallStatsTimeSeries';

export class DashboardView extends Component {
  state = {
    selectedItem: {},
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
        <Grid>
          <Row md={12}>
            <Col md={4}>
              <Panel>
                <Panel.Body className="bg-primary text-white">
                  <OverallValue
                    valueKey={'twitter'}
                    text={'Twitter Takipci Sayisi'}
                    series={overallTimeSeries}
                    value={twitter ? twitter.followersCount : null}
                  />
                </Panel.Body>
              </Panel>
            </Col>
            <Col md={4}>
              <Panel>
                <Panel.Body className="bg-success text-white">
                  <OverallValue
                    valueKey={'youtube'}
                    text={'Toplam Youtube Takipcisi'}
                    series={overallTimeSeries}
                    value={
                      youtube.statistics
                        ? youtube.statistics.subscriberCount
                        : null
                    }
                  />
                </Panel.Body>
              </Panel>
            </Col>
            <Col md={4}>
              <Panel>
                <Panel.Body className="bg-info text-white">
                  <OverallValue
                    valueKey={'podcast'}
                    text={'Toplam Podcast Dinleme'}
                    series={overallTimeSeries}
                    value={
                      podcasts ? podcasts[0].overallStats.total_listens : null
                    }
                  />
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Tabs
                activeKey={this.state.activeTab}
                onSelect={this.handleSelect}
              >
                <Tab eventKey={1} title="Dinlenme Detayları">
                  <Grid>
                    <Row md={12}>
                      <Col md={8}>
                        <label>Bolum adi girin</label>
                        <Typeahead
                          labelKey="title"
                          options={podcasts[0].episodes}
                          onChange={selectedItem =>
                            this.setState({ selectedItem })
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <TopEpisodesChart
                          episode={this.state.selectedItem}
                          videos={youtube.videos}
                        />
                      </Col>
                    </Row>
                  </Grid>
                </Tab>
                <Tab eventKey={2} title="Toplam Dinlenme">
                  <TopBottomNEpisodes
                    maxItems={20}
                    episodes={podcasts[0].episodes}
                  />
                </Tab>

                <Tab eventKey={3} title="Sosyal Medya">
                  <Grid>
                    <Row>
                      <Col md={4}>
                        <OverallStatsTimeSeries
                          data={overallTimeSeries}
                          dataKey={'twitter'}
                          title={'Twitter Trend'}
                        />
                      </Col>
                      <Col md={4}>
                        <OverallStatsTimeSeries
                          data={overallTimeSeries}
                          dataKey={'youtube'}
                          title={'Youtube Followers Trend'}
                        />
                      </Col>
                      <Col md={4}>
                        <OverallStatsTimeSeries
                          data={overallTimeSeries}
                          dataKey={'podcast'}
                          title={'Podcast Listeners Trend'}
                        />
                      </Col>
                    </Row>
                  </Grid>
                </Tab>
                <Tab eventKey={4} title="Aylık Dinlenme">
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
