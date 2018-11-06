import React, { Component } from 'react';
import EpisodesChart from './components/EpisodesChart';
import { Grid, Row, Panel, Col } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Header from './components/Header';
import Loading from './components/Loading';
import YoutubeOverall from './components/YoutubeOverall';
import { PodcastOverall } from './components/PodcastOverall';
import TwitterOverall from './components/TwitterOverall';

const QUERY_EPISODES = title => gql`
  {
    podcasts {
      overallStats(timeframe: year) {
        total_listens
      }
      title
      episodes {
        title
        stats(timeframe: all) {
          data {
            date
            listens
          }
        }
      }
    }
    youtube {
      statistics {
        subscriberCount
      }
    }
    twitter {
      followersCount
    }
  }
`;

export class App extends Component {
  render() {
    return (
      <Query query={QUERY_EPISODES()}>
        {result => {
          if (!result.data || !result.data.podcasts) {
            return <Loading />;
          }
          return (
            <div>
              <Header />
              <Grid>
                <Row md={12}>
                  <Col md={4}>
                    <Panel>
                      <Panel.Body>
                        <TwitterOverall value={result.data.twitter} />
                      </Panel.Body>
                    </Panel>
                  </Col>
                  <Col md={4}>
                    <Panel>
                      <Panel.Body>
                        <YoutubeOverall
                          value={result.data.youtube.statistics}
                        />
                      </Panel.Body>
                    </Panel>
                  </Col>
                  <Col md={4}>
                    <Panel>
                      <Panel.Body>
                        <PodcastOverall value={result.data.podcasts} />
                      </Panel.Body>
                    </Panel>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <EpisodesChart podcast={result.data.podcasts[0]} />
                  </Col>
                </Row>
              </Grid>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
