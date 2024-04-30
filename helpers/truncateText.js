const truncateText = (text) => {
  if (text.length > 33) {
    return text.slice(0, 33) + "...";
  }

  return text;
};

export default truncateText;
