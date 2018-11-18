import React, { Component } from 'react';
import TopBottomNEpisodes from '../TopBottomNEpisodes';
import { compareTwoStrings } from 'string-similarity';

export class EpisodesTabView extends Component {
  render() {
    const videos = this.props.videos;
    const episodes = this.props.episodes.map(episode => {
      const episodeRefined = episode;
      episodeRefined.grandTotal = episode.stats.total_listens;
      const filteredVideos = videos.filter(video => {
        const result =
          compareTwoStrings(video.snippet.title, episode.title) * 100 > 60;
        return result;
      });
      if (filteredVideos.length > 0) {
        episodeRefined.videoRef = filteredVideos[0];
        episodeRefined.grandTotal += parseInt(
          episodeRefined.videoRef.statistics.viewCount
        );
      }

      return episodeRefined;
    });
    return <TopBottomNEpisodes maxItems={20} episodes={episodes} />;
  }
}

export default EpisodesTabView;
