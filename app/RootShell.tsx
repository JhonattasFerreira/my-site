import AnalyticsProviders from "@/components/AnalyticsProviders";
import { raleway } from "./fonts";

type Props = {
  lang: string;
  children: React.ReactNode;
  htmlStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
};

export default function RootShell({ lang, children, htmlStyle, bodyStyle }: Props) {
  return (
    <html lang={lang} style={htmlStyle}>
      <body className={raleway.className} style={bodyStyle}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <AnalyticsProviders />
      </body>
    </html>
  );
}
