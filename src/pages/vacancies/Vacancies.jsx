import React, { useEffect } from "react";
import styles from "./Vacancies.module.css";
import VacancyList from "../../components/vacancyList/VacancyList";
import SkeletonBlock from "../../components/Skeleton/SkeletonBlock/SkeletonBlock";
import useVacanciesStore from "../../store/useVacanciesStore";
import { FilterList } from "../../components/filter-list/FilterList";

const Vacancies = () => {
  const { isLoading, vacancyList, fetchVacancyList, error, paginationPage } =
    useVacanciesStore((state) => ({
      isLoading: state.isLoading,
      vacancyList: state.vacancyList,
      fetchVacancyList: state.fetchVacancyList,
      error: state.error,
      paginationPage: state.paginationPage,
    }));

  useEffect(() => {
    fetchVacancyList(paginationPage);
  }, []);
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <FilterList />
        {isLoading && <SkeletonBlock />}
        {!isLoading && vacancyList.length > 0 ? (
          <VacancyList data={vacancyList} />
        ) : (
          <div className={styles.empty}>
            Не удалось найти вакансии с выбранными параметрами. Попробуйте
            другие.
          </div>
        )}

        {!isLoading && error && <>{error.code}</>}
      </div>
    </main>
  );
};

export default Vacancies;
