import "../globals.css";
import RootShell from "../RootShell";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "pt-br" }];
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  return <RootShell lang={lang}>{children}</RootShell>;
}
