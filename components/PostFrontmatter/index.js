import NavItem from "../NavItem";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import styles from "./PostFrontmatter.module.css";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { EN_LANGUAGE, PT_BR_LANGUAGE } from "@/utils/constants";

const PostFrontmatter = ({ title, date, language, children, oppositeUrl }) => {
  return (
    <div className={styles.container}>
      <header>
        <NavItem item={{ name: "Blog", url: `/blog/${language}` }} />
      </header>
      <main className={styles.mainContent}>
        <article>
          <Title
            title={title}
            date={date}
            language={language}
            oppositeUrl={oppositeUrl}
          />
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

const Title = ({ title, date, language, oppositeUrl }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <section className={styles.options}>
        <time dateTime={date}>{formatDate(date, language)}</time>
        {language === EN_LANGUAGE ? (
          <Link
            aria-label="Change to Brazilian Portuguese"
            href={`/blog/${PT_BR_LANGUAGE}/${oppositeUrl}`}
          >
            <em>(Versão em Português)</em>
          </Link>
        ) : (
          <Link
            aria-label="Change to English"
            href={`/blog/${EN_LANGUAGE}/${oppositeUrl}`}
          >
            <em>(English version)</em>
          </Link>
        )}
      </section>
    </>
  );
};
export default PostFrontmatter;
