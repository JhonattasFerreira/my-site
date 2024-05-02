import Link from "next/link";
import styles from "./blog.module.css";
import NavItem from "../../components/navItem/NavItem";
import truncateText from "../../helpers/TruncateText";
import { useLanguage } from "../../hooks/LanguageContext";
import listBlogPostsData from "./../../data/BlogList.json";

const Blog = () => {
  const { language, setLanguage } = useLanguage();
  let listBlogPosts = listBlogPostsData.listBlogPost;

  return (
    <div className={styles.container}>
      <header>
        <NavItem item={{ name: "Home", url: "/" }}>
          {language === "en" ? (
            <button
              title="Change to Brazilian Portuguese"
              className={styles.button}
              onClick={() => setLanguage("pt-br")}
            >
              🇺🇸
            </button>
          ) : (
            <button
              title="Change to English"
              className={styles.button}
              onClick={() => setLanguage("en")}
            >
              🇧🇷
            </button>
          )}
        </NavItem>
      </header>
      <main className={styles.mainContent}>
        <div className={styles.title}>
          <h1 className={styles.titleName}>
            {language === "en" ? "Last Blog Posts" : "Últimas Postagens"}
          </h1>
        </div>

        <div className={styles.listBlogPosts}>
          {listBlogPosts.map((post, index) => (
            <div key={`post-${index}`} className={styles.blogPostItem}>
              <Link href={post[`${language}-url`]}>
                {truncateText(post[`${language}-title`])}
              </Link>
              <div className={styles.postDate}>
                {language === "en" ? "Posted on " : "Publicado em "}
                <time dateTime={post.date}>
                  {post[`${language}-date-text`]}
                </time>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
