import Link from "next/link";
import styles from "./listing.module.css";
import NavItem from "@/components/NavItem";
import formatDate from "@/utils/formatDate";
import { TITLE_EN, TITLE_PT_BR, EN_LANGUAGE } from "@/utils/constants";
import GifCard from "@/components/GifCard";
import type { Lang, PostMetadata } from "@/types";

type Props = { postMetadata: PostMetadata[]; language: Lang };
type HeaderProps = { language: Lang };
type ListingProps = { posts: PostMetadata[]; language: Lang };

const ListingPost = ({ postMetadata, language }: Props) => {
  return (
    <>
      <header>
        <NavItem item={{ name: "Home", url: "/" }} />
        <Header language={language} />
      </header>
      <main id="main-content" className={styles.mainContent}>
        <ListingBlogPosts posts={postMetadata} language={language} />
      </main>
    </>
  );
};

const Header = ({ language }: HeaderProps) => {
  return (
    <div className={styles.title}>
      <h1 className={styles.titleName}>
        {language === EN_LANGUAGE ? TITLE_EN : TITLE_PT_BR}
      </h1>
      {language === EN_LANGUAGE ? (
        <Link aria-label="Change to Brazilian Portuguese" href="/pt-br/blog">
          <span className={styles.languageBadge}>🇧🇷 Versão em Português</span>
        </Link>
      ) : (
        <Link aria-label="Change to English" href="/en/blog">
          <span className={styles.languageBadge}>🇬🇧 English version</span>
        </Link>
      )}
    </div>
  );
};

const ListingBlogPosts = ({ posts, language }: ListingProps) => {
  return (
    <div className={styles.listBlogPosts}>
      {posts.map((post, index) => (
        <article key={post.slug} className={styles.articleBox}>
          <Link href={"/" + language + "/blog/" + post.slug}>
            <GifCard
              src={post.gif}
              alt={post.altTextGif}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className={styles.articleContent}>
              <p className={styles.articleTitleText}>{post.title}</p>
              <em>
                <time dateTime={post.date} className={styles.articleDate}>
                  {formatDate(post.date, language)}
                </time>
              </em>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

export default ListingPost;
