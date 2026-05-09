"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../home.module.css";
import NavItem from "@/components/NavItem";
import Link from "next/link";
import SocialFooter from "@/components/SocialFooter";
import { Jersey_10 } from "next/font/google";
import type { BallConfig, Phase } from "@/types";

const jersey_10 = Jersey_10({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
});

const BALLS: BallConfig[] = [
  { color: "#86c98e", border: null,             startY: 0,    endX: -32,  endY: 2,  trembleDelay: "0s"   },
  { color: "#f7d070", border: null,             startY: -180, endX: -64,  endY: -8, trembleDelay: "0.1s" },
  { color: "#7eb8f7", border: null,             startY: 130,  endX: -96,  endY: 12, trembleDelay: "0.2s" },
  { color: "#f0f0f0", border: "1px solid #ccc", startY: -90,  endX: -128, endY: -4, trembleDelay: "0.3s" },
];

const BALL_SIZE = 28;

type CursorPos = {
  top: number;
  left: number;
  width: number;
  height: number;
  fallDistance: number;
};

type BallPosition = { left: number; top: number };

export default function Home() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorPos, setCursorPos] = useState<CursorPos>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    fallDistance: 0,
  });
  const [ballPositions, setBallPositions] = useState<BallPosition[]>(
    BALLS.map(() => ({ left: 0, top: 0 }))
  );
  const [ballsVisible, setBallsVisible] = useState(false);
  const [ballsJumping, setBallsJumping] = useState(false);
  const [ballsOpacity, setBallsOpacity] = useState(1);
  const [ballsTrembling, setBallsTrembling] = useState(false);

  const rectangleRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const cursorPosRef = useRef<CursorPos>(cursorPos);
  const rescueTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    cursorPosRef.current = cursorPos;
  }, [cursorPos]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (window.innerWidth < 962 || prefersReducedMotion) return;

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

  useEffect(() => {
    if (phase !== "resting") return;

    const pos = cursorPosRef.current;
    const cursorRestTop = pos.top + pos.fallDistance;

    const t = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      rescueTimers.current.push(id);
    };

    t(() => {
      setBallPositions(
        BALLS.map((ball, i) => ({
          left: window.innerWidth + 60 + i * 20,
          top: cursorRestTop + ball.startY,
        }))
      );
      setBallsOpacity(1);
      setBallsVisible(true);
    }, 500);

    t(() => {
      setBallPositions(
        BALLS.map((ball) => ({
          left: pos.left + ball.endX,
          top: cursorRestTop + ball.endY,
        }))
      );
      setPhase("approaching");
    }, 550);

    t(() => {
      setBallsJumping(true);
      setPhase("grabbing");
    }, 3750);

    t(() => {
      setBallsJumping(false);
      setBallPositions(
        BALLS.map((ball) => ({
          left: pos.left + ball.endX,
          top: pos.top + ball.endY,
        }))
      );
      setPhase("lifting");
    }, 4200);

    t(() => {
      setPhase("idle");
      if (navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const paddingRight = window.innerWidth * 0.02;
        const totalWidth = BALLS.length * BALL_SIZE + (BALLS.length - 1) * 4;
        const startLeft = navRect.right - paddingRight - totalWidth;
        setBallPositions(
          BALLS.map((_, i) => ({
            left: startLeft + i * (BALL_SIZE + 4),
            top: navRect.bottom + 4,
          }))
        );
      }
    }, 6600);

    t(() => setBallsTrembling(true), 8900);
  }, [phase]);

  useEffect(() => {
    const timers = rescueTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

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

      <main className={styles.mainContent}>
        <h1 className={styles.srOnly}>Jhonattas Ferreira — Software Engineer</h1>
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
        BALLS.map((ball, i) => (
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
              width: BALL_SIZE,
              height: BALL_SIZE,
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
