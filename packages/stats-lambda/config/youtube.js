const youtubeConfig = {
  web: {
    client_id:
      '1068620534768-opg46t5vkb5364196u6tf2dkna6dir49.apps.googleusercontent.com',
    project_id: 'codefiction-221700',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://www.googleapis.com/oauth2/v3/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: process.env.YOUTUBE,
  },
  key: process.env.YOUTUBE_KEY,
  channel_id: 'UCq3oLmam_8au66Hyw2-BJtg',
};

module.exports = { youtubeConfig };
