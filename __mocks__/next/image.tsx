type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
  unoptimized?: boolean;
  sizes?: string;
  fill?: boolean;
};

const NextImage = ({ unoptimized, priority, sizes, fill, ...props }: Props) => {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...props} data-unoptimized={unoptimized ? "true" : undefined} />;
};

export default NextImage;
