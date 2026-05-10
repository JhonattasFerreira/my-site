"use client";

import { useEffect, useState } from "react";

type ScrollProgress = {
  progress: number;
  scrolled: boolean;
};

export default function useScrollProgress(): ScrollProgress {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const calcProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    };

    setProgress(calcProgress());

    const update = () => {
      setScrolled(true);
      setProgress(calcProgress());
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return { progress, scrolled };
}
