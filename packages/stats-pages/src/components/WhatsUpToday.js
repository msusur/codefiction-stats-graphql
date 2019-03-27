import React, { Component } from 'react';
import {
  Alert,
  Col,
  Grid,
  Glyphicon,
  Row,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { invalidateCacheMutation } from '../queries/invalidate-cache.mutation';
import { DashboardQuery } from '../queries/dashboard.query';

import './WhatsUpToday.scss';

export class WhatsUpToday extends Component {
  constructor(props) {
    super(props);
    this.loading = false;
  }

  invalidateCache() {
    this.loading = true;
    this.props.client.mutate({
      mutation: invalidateCacheMutation,
      refetchQueries: [{ query: DashboardQuery }],
      onCompleted: () => {
        this.loading = false;
      },
    });
  }

  render() {
    const {
      overallTimeSeries,
      twitter,
      youtube,
      podcasts,
    } = this.props.results;
    const lastResult = overallTimeSeries[overallTimeSeries.length - 1];

    return (
      <Grid>
        <Row>
          <Col className="whatsup-today--main">
            <Alert variant="dark">
              <div className="whatsup-today--alert-header">
                Bugunun Ozeti
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="cache-clean">
                      Sunucu tarafli tüm önbelleklemeyi silip yeniden betim
                      kostur.
                    </Tooltip>
                  }
                >
                  <Glyphicon
                    glyph="refresh"
                    className={`whatsup-today--refresh ${
                      this.loading ? 'whatsup-today--animate' : ''
                    }`}
                    onClick={() => this.invalidateCache()}
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
            </Alert>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default withApollo(WhatsUpToday);
