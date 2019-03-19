const fixCharLengthToTwo = number => (number < 10 ? `0${number}` : number);

export class OverallCompareService {
  constructor(series) {
    this.series = series;
  }

  setAndCompareValue(key, currentValue) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const createdOn = `${yesterday.getDate()}.${fixCharLengthToTwo(
      yesterday.getMonth() + 1
    )}.${yesterday.getFullYear()}`;
    const lastDayStat = this.series.filter(item => {
      if (item.createdOn === createdOn) {
        return item;
      }
      return null;
    });

    if (lastDayStat.length <= 0) {
      return {
        currentValue,
        existingValue: -1,
      };
    }
    const existingValue = lastDayStat[0][key];
    const ratio = Math.ceil(
      ((currentValue - existingValue) / existingValue) * 100
    );
    return {
      currentValue,
      existingValue,
      ratio,
    };
  }
}

export default OverallCompareService;
