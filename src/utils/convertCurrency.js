export const convertСurrency = (cur) => {
  switch (cur) {
    case "RUR":
      return `₽`;
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "KZT":
      return "₸";
    default:
      return cur;
  }
};
