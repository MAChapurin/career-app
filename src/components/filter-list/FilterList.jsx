import { useMemo, useState } from "react";
import useVacanciesStore from "../../store/useVacanciesStore";
import { isEmptyObj } from "../../utils/isEmptyObj";
import { FilterItem } from "./filter-item/FilterItem";
import { filterList, sectionList } from "./mock";
import cities from "../../data/cities.json";
import { cleanFilter } from "../../utils/cleanFilter";
import useMediaQuery from "../../hooks/useMediaQuery";
import { cn } from "../../utils";
import styles from "./styles.module.css";

export function FilterList() {
  const [openedFilter, setOpenedFilter] = useState(null);
  const [filterParams, resetFilterParams] = useVacanciesStore((state) => [
    state.filterParams,
    state.resetFilterParams,
  ]);

  const copyFilterParams = cleanFilter(filterParams);
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const isMobile = useMediaQuery("(max-width:767px)");
  const additionalFilters = useMemo(
    () => (isDesktop ? sectionList.slice(1) : sectionList),
    [isDesktop]
  );

  return (
    <div className={styles.block}>
      <ul
        className={cn(
          styles.list,
          isMobile && openedFilter && styles.hasOpenedItem
        )}
      >
        <li
          className={cn(
            isMobile && openedFilter && openedFilter !== "Город" && "d-none"
          )}
        >
          <FilterItem
            data={cities[0]}
            icon={"direction"}
            placeholder={"Город"}
            setOpenedFilter={setOpenedFilter}
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

        <li
          className={cn(
            isMobile &&
              openedFilter &&
              openedFilter !== "Дополнительные фильтры" &&
              "d-none"
          )}
        >
          <FilterItem
            icon={"additional"}
            placeholder={"Дополнительные фильтры"}
            data={additionalFilters}
            dropdown
            collapsed={isMobile && openedFilter !== "Дополнительные фильтры"}
            setOpenedFilter={setOpenedFilter}
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
