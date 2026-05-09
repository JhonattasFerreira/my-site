import "../globals.css";
import { Raleway } from "next/font/google";
import AnalyticsProviders from "@/components/AnalyticsProviders";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt-br" }];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={raleway.className}>
        {children}
        <AnalyticsProviders />
      </body>
    </html>
  );
}
