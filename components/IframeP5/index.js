import styles from "./iframeP5.module.css";
import { parseP5Metadata } from "./parseP5Metadata";

const IframeP5 = ({ src, metadata }) => {
  const { title, url } = parseP5Metadata(metadata);
  return (
    <>
      <iframe
        title={`p5.js iframe sketch: ${title}`}
        src={src + "/index.html"}
        width="100%"
        height="400px"
        loading="lazy"
        sandbox="allow-scripts"
        style={{
          border: "none",
        }}
      ></iframe>
      <em className={styles.spanDescription}>
        {title}{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          (Source Code)
        </a>
      </em>
    </>
  );
};
export default IframeP5;
