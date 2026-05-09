import type { Lang } from "@/types";

const EN_LANGUAGE: Lang = "en";
const PT_BR_LANGUAGE: Lang = "pt-br";

const CONTENT_FOLDER = "content/posts";

const BASE_URL = "https://jhocore.com";
const SITE_NAME = "JhoCore";

const LISTING_POSTS_METADATA_EN = {
  title: "All Posts | JhoCore",
  description:
    "Articles about software engineering, programming and creative coding.",
  openGraph: {
    title: "All Posts | JhoCore",
    description:
      "Articles about software engineering, programming and creative coding.",
    url: `${BASE_URL}/en/blog`,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
};

const LISTING_POSTS_METADATA_PT_BR = {
  title: "Todos os Posts | JhoCore",
  description:
    "Artigos sobre engenharia de software, programação e creative coding.",
  openGraph: {
    title: "Todos os Posts | JhoCore",
    description:
      "Artigos sobre engenharia de software, programação e creative coding.",
    url: `${BASE_URL}/pt-br/blog`,
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
  },
};

const TITLE_EN = "Last Blog Posts";
const TITLE_PT_BR = "Últimas Postagens";

const ENCODING_UTF8: BufferEncoding = "utf8";

const FILENAME_END_EN = ".en.md";
const FILENAME_END_PT_BR = ".pt-br.md";

const TITLE_METADATA_POST_SUFIX = " | JhoCore";

export {
  EN_LANGUAGE,
  PT_BR_LANGUAGE,
  CONTENT_FOLDER,
  BASE_URL,
  SITE_NAME,
  LISTING_POSTS_METADATA_EN,
  LISTING_POSTS_METADATA_PT_BR,
  TITLE_EN,
  TITLE_PT_BR,
  FILENAME_END_EN,
  FILENAME_END_PT_BR,
  TITLE_METADATA_POST_SUFIX,
  ENCODING_UTF8,
};
