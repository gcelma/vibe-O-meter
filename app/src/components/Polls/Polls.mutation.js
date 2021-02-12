import gql from 'graphql-tag';

export const DELETE_POLL = gql`
    mutation DeletePoll($input: ID!) {
        deletePoll(input: $input) {
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