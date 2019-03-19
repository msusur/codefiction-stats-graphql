export class EpisodeStatsService {
  getTimeSeries(episodes) {
    const months = {};

    episodes.map(episode =>
      episode.stats.data.forEach(item => {
        months[item.date] =
          (months[item.date] ? months[item.date] : 0) + item.listens;
      })
    );

    const values = [];
    const labels = [];

    Object.keys(months).forEach(key => {
      labels.push(key);
      values.push(months[key]);
    });

    return {
      values,
      labels,
    };
  }
}

export default EpisodeStatsService;
