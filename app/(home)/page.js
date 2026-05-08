"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../home.module.css";
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
  const [phase, setPhase] = useState("idle");
  const [cursorPos, setCursorPos] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    fallDistance: 0,
  });
  const rectangleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (rectangleRef.current) {
        const rect = rectangleRef.current.getBoundingClientRect();
        const fallDistance =
          window.innerHeight - 20 - rect.top - rect.height / 2 - rect.width / 2;
        setCursorPos({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          fallDistance,
        });
      }
      setPhase("falling");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.container}${phase === "shaking" ? ` ${styles.containerShaking}` : ""}`}
      onAnimationEnd={phase === "shaking" ? () => setPhase("resting") : undefined}
    >
      <header>
        <NavItem item={{ name: "Blog", url: "/en/blog" }} />
      </header>

      <main className={styles.mainContent}>
        <section className={styles.title}>
          <span className={jersey_10.className}>
            <div>&gt; Jhonattas;</div>
            <div className={styles.cursor}>
              &gt; I&apos;m a Software Engineer
              {phase === "idle" && (
                <div ref={rectangleRef} className={styles.rectangle} />
              )}
            </div>
          </span>
        </section>

        <section className={styles.containerAbout}>
          <div>Hi, I&apos;m a Software Engineer with a passion for programming.</div>
          <div className={styles.checkoutBlog}>
            Check out my <Link href={"/en/blog"}>blog</Link>. ❤️
          </div>
        </section>
      </main>

      {phase === "falling" && (
        <div
          className={styles.rectangleFalling}
          style={{
            top: cursorPos.top,
            left: cursorPos.left,
            width: cursorPos.width,
            height: cursorPos.height,
            "--fall-distance": `${cursorPos.fallDistance}px`,
          }}
          onAnimationEnd={() => setPhase("shaking")}
        />
      )}

      {(phase === "resting" || phase === "shaking") && (
        <div
          className={styles.rectangleResting}
          style={{
            top: cursorPos.top,
            left: cursorPos.left,
            width: cursorPos.width,
            height: cursorPos.height,
            transform: `translateY(${cursorPos.fallDistance}px) rotate(90deg)`,
          }}
        />
      )}

      <SocialFooter className={styles.footer} />
    </div>
  );
}
