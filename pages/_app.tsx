import "../styles/app.scss";
import "../styles/tailwind.scss";

import type { AppProps /*, AppContext */ } from "next/app";

import { NewsItemStoreProvider } from "../modules/news";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NewsItemStoreProvider>
        <Component {...pageProps} />
      </NewsItemStoreProvider>
    </>
  );
}

export default MyApp;
