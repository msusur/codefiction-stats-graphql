const { gql } = require('apollo-server-express');

const schema = gql `
  type RootQuery {
    podcasts: [Podcast]
    youtube: YoutubeChannel
    twitter: TwitterProfile
    overallTimeSeries: [OverallStats]
  }

  enum TimeFrame {
    recent
    year
    all
    custom
  }

  #######################
  ## Video Schema
  #######################
  type YoutubeChannel {
    etag: String
    id: String
    kind: String
    statistics: ChannelStats
    videos(maxCount: Int): [Video]
  }

  type ChannelStats {
    commentCount: String
    subscriberCount: String
    hiddenSubscriberCount: Boolean
    videoCount: String
    viewCount: String
  }

  type Video {
    id: String
    kind: String
    etag: String
    snippet: VideoSnippet
    statistics: VideoStats
  }

  type VideoSnippet {
    publishedAt: String
    channelId: String
    title: String
    description: String
    thumbnails: VideoThumb
    channelTitle: String
    playlistId: String
    resourceId: VideoResource
  }

  type VideoResource {
    kind: String
    videoId: String
  }

  type VideoThumb {
    default: VideoImage
    medium: VideoImage
    high: VideoImage
    standard: VideoImage
    maxres: VideoImage
  }

  type VideoImage {
    url: String
    width: Int
    height: Int
  }

  type VideoStats {
    commentCount: String
    dislikeCount: String
    favoriteCount: String
    likeCount: String
    viewCount: String
  }

  #######################
  ## Podcast Schema
  #######################
  type Podcast {
    id: Int!
    title: String
    rss_url: String
    description: String
    author: String
    copyright: String
    subdomain: String
    categories: [String]
    itunes_url: String
    language: String
    website: String
    twitter: String
    explicit: Boolean
    images: Image
    episodes(title: String): [Episode]
    numberOfEpisodes: Int
    overallStats(
      # options: recent (default), year, all, custom
      timeframe: TimeFrame
      # required for 'custom' timeframe
      startDate: String
      # defaults to today
      endDate: String
    ): PodcastStats
    episodesTitleContains(
      # Title query
      query: String
    ): [Episode]
  }

  type Episode {
    id: Int!
    number: Int
    podcast: Podcast
    guid: String
    title: String
    author: String
    duration: Int
    explicit: Boolean
    published: Boolean
    description: String
    long_description: String
    published_at: String
    audio_file_size: Int
    audio_url: String
    sharing_url: String
    images: Image
    is_hidden: Boolean
    sponsors: [String]
    stats(
      # options: recent (default), year, all, custom
      timeframe: TimeFrame
      # required for 'custom' timeframe
      startDate: String
      # defaults to today
      endDate: String
    ): EpisodeStats
  }

  type Image {
    large: String
    small: String
    thumb: String
  }

  type PodcastStats {
    total_listens: Int
  }

  type EpisodeStats {
    data: [EpisodeStatsItem]
    total_listens: Int
  }

  type EpisodeStatsItem {
    date: String
    listens: Int
  }

  #######################
  ## Twitter Schema
  #######################
  type TwitterProfile {
    followersCount: Int
  }

  type Mutation {
    createDailyOverallRecord(podcastOverall: Int!, twitterOverall: Int!, youtubeOverall: Int!): OverallStats!
  }

  type OverallStats {
    twitter: Int
    youtube: Int
    podcast: Int
    createdOn: String
  }

  schema {
    query: RootQuery,
    mutation: Mutation
  }
`;

module.exports = schema;