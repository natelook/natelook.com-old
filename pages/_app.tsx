import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/tailwind.css";
import Layout from "@components/layout";
import { QueryClientProvider, QueryClient } from "react-query";
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3ReactProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default NextWeb3App;
