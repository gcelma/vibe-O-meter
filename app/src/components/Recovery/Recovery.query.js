import gql from 'graphql-tag';

export const CREATE_RESET_LINK = gql`
    mutation createResetLink($input: ResetLinkInput!) {
        createResetLink(input: $input) {
            sent
        }
  }
`