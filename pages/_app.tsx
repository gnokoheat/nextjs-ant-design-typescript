import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const AppLayout = dynamic(() => import('../components/Layout'), { ssr: false });

export default function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Head>
        <title>NextJs Antdesign Typescript</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  );
}