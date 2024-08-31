import Image from "next/image";

import IframeP5 from "@/components/IframeP5";

const isP5js = (srcPath) => srcPath.includes("p5Examples");

const ImageBlock = ({ alt, src }) => {
  if (src && isP5js(src)) {
    return <IframeP5 src={src} metadata={alt} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      unoptimized
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
