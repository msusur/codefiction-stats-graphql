const twitter_config = {
	CONSUMER_API_KEYS: {
		API_KEY: process.env.TWITTER_CONSUMER_API_KEY,
		API_SECRET_KEY: process.env.TWITTER_CONSUMER_API_SECRET_KEY
	},
	ACCESS_KEYS: {
		ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
		ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET
	}
};

module.exports = { twitter_config };
