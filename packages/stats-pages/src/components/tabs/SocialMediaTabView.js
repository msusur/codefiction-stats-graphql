import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import { OverallStatsTimeSeries } from '../OverallStatsTimeSeries';

export class SocialMediaTabView extends Component {
  render() {
    const { overallTimeSeries } = this.props;
    return (
      <Grid>
        <Row>
          <Col md={4}>
            <OverallStatsTimeSeries
              data={overallTimeSeries}
              dataKey="twitter"
              title="Twitter Trend"
            />
          </Col>
          <Col md={4}>
            <OverallStatsTimeSeries
              data={overallTimeSeries}
              dataKey="youtube"
              title="Youtube Followers Trend"
            />
          </Col>
          <Col md={4}>
            <OverallStatsTimeSeries
              data={overallTimeSeries}
              dataKey="podcast"
              title="Podcast Listeners Trend"
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

SocialMediaTabView.propTypes = {
  overallTimeSeries: PropTypes.any,
};

export default SocialMediaTabView;
