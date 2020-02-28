const { gql } = require('apollo-server')

const typeDefs = gql`
enum UserType {
  ADMIN
  REGULAR
}

type User {
  id: ID!
  username: String!
  email: String!
  type: UserType!
}

input NewUserInput {
  username: String!
  email: String!
  type: UserType!
}

type Query {
  getUsers: [User]
}

type Mutation {
  createUser(input: NewUserInput!): User!
}
`;

module.exports = typeDefs