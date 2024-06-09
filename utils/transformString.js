export default function transformString(str) {
  if (!str || str.trim() === "") {
    return "";
  }

  let words = str.split("-");

  let capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  let result = capitalizedWords.join(" ");

  return result;
}
