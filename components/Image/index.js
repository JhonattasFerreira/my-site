import Image from "next/image";

const ImageBlock = ({ alt, src }) => {
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
