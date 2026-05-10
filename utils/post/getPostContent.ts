import fs from "fs";
import matter from "gray-matter";
import type { PostContent } from "@/types";
import { CONTENT_FOLDER } from "@/utils/constants";

type PostFileResult = {
  filename: string;
  folderName: string;
  oppositeFile: string;
};

function findPostFile(slug: string): PostFileResult {
  const postFolders = fs.readdirSync(CONTENT_FOLDER + "/");

  for (const postFolder of postFolders) {
    const files = fs.readdirSync(`${CONTENT_FOLDER}/${postFolder}/`);
    const filename = files.find((file) => file.includes(slug));
    if (filename) {
      const oppositeFile = files.find((item) => item !== filename);
      if (oppositeFile) {
        return { filename, folderName: postFolder, oppositeFile };
      }
    }
  }

  throw new Error(`Post not found for slug: "${slug}"`);
}

export default function getPostContent(
  slug: string,
  filenameEnd: string
): PostContent {
  const { filename, folderName, oppositeFile } = findPostFile(slug);

  const filePath = `${CONTENT_FOLDER}/${folderName}/${filename}`;
  const rawContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(rawContent);

  return {
    data: data as PostContent["data"],
    content,
    oppositeUrl: oppositeFile.replace(filenameEnd, ""),
  };
}
