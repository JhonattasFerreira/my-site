---
title: Creating My Personal Site
date: "2024-04-23"
---

Hello, my name is Jhonattas and after procrastinating for quite a while, i decided to create my blog 🎉🎉🎉

This is the 'Hello World' of my blog. I'll explain better how the idea came up and how it was done.

## Why create a blog?

I've always wanted to have a blog to write about my personal projects on GitHub, share what I'm learning, and what I haven't been able to learn 🫠. Usually, when I describe how things work, I learn a lot.

I have difficulty writing and organizing my ideas, so a blog will encourage me to practice and share information. Additionally, each post has both Portuguese and English versions.

— Are you going to write twice?

— Yes 🙃

I want to train my English, so the blog would be a way to practice

In summary, the reasons are:

- Share knowledge
- Express myself better
- Practice English

## How was it done?

I used three libraries: **React**, **React-DOM** and **Next**. The idea is to start simple, but I know that the complexity of the code will escalate (entropy in programming is strong 😅). The website can be divided into two main parts: the Home and the Blog.

### Home

On the home page, I defined the style of the site, such as the background color, text color, font, etc. At this point, I had no idea that I would end up creating a blog. My first sketch of the site was pathetic, as can be seen below:

![firstBlogScketch](/firstBlogScketch.jpg)

The site had no soul, I tried to copy something I saw on the internet. In the end, I removed the images, changed to text and created a terminal cursor animation. I really enjoyed it because I learned about CSS animation. By the way, the animation code was this:

```css
@keyframes blink {
  50% {
    opacity: 0;
  }

  80% {
    opacity: 0.5;
  }
}

.rectangle {
  width: 2.8vw;
  height: inherit;
  background: white;
  animation: blink 1.5s linear infinite;
}
```

### Blog

After finishing the Home, I thought: what if I create a blog?

I started by creating the post listing page, using a `JSON` to save and display the posts; and the `useContext` from React to save the chosen language.

Then came the good old CSS. It seems simple, but the styling was complicated.

## End?

There are several pending tasks that need to be addressed in the future, such as creating a crawler to generate the `JSON` for posts, a search system, and post tags.

I'm very happy to have put all of this online. I have a lot to improve, especially in communication. Anyway, thank you for your time :)
