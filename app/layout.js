import "./globals.css";
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

export const metadata = {
  title: "Jhonattas Ferreira | JhoCore",
  description: "A blog by Jhonattas Ferreira",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />

      <body className={raleway.className}>{children}</body>
    </html>
  );
}
