const Twit = require('twit');
const { twitterConfig } = require('../../config/twitter');

class TwitterClient {
  constructor() {
    this.twit = new Twit({
      consumer_key: twitterConfig.CONSUMER_API_KEYS.API_KEY,
      consumer_secret: twitterConfig.CONSUMER_API_KEYS.API_SECRET_KEY,
      access_token: twitterConfig.ACCESS_KEYS.ACCESS_TOKEN,
      access_token_secret: twitterConfig.ACCESS_KEYS.ACCESS_SECRET,
    });
  }

  getFollowers() {
    const tweets = this.twit
      .get('followers/ids', {
        screen_name: 'codefictiontech',
      })
      .then(response => {
        return {
          followersCount: response.data.ids.length,
        };
      })
      .catch(err => {
        throw err;
      });

    return tweets;
  }
}

module.exports = TwitterClient;
