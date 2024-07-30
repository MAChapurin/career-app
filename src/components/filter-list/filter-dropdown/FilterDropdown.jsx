import { useRef, useState } from "react";
import styles from "./styles.module.css";
import { useOutsideAlerter } from "../../../hooks/useOutsideAlerter";
import FilterDropdonwList from "../filter-dropdown-list/FilterDropdonwList";
import { IconsFilter } from "../../icons-filter";
import { Shield } from "../../shield/Shield";
import useVacanciesStore from "../../../store/useVacanciesStore";

export const FilterDropdown = ({ data = [], icon, placeholder }) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

  useOutsideAlerter(ref, () => {
    setOpened(false);
  });

  const [filterParams] = useVacanciesStore((state) => [state.filterParams]);

  const count = data.reduce(function (currentSum, currentItem) {
    if (filterParams[currentItem.name]) {
      if (typeof filterParams[currentItem.name] === "string") {
        if (
          filterParams[currentItem.name] === "0" ||
          filterParams[currentItem.name] === "doesNotMatter"
        ) {
          return currentSum;
        }
        return currentSum + 1;
      } else {
        return currentSum + filterParams[currentItem.name].length;
      }
    }

    return currentSum;
  }, 0);

  return (
    <div ref={ref} className={`${styles.block} ${opened ? styles.opened : ""}`}>
      <button
        className={`btn-reset ${styles.btn}`}
        onClick={() => setOpened(!opened)}
      >
        <IconsFilter icon={icon} />
        <span className={styles.placeholder}>{placeholder}</span>
        {data.length && (
          <div className={styles["right-side"]}>
            <Shield className={`${!count ? "opacity-0" : ""}`}>{count}</Shield>
            <span className={styles.arrow}>
              <IconsFilter icon={"arrow"} />
            </span>
          </div>
        )}
      </button>

      {data.length ? (
        <FilterDropdonwList data={data} openedParent={opened} />
      ) : (
        ""
      )}
    </div>
  );
};
