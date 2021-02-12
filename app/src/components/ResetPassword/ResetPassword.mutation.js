import gql from 'graphql-tag';

export const RESET_PASSWORD = gql`
    mutation resetPassword($input: ResetPasswordInput!) {
        resetPassword(input: $input) {
            passwordReseted
        }
  }
`