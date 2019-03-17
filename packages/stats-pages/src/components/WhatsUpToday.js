import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap';
import './WhatsUpToday.scss';

export class WhatsUpToday extends Component {
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
              <div className="whatsup-today--alert-header">Bugunun Ozeti</div>

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
                    youtube.statistics.subscriberCount
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

export default WhatsUpToday;
