import NextImage from "next/image";
import IframeP5 from "@/components/IframeP5";

type Props = { src?: string | Blob; alt?: string };

const isP5js = (srcPath: string) => srcPath.includes("p5Examples");

const ImageBlock = ({ alt = "", src }: Props) => {
  const srcStr = typeof src === "string" ? src : "";
  if (srcStr && isP5js(srcStr)) {
    return <IframeP5 src={srcStr} metadata={alt} />;
  }

  const isGif = srcStr.toLowerCase().endsWith(".gif");
  const isGifOrWebp = isGif || srcStr.toLowerCase().endsWith(".webp");

  return (
    <NextImage
      src={srcStr}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      unoptimized={isGif}
      priority={isGifOrWebp}
      loading={isGifOrWebp ? "eager" : "lazy"}
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "500px",
        objectFit: "contain",
      }}
    />
  );
};

export default ImageBlock;
