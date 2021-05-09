import Head from "next/head";

import "../styles/tailwind.scss";

import type { AppProps /*, AppContext */ } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
