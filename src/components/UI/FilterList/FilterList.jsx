import { useFiltersCounter } from "@hooks/useFiltersCounter";
import { FilterItem } from "./FilterItem/FilterItem";
import styles from "./FilterList.module.css";
import clsx from "@utils/clsx";
import { useFiltersStore } from "@store/useFiltersStore";

export const FilterList = ({ items }) => {
  const { allFilterLength } = useFiltersCounter()
  const { clearFilters } = useFiltersStore()
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
            value={item?.value}
            group={item?.group}
          />
        ))}
      </li>
      <button
        className={clsx("btn", styles.resetBtn)}
        style={{
          opacity: allFilterLength > 0 ? 1 : 0,
          pointerEvents: allFilterLength > 0 ? 'all' : 'none'
        }}
        onClick={clearFilters}
      >
        Сбросить все фильтры
      </button>
    </section>
  );
};
