import "../globals.css";
import RootShell from "../RootShell";

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
  // overflow: hidden must be on html/body, not just .container —
  // the shake animation translates the container beyond the viewport.
  const overflowHidden = { overflow: "hidden" } as const;
  return (
    <RootShell lang="en" htmlStyle={overflowHidden} bodyStyle={overflowHidden}>
      {children}
    </RootShell>
  );
}
