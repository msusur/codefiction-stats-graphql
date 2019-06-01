import React, { Component } from 'react';
import Select from 'react-select';
import TopEpisodesChart from '../TopEpisodesChart';
import Card from '../ui/Card';

export class TotalListensTabView extends Component {
  constructor(props) {
    super(props);
    this.state = { options: [], selectedItem: '' };
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
    const { options, selectedValue, selectedItem } = this.state;
    return (
      <Card
        title="Bölüm başına dinlenme istatistikleri"
        style={{ marginLeft: 0 }}
      >
        <Select
          options={options}
          value={selectedValue}
          menuPlacement="auto"
          onChange={value =>
            this.setState({
              selectedItem: value.original,
              selectedValue: {
                label: value.label,
                value: value.value,
              },
            })
          }
        />
        {selectedItem ? (
          <TopEpisodesChart episode={selectedItem} videos={youtubeVideos} />
        ) : (
          <p>Devam etmek için bir seçim yapmanız gerekiyor.</p>
        )}
      </Card>
    );
  }
}

export default TotalListensTabView;
