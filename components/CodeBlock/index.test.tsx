import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CodeBlock from "./index";

vi.mock("next/dynamic", () => ({
  default: (_loader: () => Promise<unknown>) => {
    const MockSyntaxHighlighter = ({ children }: { children: string }) => (
      <pre data-testid="syntax-highlighter">{children}</pre>
    );
    MockSyntaxHighlighter.displayName = "MockSyntaxHighlighter";
    return MockSyntaxHighlighter;
  },
}));

describe("CodeBlock", () => {
  it("renders a plain <code> element when className is absent", () => {
    render(<CodeBlock>const x = 1</CodeBlock>);
    expect(screen.getByText("const x = 1").tagName).toBe("CODE");
  });

  it("renders the SyntaxHighlighter when className contains a language", () => {
    render(<CodeBlock className="language-typescript">const x = 1</CodeBlock>);
    expect(screen.getByTestId("syntax-highlighter")).toBeInTheDocument();
    expect(screen.getByText("const x = 1")).toBeInTheDocument();
  });
});
