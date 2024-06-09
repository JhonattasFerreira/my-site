import styles from "./home.module.css";

import NavItem from "@/components/NavItem";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { Jersey_10 } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const jersey_10 = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <SpeedInsights />
      <Analytics />
      <header>
        <NavItem item={{ name: "Blog", url: "/blog/en" }} />
      </header>

      <main className={styles.mainContent}>
        <section className={styles.title}>
          <span className={jersey_10.className}>
            <div>&gt; Jhonattas;</div>
            <div className={styles.cursor}>
              &gt; I'm a Software Engineer
              <div className={styles.rectangle}></div>
            </div>
          </span>
        </section>

        <section className={styles.containerAbout}>
          <div>
            Hi, I'm a Software Engineer with a passion for programming. I like
            to use the knowledge I have learned to create personal projects on
            GitHub.
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/jhonattasferreira/"
          aria-label="Go to my LinkedIn profile"
        >
          <FaLinkedin />
        </a>

        <a
          target="_blank"
          href="https://github.com/JhonattasFerreira"
          aria-label="Go to my GitHub profile"
        >
          <FaGithubSquare />
        </a>
      </footer>
    </div>
  );
}
