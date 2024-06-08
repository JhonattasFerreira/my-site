import "./styles.css";

import { LanguageProvider } from "../hooks/LanguageContext";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  styles: ["normal", "italic"],
  display: "swap",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <style jsx global>{`
        html {
          font-family: ${raleway.style.fontFamily};
        }
      `}</style>
      <Component className={raleway.variable} {...pageProps} />
    </LanguageProvider>
  );
}
