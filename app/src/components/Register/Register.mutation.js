import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation CreateUser($input: NewUserInput!) {
        createUser(input: $input) {
            id
        }
  }
`