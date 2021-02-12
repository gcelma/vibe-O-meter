import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import auth from './utils/auth';

const link = new HttpLink({ uri: 'http://localhost:4000/' });
const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
    const token =  auth.__userApiToken__
    return {
      headers: {
        ...headers,
        authorization: token ? token : ''
      }
    }
  })

const client = new ApolloClient({
    link: authLink.concat(link),
    cache
});

export default client;

