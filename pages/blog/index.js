import Link from "next/link";
import styles from "./blog.module.css";
import NavItem from "../../components/NavItem";
import { SEO } from "../../components/Seo";
import { useLanguage } from "../../hooks/LanguageContext";
import FormatDate from "../../helpers/FormatDate";

const TITLE_EN = "Last Blog Posts";
const TITLE_PT_BR = "Últimas Postagens";

const Blog = () =>
  // { posts }

  {
    const { language, setLanguage } = useLanguage();
    const posts = [
      {
        "en-title": "How to Host a Website",
        "pt-br-title": "Como Hospedar um Website",
        date: "2024-05-08",
        "en-url": "how-to-hosting-a-website",
        "pt-br-url": `how-to-hosting-a-website/pt-br`,
      },
      {
        "en-title": "Creating My Personal Site",
        "pt-br-title": "Criando Meu Site Pessoal",
        date: "2024-04-23",
        "en-url": "creating-my-personal-site",
        "pt-br-url": `creating-my-personal-site/pt-br`,
      },
    ];

    return (
      <div className={styles.container}>
        <SEO title={TITLE_EN} />
        <header>
          <NavItem item={{ name: "Home", url: "/" }}></NavItem>
          <Header language={language} setLanguage={setLanguage} />
        </header>
        <main className={styles.mainContent}>
          <ListingBlogPosts posts={posts} language={language} />
        </main>
      </div>
    );
  };

const Header = ({ language, setLanguage }) => {
  return (
    <div className={styles.title}>
      <h1 className={styles.titleName}>
        {language === "en" ? TITLE_EN : TITLE_PT_BR}
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
  );
};

const ListingBlogPosts = ({ posts, language }) => {
  return (
    <div className={styles.listBlogPosts}>
      {posts.map((post, index) => (
        <article key={`post-${index}`} className={styles.blogPostItem}>
          <Link href={"blog/post/" + post[`${language}-url`]}>
            {post[`${language}-title`]}
          </Link>
          <div className={styles.postDate}>
            <time dateTime={post.date}>{FormatDate(post.date, language)}</time>
          </div>
        </article>
      ))}
    </div>
  );
};

// export async function getStaticProps() {
//   const posts = GetSortedPosts();

//   return {
//     props: { posts },
//   };
// }

export default Blog;
