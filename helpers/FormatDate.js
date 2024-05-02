const months = {
  "pt-br": [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const FormatDate = (date, language) => {
  const parts = date.split("-");
  const day = parts[2];
  const month = months[language][parseInt(parts[1]) - 1];
  const year = parts[0];

  return language === "en"
    ? `Posted on ${month} ${day}, ${year}`
    : `Postado em ${day} de ${month} de ${year}`;
};

export default FormatDate;
