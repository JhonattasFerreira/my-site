import styles from "./iframeP5.module.css";

const IframeP5 = ({ href, children }) => {
  return (
    <>
      <iframe
        title={`p5.js iframe sketch: ${children}`}
        src={href}
        width="100%"
        height="400px"
        allow="accelerometer; gyroscope"
        allowFullScreen
        style={{
          border: "none",
        }}
      ></iframe>
      <em className={styles.spanDescription}>{children}</em>
    </>
  );
};
export default IframeP5;
