import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import styles from "./codeBlock.module.css";

const CodeBlock = ({ children, className }) => {
  if (!className) {
    return <code>{children}</code>;
  }

  const language = className.replace("language-", "");

  return (
    <SyntaxHighlighter
      lineProps={{ style: { wordBreak: "break-all", whiteSpace: "pre-wrap" } }}
      wrapLines
      showLineNumbers
      className={styles.fontCode}
      language={language}
      style={atomDark}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
