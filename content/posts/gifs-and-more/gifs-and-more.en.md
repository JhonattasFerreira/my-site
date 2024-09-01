---
title: GIFs and More
date: "2024-09-01"
gif: /gifs-and-more/cat.gif
altTextGif: A GIF of a white cat.
---

Forgotten fruits rot.

The same happens with code, which is why the blog went through another reform. This time, with lots of GIFs.

The idea with my personal website was to create something interactive, where things wouldn't seem so boring. So I decided:

_Why not make the blog more visual?_

## Post Listing

The old listing was boring, uninviting, and didn't spark curiosity:

![Image of the old blog post listing.](/gifs-and-more/oldList.png)

So, to solve this, I decided that each post would have its own GIF, which would also appear in the post listing. The first thing I did was add two new attributes to the **Markdown** file of each post:

```md
---
title: A Random Walker
date: "2024-07-26"
gif: /a-random-walker/walking.webp
altTextGif: A GIF of a girl walking with a static colorful background.
---
```

The **_gif_** and **_altTextGif_** attributes can then be used in the post listing. Now, we can start having some fun with CSS.

### CSS

The idea is to create a fixed-size box for each post that is clickable and contains a GIF filling the entire box, along with the post title and date.

The **_HTML_** structure for each post in the listing is as follows:

```jsx
<article className={styles.articleBox}>
  <Link href={url}>
    <Image
      width={0}
      height={0}
      src={post.gif}
      alt={post.altTextGif}
      className={styles.gif}
      priority={true}
    />
    <div className={styles.articleContent}>
      <p className={styles.articleTitleText}>{post.title}</p>
      <em>
        <time dateTime={post.date} className={styles.articleDate}>
          {formatDate(post.date, language)}
        </time>
      </em>
    </div>
  </Link>
</article>
```

The **_.articleBox_** class creates the box like this:

```css
.articleBox {
  width: 100%;
  height: 25vw;
  position: relative;
  overflow: hidden;
  /* Other Attrs */
}
```

This box takes up the full width of the parent element and 25% of the screen width in height.

The GIF is styled with the following class:

```css
.gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.6;
}
```

The GIF occupies the entire box defined by the **_.articleBox_** class, and with the **_object-fit: cover;_** property, the GIF is cropped to completely fill the area of the box.

Note that I also set an opacity of **0.6** for the GIF. I did this to create a sharpness effect when the mouse hovers over the post, using the following class:

```css
.articleBox a:hover .gif {
  opacity: 1;
}
```

The rest was simple: I positioned the title and date inside the box and added a darker background behind the text to increase the contrast. The class looks like this:

```css
.articleContent {
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  transition: background-color 0.2s ease;
  /* Other Attrs */
}
```

One really cool thing was the **_transition: background-color 0.2s ease;_** property, which creates a _fade-in_ effect when the opacity changes.

This way, the final result of the post listing looks like this:

![A GIF showing the new blog post listing](/gifs-and-more/newList.gif)

This change brought a fresh feeling to the listing and, personally, I think it looks quite inviting.

The idea for the future is to make the blog more interactive, allowing readers to engage directly with the content, whether through comments, reactions, or even minigames.

Additionally, I made some other small adjustments.

## Small Adjustments

I made some minor tweaks that, while not visually striking, improve the overall quality of the blog.

The changes were:

- Changed all paddings, margins, and font sizes to use the **_rem_** unit instead of **_vw/vh_**.
- Reduced the text size on the homepage and added one more link to the blog, increasing the number of clicks on the blog page.
- Used **_flexbox_** to organize all the page alignments.
- Integrated all **_p5.js_** code directly into the project, instead of using an iframe for the **_p5.js_** site.

I feel that the blog is now more robust and ready to support future changes.
