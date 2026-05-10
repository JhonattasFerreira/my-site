const WORDS_PER_MINUTE = 200;

export default function getReadingTime(content: string): number {
  const wordCount = content.trim() === "" ? 0 : content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
