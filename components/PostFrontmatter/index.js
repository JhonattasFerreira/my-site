import NavItem from "../NavItem";
import { useRouter } from "next/router";
import { useLanguage } from "../../hooks/LanguageContext";
import { useEffect } from "react";
import Link from "next/link";
import FormatDate from "../../helpers/FormatDate";
import styles from "./PostFrontmatter.module.css";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

const REGEX_PT_BR = /\/pt-br$/;

const PostFrontmatter = ({ title, date, children }) => {
  const { asPath } = useRouter();
  const { language, setLanguage } = useLanguage();

  injectSpeedInsights();

  useEffect(() => {
    if (REGEX_PT_BR.test(asPath)) {
      setLanguage("pt-br");
    } else {
      setLanguage("en");
    }
  }, []);

  const Title = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <div className={styles.container}>
      <header>
        <NavItem item={{ name: "Blog", url: "/blog" }} />
      </header>
      <main className={styles.mainContent}>
        <article>
          <Title />
          <section className={styles.post}>{children}</section>
        </article>
      </main>
      <footer className={styles.footer}>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/jhonattasferreira/"
          aria-label="Go to my LinkedIn profile"
        >
          <FaLinkedin />
        </a>

        <a
          target="_blank"
          href="https://github.com/JhonattasFerreira"
          aria-label="Go to my GitHub profile"
        >
          <FaGithubSquare />
        </a>
      </footer>
    </div>
  );
};

export default PostFrontmatter;
