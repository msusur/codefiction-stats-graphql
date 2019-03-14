const NodeCache = require('node-cache-promise');

class InMemoryCache {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 43200 });
  }

  getOrUpdate(key, updateFn) {
    return this.cache.get(key).then(value => {
      if (value) {
        return value;
      }
      return updateFn().then(response => {
        this.cache.set(key, response);
        return response;
      });
    });
  }
}

module.exports = { InMemoryCache };
