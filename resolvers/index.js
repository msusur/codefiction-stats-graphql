const stringSimilarity = require('string-similarity');
const SimpleCastClient = require('simplecast-api-client');
const YoutubeClient = require('./clients/youtube');
const TwitterClient = require('./clients/twitter');
const { soundCloudScrapedData } = require('./clients/soundcloud');

const client = new SimpleCastClient({ apikey: process.env.SECRET });
const youtube = new YoutubeClient();
const twitter = new TwitterClient();

module.exports = {
  RootQuery: {
    podcasts() {
      return client.podcasts.getPodcasts();
    },
    youtube() {
      return youtube.getChannel();
    },
    twitter() {
      return twitter.getFollowers();
    }
  },
  Podcast: {
    episodes(podcast, { title }) {
      return client.episodes
        .getEpisodes(podcast.id)
        .then(
          episodes =>
          !title ?
          episodes :
          episodes.filter(
            episode =>
            episode.title.toLowerCase().indexOf(title.toLowerCase()) >
            -1
          )
        );
    },
    numberOfEpisodes(podcast) {
      return client.episodes
        .getEpisodes(podcast.id)
        .then(episodes => episodes.length);
    },
    overallStats(podcast, { timeframe, startDate, endDate }) {
      return client.statistics.getOverallStats(podcast.id, {
        timeframe,
        startDate,
        endDate
      });
    }
  },
  Episode: {
    stats(episode, { timeframe, startDate, endDate }) {
      return client.statistics.getEpisodeStats(episode.podcast_id, episode.id, {
        timeframe,
        startDate,
        endDate
      }).then(stats => {
        soundCloudScrapedData.map(item => {
          const similarity = stringSimilarity.compareTwoStrings(item.title, episode.title) * 100;
          if (similarity > 80) {
            stats.total_listens += item.listenCount;
            return false;
          }
          return true;
        });
        return stats;
      });
    }
  },
  YoutubeChannel: {
    videos(channel, { maxCount }) {
      return youtube.getVideos(channel.id, maxCount ? maxCount : 50);
    }
  },
  Video: {
    statistics(video) {
      return youtube.getVideoStats(video.snippet.resourceId.videoId);
    }
  }
};