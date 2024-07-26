import React, { useEffect } from "react";
import styles from "./Vacancies.module.css";
import FilterList from "../../components/filterList/FilterList";
import VacancyList from "../../components/vacancyList/VacancyList";
import SkeletonBlock from "../../components/Skeleton/SkeletonBlock/SkeletonBlock";
import useVacanciesStore from "../../store/useVacanciesStore";

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
        {!isLoading && vacancyList.length > 0 && (
          <VacancyList data={vacancyList} />
        )}
        {!isLoading && error && <>{error.code}</>}
      </div>
    </main>
  );
};

export default Vacancies;
