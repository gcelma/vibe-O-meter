import gql from 'graphql-tag';

export const AUTHENTICATE_USER = gql`
    mutation AuthenticateUser($input: AuthenticateUserInput!) {
        authenticateUser(input: $input) {
            token
        }
  }
`