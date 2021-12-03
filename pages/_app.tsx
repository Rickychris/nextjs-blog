import "../styles/global.css";
import { AppProps } from "next/app";
// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split
} from "@apollo/client";

// 2
const httpLink = createHttpLink({
  uri: "https://rickandmortyapi.com/graphql",
});

const mutationLink = createHttpLink({
  uri: 'https://graphqlzero.almansi.me/api',
  // mutation link...
});

// 3
const client = new ApolloClient({
  // link: httpLink,
  link: split(
    operation => operation.getContext().clientName === "mutation",
    mutationLink, // <= apollo will send to this if clientName is "mutation'
    httpLink // <= otherwise will send to this
  ),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
