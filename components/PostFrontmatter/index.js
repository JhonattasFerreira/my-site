import NavItem from "../navItem/NavItem";
import { useRouter } from "next/router";
import { useLanguage } from "../../hooks/LanguageContext";
import { useEffect } from "react";
import Link from "next/link";
import FormatDate from "../../helpers/FormatDate";
import styles from "./pf.module.css";

const REGEX_PT_BR = /\/pt-br$/;

const PostFrontmatter = ({ title, date, children }) => {
  const { asPath } = useRouter();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (REGEX_PT_BR.test(asPath)) {
      setLanguage("pt-br");
    } else {
      setLanguage("en");
    }
  }, []);

  return (
    <div className={styles.container}>
      <NavItem item={{ name: "Blog", url: "/blog" }} />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{title}</h1>
        <section className={styles.options}>
          <time dateTime={date}>{FormatDate(date, language)}</time>
          {language === "en" ? (
            <Link
              aria-label="Change to Brazilian Portuguese"
              href={asPath + "/pt-br"}
            >
              <em>(Versão em Português)</em>
            </Link>
          ) : (
            <Link
              aria-label="Change to English"
              href={asPath.replace(REGEX_PT_BR, "")}
            >
              <em>(English version)</em>
            </Link>
          )}
        </section>
        <section className={styles.post}>{children}</section>
      </main>
      <footer className={styles.footer}>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/jhonattasferreira/"
          aria-label="Go to my LinkedIn profile"
        >
          <i className="fa fa-linkedin-square"></i>
        </a>

        <a
          target="_blank"
          href="https://github.com/JhonattasFerreira"
          aria-label="Go to my GitHub profile"
        >
          <i className="fa fa-github-square"></i>
        </a>
      </footer>
    </div>
  );
};

export default PostFrontmatter;
