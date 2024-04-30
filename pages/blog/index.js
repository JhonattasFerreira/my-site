import Link from "next/link";
import styles from "./blog.module.css";
import NavItem from "../../components/NavItem";
import truncateText from "../../helpers/TruncateText";
import { useLanguage } from "../../hooks/LanguageContext";

const Blog = () => {
  const { language, setLanguage } = useLanguage();

  const listBlogPosts = [
    {
      "en-title": "Creating my personal site",
      "pt-br-title": "Criando meu site pessoal",
      date: "2024-04-23",
      "en-url": "blog/2024/04/23/creating-my-personal-site",
      "pt-br-url": "blog/2024/04/23/creating-my-personal-site/pt-br",
    },
    {
      "en-title": "Creating my personal site",
      "pt-br-title":
        "Criando meu site pessoal dsahnjjhdsajdhsakjsakhk dashjsjahndfsjnkndjsanfjnjadsknfjkjnkadsjnkfjnasjnfjnfdjnsjdnksf",
      date: "2024-04-23",
      "en-url": "blog/2024/04/23/creating-my-personal-site",
      "pt-br-url": "blog/2024/04/23/creating-my-personal-site/pt-br",
    },
    {
      "en-title": "Creating my personal site",
      "pt-br-title":
        "Criando meu site pessoal dsahnjjhdsajdhsakjsakhk dashjsjahndfsjnkndjsanfjnjadsknfjkjnkadsjnkfjnasjnfjnfdjnsjdnksf",
      date: "2024-04-23",
      "en-url": "blog/2024/04/23/creating-my-personal-site",
      "pt-br-url": "blog/2024/04/23/creating-my-personal-site/pt-br",
    },
    {
      "en-title": "Creating my personal site",
      "pt-br-title":
        "Criando meu site pessoal dsahnjjhdsajdhsakjsakhk dashjsjahndfsjnkndjsanfjnjadsknfjkjnkadsjnkfjnasjnfjnfdjnsjdnksf",
      date: "2024-04-23",
      "en-url": "blog/2024/04/23/creating-my-personal-site",
      "pt-br-url": "blog/2024/04/23/creating-my-personal-site/pt-br",
    },
    {
      "en-title": "Creating my personal site",
      "pt-br-title":
        "Criando meu site pessoal dsahnjjhdsajdhsakjsakhk dashjsjahndfsjnkndjsanfjnjadsknfjkjnkadsjnkfjnasjnfjnfdjnsjdnksf",
      date: "2024-04-23",
      "en-url": "blog/2024/04/23/creating-my-personal-site",
      "pt-br-url": "blog/2024/04/23/creating-my-personal-site/pt-br",
    },
    {
      "en-title": "Creating my personal site",
      "pt-br-title":
        "Criando meu site pessoal dsahnjjhdsajdhsakjsakhk dashjsjahndfsjnkndjsanfjnjadsknfjkjnkadsjnkfjnasjnfjnfdjnsjdnksf",
      date: "2024-04-23",
      "en-url": "blog/2024/04/23/creating-my-personal-site",
      "pt-br-url": "blog/2024/04/23/creating-my-personal-site/pt-br",
    },
    {
      "en-title": "Creating my personal site",
      "pt-br-title":
        "Criando meu site pessoal dsahnjjhdsajdhsakjsakhk dashjsjahndfsjnkndjsanfjnjadsknfjkjnkadsjnkfjnasjnfjnfdjnsjdnksf",
      date: "2024-04-23",
      "en-url": "blog/2024/04/23/creating-my-personal-site",
      "pt-br-url": "blog/2024/04/23/creating-my-personal-site/pt-br",
    },
    {
      "en-title": "Creating my personal site",
      "pt-br-title":
        "Criando meu site pessoal dsahnjjhdsajdhsakjsakhk dashjsjahndfsjnkndjsanfjnjadsknfjkjnkadsjnkfjnasjnfjnfdjnsjdnksf",
      date: "2024-04-23",
      "en-url": "blog/2024/04/23/creating-my-personal-site",
      "pt-br-url": "blog/2024/04/23/creating-my-personal-site/pt-br",
    },
  ];

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
                Posted on <time dateTime={post.date}>April 23, 2024</time>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
