import NavItem from "../navItem/NavItem";
import { useRouter } from "next/router";
import { useLanguage } from "../../hooks/LanguageContext";
import { useEffect } from "react";
import Link from "next/link";
import FormatDate from "../../helpers/FormatDate";

const REGEX_PT_BR = /\/pt-br$/;

const Post = ({ title, date, children }) => {
  const { pathname } = useRouter();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (REGEX_PT_BR.test(pathname)) {
      setLanguage("pt-br");
    } else {
      setLanguage("en");
    }
  }, []);

  return (
    <>
      <NavItem item={{ name: "Blog", url: "/blog" }} />
      <main>
        <h1>{title}</h1>
        <time dateTime={date}>{FormatDate(date, language)}</time>
        {language === "en" ? (
          <Link href={pathname + "/pt-br"}>🇧🇷</Link>
        ) : (
          <Link href={pathname.replace(REGEX_PT_BR, "")}>🇺🇸</Link>
        )}
        {children}
      </main>
    </>
  );
};

export default Post;
