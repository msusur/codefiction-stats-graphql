const Twit = require('twit');
const { twitter_config } = require('../../config/twitter');

class TwitterClient {
  constructor() {
    this.twit = new Twit({
      consumer_key: twitter_config.CONSUMER_API_KEYS.API_KEY,
      consumer_secret: twitter_config.CONSUMER_API_KEYS.API_SECRET_KEY,
      access_token: twitter_config.ACCESS_KEYS.ACCESS_TOKEN,
      access_token_secret: twitter_config.ACCESS_KEYS.ACCESS_SECRET,
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
        debugger;
      });

    return tweets;
  }
}

module.exports = TwitterClient;
