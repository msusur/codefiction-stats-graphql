import gql from 'graphql-tag';

export const DashboardQuery = gql`
  {
    podcasts {
      overallStats(timeframe: year) {
        total_listens
      }
      title
      episodes {
        title
        id
        audio_url
        sharing_url
        guid
        stats(timeframe: all) {
          data {
            date
            listens
          }
          total_listens
        }
      }
    }
    youtube {
      statistics {
        subscriberCount
      }
      videos {
        snippet {
          title
          resourceId {
            videoId
          }
        }
        statistics {
          viewCount
        }
      }
    }
    twitter {
      followersCount
    }
    overallTimeSeries {
      twitter
      youtube
      podcast
      createdOn
    }
  }
`;
export default DashboardQuery;
