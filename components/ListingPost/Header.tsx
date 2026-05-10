import Link from "next/link";
import styles from "./listing.module.css";
import { TITLE_EN, TITLE_PT_BR, EN_LANGUAGE } from "@/utils/constants";
import type { Lang } from "@/types";

type Props = { language: Lang };

const Header = ({ language }: Props) => {
  return (
    <div className={styles.title}>
      <h1 className={styles.titleName}>
        {language === EN_LANGUAGE ? TITLE_EN : TITLE_PT_BR}
      </h1>
      {language === EN_LANGUAGE ? (
        <Link aria-label="Change to Brazilian Portuguese" href="/pt-br/blog">
          <span className={styles.languageBadge}>🇧🇷 Versão em Português</span>
        </Link>
      ) : (
        <Link aria-label="Change to English" href="/en/blog">
          <span className={styles.languageBadge}>🇬🇧 English version</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
