import getPostMetadata from "@/utils/getPostMetadata";
import ListingPost from "@/components/ListingPost";

const LANGUAGE = "en";

export const metadata = {
  title: "All Posts | JhoCore",
  description: "A blog by Jhonattas Ferreira",
};

const Blog = () => {
  const postMetadata = getPostMetadata("content/posts", LANGUAGE);

  return <ListingPost postMetadata={postMetadata} language={LANGUAGE} />;
};

export default Blog;
