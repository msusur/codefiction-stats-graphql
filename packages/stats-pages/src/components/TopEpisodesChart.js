import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { compareTwoStrings } from 'string-similarity';
import Loading from './Loading';
import OverallValue from './OverallValue';

import './TopEpisodesChart.scss';

const QUERY_EPISODES_STATS = title => gql`
  {
    podcasts {
      episodes(title: "${title}") {
        stats {
          data {
            date
            listens
          }
        }
      }
    }
  }
`;

const TopEpisodesChart = ({ videos, episode }) => {
  if (!episode) {
    return <p>Devam etmek için bir seçim yapmanız gerekiyor.</p>;
  }

  const youtubeVideos = videos.filter(video => {
    const episodeTitle = episode.title;
    return compareTwoStrings(video.snippet.title, episodeTitle) * 100 > 60;
  });

  return (
    <Query query={QUERY_EPISODES_STATS(episode.title)}>
      {result => {
        if (!result.data || !result.data.podcasts) {
          return <Loading />;
        }

        const { data } = result.data.podcasts[0].episodes[0].stats;
        const youtubeVideoCount = youtubeVideos.length
          ? youtubeVideos[0].statistics.viewCount
          : '-';

        return (
          <div className="dashboard--items-container">
            <div className="value">
              <OverallValue
                text="Youtube İzlenme Sayısı"
                value={youtubeVideoCount}
              />
            </div>
            <div className="value">
              <OverallValue
                text="Podcast İzlenme Sayısı"
                value={episode.stats.total_listens}
              />
            </div>
            <ResponsiveContainer height={170}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="date" hide />
                <Tooltip />
                <Line
                  type="basis"
                  dataKey="listens"
                  stroke="#8884d8"
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      }}
    </Query>
  );
};

export default TopEpisodesChart;
