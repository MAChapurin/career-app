import { Dropdown } from "@components/UI/Dropdown/Dropdown";
import styles from "./FilterItem.module.css";
import { FilterCity } from "@components/UI/FilterCity/FilterCity";

export const FilterItem = ({
  type = "input",
  name,
  icon: Icon,
  group,
  items }) => {
  return (
    <div className={styles.filterItem}>
      {type === "dropdown" ? (
        <Dropdown
          name={name}
          icon={Icon}
          items={items}
          group={group}
        />
      ) : (
        <FilterCity
          type="search"
          name={name}
          icon={Icon}
        />
      )}
    </div>
  );
};
