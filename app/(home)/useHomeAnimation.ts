"use client";

import { useState, useEffect, useRef, type RefObject } from "react";
import type { BallConfig, Phase } from "@/types";

type CursorPos = {
  top: number;
  left: number;
  width: number;
  height: number;
  fallDistance: number;
};

type BallPosition = { left: number; top: number };

// endX for each ball must be a multiple of (BALL_SIZE + gap).
// Current gap = 4px. If BALL_SIZE changes, recalculate: -1×(BS+4), -2×(BS+4), etc.
const BALLS: BallConfig[] = [
  { color: "#86c98e", border: null,             startY: 0,    endX: -26,  endY: 2,  trembleDelay: "0s"   },
  { color: "#f7d070", border: null,             startY: -180, endX: -52,  endY: -8, trembleDelay: "0.1s" },
  { color: "#7eb8f7", border: null,             startY: 130,  endX: -78,  endY: 12, trembleDelay: "0.2s" },
  { color: "#f0f0f0", border: "1px solid #ccc", startY: -90,  endX: -104, endY: -4, trembleDelay: "0.3s" },
];

// Total ball formation width (N×BALL_SIZE + (N-1)×4) must fit under the "Blog"
// nav link. If BALL_SIZE changes, adjust font-size in NavItem.module.css accordingly.
const BALL_SIZE = 22;

// All delays are relative to when phase becomes "resting".
const ANIMATION_TIMINGS = {
  INITIAL_FALL_DELAY: 2000,
  BALLS_APPEAR: 500,
  BALLS_APPROACH: 550,
  BALLS_JUMP: 3750,
  BALLS_LIFT: 4200,
  BALLS_NAV: 6600,
  BALLS_TREMBLE: 8900,
} as const;

type HomeAnimationState = {
  phase: Phase;
  setPhase: (phase: Phase) => void;
  cursorPos: CursorPos;
  ballPositions: BallPosition[];
  ballsVisible: boolean;
  ballsJumping: boolean;
  ballsOpacity: number;
  ballsTrembling: boolean;
  balls: BallConfig[];
  ballSize: number;
};

export default function useHomeAnimation(
  rectangleRef: RefObject<HTMLDivElement | null>,
  navRef: RefObject<HTMLDivElement | null>
): HomeAnimationState {
  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorPos, setCursorPos] = useState<CursorPos>({
    top: 0, left: 0, width: 0, height: 0, fallDistance: 0,
  });
  const [ballPositions, setBallPositions] = useState<BallPosition[]>(
    BALLS.map(() => ({ left: 0, top: 0 }))
  );
  const [ballsVisible, setBallsVisible] = useState(false);
  const [ballsJumping, setBallsJumping] = useState(false);
  const [ballsOpacity, setBallsOpacity] = useState(1);
  const [ballsTrembling, setBallsTrembling] = useState(false);

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
    }, ANIMATION_TIMINGS.INITIAL_FALL_DELAY);

    return () => clearTimeout(timer);
  }, [rectangleRef]);

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
    }, ANIMATION_TIMINGS.BALLS_APPEAR);

    t(() => {
      setBallPositions(
        BALLS.map((ball) => ({
          left: pos.left + ball.endX,
          top: cursorRestTop + ball.endY,
        }))
      );
      setPhase("approaching");
    }, ANIMATION_TIMINGS.BALLS_APPROACH);

    t(() => {
      setBallsJumping(true);
      setPhase("grabbing");
    }, ANIMATION_TIMINGS.BALLS_JUMP);

    t(() => {
      setBallsJumping(false);
      setBallPositions(
        BALLS.map((ball) => ({
          left: pos.left + ball.endX,
          top: pos.top + ball.endY,
        }))
      );
      setPhase("lifting");
    }, ANIMATION_TIMINGS.BALLS_LIFT);

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
    }, ANIMATION_TIMINGS.BALLS_NAV);

    t(() => setBallsTrembling(true), ANIMATION_TIMINGS.BALLS_TREMBLE);
  }, [phase, navRef]);

  useEffect(() => {
    const timers = rescueTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  return {
    phase,
    setPhase,
    cursorPos,
    ballPositions,
    ballsVisible,
    ballsJumping,
    ballsOpacity,
    ballsTrembling,
    balls: BALLS,
    ballSize: BALL_SIZE,
  };
}
