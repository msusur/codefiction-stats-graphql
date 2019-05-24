export class EpisodeStatsService {
  getTimeSeries(episodes) {
    const months = {};

    episodes.map(episode =>
      episode.stats.data.forEach(item => {
        months[item.date] =
          (months[item.date] ? months[item.date] : 0) + item.listens;
      })
    );

    let data = [];

    Object.keys(months).forEach(key => {
      data = [
        ...data,
        {
          month: key,
          listens: months[key],
        },
      ];
    });

    return data;
  }
}

export default EpisodeStatsService;
