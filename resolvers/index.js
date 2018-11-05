const SimpleCastClient = require('simplecast-api-client');

const client = new SimpleCastClient({ apikey: process.env.SECRET });
module.exports = {
  RootQuery: {
    podcasts() {
      return client.podcasts.getPodcasts();
    }
  },
  Podcast: {
    episodes(podcast) {
      return client.episodes.getEpisodes(podcast.id);
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
      });
    }
  }
};
