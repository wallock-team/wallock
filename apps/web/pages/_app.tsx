import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wallock</title>
        <link rel="icon" href="/public/favicon/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
