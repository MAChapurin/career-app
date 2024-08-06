import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useOutsideAlerter } from "../../../hooks/useOutsideAlerter";
import FilterDropdonwList from "../filter-dropdown-list/FilterDropdonwList";
import { IconsFilter } from "../../icons-filter";
import { Shield } from "../../shield/Shield";
import useVacanciesStore from "../../../store/useVacanciesStore";
import { getCountFilter } from "../../../utils/getCountFilter";
import { cn } from "../../../utils";

export const FilterDropdown = ({
  data = [],
  icon,
  placeholder,
  setOpenedFilter = () => {},
  collapsed,
}) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setOpenedFilter(opened ? placeholder : null);
  }, [opened]);

  useOutsideAlerter(ref, () => {
    setOpened(false);
  });

  const [filterParams] = useVacanciesStore((state) => [state.filterParams]);

  const count = data.reduce(function (currentSum, currentItem) {
    let count = getCountFilter(filterParams[currentItem.name]);

    if (currentItem.otherItems && currentItem.otherItems.length) {
      currentItem.otherItems.forEach((el) => {
        count += getCountFilter(filterParams[el.name]);
      });
    }

    return currentSum + count;
  }, 0);

  return (
    <div
      ref={ref}
      className={cn(
        styles.block,
        collapsed && styles.collapsed,
        opened && styles.opened
      )}
    >
      <button
        className={`btn-reset ${styles.btn}`}
        onClick={() => setOpened(!opened)}
      >
        <IconsFilter icon={icon} />
        <span className={styles.placeholder}>{placeholder}</span>
        {data.length && (
          <div className={cn(styles["right-side"], count && styles.hasCount)}>
            {!!count && <Shield>{count}</Shield>}
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
