import type { Lang } from "@/types";

const EN_LANGUAGE: Lang = "en";
const PT_BR_LANGUAGE: Lang = "pt-br";

const CONTENT_FOLDER = "content/posts";

const BASE_URL = "https://jhocore.com";
const SITE_NAME = "JhoCore";

const LISTING_METADATA = {
  en: {
    title: "All Posts | JhoCore",
    description: "Articles about software engineering, programming and creative coding.",
    locale: "en_US",
  },
  "pt-br": {
    title: "Todos os Posts | JhoCore",
    description: "Artigos sobre engenharia de software, programação e creative coding.",
    locale: "pt_BR",
  },
} as const;

function createListingMetadata(lang: Lang) {
  const { title, description, locale } = LISTING_METADATA[lang];
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${lang}/blog`,
      siteName: SITE_NAME,
      locale,
      type: "website",
    },
  };
}

const P5_EXAMPLES_PATH = "p5Examples";

const TITLE_EN = "Last Blog Posts";
const TITLE_PT_BR = "Últimas Postagens";

const FILENAME_END_EN = ".en.md";
const FILENAME_END_PT_BR = ".pt-br.md";

const TITLE_METADATA_POST_SUFIX = " | JhoCore";

export {
  EN_LANGUAGE,
  PT_BR_LANGUAGE,
  CONTENT_FOLDER,
  BASE_URL,
  SITE_NAME,
  createListingMetadata,
  TITLE_EN,
  TITLE_PT_BR,
  FILENAME_END_EN,
  FILENAME_END_PT_BR,
  TITLE_METADATA_POST_SUFIX,
  P5_EXAMPLES_PATH,
};
