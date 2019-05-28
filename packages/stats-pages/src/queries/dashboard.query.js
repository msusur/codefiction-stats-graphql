import gql from 'graphql-tag';

export const DashboardQuery = gql`
  {
    podcasts {
      overallStats {
        total_listens
      }
      title
      episodes {
        title
        id
        enclosure_url
        details {
          episode_url
        }
        guid
        downloads(orderBy: desc) {
          total
          by_interval {
            downloads_total
            interval
          }
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
