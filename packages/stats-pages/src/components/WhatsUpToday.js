import React, { useState } from 'react';
import cls from 'classnames';
import { useApolloClient } from '@apollo/react-hooks';
import { invalidateCacheMutation } from '../queries/invalidate-cache.mutation';
import { DashboardQuery } from '../queries/dashboard.query';

import './WhatsUpToday.scss';
import Title from './ui/Title';
import { Refresh } from './Icons';
import { List, ListItem } from './ui/List';

const WhatsUpToday = ({ results }) => {
  const client = useApolloClient();
  const [isLoading, setIsLoading] = useState(false);

  const invalidateCache = async () => {
    setIsLoading(true);
    await client.mutate({
      mutation: invalidateCacheMutation,
      refetchQueries: [{ query: DashboardQuery }],
      notifyOnNetworkStatusChange: true,
      awaitRefetchQueries: true,
    });
    setIsLoading(false);
  };

  const { overallTimeSeries, twitter, youtube, podcasts } = results;
  const lastResult = overallTimeSeries[overallTimeSeries.length - 1];

  return (
    <div className="whatsup-today--main">
      <div className="whatsup-today--header">
        <Title value="Bugünün Özeti" />
        <Refresh
          className={cls('whatsup-today--refresh', {
            'whatsup-today--animate': isLoading,
          })}
          onClick={invalidateCache}
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
  );
};

export default WhatsUpToday;
