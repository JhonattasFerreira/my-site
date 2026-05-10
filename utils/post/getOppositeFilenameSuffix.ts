import type { Lang } from "@/types";
import { EN_LANGUAGE, FILENAME_END_EN, FILENAME_END_PT_BR } from "@/utils/constants";

export default function getOppositeFilenameSuffix(lang: Lang): string {
  return lang === EN_LANGUAGE ? FILENAME_END_PT_BR : FILENAME_END_EN;
}
