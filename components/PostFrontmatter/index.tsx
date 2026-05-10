import NavItem from "../NavItem";
import Link from "next/link";
import formatDate from "@/utils/formatDate";
import styles from "./PostFrontmatter.module.css";
import SocialFooter from "@/components/SocialFooter";
import { EN_LANGUAGE, PT_BR_LANGUAGE } from "@/utils/constants";
import ImageBlock from "@/components/Image";
import type { Lang, PostFrontmatter } from "@/types";

type Props = PostFrontmatter & {
  language: Lang;
  oppositeUrl: string;
  readingTime: number;
  children: React.ReactNode;
};

type TitleProps = {
  title: string;
  date: string;
  language: Lang;
  oppositeUrl: string;
  readingTime: number;
};

const PostFrontmatterLayout = ({
  title,
  date,
  language,
  children,
  oppositeUrl,
  gif,
  altTextGif,
  readingTime,
}: Props) => {
  return (
    <div className={styles.container}>
      <header>
        <NavItem item={{ name: "Blog", url: `/${language}/blog` }} />
      </header>
      <main id="main-content" className={styles.mainContent}>
        <article>
          <Title
            title={title}
            date={date}
            language={language}
            oppositeUrl={oppositeUrl}
            readingTime={readingTime}
          />
          <section className={styles.gifSection}>
            <ImageBlock src={gif} alt={altTextGif} />
          </section>
          <section className={styles.post}>{children}</section>
        </article>
      </main>
      <SocialFooter className={styles.footer} />
    </div>
  );
};

const Title = ({ title, date, language, oppositeUrl, readingTime }: TitleProps) => {
  const readingLabel =
    language === EN_LANGUAGE
      ? `${readingTime} min read`
      : `${readingTime} min de leitura`;

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <section className={styles.options}>
        <div className={styles.meta}>
          <time dateTime={date}>{formatDate(date, language)}</time>
          <span className={styles.separator}>·</span>
          <span>{readingLabel}</span>
        </div>
        {language === EN_LANGUAGE ? (
          <Link
            aria-label="Change to Brazilian Portuguese"
            href={`/${PT_BR_LANGUAGE}/blog/${oppositeUrl}`}
          >
            <span className={styles.languageBadge}>🇧🇷 Versão em Português</span>
          </Link>
        ) : (
          <Link
            aria-label="Change to English"
            href={`/${EN_LANGUAGE}/blog/${oppositeUrl}`}
          >
            <span className={styles.languageBadge}>🇬🇧 English version</span>
          </Link>
        )}
      </section>
    </>
  );
};

export default PostFrontmatterLayout;
