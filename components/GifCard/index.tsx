"use client";

import { useState } from "react";
import NextImage from "next/image";
import styles from "./GifCard.module.css";

type Props = {
  src: string;
  alt: string;
  priority: boolean;
  loading: "eager" | "lazy";
};

const GifCard = ({ src, alt, priority, loading }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`${styles.wrapper} ${loaded ? "" : styles.shimmer}`}
      data-shimmer={loaded ? undefined : "true"}
    >
      <NextImage
        width={0}
        height={0}
        src={src}
        alt={alt}
        className={`${styles.gif} ${loaded ? styles.gifLoaded : ""}`}
        priority={priority}
        loading={loading}
        unoptimized={true}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default GifCard;
