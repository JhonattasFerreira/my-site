"use client";

import { useEffect, useMemo } from "react";
import styles from "./LeafRain.module.css";

const LEAF_COUNT = 20;
const DONE_TIMEOUT_MS = 3500;

type LeafData = {
  left: number;
  initialAngle: number;
  spin: number;
  duration: number;
  delay: number;
  scale: number;
};

type Props = {
  onDone: () => void;
};

const LeafRain = ({ onDone }: Props) => {
  const leaves = useMemo<LeafData[]>(() =>
    Array.from({ length: LEAF_COUNT }, () => ({
      left: Math.random() * 100,
      initialAngle: Math.random() * 90 - 45,
      spin: Math.random() * 360 + 180,
      duration: 1.5 + Math.random() * 1,
      delay: Math.random() * 1,
      scale: 0.8 + Math.random() * 0.8,
    })), []);

  useEffect(() => {
    const timer = setTimeout(onDone, DONE_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={styles.container}>
      {leaves.map((leaf, i) => (
        <svg
          key={i}
          role="img"
          aria-hidden="true"
          className={styles.leaf}
          viewBox="-6 -14 12 15"
          width={12 * leaf.scale}
          height={15 * leaf.scale}
          style={{
            left: `${leaf.left}%`,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            transform: `rotate(${leaf.initialAngle}deg)`,
            "--leaf-spin": `${leaf.spin}deg`,
          } as React.CSSProperties}
        >
          <path d="M 0,0 Q 5,-6 0,-13 Q -5,-6 0,0" />
        </svg>
      ))}
    </div>
  );
};

export default LeafRain;
