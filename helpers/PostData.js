import fs from "fs";
import matter from "gray-matter";
import path from "path";

const GetSortedPosts = () => {
  const dirPath = `${process.cwd()}/content/posts`;

  const posts = fs.readdirSync(dirPath).map((filename) => {
    const getContent = (lang) =>
      fs.readFileSync(`${dirPath}/${filename}/index.${lang}.md`).toString();
    const { title: enTitle, date } = matter(getContent("en")).data;
    const { title: ptBrTitle } = matter(getContent("pt-br")).data;

    const url = "blog/post/" + filename.replace(".md", "");

    return {
      "en-title": enTitle,
      "pt-br-title": ptBrTitle,
      date,
      "en-url": url,
      "pt-br-url": `${url}/pt-br`,
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getPaths = () => {
  const files = fs.readdirSync("content/posts");

  const paths = files.map((filename) => ({
    params: {
      slug: filename,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

const getContent = (slug, lang) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("content/posts", slug, lang))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  return {
    props: {
      content,
      frontmatter: data,
    },
  };
};

export { GetSortedPosts, getPaths, getContent };
