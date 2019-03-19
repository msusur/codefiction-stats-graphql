const stringSimilarity = require('string-similarity');
const { SimpleCastClient } = require('./clients/simplecast-client');
const YoutubeClient = require('./clients/youtube');
const TwitterClient = require('./clients/twitter');
const {
  soundCloudScrapedData,
  allTimeListeningCount,
} = require('./clients/soundcloud');
const OverallStatsClient = require('./clients/overall-stats');

const simpleCastClient = new SimpleCastClient();
const youtube = new YoutubeClient();
const twitter = new TwitterClient();
const overallClient = new OverallStatsClient();

module.exports = {
  RootQuery: {
    podcasts() {
      return simpleCastClient.getPodcasts();
    },
    youtube() {
      return youtube.getChannel();
    },
    twitter() {
      return twitter.getFollowers();
    },
    overallTimeSeries() {
      return overallClient.getOverallRecords();
    },
  },
  Podcast: {
    episodes(podcast, { title }) {
      return simpleCastClient
        .getEpisodes(podcast.id)
        .then(episodes =>
          !title
            ? episodes
            : episodes.filter(
                episode =>
                  episode.title.toLowerCase().indexOf(title.toLowerCase()) > -1
              )
        );
    },
    numberOfEpisodes(podcast) {
      return simpleCastClient
        .getEpisodes(podcast.id)
        .then(episodes => episodes.length);
    },
    overallStats(podcast, { timeframe, startDate, endDate }) {
      return simpleCastClient
        .getOverallStats(podcast.id, {
          timeframe,
          startDate,
          endDate,
        })
        .then(result => {
          const calcResult = result;

          calcResult.total_listens += allTimeListeningCount();
          return calcResult;
        });
    },
  },
  Episode: {
    stats(episode, { timeframe, startDate, endDate }) {
      return simpleCastClient
        .getEpisodeStats(episode.podcast_id, episode.id, {
          timeframe,
          startDate,
          endDate,
        })
        .then(stats => {
          const calcStats = stats;
          soundCloudScrapedData.map(item => {
            const similarity =
              stringSimilarity.compareTwoStrings(item.title, episode.title) *
              100;
            if (similarity > 80) {
              calcStats.total_listens += item.listenCount;
              return false;
            }
            return true;
          });
          return calcStats;
        });
    },
  },
  YoutubeChannel: {
    videos(channel, { maxCount }) {
      return youtube.getVideos(channel.id, maxCount || 50);
    },
  },
  Video: {
    statistics(video) {
      return youtube.getVideoStats(video.snippet.resourceId.videoId);
    },
  },
  Mutation: {
    createDailyOverallRecord(
      parent,
      { podcastOverall, twitterOverall, youtubeOverall }
    ) {
      return overallClient.createOverallRecord({
        twitter: twitterOverall,
        youtube: youtubeOverall,
        podcast: podcastOverall,
      });
    },
  },
};
