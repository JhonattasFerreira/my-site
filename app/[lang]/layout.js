import "../globals.css";
import { Raleway } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  styles: ["normal", "italic"],
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
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
