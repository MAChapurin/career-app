
export const getCountFilter = (item) => {
  let count = 0;
  if (item) {
    if (typeof item === "string") {
      if (
        item === "0" ||
        item === "doesNotMatter"
      ) {
        count = 0;
      } else {
        count = 1;
      }
    } else {
      count = item.length;
    }
  }
  return count;
};
