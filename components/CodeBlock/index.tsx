import dynamic from "next/dynamic";

const SyntaxHighlighterBlock = dynamic(() => import("./SyntaxHighlighterBlock"));

type Props = { className?: string; children?: React.ReactNode };

const CodeBlock = ({ children, className }: Props) => {
  if (!className) {
    return <code>{children}</code>;
  }

  const language = className.replace("language-", "");

  return (
    <SyntaxHighlighterBlock language={language}>
      {String(children)}
    </SyntaxHighlighterBlock>
  );
};

export default CodeBlock;
