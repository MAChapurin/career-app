import { useRef, useState } from "react";
import styles from "./styles.module.css";
import { useOutsideAlerter } from "../../../hooks/useOutsideAlerter";
import FilterDropdonwList from "../filter-dropdown-list/FilterDropdonwList";
import { IconsFilter } from "../../icons-filter";
import { Shield } from "../../shield/Shield";

export const FilterDropdown = ({ data = [], icon, placeholder }) => {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);

  useOutsideAlerter(ref, () => {
    setOpened(false);
  });

  return (
    <div
      ref={ref}
      className={`js-filter-parent-block ${styles.block} ${
        opened ? styles.opened : ""
      }`}
    >
      <button
        className={`btn-reset ${styles.btn}`}
        onClick={() => setOpened(!opened)}
      >
        <IconsFilter icon={icon} />
        <span className={styles.placeholder}>{placeholder}</span>
        {data.length && (
          <div className={styles["right-side"]}>
            <Shield className="js-filter-block-count opacity-0"></Shield>
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
