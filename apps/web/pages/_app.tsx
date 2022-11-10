import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wallock</title>
        <link rel="icon" href="public/favicon/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}