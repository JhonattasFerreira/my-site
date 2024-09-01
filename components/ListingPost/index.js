import Link from "next/link";
import styles from "./listing.module.css";
import NavItem from "@/components/NavItem";
import formatDate from "@/utils/formatDate";
import { TITLE_EN, TITLE_PT_BR, EN_LANGUAGE } from "@/utils/constants";

const ListingPost = ({ postMetadata, language }) => {
  return (
    <>
      <header>
        <NavItem item={{ name: "Home", url: "/" }}></NavItem>
        <Header language={language} />
      </header>
      <main className={styles.mainContent}>
        <ListingBlogPosts posts={postMetadata} language={language} />
      </main>
    </>
  );
};

const Header = ({ language }) => {
  return (
    <div className={styles.title}>
      <h1 className={styles.titleName}>
        {language === EN_LANGUAGE ? TITLE_EN : TITLE_PT_BR}
      </h1>
      {language === EN_LANGUAGE ? (
        <Link aria-label="Change to Brazilian Portuguese" href="/blog/pt-br">
          <em>(Versão em Português)</em>
        </Link>
      ) : (
        <Link aria-label="Change to English" href="/blog/en">
          <em>(English version)</em>
        </Link>
      )}
    </div>
  );
};

const ListingBlogPosts = ({ posts, language }) => {
  return (
    <div className={styles.listBlogPosts}>
      {posts.map((post, index) => (
        <article key={`post-${index}`} className={styles.articleBox}>
          <Link href={"/blog/" + language + "/" + post.slug}>
            <img src={post.gif} alt={post.altTextGif} className={styles.gif} />
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
