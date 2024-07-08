import React, { useEffect } from 'react';
import styles from './Main.module.css';
import FilterList from '../../components/filterList/FilterList';
import VacancyList from '../../components/vacancyList/VacancyList';
import SkeletonBlock from '../../components/Skeleton/SkeletonBlock/SkeletonBlock';
import useFrontendVacancyStore from '../../store/useFrontendVacancyStore';
import { Pagination } from '../../components/pagination/Pagination';

const Main = () => {
  const { isLoading, vacancyList, fetchVacancyList, error, pages } = useFrontendVacancyStore();

  useEffect(() => {
    // fetchVacancyList(true)
    fetchVacancyList(1)
  }, []);
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <FilterList />
        {isLoading && <SkeletonBlock />}
        {vacancyList.length > 0 && <VacancyList data={vacancyList} />}
        {!isLoading && error && <>{error.code}</>}
        {pages > 1 && <Pagination pages={pages} fetchCallback={fetchVacancyList}/>}
      </div>
    </main>
  );
};

export default Main;
