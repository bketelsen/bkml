import '@/styles/globals.css';

import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "@/lib/apolloClient";

import App from "next/app";
import Layout from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import { createContext } from "react";
import {WEBSITE_QUERY} from '@/lib/queries';

import { useApollo } from "@/lib/apolloClient";

export const GlobalContext = createContext({});


function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { website } = pageProps;
  return (
    <ApolloProvider client={apolloClient}>
    <GlobalContext.Provider value={website}>
      <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </GlobalContext.Provider>
    </ApolloProvider>

  )
}


// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const apolloClient = initializeApollo();
  const data = await
    apolloClient.query({
      query: WEBSITE_QUERY,
      variables: {
        siteID: "brian.dev"
      }
    });
    const website  = data.data.Website;
    console.log(website)
  // Pass the data to our page via props
  return { ...appProps, pageProps: { website } };
};

export default MyApp;
