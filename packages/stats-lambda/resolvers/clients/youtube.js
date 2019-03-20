const { google } = require('googleapis');
const { youtubeConfig } = require('../../config/youtube');

class YoutubeClient {
  constructor() {
    this.auth = google.auth.fromAPIKey(youtubeConfig.key);
  }

  getChannel() {
    return google
      .youtube('v3')
      .channels.list({
        part: 'statistics',
        key: youtubeConfig.key,
        id: youtubeConfig.channel_id,
      })
      .then(channels => {
        return channels.data.items[0];
      });
  }

  getVideos(channelId, maxCount) {
    return google
      .youtube('v3')
      .channels.list({
        part: 'contentDetails',
        key: youtubeConfig.key,
        id: channelId,
      })
      .then(channels => {
        const playlistId =
          channels.data.items[0].contentDetails.relatedPlaylists;
        return this.getPlaylistItems(playlistId, maxCount);
      });
  }

  getPlaylistItems(playlistId, maxCount, nextPageToken) {
    return google
      .youtube('v3')
      .playlistItems.list({
        part: 'snippet',
        playlistId: playlistId.uploads,
        key: youtubeConfig.key,
        maxResults: maxCount,
        pageToken: nextPageToken,
      })
      .then(playlist => {
        if (playlist.data.nextPageToken) {
          return this.getPlaylistItems(
            playlistId,
            maxCount,
            playlist.data.nextPageToken
          ).then(items => playlist.data.items.concat(items));
        }
        return playlist.data.items;
      })
      .catch(err => {
        throw err;
      });
  }

  getVideoStats(videoId) {
    return google
      .youtube('v3')
      .videos.list({ part: 'statistics', key: youtubeConfig.key, id: videoId })
      .then(video => {
        return video.data.items[0].statistics;
      })
      .catch(ex => {
        throw ex;
      });
  }
}

module.exports = YoutubeClient;
