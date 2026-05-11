"use client";

import { useRef } from "react";
import styles from "../home.module.css";
import NavItem from "@/components/NavItem";
import Link from "next/link";
import SocialFooter from "@/components/SocialFooter";
import { Jersey_10 } from "next/font/google";
import type { Phase } from "@/types";
import useHomeAnimation from "./useHomeAnimation";

const jersey_10 = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

export default function Home() {
  const rectangleRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const {
    phase,
    setPhase,
    cursorPos,
    ballPositions,
    ballsVisible,
    ballsJumping,
    ballsOpacity,
    ballsTrembling,
    balls,
    ballSize,
  } = useHomeAnimation(rectangleRef, navRef);

  const isRectFloating = (["resting", "approaching", "grabbing", "lifting"] as Phase[]).includes(phase);
  const isLifting = phase === "lifting";

  return (
    <div
      className={`${styles.container}${phase === "shaking" ? ` ${styles.containerShaking}` : ""}`}
      onAnimationEnd={phase === "shaking" ? () => setPhase("resting") : undefined}
    >
      <header ref={headerRef}>
        <div ref={navRef}>
          <NavItem item={{ name: "Blog", url: "/en/blog" }} />
        </div>
      </header>

      <main id="main-content" className={styles.mainContent}>
        <h1 className={`${styles.title} ${jersey_10.className}`}>
          <span className={styles.breathe}>&gt; Jhonattas;</span>
          <span className={styles.cursor}>
            &gt; I&apos;m a Software Engineer
            {phase === "idle" && (
              <div ref={rectangleRef} className={styles.rectangle} />
            )}
          </span>
        </h1>

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
          } as React.CSSProperties}
          onAnimationEnd={() => setPhase("shaking")}
        />
      )}

      {(phase === "shaking" || isRectFloating) && (
        <div
          className={styles.rectangleResting}
          style={{
            top: cursorPos.top,
            left: cursorPos.left,
            width: cursorPos.width,
            height: cursorPos.height,
            transform: isLifting
              ? `translateY(0) rotate(0deg)`
              : `translateY(${cursorPos.fallDistance}px) rotate(90deg)`,
            transition: isLifting ? "transform 2.2s ease-in-out" : "none",
          }}
        />
      )}

      {ballsVisible &&
        balls.map((ball, i) => (
          <div
            key={i}
            className={[
              styles.ball,
              ballsJumping ? styles.ballJumping : "",
              ballsTrembling ? styles.ballTrembling : "",
            ].join(" ")}
            style={{
              left: ballPositions[i].left,
              top: ballPositions[i].top,
              width: ballSize,
              height: ballSize,
              background: ball.color,
              border: ball.border ?? "none",
              opacity: ballsOpacity,
              transition:
                phase === "approaching"
                  ? "left 3s ease-in-out, top 3s ease-in-out, opacity 0.6s ease-out"
                  : "left 2.2s ease-in-out, top 2.2s ease-in-out, opacity 0.6s ease-out",
              animationDelay: ballsTrembling ? ball.trembleDelay : undefined,
            }}
          >
            <div className={styles.ballEye} />
            <div className={styles.ballEye} />
          </div>
        ))}

      <SocialFooter className={styles.footer} />
    </div>
  );
}
