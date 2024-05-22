import React from 'react';
import styles from './VacancyList.module.css';
import VacancyBlock from './vacancyBlock/VacancyBlock';

const VacancyList = ({ data }) => {
  return (
    <ul className={styles.wrapper}>
      {data.map((item, index) => (
        <VacancyBlock key={index} title={item.date} cards={item.vacancy} />
      ))}
    </ul>
  );
};

export default VacancyList;
