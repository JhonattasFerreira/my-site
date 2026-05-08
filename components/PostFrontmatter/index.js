import NavItem from "../NavItem";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import styles from "./PostFrontmatter.module.css";
import SocialFooter from "@/components/SocialFooter";
import { EN_LANGUAGE, PT_BR_LANGUAGE } from "@/utils/constants";
import Image from "@/components/Image";

const PostFrontmatter = ({
  title,
  date,
  language,
  children,
  oppositeUrl,
  gif,
  altTextGif,
}) => {
  return (
    <div className={styles.container}>
      <header>
        <NavItem item={{ name: "Blog", url: `/${language}/blog` }} />
      </header>
      <main className={styles.mainContent}>
        <article>
          <Title
            title={title}
            date={date}
            language={language}
            oppositeUrl={oppositeUrl}
          />
          <section className={styles.gifSection}>
            <Image src={gif} alt={altTextGif}></Image>
          </section>
          <section className={styles.post}>{children}</section>
        </article>
      </main>
      <SocialFooter className={styles.footer} />
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
            href={`/${PT_BR_LANGUAGE}/blog/${oppositeUrl}`}
          >
            <em>(Versão em Português)</em>
          </Link>
        ) : (
          <Link
            aria-label="Change to English"
            href={`/${EN_LANGUAGE}/blog/${oppositeUrl}`}
          >
            <em>(English version)</em>
          </Link>
        )}
      </section>
    </>
  );
};
export default PostFrontmatter;
