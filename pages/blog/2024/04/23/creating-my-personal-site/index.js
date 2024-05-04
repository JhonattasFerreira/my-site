import Post from "../../../../../../components/Post";
import Image from "next/image";
import photo from "./firstBlogScketch.jpg";

const BlogPost = () => {
  return (
    <Post title={"Creating My Personal Site"} date={"2024-04-23"}>
      <>
        <p>
          Hello, my name is Jhonattas and after procrastinating for quite a
          while, i decided to create my blog 🎉🎉🎉
        </p>

        <p>
          This is the 'Hello World' of my blog (the first post). I'll explain
          better how the idea came up and how it was done.
        </p>

        <h2>Why create a blog?</h2>

        <p>
          I've always wanted to have a blog to write about my personal projects
          on GitHub, share what I'm learning, and what I haven't been able to
          learn 🫠. Usually, when I describe how things work, I learn a lot.
        </p>

        <p>
          I have difficulty writing and organizing my ideas, so a blog will
          encourage me to practice and share information. Additionally, each
          post has both Portuguese and English versions.
        </p>

        <p>— Are you going to write twice?</p>
        <p>— Yes 🙃</p>

        <p>
          I want to train my English, so the blog would be a way to practice
        </p>

        <p>In summary, the reasons are:</p>
        <ul>
          <li>Share knowledge</li>
          <li>Express myself better</li>
          <li>Practice English</li>
        </ul>

        <h2>How was it done?"</h2>

        <p>
          I used three libraries: <strong>React</strong>,{" "}
          <strong>React-DOM</strong> and <strong>Next</strong>. The idea is to
          start simple, but I know that the complexity of the code will escalate
          (entropy in programming is strong 😅). The website can be divided into
          two main parts: the Home and the Blog.
        </p>

        <h3>Home</h3>

        <p>
          On the home page, I defined the style of the site, such as the
          background color, text color, font, etc. At this point, I had no idea
          that I would end up creating a blog. My first sketch of the site was
          pathetic, as can be seen below:
        </p>

        <Image
          src={photo}
          alt="A picture of a notepad with a drawing of a generic website. There is little information and the design is very simple."
          sizes="100vw"
          style={{
            width: "40%",
            height: "auto",
          }}
        />

        <p>
          The site had no soul, I tried to copy something I saw on the internet.
          In the end, I removed the images, changed to text and created a
          terminal cursor animation. I really enjoyed it because I learned about
          CSS animation. By the way, the animation code was this:
        </p>

        <pre>
          <code>
            @keyframes blink {"{\n"}
            &nbsp;50% {"{ "}opacity: 0;{" }\n"}
            &nbsp;80% {"{ "}opacity: 0.5;{" }\n"}
            {"}\n"}
            .rectangle {"{\n"}
            &nbsp;width: 2.8vw; {"\n"}
            &nbsp;height: inherit; {"\n"}
            &nbsp;background: white; {"\n"}
            &nbsp;animation: blink 1.5s {"\n"}
            &nbsp;linear infinite;{"\n"}
            {"}\n"}
          </code>
        </pre>

        <h3>Blog</h3>

        <p>After finishing the Home, I thought: what if I create a blog?</p>
        <p>
          I started by creating the post listing page, using a <code>JSON</code>{" "}
          to save and display the posts, and the <code>useContext</code> from
          React to save the chosen language.
        </p>

        <p>
          Then came the good old CSS. It seems simple, but the styling was
          complicated.
        </p>

        <h2>End?</h2>
        <p>
          There are several pending tasks that need to be addressed in the
          future, such as creating a crawler to generate the <code>JSON</code>{" "}
          for posts, a search system, and post tags.
        </p>

        <p>
          I'm very happy to have put all of this online. I have a lot to
          improve, especially in communication. Anyway, thank you for your time.
          :)
        </p>
      </>
    </Post>
  );
};

export default BlogPost;
