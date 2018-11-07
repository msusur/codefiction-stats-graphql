export class OverallCompareService {
  constructor(series) {
    this.series = series;
  }

  setAndCompareValue(key, currentValue) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let createdOn = `${yesterday.getDate()}.${yesterday.getMonth()}.${yesterday.getFullYear()}`;
    const lastDayStat = this.series.filter((item) => {
      if (item.createdOn === createdOn) {
        return item;
      }
    });
    
    if (lastDayStat.length <= 0) {
      return {
        currentValue,
        existingValue: -1
      };
    }
    const existingValue = lastDayStat[0][key];
    const ratio = Math.ceil(((currentValue - existingValue) / existingValue) * 100);
    return {
      currentValue,
      existingValue,
      ratio
    }
  }
}

export default OverallCompareService;