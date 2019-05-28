const MONTHS_NAMES_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

export class EpisodeStatsService {
  getTimeSeries(episodes) {
    const months = {};
    MONTHS_NAMES_TR.forEach(month => {
      months[month] = 0;
    });
    episodes.map(episode => {
      if (!episode.downloads || !episode.downloads.by_interval) {
        return {};
      }
      return episode.downloads.by_interval.forEach(item => {
        const month = MONTHS_NAMES_TR[new Date(item.interval).getMonth()];
        months[month] =
          (months[month] ? months[month] : 0) + item.downloads_total;
      });
    });

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
