import Image from "next/image";
import styles from "./ImageResponsive.module.css";

const ImageResponsive = ({ src, alt }) => (
  <div className={styles.imageResponsive}>
    <Image src={src} alt={alt} sizes="40vw" />
  </div>
);

export default ImageResponsive;
