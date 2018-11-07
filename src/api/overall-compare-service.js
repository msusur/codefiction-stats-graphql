export class OverallCompareService {
  setAndCompareValue(key, currentValue) {
    const existingValue = localStorage.getItem(key);

    localStorage.setItem(key, currentValue);
    if (!existingValue) {
      return {
        currentValue,
        existingValue: -1
      };
    }
    const ratio = Math.ceil(((currentValue - existingValue) / existingValue) * 100);
    return {
      currentValue,
      existingValue,
      ratio
    }
  }
}

export default OverallCompareService;