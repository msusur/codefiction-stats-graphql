import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import OverallValue from '../OverallValue';
import Card from '../ui/Card';

export class OverallValuesTabView extends Component {
  render() {
    const { overallTimeSeries } = this.props;
    const { twitter } = this.props;
    const { youtube } = this.props;
    const { podcasts } = this.props;
    return (
      <Row>
        <Col md={4}>
          <Card>
            <OverallValue
              valueKey="twitter"
              text="Twitter Takipci Sayisi"
              series={overallTimeSeries}
              value={twitter ? twitter.followersCount : null}
            />
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <OverallValue
              valueKey="youtube"
              text="Toplam Youtube Takipcisi"
              series={overallTimeSeries}
              value={
                youtube.statistics ? youtube.statistics.subscriberCount : null
              }
            />
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <OverallValue
              valueKey="podcast"
              text="Toplam Podcast Dinleme"
              series={overallTimeSeries}
              value={podcasts ? podcasts[0].overallStats.total_listens : null}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default OverallValuesTabView;
