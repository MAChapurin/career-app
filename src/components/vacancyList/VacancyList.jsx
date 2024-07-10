import React, { useState } from 'react';
import styles from './VacancyList.module.css';
import VacancyBlock from './vacancyBlock/VacancyBlock';
import useFrontendVacancyStore from '../../store/useFrontendVacancyStore';
import { Pagination } from '../pagination/Pagination';

const VacancyList = ({ data }) => {
  const { fetchVacancyList, pages, page, setPage, isLoading } = useFrontendVacancyStore();
  return (
    <>
      <ul className={styles.wrapper}>
        {data.map((item, index) => (
          <VacancyBlock key={index} title={item.date} cards={item.vacancy} />
        ))}
      </ul>
      {pages > 0 && <Pagination page={page} setPage={setPage} pages={pages} fetchCallback={fetchVacancyList} disabled={isLoading} />}
    </>
  );
};

export default VacancyList;
