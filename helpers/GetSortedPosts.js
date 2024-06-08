import fs from "fs";
import matter from "gray-matter";

const GetSortedPosts = () => {
  const dirPath = `${process.cwd()}/content/posts`;

  const posts = fs.readdirSync(dirPath).map((filename) => {
    const getContent = (lang) =>
      fs.readFileSync(`${dirPath}/${filename}/index.${lang}.md`).toString();
    const { title: enTitle, date } = matter(getContent("en")).data;
    const { title: ptBrTitle } = matter(getContent("pt-br")).data;

    return {
      "en-title": enTitle,
      "pt-br-title": ptBrTitle,
      date,
      "en-url": filename.replace(".md", ""),
      "pt-br-url": `${filename.replace(".md", "")}/pt-br`,
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export default GetSortedPosts;
