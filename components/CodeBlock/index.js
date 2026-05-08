"use client";

import dynamic from "next/dynamic";

const SyntaxHighlighterBlock = dynamic(() => import("./SyntaxHighlighterBlock"), { ssr: false });

const CodeBlock = ({ children, className }) => {
  if (!className) {
    return <code>{children}</code>;
  }

  const language = className.replace("language-", "");

  return (
    <SyntaxHighlighterBlock language={language}>
      {children}
    </SyntaxHighlighterBlock>
  );
};

export default CodeBlock;
