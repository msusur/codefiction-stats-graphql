const { gql } = require('apollo-server-express');

const schema = gql`
  type RootQuery {
    podcasts: [Podcast]
  }

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
    episodes: [Episode]
    overallStats(
      # options: recent (default), year, all, custom
      timeframe: String
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
      timeframe: String
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

  schema {
    query: RootQuery
  }
`;

module.exports = schema;
