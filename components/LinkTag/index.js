const LinkTag = ({ href, children }) => {
  return (
    <a href={href} target="_blank">
      {children}
    </a>
  );
};

export default LinkTag;
