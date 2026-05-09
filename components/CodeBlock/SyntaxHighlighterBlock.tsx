import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./codeBlock.module.css";

// #7C7C7C on #1d1f21 = ~3.9:1, fails WCAG AA — bumped to #9e9e9e (~5.3:1)
const accessibleAtomDark = {
  ...atomDark,
  comment: { color: "#9e9e9e" },
  prolog: { color: "#9e9e9e" },
  doctype: { color: "#9e9e9e" },
  cdata: { color: "#9e9e9e" },
  hashbang: { color: "#9e9e9e" },
};

type Props = { language: string; children: string };

const SyntaxHighlighterBlock = ({ language, children }: Props) => (
  <SyntaxHighlighter
    className={styles.fontCode}
    language={language}
    style={accessibleAtomDark}
  >
    {children}
  </SyntaxHighlighter>
);

export default SyntaxHighlighterBlock;
