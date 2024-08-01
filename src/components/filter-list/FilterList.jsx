import useVacanciesStore from "../../store/useVacanciesStore";
import { isEmptyObj } from "../../utils/isEmptyObj";
import { FilterItem } from "./filter-item/FilterItem";
import { filterList, sectionList } from "./mock";
import cities from "../../data/cities.json";
import styles from "./styles.module.css";
import { cleanFilter } from "../../utils/cleanFilter";

export function FilterList() {
  const [filterParams, resetFilterParams] = useVacanciesStore((state) => [
    state.filterParams,
    state.resetFilterParams,
  ]);

  const copyFilterParams = cleanFilter(filterParams);

  return (
    <div className={styles.block}>
      <ul className={styles.list}>
        <li>
          <FilterItem
            data={cities[0]}
            icon={"direction"}
            placeholder={"Город"}
          />
        </li>

        <li>
          <FilterItem
            icon={"bag"}
            placeholder={"Тип занятости"}
            data={filterList}
            dropdown
          />
        </li>

        <li>
          <FilterItem
            icon={"additional"}
            placeholder={"Дополнительные фильтры"}
            data={sectionList}
            dropdown
          />
        </li>
      </ul>

      <button
        className={`btn-reset ${styles.btn} ${
          isEmptyObj(copyFilterParams) ? "opacity-0" : ""
        }`}
        onClick={() => resetFilterParams()}
      >
        Сбросить все фильтры
      </button>
    </div>
  );
}
