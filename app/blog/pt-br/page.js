import getPostMetadata from "@/utils/getPostMetadata";
import ListingPost from "@/components/ListingPost";

const LANGUAGE = "pt-br";

export const metadata = {
  title: "Todos os Posts | JhoCore",
  description: "Um blog de Jhonattas Ferreira",
};

const Blog = () => {
  const postMetadata = getPostMetadata("content/posts", LANGUAGE);

  return <ListingPost postMetadata={postMetadata} language={LANGUAGE} />;
};

export default Blog;
