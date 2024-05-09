import Image from "next/image";
import styles from "./ImageResponsive.module.css";

const ImageResponsive = ({ src, alt, sizes = "50vw", sizeMobile = "80vw" }) => (
  <div className={styles.imageResponsive}>
    <Image
      src={src}
      alt={alt}
      sizes={`(max-width: 768px) ${sizeMobile}, (max-width: 1200px) ${sizes}, ${sizes}`}
    />
  </div>
);

export default ImageResponsive;
