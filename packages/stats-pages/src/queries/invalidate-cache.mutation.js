import gql from 'graphql-tag';

export const invalidateCacheMutation = gql`
  mutation InvalidateCache {
    invalidateCache {
      podcasts {
        title
      }
    }
  }
`;

export default invalidateCacheMutation;
