import gql from 'graphql-tag';

export const USER_POLLS = gql`
    query getUserPolls {
      getUserPolls {
            id
            name
            date
            owner
            good
            mid
            bad
    }     
  }
`