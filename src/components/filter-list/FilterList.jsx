import { useMemo } from "react";
import useVacanciesStore from "../../store/useVacanciesStore";
import { isEmptyObj } from "../../utils/isEmptyObj";
import { FilterItem } from "./filter-item/FilterItem";
import { filterList, sectionList } from "./mock";
import cities from "../../data/cities.json";
import styles from "./styles.module.css";
import { cleanFilter } from "../../utils/cleanFilter";
import useMediaQuery from "../../hooks/useMediaQuery";
import { IconsFilter } from "../icons-filter";
import { cn } from "../../utils";

export function FilterList() {
  const [filterParams, resetFilterParams] = useVacanciesStore((state) => [
    state.filterParams,
    state.resetFilterParams,
  ]);

  const copyFilterParams = cleanFilter(filterParams);
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const additionalFilters = useMemo(() =>
    isDesktop
      ? sectionList
      : [
          ...filterList.map((item) => ({
            ...item,
            title: "Тип занятости",
            icon: <IconsFilter icon={"bag"} />,
          })),
          ...sectionList,
        ]
  );

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

        {isDesktop && (
          <li>
            <FilterItem
              icon={"bag"}
              placeholder={"Тип занятости"}
              data={filterList}
              dropdown
            />
          </li>
        )}

        <li>
          <FilterItem
            icon={"additional"}
            placeholder={"Дополнительные фильтры"}
            data={additionalFilters}
            dropdown
          />
        </li>
      </ul>

      {!isEmptyObj(copyFilterParams) && (
        <button
          className={cn("btn-reset", styles.btn)}
          onClick={() => resetFilterParams()}
        >
          Сбросить все фильтры
        </button>
      )}
    </div>
  );
}
