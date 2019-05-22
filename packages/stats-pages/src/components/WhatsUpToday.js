import React, { Component } from 'react';
import cls from 'classnames';
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
      <React.Fragment>
        <div className="col-6 whatsup-today--main">
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
            <ListItem>{`Twitter'da yeni ${twitter.followersCount -
              lastResult.twitter} kişi takip etmeye başladı.`}</ListItem>
            <ListItem>{`Toplamda ${podcasts[0].overallStats.total_listens -
              lastResult.podcast} kişi Codefiction dinledi.`}</ListItem>
            <ListItem>{`Youtube'da yeni ${parseInt(
              youtube.statistics.subscriberCount,
              10
            ) - lastResult.youtube} kişi takip etmeye başladı.`}</ListItem>
          </List>
        </div>
      </React.Fragment>
    );
  }
}

export default withApollo(WhatsUpToday);
