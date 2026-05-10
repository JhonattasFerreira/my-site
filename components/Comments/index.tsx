"use client";

import Giscus from "@giscus/react";
import type { Lang } from "@/types";

type Props = {
  lang: Lang;
};

const Comments = ({ lang }: Props) => {
  return (
    <Giscus
      repo="JhonattasFerreira/my-site"
      repoId="R_kgDOLtiOcg"
      category="Announcements"
      categoryId="DIC_kwDOLtiOcs4C8sF7"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="preferred_color_scheme"
      lang={lang}
      loading="lazy"
    />
  );
};

export default Comments;
