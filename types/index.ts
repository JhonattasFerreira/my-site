export type Lang = "en" | "pt-br";

export type PostFrontmatter = {
  title: string;
  date: string;
  gif: string;
  altTextGif: string;
  description: string;
};

export type PostMetadata = PostFrontmatter & { slug: string };

export type PostContent = {
  data: PostFrontmatter;
  content: string;
  oppositeUrl: string;
};

export type NavItemData = { name: string; url: string };

export type P5Metadata = { title: string; url: string };

export type BallConfig = {
  color: string;
  border: string | null;
  startY: number;
  endX: number;
  endY: number;
  trembleDelay: string;
};

export type Phase =
  | "idle"
  | "falling"
  | "shaking"
  | "resting"
  | "approaching"
  | "grabbing"
  | "lifting";
