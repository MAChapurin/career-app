import { useEffect } from 'react';
import { VacancyBlock } from './VacancyBlock/VacancyBlock';
import styles from './VacancyList.module.css';
import { useVacancyStore } from '@store/vacancyStore';

export const VacancyList = () => {
  const vacancies = useVacancyStore((state) => state.vacancies);
  const fetchVacancies = useVacancyStore((state) => state.fetchVacancies);

  const isEmpty = vacancies.length === 0;

  useEffect(() => {
    fetchVacancies('Москва');
  }, []);

  let vacancyObjects = isEmpty
    ? Array.from({ length: 10 }).map(() => ({
        date: '',
        vacancies: [{}, {}, {}],
      }))
    : Object.values(vacancies);

  return (
    <>
      {vacancyObjects.map((vacancy, index) => (
        <div key={index} className={styles.wrapper}>
          <VacancyBlock date={vacancy.date} info={vacancy.vacancies} />
        </div>
      ))}
    </>
  );
};
