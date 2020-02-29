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
  owner: ID!
  good: Int
  mid: Int
  bad: Int
}

type Query {
  getUsers: [User]
  getPolls: [Poll]
  getUserPolls(userId: ID!): [Poll]
}

type Mutation {
  createUser(input: NewUserInput!): User!
  createPoll(input: NewPollInput!): Poll!
}
`;

module.exports = typeDefs