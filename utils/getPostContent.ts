import fs from "fs";
import matter from "gray-matter";
import type { PostContent } from "@/types";
import { ENCODING_UTF8, CONTENT_FOLDER } from "@/utils/constants";

export default function getPostContent(
  slug: string,
  filenameEnd: string
): PostContent {
  const postFolders = fs.readdirSync(CONTENT_FOLDER + "/");

  let filename: string | undefined;
  let folderName: string | undefined;
  let oppositeUrl: string | undefined;

  for (const postFolder of postFolders) {
    const files = fs.readdirSync(`${CONTENT_FOLDER}/${postFolder}/`);
    filename = files.find((file) => file.includes(slug));
    if (filename) {
      folderName = postFolder;
      oppositeUrl = files.find((item) => item !== filename);
      break;
    }
  }

  if (!filename || !folderName || !oppositeUrl) {
    throw new Error(`Post not found for slug: "${slug}"`);
  }

  const file = CONTENT_FOLDER + `/${folderName}/${filename}`;
  const content = fs.readFileSync(file, ENCODING_UTF8);
  const matterResult = matter(content);

  return {
    data: matterResult.data as PostContent["data"],
    content: matterResult.content,
    oppositeUrl: oppositeUrl.replace(filenameEnd, ""),
  };
}
