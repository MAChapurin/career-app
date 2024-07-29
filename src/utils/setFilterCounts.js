export const setFilterCounts = (e) => {
  const parent = e.target.closest(".js-filter-parent-block");

  if (!parent) {
    return;
  }

  const subParent = e.target.closest(".js-filter-subparent-block");

  setCount(parent);
  setCount(subParent);
};

export const resetFilterCounts = () => {
  const parents = document.querySelectorAll(".js-filter-parent-block");

  if (!parents.length) {
    return;
  }

  parents.forEach(element => {
    resetCount(element);
  });

};

const resetCount = (block) => {
  const inputsChecked = block.querySelectorAll("input:checked");
  const countsBlock = block.querySelectorAll(".js-filter-block-count");

  inputsChecked.forEach(element => {
    element.checked = false;
  });

  countsBlock.forEach(element => {
    element.textContent = 0;
    element.classList.add("opacity-0");
  });

}

const setCount = (block) => {

  if(!block) {
    return;
  }
  const inputsChecked = block.querySelectorAll("input:checked");
  const countBlock = block.querySelector(".js-filter-block-count");
  countBlock.textContent = inputsChecked.length;

  if (inputsChecked.length) {
    countBlock.classList.remove("opacity-0");
  } else {
    countBlock.classList.add("opacity-0");
  }
}
