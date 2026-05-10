import NavItem from "@/components/NavItem";
import styles from "./listing.module.css";
import Header from "./Header";
import ListingBlogPosts from "./ListingBlogPosts";
import type { Lang, PostMetadata } from "@/types";

type Props = { postMetadata: PostMetadata[]; language: Lang };

const ListingPost = ({ postMetadata, language }: Props) => {
  return (
    <>
      <header>
        <NavItem item={{ name: "Home", url: "/" }} />
        <Header language={language} />
      </header>
      <main id="main-content" className={styles.mainContent}>
        <ListingBlogPosts posts={postMetadata} language={language} />
      </main>
    </>
  );
};

export default ListingPost;
