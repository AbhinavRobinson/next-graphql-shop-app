import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../gqlclient";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Provider } from "../contexts/cart";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <UserProvider>
        <ApolloProvider client={apolloClient}>
          <Navbar />
          <Component {...pageProps} />
        </ApolloProvider>
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
