import React, { Component } from 'react';
import cls from 'classnames';
import { Col, Row } from 'react-bootstrap';
import { withApollo } from 'react-apollo';
import { invalidateCacheMutation } from '../queries/invalidate-cache.mutation';
import { DashboardQuery } from '../queries/dashboard.query';

import './WhatsUpToday.scss';
import Title from './ui/Title';
import { Refresh } from './Icons';
import { List, ListItem } from './ui/List';

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
      <Row>
        <Col md={6} className="whatsup-today--main">
          <div className="whatsup-today--header">
            <Title value="Bugünün Özeti" />
            <Refresh
              className={cls('whatsup-today--refresh', {
                'whatsup-today--animate': loading,
              })}
              onClick={() => {
                this.invalidateCache();
              }}
            />
          </div>
          <List unstyled>
            <ListItem>{`Twitter'a ${twitter.followersCount -
              lastResult.twitter} takipci geldi.`}</ListItem>
            <ListItem>{`Toplamda ${podcasts[0].overallStats.total_listens -
              lastResult.podcast} dinleme oldu.`}</ListItem>
            <ListItem>{`Youtube'daki takipci sayisi da ${parseInt(
              youtube.statistics.subscriberCount,
              10
            ) - lastResult.youtube} artti`}</ListItem>
          </List>
        </Col>
      </Row>
    );
  }
}

export default withApollo(WhatsUpToday);
