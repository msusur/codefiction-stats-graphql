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

const query = {
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
    downloads(podcast, { orderBy }) {
      return simpleCastClient.getOverallDownloads(
        podcast.id,
        orderBy || 'desc'
      );
    },
    numberOfEpisodes(podcast) {
      return podcast.episodes.count;
    },
    overallStats(podcast) {
      return simpleCastClient
        .getOverallStats(podcast.id)
        .then(podcastResult => {
          return { total_listens: podcastResult.total };
        })
        .then(result => {
          const calcResult = result;

          calcResult.total_listens += allTimeListeningCount();
          return calcResult;
        });
    },
  },
  Episode: {
    downloads(episode) {
      // Temporary solution until the bug on simplecast resolved.
      if (episode.id === '92227acd-be24-4560-98e5-6ad2b21710e5') {
        return {};
      }
      return simpleCastClient.getEpisodeStats(episode.id).then(stats => {
        const calcStats = stats;
        soundCloudScrapedData.map(item => {
          const similarity =
            stringSimilarity.compareTwoStrings(item.title, episode.title) * 100;
          if (similarity > 80) {
            calcStats.total += item.listenCount;
            return false;
          }
          return true;
        });
        return calcStats;
      });
    },
    details(episode) {
      return simpleCastClient.getEpisode(episode.id);
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
    invalidateCache() {
      simpleCastClient.clearCache();
      return query.RootQuery;
    },
  },
};

module.exports = query;
