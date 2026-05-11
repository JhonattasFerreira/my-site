import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import type { Lang, PostFrontmatter } from "@/types";

vi.mock("@/components/PostFrontmatter", () => ({
  default: vi.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid="post-frontmatter">{children}</div>
  )),
}));

vi.mock("@/components/Comments", () => ({
  default: vi.fn(() => <div data-testid="comments" />),
}));

vi.mock("react-markdown", () => ({
  default: vi.fn(() => <div data-testid="markdown" />),
}));

vi.mock("@/utils/post/getReadingTime", () => ({
  default: vi.fn(() => 5),
}));

import PostFrontmatter from "@/components/PostFrontmatter";
import Comments from "@/components/Comments";
import getReadingTime from "@/utils/post/getReadingTime";
import LayoutPost from "./index";

const mockFrontmatter: PostFrontmatter = {
  title: "Test Post",
  date: "2024-03-10",
  gif: "/test/cover.gif",
  altTextGif: "A test gif",
  description: "A short description",
};

const defaultProps = {
  content: "# Hello world",
  frontmatter: mockFrontmatter,
  language: "en" as Lang,
  oppositeUrl: "post-de-teste",
};

beforeEach(() => {
  vi.clearAllMocks();
});

const getLastPostFrontmatterProps = () =>
  vi.mocked(PostFrontmatter).mock.calls.at(-1)![0];

const getLastCommentsProps = () =>
  vi.mocked(Comments).mock.calls.at(-1)![0];

describe("LayoutPost", () => {
  it("renders without crashing", () => {
    expect(() => render(<LayoutPost {...defaultProps} />)).not.toThrow();
  });

  it("calls getReadingTime with the post content", () => {
    render(<LayoutPost {...defaultProps} />);
    expect(vi.mocked(getReadingTime)).toHaveBeenCalledWith(defaultProps.content);
  });

  it("passes readingTime from getReadingTime to PostFrontmatter", () => {
    vi.mocked(getReadingTime).mockReturnValue(8);
    render(<LayoutPost {...defaultProps} />);
    expect(getLastPostFrontmatterProps().readingTime).toBe(8);
  });

  it("passes all frontmatter fields to PostFrontmatter", () => {
    render(<LayoutPost {...defaultProps} />);
    const props = getLastPostFrontmatterProps();
    expect(props.title).toBe(mockFrontmatter.title);
    expect(props.date).toBe(mockFrontmatter.date);
    expect(props.gif).toBe(mockFrontmatter.gif);
    expect(props.altTextGif).toBe(mockFrontmatter.altTextGif);
    expect(props.description).toBe(mockFrontmatter.description);
  });

  it("passes language and oppositeUrl to PostFrontmatter", () => {
    render(<LayoutPost {...defaultProps} />);
    const props = getLastPostFrontmatterProps();
    expect(props.language).toBe("en");
    expect(props.oppositeUrl).toBe("post-de-teste");
  });

  it("passes language to Comments as lang prop", () => {
    render(<LayoutPost {...defaultProps} />);
    expect(getLastCommentsProps().lang).toBe("en");
  });

  it("passes pt-br language correctly to Comments", () => {
    render(<LayoutPost {...defaultProps} language="pt-br" />);
    expect(getLastCommentsProps().lang).toBe("pt-br");
  });
});
