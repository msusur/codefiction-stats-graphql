export class EpisodeStatsService {
  getTimeSeries(episodes) {
    const months = {};

    episodes.map(episode =>
      episode.downloads.by_interval.forEach(item => {
        months[item.interval] =
          (months[item.interval] ? months[item.interval] : 0) +
          item.downloads_total;
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
