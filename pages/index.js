import Head from "next/head";
import styles from "./index.module.css";

const index = () => (
  <>
    <Head>
      <title>Jhonattas</title>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Jersey+10&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
    </Head>

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
          <i class="fa fa-linkedin-square"></i>
        </a>

        <a target="_blank" href="https://github.com/JhonattasFerreira">
          <i class="fa fa-github-square"></i>
        </a>
      </section>
    </main>
  </>
);

export default index;
