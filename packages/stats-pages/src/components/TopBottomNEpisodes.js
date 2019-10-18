import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './TopBottomNEpisodes.scss';
import Card from './ui/Card';
import { PlayIcon, MusicIcon } from './Icons';

const columns = [
  {
    Header: 'Bölüm Adı',
    accessor: 'title',
    width: 620,
    filterable: true,
  },
  {
    Header: 'Dinlenme',
    accessor: 'stats.total_listens',
  },
  {
    Header: 'Youtube İzlenme',
    accessor: 'videoRef.statistics.viewCount',
  },
  {
    Header: 'Toplam',
    accessor: 'grandTotal',
  },
  {
    Header: 'Dinle',
    Cell: row => (
      <>
        <a
          href={row.original.details.episode_url}
          target="_blank"
          rel="noopener noreferrer"
          title="Simplecast'de dinle"
        >
          <MusicIcon />
        </a>
        {row.original.videoRef && (
          <a
            href={`https://www.youtube.com/watch?v=${
              row.original.videoRef.snippet.resourceId.videoId
            }`}
            target="_blank"
            rel="noopener noreferrer"
            title="Youtube'da izle"
          >
            <PlayIcon />
          </a>
        )}
      </>
    ),
  },
];

const TopBottomNEpisodes = ({ episodes }) => (
  <Card>
    <ReactTable
      data={episodes}
      columns={columns}
      defaultPageSize={10}
      className="-striped -highlight"
    />
  </Card>
);

export default TopBottomNEpisodes;
