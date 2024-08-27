---
title: Improving My Blog with Gray-matter and React-markdown
date: "2024-06-14"
---

![A GIF of a stream of images reminiscent of something digital.](/digital.webp)

Big changes have happened on the Blog 🎉🎉🎉

Before explaining what changed, it's important to explain how the blog was structured.

The blog had 3 routes: the list of posts, the post in English, and the post in Brazilian Portuguese.

Every time I made a new post, I had to create a new route for the English post and another route for the Brazilian Portuguese post, as well as copy and paste all the **_HTML_** tags I used in one post to the other.

This didn’t scale and was a lot of work 😔

![An image of a white cat, sad with tears in its eyes.](/sadCat.jpg)

I needed to improve the blog so that my focus could solely be on writing new posts, without worrying about routes, **_HTML_** tags, and such.

It would be great if I could write a Markdown file, have the blog automatically convert it into an **_HTML_** page, and create a route, all automatically.

While researching online, I discovered **_gray-matter_**, and everything changed from there.

## Gray-matter

The **_gray-matter_** is a library inspired by the blog system of **_Jekyll_**. Essentially, it can extract both the content and metadata from a Markdown file.

Let's imagine a file named **_firstPost.md_** with this content:

```md
# A Title For The First Post

This is the normal content, just a few things.

Another normal content to complete the blog post.
```

Now, we just need to read the file with **_gray-matter_**, like this:

```javascript
import fs from "fs";
import matter from "gray-matter";

const file = fs.readFileSync("content/firstPost.md");
const matterResult = matter(file);
```

The variable **_matterResult_** will have this value:

```javascript
{
  content: '# A Title For The First Post\n' +
    '\n' +
    'This is the normal content, just a few things.\n' +
    '\n' +
    'Another normal content to complete the blog post.\n',
  data: {},
  isEmpty: false,
  excerpt: ''
}
```

All the content from **_firstPost.md_** is stored in the **_content_** key, which you can manipulate as usual. Let's adjust our file to conform to the [Front Matter](https://jekyllrb.com/docs/front-matter/) standard.

```md
---
title: A Title For The First Post
date: "2024-06-09"
---

This is the normal content, just a few things.

Another normal content to complete the blog post.
```

The result will be:

```javascript
{
  content: '\n' +
    'This is the normal content, just a few things.\n' +
    '\n' +
    'Another normal content to complete the blog post.\n',
  data: { title: 'A Title For The First Post', date: '2024-06-09' },
  isEmpty: false,
  excerpt: ''
}
```

With this, we managed to parse and retrieve the content from a Markdown file 😊

But how do we convert this into **_HTML_** tags?

## React-markdown

The **_react-markdown_** is a library that converts the content of a Markdown file into **_HTML_** tags. A paragraph in Markdown becomes a **_<p>_** tag, a link in Markdown becomes an **_<a>_** tag, and so on.

To use it, it's simple:

```jsx
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const file = fs.readFileSync("content/firstPost.md");
const matterResult = matter(file);

const PostComponent = () => (
  <div>
    <h1>{matterResult.data.title}</h1>
    <ReactMarkdown>{matterResult.content}</ReactMarkdown>
  </div>
);
```

The result will be something like this:

```html
<h1>A Title For The First Post</h1>

<p>This is the normal content, just a few things.</p>

<p>Another normal content to complete the blog post.</p>
```

This way, all I need to do to create new posts is to create Markdown files with the content.

## #Bonus: Inserting Code Blocks

To insert code snippets elegantly into our blog, we can use the **_react-syntax-highlighter_** library. It provides syntax highlighting and code formatting.

But how do we integrate this with **_react-markdown_**?

It's simple, just use the **_components_** property. Imagine our **_firstPost.md_** file, but with this code snippet:

````md
---
title: A Title For The First Post
date: "2024-06-09"
---

This is the normal content, just a few things.

Another normal content to complete the blog post.

```
const dogName = "Cacau";
console.log(dogName);
```
````

```

```

Now we need to adjust **_react-markdown_** to handle code blocks:

```jsx
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const file = fs.readFileSync("content/firstPost.md");
const matterResult = matter(file);

const CodeBlock = ({ children }) => {};

const PostComponent = () => (
  <div>
    <h1>{matterResult.data.title}</h1>
    <ReactMarkdown components={{ code: CodeBlock }}>
      {matterResult.content}
    </ReactMarkdown>
  </div>
);
```

At this point, whenever **_ReactMarkdown_** encounters a code snippet, it will call the **_CodeBlock_** function. Now, we can use **_react-syntax-highlighter_** within our new function:

```jsx
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const file = fs.readFileSync("content/firstPost.md");
const matterResult = matter(file);

const CodeBlock = ({ children }) => {
  return (
    <SyntaxHighlighter language={"javascript"} style={atomDark}>
      {children}
    </SyntaxHighlighter>
  );
};

const PostComponent = () => (
  <div>
    <h1>{matterResult.data.title}</h1>
    <ReactMarkdown components={{ code: CodeBlock }}>
      {matterResult.content}
    </ReactMarkdown>
  </div>
);
```

The **_language_** property indicates the programming language used, and **_style_** is the theme applied. In my case, I'm using **_atomDark_**.

You can check the available themes in the [repository](https://github.com/react-syntax-highlighter/react-syntax-highlighter) of **_react-syntax-highlighter_**.

The generated code will look something like this:

```javascript
const dogName = "Cacau";

console.log(dogName);
```

## Conclusion

All of this has been a significant change in the blog that has allowed me to be more productive when writing new content. Now, I no longer need to worry about creating **_HTML_** tags; all I need to do is write a Markdown file.

Soon, I'll explain how I created dynamic routes using **_Next_**.

If you want to delve deeper, the amazing [post](https://dev.to/joserfelix/how-to-make-a-static-blog-with-next-js-2bd6) by **Jose Felix** explains other points in detail.
