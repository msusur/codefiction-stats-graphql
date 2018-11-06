const { youtube_config } = require('../../config/youtube');
const { google } = require('googleapis');

class YoutubeClient {

  constructor() {
    this.auth = google.auth.fromAPIKey(youtube_config.key);
  }

  getChannel() {
    return google.youtube('v3').channels
      .list({ part: 'statistics', key: youtube_config.key, id: youtube_config.channel_id })
      .then(channels => {
        return channels.data.items[0];
      })
  }

  getVideos(channelId, maxCount) {
    return google.youtube('v3').channels
      .list({ part: 'contentDetails', key: youtube_config.key, id: channelId })
      .then(channels => {
        const playlistId = channels.data.items[0].contentDetails.relatedPlaylists;
        return google.youtube('v3').playlistItems
          .list({ part: 'snippet', playlistId: playlistId.uploads, key: youtube_config.key, maxResults: maxCount })
          .then(playlist => {
            return playlist.data.items;
          }).catch(err => {
            debugger;
          })
      });
  }

  getVideoStats(videoId) {
    return google.youtube('v3').videos
      .list({ part: 'statistics', key: youtube_config.key, id: videoId })
      .then(video => {
        return video.data.items[0].statistics;
      }).catch(ex => {
        debugger;
      })
  }
}

module.exports = YoutubeClient;
// const youtube = google.youtube('v3');
// youtube.auth()
// youtube.subscriptions.list({ auth: youtube_config.web.client_secret })