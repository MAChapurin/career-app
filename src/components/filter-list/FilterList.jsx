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

  const copyFilterParams = { ...filterParams };

  if (copyFilterParams["search_period"] === "0") {
    delete copyFilterParams["search_period"];
  }

  if (copyFilterParams["experience"] === "doesNotMatter") {
    delete copyFilterParams["experience"];
  }

  if (copyFilterParams["salary"] === "doesNotMatter") {
    delete copyFilterParams["salary"];
  }

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
      {!isEmptyObj(copyFilterParams) ? (
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
