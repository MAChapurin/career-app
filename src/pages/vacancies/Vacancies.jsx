import React, { useEffect } from "react";
import styles from "./Vacancies.module.css";
import VacancyList from "../../components/vacancyList/VacancyList";
import SkeletonBlock from "../../components/Skeleton/SkeletonBlock/SkeletonBlock";
import useVacanciesStore from "../../store/useVacanciesStore";
import { FilterList } from "../../components/filter-list/FilterList";
import { cleanFilter } from "../../utils/cleanFilter";
import { isEmptyObj } from "../../utils/isEmptyObj";

const Vacancies = () => {
  const {
    isLoading,
    vacancyList,
    fetchVacancyList,
    error,
    paginationPage,
    filterParams,
  } = useVacanciesStore((state) => ({
    isLoading: state.isLoading,
    vacancyList: state.vacancyList,
    fetchVacancyList: state.fetchVacancyList,
    error: state.error,
    paginationPage: state.paginationPage,
    filterParams: state.filterParams,
  }));

  useEffect(() => {
    fetchVacancyList(paginationPage);
  }, []);

  const copyFilterParams = cleanFilter(filterParams);

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <FilterList />
        {isLoading ? (
          <SkeletonBlock />
        ) : vacancyList.length > 0 ? (
          <VacancyList data={vacancyList} />
        ) : !isEmptyObj(copyFilterParams) ? (
          <div className={styles.empty}>
            Не удалось найти вакансии с выбранными параметрами.
            <br />
            Попробуйте другие.
          </div>
        ) : (
          ""
        )}

        {!isLoading && error && <>{error.code}</>}
      </div>
    </main>
  );
};

export default Vacancies;
