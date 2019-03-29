import React, { Component } from 'react';
import { Col, Grid, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { invalidateCacheMutation } from '../queries/invalidate-cache.mutation';
import { DashboardQuery } from '../queries/dashboard.query';

import './WhatsUpToday.scss';
import Title from './ui/Title';
import { Refresh } from './Icons';

export class WhatsUpToday extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  invalidateCache() {
    this.setState({ loading: true });
    const { client } = this.props;
    client
      .mutate({
        mutation: invalidateCacheMutation,
        refetchQueries: [{ query: DashboardQuery }],
        notifyOnNetworkStatusChange: true,
        awaitRefetchQueries: true,
      })
      .then(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { results } = this.props;
    const { overallTimeSeries, twitter, youtube, podcasts } = results;
    const { loading } = this.state;
    const lastResult = overallTimeSeries[overallTimeSeries.length - 1];
    return (
      <Grid>
        <Row>
          <Col className="whatsup-today--main">
            <Title value="Bugünün Özeti" />
            <div className="whatsup-today--alert-header">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="cache-clean">
                    Sunucu tarafli tüm önbelleklemeyi silip yeniden betim
                    kostur.
                  </Tooltip>
                }
              >
                <Refresh
                  className={`whatsup-today--refresh ${!loading ||
                    'whatsup-today--animate'}`}
                  onClick={() => {
                    this.invalidateCache();
                  }}
                />
              </OverlayTrigger>
            </div>

            <ul>
              <li>
                {`Twitter'a ${twitter.followersCount -
                  lastResult.twitter} takipci geldi.`}
              </li>
              <li>
                {`Toplamda ${podcasts[0].overallStats.total_listens -
                  lastResult.podcast} dinleme oldu.`}
              </li>
              <li>
                {`Youtube'daki takipci sayisi da ${parseInt(
                  youtube.statistics.subscriberCount,
                  10
                ) - lastResult.youtube} artti`}
              </li>
            </ul>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withApollo(WhatsUpToday);
