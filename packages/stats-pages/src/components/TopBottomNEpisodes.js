import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './TopBottomNEpisodes.scss';
import Card from './ui/Card';
import { PlayIcon, MusicIcon } from './Icons';

export class TopBottomNEpisodes extends Component {
  constructor(props) {
    super(props);
    this.columns = [
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
        Cell: row => {
          return (
            <React.Fragment>
              <a
                href={row.original.sharing_url}
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
            </React.Fragment>
          );
        },
      },
    ];
  }

  render() {
    const { episodes } = this.props;
    return (
      <Card>
        <ReactTable
          data={episodes}
          columns={this.columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </Card>
    );
  }
}

export default TopBottomNEpisodes;
