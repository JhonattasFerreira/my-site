import NavItem from "../NavItem";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import styles from "./PostFrontmatter.module.css";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const PostFrontmatter = ({
  title,
  date,
  slug,
  language,
  children,
  oppositeUrl,
}) => {
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
            slug={slug}
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

const Title = ({ title, date, slug, language, oppositeUrl }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <section className={styles.options}>
        <time dateTime={date}>{formatDate(date, language)}</time>
        {language === "en" ? (
          <Link
            aria-label="Change to Brazilian Portuguese"
            href={`/blog/pt-br/${oppositeUrl}`}
          >
            <em>(Versão em Português)</em>
          </Link>
        ) : (
          <Link aria-label="Change to English" href={`/blog/en/${oppositeUrl}`}>
            <em>(English version)</em>
          </Link>
        )}
      </section>
    </>
  );
};
export default PostFrontmatter;
