import { range } from "./range";

export const getPaginationRange = (pages, page, siblings=1 ) => {
  const noInArray = 5 + siblings;
  
  if(noInArray>pages) {
    return range(1, pages);
  }

  const leftSiblingsIndex = Math.max(page - siblings, 1 );
  const rightSiblingsIndex = Math.min(page + siblings, pages );

  const showLeftDots = leftSiblingsIndex > 2;
  const showRightDots = rightSiblingsIndex < pages + 1 - 2;

  if(!showLeftDots && showRightDots) {
    const itemsCount = 2 + 1 * siblings;
    const arrRange = range(1, itemsCount + 1);
    return [...arrRange, "...", pages];
  } else if(showLeftDots && !showRightDots) {
    const itemsCount = 2 + 1 * siblings;
    const arrRange = range(pages + 1 - (itemsCount + 1), pages);
    return [1, "...", ...arrRange];
  } else {
    const arrRange = range(leftSiblingsIndex, rightSiblingsIndex);

    return [1, "...", ...arrRange, "...", pages]
  }
}