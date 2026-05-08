import styles from "./home.module.css";

import NavItem from "@/components/NavItem";
import Link from "next/link";
import SocialFooter from "@/components/SocialFooter";
import { Jersey_10 } from "next/font/google";

const jersey_10 = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
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
          <div>Hi, I'm a Software Engineer with a passion for programming.</div>
          <div className={styles.checkoutBlog}>
            Check out my <Link href={"/blog/en"}>blog</Link>. ❤️
          </div>
        </section>
      </main>

      <SocialFooter className={styles.footer} />
    </div>
  );
}
