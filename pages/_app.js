import '../styles/globals.css'
import '../styles.css'
import Head from "next/head"
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
