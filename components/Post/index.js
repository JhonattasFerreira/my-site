import NavItem from "../navItem/NavItem";
import { useRouter } from "next/router";
import { useLanguage } from "../../hooks/LanguageContext";
import { useEffect } from "react";
import Link from "next/link";
import FormatDate from "../../helpers/FormatDate";
import styles from "./Post.module.css";

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
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{title}</h1>
        <section className={styles.options}>
          <time dateTime={date}>{FormatDate(date, language)}</time>
          {language === "en" ? (
            <Link
              aria-label="Change to Brazilian Portuguese"
              href={pathname + "/pt-br"}
            >
              <em>(Versão em Português)</em>
            </Link>
          ) : (
            <Link
              aria-label="Change to English"
              href={pathname.replace(REGEX_PT_BR, "")}
            >
              <em>(English version)</em>
            </Link>
          )}
        </section>
        <section className={styles.post}>{children}</section>
      </main>
    </>
  );
};

export default Post;
