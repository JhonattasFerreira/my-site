import "./styles.css";

import { LanguageProvider } from "../hooks/LanguageContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
