const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { getUserFromToken } = require('./auth');
require('../db/config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    const token = req.headers.authorization;
    try {
      return getUserFromToken(token)
        .then(user => user)
        .catch(e => null);
    } catch (e) {
      return null;
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server is ready at ${url}`);
});
