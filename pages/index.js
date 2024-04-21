import Head from "next/head";
import styles from "./index.module.css";

const Index = () => (
  <>
    <Head>
      <title>Jhonattas</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>

    <header>
      <nav className={styles.nav}>
        <a href="#">Blog</a>
      </nav>
    </header>

    <main className={styles.container}>
      <section className={styles.title}>
        <div>&gt; Jhonattas;</div>
        <div className={styles.cursor}>
          &gt; I'm a Software Engineer<div className={styles.rectangle}></div>
        </div>
      </section>

      <section className={styles.containerAbout}>
        <div>
          Hi, I'm a Software Engineer with a passion for programming. I like to
          use the knowledge I have learned to create personal projects on
          GitHub.
        </div>
      </section>

      <section className={styles.links}>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/jhonattasferreira/"
        >
          <i className="fa fa-linkedin-square"></i>
        </a>

        <a target="_blank" href="https://github.com/JhonattasFerreira">
          <i className="fa fa-github-square"></i>
        </a>
      </section>
    </main>
  </>
);

export default Index;
