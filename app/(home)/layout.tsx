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

export const metadata = {
  title: "Jhonattas Ferreira | JhoCore",
  description:
    "Personal blog about software engineering, programming and creative coding.",
  openGraph: {
    title: "Jhonattas Ferreira | JhoCore",
    description:
      "Personal blog about software engineering, programming and creative coding.",
    url: "https://jhocore.com",
    siteName: "JhoCore",
    locale: "en_US",
    type: "website",
  },
};

type Props = { children: React.ReactNode };

export default function HomeLayout({ children }: Props) {
  return (
    <html lang="en" style={{ overflow: "hidden" }}>
      <body className={raleway.className} style={{ overflow: "hidden" }}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <AnalyticsProviders />
      </body>
    </html>
  );
}
