"use client";

import { useState } from "react";
import styles from "./TiltCard.module.css";

type Props = {
  articleClassName?: string;
  children: React.ReactNode;
};

const TiltCard = ({ articleClassName, children }: Props) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - y) * 12, y: (x - 0.5) * 12 });
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <article
        className={articleClassName}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "none" : "transform 0.4s ease-out",
        }}
      >
        {children}
      </article>
    </div>
  );
};

export default TiltCard;
