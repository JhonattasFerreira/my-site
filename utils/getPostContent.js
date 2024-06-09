import fs from "fs";
import matter from "gray-matter";
import { ENCODING_UTF8, CONTENT_FOLDER } from "@/utils/constants";

function getPostContent(slug, filenameEnd) {
  const postFolders = fs.readdirSync(CONTENT_FOLDER + "/");

  let filename;
  let folderName;
  let oppositeUrl;

  for (const postFolder of postFolders) {
    const files = fs.readdirSync(`${CONTENT_FOLDER}/${postFolder}/`);
    filename = files.find((file) => file.includes(slug));
    if (filename) {
      folderName = postFolder;
      oppositeUrl = files.find((item) => item !== filename);
      break;
    }
  }

  const file = CONTENT_FOLDER + `/${folderName}/${filename}`;

  const content = fs.readFileSync(file, ENCODING_UTF8);

  const matterResult = matter(content);

  return {
    data: matterResult.data,
    content: matterResult.content,
    oppositeUrl: `${oppositeUrl.replace(filenameEnd, "")}`,
  };
}

export default getPostContent;
