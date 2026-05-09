import fs from "fs";
import matter from "gray-matter";
import type { Lang, PostMetadata } from "@/types";
import { ENCODING_UTF8 } from "@/utils/constants";

export default function getPostMetadata(
  basePath: string,
  language: Lang
): PostMetadata[] {
  const folder = basePath + "/";
  const postFolders = fs.readdirSync(folder);

  const posts = postFolders.map((postFolder) => {
    const files = fs.readdirSync(`${basePath}/${postFolder}/`);

    const filename = files.find((file) => file.includes(`.${language}.md`));

    if (!filename) return null;

    const fileContent = fs.readFileSync(
      `${basePath}/${postFolder}/${filename}`,
      ENCODING_UTF8
    );

    const { title, date, gif, altTextGif, description } =
      matter(fileContent).data;

    return {
      title,
      date,
      gif,
      altTextGif,
      description,
      slug: filename.replace(`.${language}.md`, ""),
    } as PostMetadata;
  });

  return posts
    .filter((p): p is PostMetadata => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
