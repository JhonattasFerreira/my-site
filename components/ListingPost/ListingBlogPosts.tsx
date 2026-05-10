import Link from "next/link";
import styles from "./listing.module.css";
import formatDate from "@/utils/date/formatDate";
import GifCard from "@/components/GifCard";
import type { Lang, PostMetadata } from "@/types";

type Props = { posts: PostMetadata[]; language: Lang };

const ListingBlogPosts = ({ posts, language }: Props) => {
  return (
    <div className={styles.listBlogPosts}>
      {posts.map((post, index) => (
        <article key={post.slug} className={styles.articleBox}>
          <Link href={"/" + language + "/blog/" + post.slug}>
            <GifCard
              src={post.gif}
              alt={post.altTextGif}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
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
      ))}
    </div>
  );
};

export default ListingBlogPosts;
