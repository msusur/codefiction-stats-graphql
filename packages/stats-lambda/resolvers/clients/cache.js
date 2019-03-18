const NodeCache = require('node-cache-promise');
const { promisify } = require('util');

const redis = require('redis');

class InMemoryCache {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 43200 });
    console.log('InMemory cache selected.');
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

class RedisCache {
  constructor() {
    this.client = redis.createClient(process.env.REDIS_ENDPOINT);
    console.log(`Connecting to redis cluster: ${process.env.REDIS_ENDPOINT}`);
    this.client.on('connect', () => console.log('Connected to redis cluster.'));
    this.client.on('error', error => console.log(error));
  }

  getOrUpdate(key, updateFn) {
    const getAsync = promisify(this.client.get).bind(this.client);

    return getAsync(key).then(value => {
      if (value) {
        return JSON.parse(value);
      }
      return updateFn().then(response => {
        this.client.set(key, JSON.stringify(response));
        return response;
      });
    });
  }
}

const getCacheInstance = () => {
  const cacheTypes = {
    inMemory: InMemoryCache,
    redis: RedisCache,
  };
  const type = process.env.CACHE_TYPE || 'inMemory';
  return new cacheTypes[type]();
};

module.exports = { getCacheInstance };
