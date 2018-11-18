import React, { Component } from 'react';
import TopBottomNEpisodes from '../TopBottomNEpisodes';

export class EpisodesTabView extends Component {
  render() {
    const episodes = this.props.episodes;
    return <TopBottomNEpisodes maxItems={20} episodes={episodes} />;
  }
}

export default EpisodesTabView;
