import styles from "./iframeP5.module.css";

const IframeP5 = ({ src, metadata }) => {
  const [title, url] = metadata.split(" $ ");
  return (
    <>
      <iframe
        title={`p5.js iframe sketch: ${title}`}
        src={src + "/index.html"}
        width="100%"
        height="400px"
        loading="lazy"
        style={{
          border: "none",
        }}
      ></iframe>
      <em className={styles.spanDescription}>
        {title}{" "}
        <a href={url} target="_blank">
          (Source Code)
        </a>
      </em>
    </>
  );
};
export default IframeP5;
