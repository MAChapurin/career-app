export const cleanFilter = (objFilter) => {

  const copyObjFilter = {...objFilter}
  if (copyObjFilter["search_period"] === "0") {
    delete copyObjFilter["search_period"];
  }

  if (copyObjFilter["experience"] === "doesNotMatter") {
    delete copyObjFilter["experience"];
  }

  if (copyObjFilter["salary"] === "doesNotMatter") {
    delete copyObjFilter["salary"];
  }
  return copyObjFilter;
};
