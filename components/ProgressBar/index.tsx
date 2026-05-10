"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./progressBar.module.css";
import useScrollProgress from "./useScrollProgress";

const VINE_PATH =
  "M 0,14 C 70,3 150,24 250,11 C 340,1 430,23 540,13 C 640,5 730,25 850,11 C 950,2 1060,22 1200,14";

const LEAVES = [
  { x: 148, y: 21, rotation: -45, threshold: 12 },
  { x: 295, y: 6,  rotation: 30,  threshold: 25 },
  { x: 460, y: 21, rotation: -50, threshold: 38 },
  { x: 590, y: 11, rotation: 20,  threshold: 49 },
  { x: 730, y: 23, rotation: -35, threshold: 61 },
  { x: 895, y: 7,  rotation: 42,  threshold: 74 },
  { x: 1055, y: 20, rotation: -25, threshold: 88 },
];

const ProgressBar = () => {
  const { progress, scrolled } = useScrollProgress();
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current && typeof pathRef.current.getTotalLength === "function") {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const dashOffset =
    pathLength > 0 ? pathLength * (1 - progress / 100) : undefined;

  return (
    <svg
      className={styles.vine}
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <path
        ref={pathRef}
        d={VINE_PATH}
        className={styles.vinePath}
        style={
          pathLength > 0
            ? {
                strokeDasharray: pathLength,
                strokeDashoffset: dashOffset,
                transition: scrolled ? "stroke-dashoffset 0.08s linear" : "none",
              }
            : undefined
        }
      />
      {LEAVES.map((leaf, i) => (
        <g key={i} transform={`translate(${leaf.x},${leaf.y}) rotate(${leaf.rotation})`}>
          <path
            d="M 0,0 Q 5,-6 0,-13 Q -5,-6 0,0"
            className={`${styles.leaf} ${progress >= leaf.threshold ? styles.leafVisible : ""}`}
          />
        </g>
      ))}
    </svg>
  );
};

export default ProgressBar;
