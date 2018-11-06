export class EpisodeStatsService {
  getTimeSeries(episodes) {
    const months = {};

    episodes.map(episode => {
      return episode.stats.data.map(item => {
        return (months[item.date] =
          (months[item.date] ? months[item.date] : 0) + item.listens);
      });
    });
    const values = [],
      labels = [];
    for (let key in months) {
      labels.push(key);
      values.push(months[key]);
    }

    return {
      values,
      labels
    };
  }
}

export default EpisodeStatsService;
