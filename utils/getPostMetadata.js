import fs from "fs";
import matter from "gray-matter";

export default function getPostMetadata(basePath, language) {
  const folder = basePath + "/";
  const files = fs.readdirSync(folder);

  const posts = files.map((filename) => {
    const fileContent = fs.readFileSync(
      `${basePath}/${filename}/index.${language}.md`,
      "utf8"
    );

    const { title, date } = matter(fileContent).data;

    return {
      title,
      date,
      slug: filename.replace(".md", ""),
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
