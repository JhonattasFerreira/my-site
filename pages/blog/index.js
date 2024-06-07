import Link from "next/link";
import styles from "./blog.module.css";
import NavItem from "../../components/navItem/NavItem";
import { useLanguage } from "../../hooks/LanguageContext";
import FormatDate from "../../helpers/FormatDate";
import fs from "fs";
import matter from "gray-matter";

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
              <Link href={"blog/post/" + post[`${language}-url`]}>
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
