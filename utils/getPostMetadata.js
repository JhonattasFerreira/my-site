import fs from "fs";
import matter from "gray-matter";

export default function getPostMetadata(basePath, language) {
  const folder = basePath + "/";
  const postFolders = fs.readdirSync(folder);

  const posts = postFolders.map((postFolder) => {
    const files = fs.readdirSync(`${basePath}/${postFolder}/`);

    const filename = files.find((file) => file.includes(`.${language}.md`));

    const fileContent = fs.readFileSync(
      `${basePath}/${postFolder}/${filename}`,
      "utf8"
    );

    const { title, date } = matter(fileContent).data;

    return {
      title,
      date,
      slug: filename.replace(`.${language}.md`, ""),
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
