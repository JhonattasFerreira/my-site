import Link from "next/link";
import styles from "./blog.module.css";
import NavItem from "../../components/NavItem";
import { useState } from "react";

const Blog = () => {
  const [language, setLanguage] = useState("en");

  return (
    <>
      <header>
        <NavItem item={{ name: "Home", url: "/" }}>
          {language === "en" ? (
            <button
              title="Change to Brazilian Portuguese"
              className={styles.button}
              onClick={() => setLanguage("pt-br")}
            >
              🇧🇷
            </button>
          ) : (
            <button
              title="Change to English"
              className={styles.button}
              onClick={() => setLanguage("en")}
            >
              🇺🇸
            </button>
          )}
        </NavItem>
      </header>
      <main className={styles.container}>
        <div className={styles.title}>
          <h1 className={styles.titleName}>
            {language === "en" ? "Last Blog Posts" : "Últimas Postagens"}
          </h1>
        </div>
        <Link
          href={
            language === "en"
              ? "blog/2024/04/23/creating-my-personal-site"
              : "blog/2024/04/23/creating-my-personal-site/pt-br"
          }
        >
          {language === "en"
            ? "Creating my personal site"
            : "Criando meu site pessoal"}
        </Link>
      </main>
    </>
  );
};

export default Blog;
