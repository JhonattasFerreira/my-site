import "./styles.css";

import Head from "next/head";
import { LanguageProvider } from "../hooks/LanguageContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Jhonattas Ferreira</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </>
  );
}
