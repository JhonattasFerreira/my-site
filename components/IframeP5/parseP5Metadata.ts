import type { P5Metadata } from "@/types";

export function parseP5Metadata(metadata: string): P5Metadata {
  const parts = metadata.split(" $ ");
  if (parts.length !== 2 || !parts[0].trim() || !parts[1].trim()) {
    throw new Error(
      `Invalid p5 metadata format: "${metadata}". Expected "title $ url"`
    );
  }
  return { title: parts[0], url: parts[1] };
}
