const SimpleCastClient = require('simplecast-api-client');

const client = new SimpleCastClient({ apikey: process.env.SECRET });
module.exports = {
  RootQuery: {
    podcasts() {
      return client.podcasts.getPodcasts();
    }
  },
  Podcast: {
    episodes(podcast, { title }) {
      return client.episodes.getEpisodes(podcast.id)
        .then(episodes =>
          !title ?
          episodes :
          episodes.filter(episode => episode.title.toLowerCase().indexOf(title.toLowerCase()) > -1)
        );
    },
    numberOfEpisodes(podcast) {
      return client.episodes.getEpisodes(podcast.id).then(episodes => episodes.length);
    },
    overallStats(podcast, { timeframe, startDate, endDate }) {
      return client.statistics.getOverallStats(podcast.id, {
        timeframe,
        startDate,
        endDate
      });
    }
    // episodesTitleContains(podcast, { query }) {
    //   return client.episodes
    //     .getEpisodes(podcast.id)
    //     .then(episodes =>
    //       episodes.filter(episode => episode.title.indexOf(query) > -1)
    //     );
    // }
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