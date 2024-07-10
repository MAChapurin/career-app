import React, { useEffect } from 'react';
import styles from './Main.module.css';
import FilterList from '../../components/filterList/FilterList';
import VacancyList from '../../components/vacancyList/VacancyList';
import SkeletonBlock from '../../components/Skeleton/SkeletonBlock/SkeletonBlock';
import useFrontendVacancyStore from '../../store/useFrontendVacancyStore';

const Main = () => {
  const { isLoading, vacancyList, fetchVacancyList, error } = useFrontendVacancyStore();
  useEffect(() => {
    fetchVacancyList(0)
  }, []);
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <FilterList />
        {isLoading && <SkeletonBlock />}
        {!isLoading && vacancyList.length > 0 && <VacancyList data={vacancyList} />}
        {!isLoading && error && <>{error.code}</>}
      </div>
    </main>
  );
};

export default Main;
