import { FilterItem } from "./FilterItem/FilterItem";
import styles from "./FilterList.module.css";
import clsx from "@utils/clsx";

export const FilterList = ({ items }) => {
  return (
    <section className={styles.container}>
      <li className={styles.filterList}>
        {items.map((item) => (
          <FilterItem
            key={item.name}
            type={item.type}
            name={item.name}
            icon={item.icon}
            items={item.items}
          />
        ))}
      </li>
      <button className={clsx("btn", styles.resetBtn)}>
        Сбросить все фильтры
      </button>
    </section>
  );
};
