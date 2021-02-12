import gql from 'graphql-tag';

export const CREATE_POLL = gql`
    mutation CreatePoll($input: NewPollInput!) {
        createPoll(input: $input) {
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