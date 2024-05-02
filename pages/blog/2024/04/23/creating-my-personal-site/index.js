import Post from "../../../../../../components/Post";

const BlogPost = () => {
  return (
    <Post title={"Creating My Personal Site"} date={"2024-04-23"}>
      <>
        <p>
          Recently, I decided to create my personal website. I wanted to have a
          place where I could share a bit about myself, my projects, and
          experiences. I also wanted to have a place where I could write about
          things I'm learning and share with others.
        </p>

        <p>
          I decided to use Next.js to create my website, as it's a great tool
          for building modern web applications. It has excellent documentation
          and an active community, which makes learning and development much
          easier.
        </p>
      </>
    </Post>
  );
};

export default BlogPost;
