import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./codeBlock.module.css";

type Props = { language: string; children: string };

const SyntaxHighlighterBlock = ({ language, children }: Props) => (
  <SyntaxHighlighter
    className={styles.fontCode}
    language={language}
    style={atomDark}
  >
    {children}
  </SyntaxHighlighter>
);

export default SyntaxHighlighterBlock;
