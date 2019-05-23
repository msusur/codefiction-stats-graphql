import React, { Component } from 'react';
import Select from 'react-select';
import TopEpisodesChart from '../TopEpisodesChart';
import Card from '../ui/Card';

export class TotalListensTabView extends Component {
  constructor() {
    super();
    this.state = { options: [], selectedItem: null };
  }

  componentDidMount = () => {
    this.mapEpisodes();
  };

  mapEpisodes = () => {
    const { episodes } = this.props;
    const options = episodes.map(episode => ({
      label: episode.title,
      value: episode.title,
      original: episode,
    }));
    this.setState({
      options,
    });
  };

  render() {
    const { youtubeVideos } = this.props;
    const { options, selectedValue } = this.state;
    return (
      <Card
        title="Bölüm başına dinlenme istatistikleri"
        style={{ marginLeft: 0 }}
      >
        <Select
          options={options}
          value={selectedValue}
          menuPlacement="auto"
          onChange={selectedItem =>
            this.setState({
              selectedItem: selectedItem.original,
              selectedValue: {
                label: selectedItem.label,
                value: selectedItem.value,
              },
            })
          }
        />
        <TopEpisodesChart
          episode={this.state.selectedItem}
          videos={youtubeVideos}
        />
      </Card>
    );
  }
}

export default TotalListensTabView;
