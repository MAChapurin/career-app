import useVacanciesStore from "../../store/useVacanciesStore";
import { isEmptyObj } from "../../utils/isEmptyObj";
import { FilterItem } from "./filter-item/FilterItem";
import { filterList, sectionList } from "./mock";
import cities from "../../data/cities.json";
import styles from "./styles.module.css";

export function FilterList() {
  const [filterParams, resetFilterParams] = useVacanciesStore((state) => [
    state.filterParams,
    state.resetFilterParams,
  ]);

  return (
    <div className={styles.block}>
      <ul className={styles.list}>
        <li>
          <FilterItem data={cities} icon={"direction"} placeholder={"Город"} />
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
      {!isEmptyObj(filterParams) ? (
        <button
          className={`btn-reset ${styles.btn}`}
          onClick={() => resetFilterParams()}
        >
          Сбросить все фильтры
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
