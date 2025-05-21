import { ApolloClient, InMemoryCache } from "@apollo/client";

export const GraphQlClient = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    "apollo-require-preflight": "true",
  },
});
