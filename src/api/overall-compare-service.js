export class OverallCompareService {
  setAndCompareValue(key, value) {
    const existingValue = localStorage.getItem(key);

    localStorage.setItem(key, value);
    if (!existingValue) {
      return {
        currentValue: value,
        existingValue: -1
      };
    }
    return  {
      currentValue: value,
      existingValue
    }
  }
}

export default OverallCompareService;