import Link from "next/link";
import styles from "./blog.module.css";
import NavItem from "../../components/NavItem";
import { SEO } from "../../components/Seo";
import { useLanguage } from "../../hooks/LanguageContext";
import FormatDate from "../../helpers/FormatDate";
import fs from "fs";
import matter from "gray-matter";

const TITLE_EN = "Last Blog Posts";
const TITLE_PT_BR = "Últimas Postagens";

const Blog = ({ posts }) => {
  const { language, setLanguage } = useLanguage();

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

export async function getStaticProps() {
  const dirPath = `${process.cwd()}/content/posts`;
  const files = fs.readdirSync(dirPath);

  const posts = files.map((filename) => {
    const basePath = `${dirPath}/${filename}/index`;

    const getFileContent = (lang) =>
      fs.readFileSync(`${basePath}.${lang}.md`).toString();
    const getMetadata = (content) => matter(content).data;

    const enContent = getFileContent("en");
    const ptBrContent = getFileContent("pt-br");

    const enMetadata = getMetadata(enContent);
    const ptBrMetadata = getMetadata(ptBrContent);

    return {
      "en-title": enMetadata.title,
      "pt-br-title": ptBrMetadata.title,
      date: enMetadata.date,
      "en-url": filename.replace(".md", ""),
      "pt-br-url": `${filename.replace(".md", "")}/pt-br`,
    };
  });

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: { posts },
  };
}

export default Blog;
