const SimpleCastAPIClient = require('simplecast-api-client');
const { getCacheInstance } = require('./cache');

const CACHE_KEYS = {
  PODCASTS: 'CACHE:PODCASTS',
  EPISODES: 'CACHE:EPISODES::',
  OVERALL_PODCAST_STATS: 'CACHE:STATS:PODCAST::',
  OVERALL_EPISODE_STATS: 'CACHE:STATS:EPISODE::',
};

class SimpleCastClient {
  constructor() {
    this.client = new SimpleCastAPIClient({ apikey: process.env.SECRET });
    this.cache = getCacheInstance();
  }

  getPodcasts() {
    return this.cache.getOrUpdate(CACHE_KEYS.PODCASTS, () =>
      this.client.podcasts.getPodcasts().then(podcasts => podcasts.collection)
    );
  }

  getOverallDownloads(podcastId, orderBy) {
    return this.client.podcasts
      .getAllDownloadsAnalytics(podcastId)
      .then(download => {
        const downloadDetails = download;
        downloadDetails.by_interval = download.by_interval.sort(
          (date1, date2) => {
            return orderBy === 'asc'
              ? new Date(date1.interval) - new Date(date2.interval)
              : new Date(date2.interval) - new Date(date1.interval);
          }
        );
        return download;
      });
  }

  getEpisodes(podcastId) {
    return this.cache.getOrUpdate(`${CACHE_KEYS.EPISODES}::${podcastId}`, () =>
      this.client.episodes
        .getEpisodes(podcastId, { limit: 1000 })
        .then(episodes => episodes.collection)
    );
  }

  getOverallStats(podcastId) {
    return this.cache.getOrUpdate(
      `${CACHE_KEYS.OVERALL_PODCAST_STATS}::${podcastId}`,
      () => this.client.podcasts.getAllDownloadsAnalytics(podcastId)
    );
  }

  getEpisodeStats(episodeId) {
    return this.cache.getOrUpdate(
      `${CACHE_KEYS.OVERALL_EPISODE_STATS}::${episodeId}`,
      () => this.client.episodes.getDownloads(episodeId)
    );
  }

  getEpisode(episodeId) {
    return this.cache.getOrUpdate(`${CACHE_KEYS.EPISODES}::${episodeId}`, () =>
      this.client.episodes.getEpisode(episodeId).then(episode => {
        return {
          waveform_json: episode.waveform_json,
          audio_file_url: episode.audio_file_url,
          authors: episode.authors.collection,
          waveform_pack: episode.waveform_pack,
          audio_file_size: episode.audio_file_size,
          duration: episode.duration,
          episode_url: episode.episode_url,
        };
      })
    );
  }

  clearCache() {
    return this.cache.clearCache();
  }
}

module.exports = { SimpleCastClient };
