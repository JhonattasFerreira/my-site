---
title: Creating a Static Site with Next
date: "2024-06-15"
---

![The GIF of a skull drinking a beverage in an old-school art style.](/skull.webp)

This post is a continuation of the improvements implemented on the blog. To learn more, check out the first article on how [I improved my blog](/blog/en/improving-my-blog).

After automating the creation of posts on the blog using Markdown files, I realized I also needed to automate the creation of routes.

Previously, for each new post, I had to manually create a new route. This was tedious because I had to copy and paste repeatedly, in addition to creating many folders in the project.

Wouldn't it be great if there was a way to generate dynamic routes automatically, without having to do this manually...

![A gif of Alice from Alice in Wonderland patiently waiting](/alice.gif)

Ladies and gentlemen, let me introduce you to the **_Slug_**.

## Slug

Before explaining the **_Slug_**, it's important to understand how the routing system works in **_Next_**.

Next's routing system is file-based, where each file in the **_app_** folder corresponds to an accessible route. If I had to manually create a route for each new post (in both English and Portuguese), I would be very sad (and I really was, because that's exactly what I was doing 😔).

This is where the **_Slug_** comes in. The **_Slug_** is a dynamic way to create routes in **_Next_**. Instead of creating a static route for each post, we can use **_Slug_**. For example, instead of having a route like **_/posts/my-new-post_**, we can use **_/posts/[slug]_**, where **_[slug]_** is dynamically replaced by the unique identifier of the post.

Ok, but how do we do that?

## Blog structure

My blog has some important folders. The first one is **_./content/posts_**, where Markdown files are stored and converted into **_HTML_** pages. Here's an example of this structure:

**_./content/post/creating-my-personal-site/_**

Inside the **_creating-my-personal-site_** folder, I have two Markdown files, one in English and one in Portuguese:

- **_creating-my-personal-site.en.md_**
- **_criando-meu-site-pessoal.pt-br.md_**

Each blog post will have its own folder within **_./content/posts_**, containing these two files. The name of each file will be used as the **_Slug_** and the page title.

## Routes

Within the **_app_** folder, we have several routes:

- **_/_** is the site's index route
- **_/blog/en_** is the route for listing posts in English
- **_/blog/pt-br_** is the route for listing posts in Portuguese
- **_/blog/en/[slug]_** is the dynamic route for an English post
- **_/blog/pt-br/[slug]_** is the dynamic route for a Portuguese post

Simply put, the post listing iterates over all files in the **_./content/posts_** folder corresponding to the page's language. From each file, it retrieves the **title**, **post date**, and **file name**.

Here's the code I use to fetch this data:

```js
import fs from "fs";
import matter from "gray-matter";
import { ENCODING_UTF8 } from "@/utils/constants";

export default function getPostMetadata(basePath, language) {
  const folder = basePath + "/";
  const postFolders = fs.readdirSync(folder);

  const posts = postFolders.map((postFolder) => {
    const files = fs.readdirSync(`${basePath}/${postFolder}/`);

    const filename = files.find((file) => file.includes(`.${language}.md`));

    const fileContent = fs.readFileSync(
      `${basePath}/${postFolder}/${filename}`,
      ENCODING_UTF8
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
```

The return value of this function is this array:

```js
[
  {
    title: "Creating a Static Site with Next",
    date: "2024-06-15",
    slug: "static-site-generation-with-next",
  },
  {
    title: "Improving My Blog with Gray-matter and React-markdown",
    date: "2024-06-14",
    slug: "improving-my-blog",
  },
  {
    title: "How to Host a Website",
    date: "2024-05-08",
    slug: "how-to-hosting-a-website",
  },
  {
    title: "Creating My Personal Site",
    date: "2024-04-23",
    slug: "creating-my-personal-site",
  },
];
```

With these three pieces of information, we can display a list of posts sorted from most recent to oldest. The file name serves as the **_Slug_**, allowing us to create a link using the corresponding **_Slug_**.

But, if there are 4 posts in the example above, how does **_Next_** associate each **_Slug_** with its respective post? In other words, how does **_Next_** retrieve the content and associate it with the corresponding **_Slug_**?

Simple, by using **_Static Site Generation_**.

## Static Site Generation (SSG)

**_Static Site Generation (SSG)_** is a feature of **_Next_** that allows pre-rendering of **_HTML_** pages at **_build_** time, rather than on each request.

But how do we achieve this?

To illustrate, let's use the English route for posts: **_app/blog/en/[slug]/page.js_**

Inside **_page.js_**, we need to export an asynchronous function called **_generateStaticParams_** to define the parameters that will be pre-rendered. This function specifies which dynamic URLs should be pre-rendered at **_build_** time.

The example used here in the blog:

```js
export const generateStaticParams = async () => {
  const posts = getPostMetadata(CONTENT_FOLDER, EN_LANGUAGE);

  return posts.map((post) => ({ slug: post.slug }));
};
```

Notice that I'm using the same function from the post listing, but returning only the **_Slug_**. This way, all English **_Slugs_** will be pre-rendered. The same process happens in the path **_app/blog/pt-br/[slug]/page.js_**, but for the Portuguese language.

Therefore, the **_Slug_** can be accessed as a property of the **_page.js_** component itself.

Remember that the **_Slug_** is the name of the Markdown file that contains the post content? To retrieve this content, just use **_Gray-matter_**, as we explained in the previous post.

```jsx
const DynamicPost = (props) => {
  const slug = props.params.slug;
  const { data, content } = getPostContent(slug);

  return <Post data={data} content={content} />;
};

export default DynamicPost;
```

Using this strategy, all the blog pages are pre-rendered at **_build_** time, which is why it's so fast.

Another point is that the blog is highly optimized, as we can see in the **_lighthouse_** report:

![An image of the report generated by Google's Lighthouse tool. It shows the parameters Performance, Accessibility, Best Practices, and SEO, all with a score of 100](/lighthouse.png)

These were all the changes made to the blog. Yes, it took a lot of work to make these adjustments, but now I feel that the blog is becoming increasingly robust.

If you want to dive deeper, the excellent [vídeo](https://www.youtube.com/watch?v=QIIc5EYSZpw) by **Smoljames** explains the use of **_SSG_** in detail. I used a lot of his [code](https://github.com/jamezmca/static-recipe-blog/tree/main) as a reference.
