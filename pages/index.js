import styles from "./index.module.css";

import NavItem from "../components/navItem/NavItem";

const Index = () => (
  <div className={styles.container}>
    <header>
      <NavItem item={{ name: "Blog", url: "blog" }} />
    </header>

    <main className={styles.mainContent}>
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
          aria-label="Go to my LinkedIn profile"
        >
          <i className="fa fa-linkedin-square"></i>
        </a>

        <a
          target="_blank"
          href="https://github.com/JhonattasFerreira"
          aria-label="Go to my GitHub profile"
        >
          <i className="fa fa-github-square"></i>
        </a>
      </section>
    </main>
  </div>
);

export default Index;
