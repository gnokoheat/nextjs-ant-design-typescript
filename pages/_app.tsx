import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Head>
        <title>NextJs Antdesign Typescript</title>
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  );
}