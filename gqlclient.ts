import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_FAUNA_DOMAIN,
});

const authLink = setContext((_, { headers }) => {
  const faunaKey = process.env.NEXT_PUBLIC_FAUNA_KEY;
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${faunaKey}`,
    },
  };
});

export const setAuthToken = (token: string) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  }
  );
}

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
