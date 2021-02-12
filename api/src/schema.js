const { gql } = require('apollo-server')

const typeDefs = gql`

type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  polls: [ID]
}

input NewUserInput {
  username: String!
  email: String!
  password: String!
  passwordConfirmation: String!
}

input AuthenticateUserInput {
  email: String!
  password: String!
}

type AuthUser {
    token: String!
    user: User!
}

type Poll {
  id: ID!
  name: String!
  date: String!
  owner: ID!
  good: Int
  mid: Int
  bad: Int
} 

input NewPollInput {
  name: String!
  owner: ID
  date: String
  good: Int
  mid: Int
  bad: Int
}

input ResetLinkInput {
  email: String!
}

type ResetLinkSent {
  sent: Boolean
}

input ResetPasswordInput {
  newPassword: String!
  token: String!
}

type ResetPasswordDone {
  passwordReseted: Boolean
}

type Query {
  getUsers: [User]
  getPolls: [Poll]
  getUserPolls: [Poll]
}

type Mutation {
  createUser(input: NewUserInput!): User!
  authenticateUser(input: AuthenticateUserInput!): AuthUser!
  createPoll(input: NewPollInput!): Poll!
  deletePoll(input: ID!): Poll!
  createResetLink(input: ResetLinkInput!): ResetLinkSent!
  resetPassword(input: ResetPasswordInput!): ResetPasswordDone!
}
`;

module.exports = typeDefs