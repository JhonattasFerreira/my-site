import Link from "next/link";
import styles from "./blog.module.css";
import NavItem from "../../components/navItem/NavItem";
import { useLanguage } from "../../hooks/LanguageContext";
import FormatDate from "../../helpers/FormatDate";
import { GetSortedPosts } from "../../helpers/PostData";

const Blog = ({ posts }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.container}>
      <header>
        <NavItem item={{ name: "Home", url: "/" }}></NavItem>
      </header>
      <main className={styles.mainContent}>
        <div className={styles.title}>
          <h1 className={styles.titleName}>
            {language === "en" ? "Last Blog Posts" : "Últimas Postagens"}
          </h1>
          {language === "en" ? (
            <button
              title="Change to Brazilian Portuguese"
              className={styles.button}
              onClick={() => setLanguage("pt-br")}
            >
              <em>(Versão em Português)</em>
            </button>
          ) : (
            <button
              title="Change to English"
              className={styles.button}
              onClick={() => setLanguage("en")}
            >
              <em>(English version)</em>
            </button>
          )}
        </div>

        <div className={styles.listBlogPosts}>
          {posts.map((post, index) => (
            <div key={`post-${index}`} className={styles.blogPostItem}>
              <Link href={post[`${language}-url`]}>
                {post[`${language}-title`]}
              </Link>
              <div className={styles.postDate}>
                <time dateTime={post.date}>
                  {FormatDate(post.date, language)}
                </time>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const posts = GetSortedPosts();

  return {
    props: { posts },
  };
}

export default Blog;
