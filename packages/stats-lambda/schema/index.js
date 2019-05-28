const { gql } = require('apollo-server-lambda');

const schema = gql`
  type RootQuery {
    podcasts: [Podcast]
    youtube: YoutubeChannel
    twitter: TwitterProfile
    overallTimeSeries: [OverallStats]
  }

  enum OrderBy {
    desc
    asc
  }

  #######################
  ## Video Schema
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
    id: String!
    title: String
    href: String
    status: String
    image_url: String
    numberOfEpisodes: Int
    episodes(title: String): [Episode]
    downloads(orderBy: OrderBy): Downloads
    overallStats: PodcastStats
  }

  type PodcastStats {
    total_listens: Int
  }

  type Episode {
    id: String!
    title: String
    updated_at: String
    token: String
    status: String
    season: Season
    scheduled_for: String
    published_at: String
    number: Int
    image_url: String
    image_path: String
    href: String
    guid: String
    enclosure_url: String
    description: String
    downloads(orderBy: OrderBy): Downloads
    countries: [CountryStats]
    details: PodcastDetail
    ## This is missing in the client
    ## operating systems, providers, network types, devices, device class, browsers, applications.
    ## technologies: [TechnologyStats]
  }

  type Season {
    href: String
    number: Int
  }

  type PodcastDetail {
    waveform_json: String
    audio_file_url: String
    authors: [Authors]
    waveform_pack: String
    audio_file_size: Int
    duration: Int
    episode_url: String
  }

  type Authors {
    name: String
  }

  type Downloads {
    id: String
    total: Int
    interval: String # TODO: Enum? (day, week, month, year)
    by_interval: [Interval]
  }

  type Interval {
    interval: String
    downloads_total: Int
    downloads_percent: Float
  }

  type CountryStats {
    rank: Int
    name: String
    id: Int
    downloads_total: Int
    downloads_percent: Float
  }

  #######################
  ## Twitter Schema
  #######################
  type TwitterProfile {
    followersCount: Int
  }

  type Mutation {
    createDailyOverallRecord(
      podcastOverall: Int!
      twitterOverall: Int!
      youtubeOverall: Int!
    ): OverallStats!
    invalidateCache: RootQuery
  }

  type OverallStats {
    twitter: Int
    youtube: Int
    podcast: Int
    createdOn: String
  }

  schema {
    query: RootQuery
    mutation: Mutation
  }
`;

module.exports = schema;
