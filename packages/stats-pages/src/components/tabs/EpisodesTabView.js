import React, { Component } from 'react';
import { compareTwoStrings } from 'string-similarity';
import TopBottomNEpisodes from '../TopBottomNEpisodes';

export class EpisodesTabView extends Component {
  render() {
    const { videos, episodes } = this.props;
    const mappedEpisodes = episodes.map(episode => {
      const episodeRefined = episode;
      episodeRefined.grandTotal = episode.stats.total_listens;
      const filteredVideos = videos.filter(video => {
        const result =
          compareTwoStrings(video.snippet.title, episode.title) * 100 > 60;
        return result;
      });
      if (filteredVideos.length > 0) {
        const videoRef = filteredVideos[0];
        episodeRefined.videoRef = videoRef;
        episodeRefined.grandTotal += parseInt(
          episodeRefined.videoRef.statistics.viewCount,
          10
        );
      }

      return episodeRefined;
    });
    return <TopBottomNEpisodes maxItems={20} episodes={mappedEpisodes} />;
  }
}

export default EpisodesTabView;
