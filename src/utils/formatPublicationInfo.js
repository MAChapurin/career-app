const formatter = Intl.DateTimeFormat("ru", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatPublicationInfo = (date, cityName = "") => {
  if (!date) {
    return;
  }
  const datePart = ` ${formatter.format(new Date(date))}`;
  const cityPart = ` в г. ${cityName}`;
  return `Вакансия опубликована${datePart}${cityPart}`;
};
