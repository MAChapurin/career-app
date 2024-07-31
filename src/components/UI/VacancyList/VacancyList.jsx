import { useEffect } from 'react';
import { VacancyBlock } from './VacancyBlock/VacancyBlock';
import { useVacancyStore } from '@store/vacancyStore';
import { Pagination } from '../Pagination/Pagination';
import styles from './VacancyList.module.css';
import { useFilterParams } from '@hooks/useFilterParams';

export const VacancyList = () => {
  const [vacancies, fetchVacancies, pages, loading, page, setPage] =
    useVacancyStore((state) => [
      state.vacancies,
      state.fetchVacancies,
      state.pages,
      state.loading,
      state.page,
      state.setPage,
      state.blackList,
    ]);

  const params = useFilterParams();

  useEffect(() => {
    fetchVacancies(params, page - 1);
  }, [params]);

  let vacancyObjects = loading
    ? Array.from({ length: 18 }).map(() => ({
        date: '',
        vacancies: [{}, {}, {}],
      }))
    : Object.values(vacancies);

  const handleSetPage = (newPage) => {
    fetchVacancies(params, newPage - 1);
    setPage(newPage);
  };

  return (
    <>
      {vacancyObjects.map((vacancy, index) => (
        <div key={index} className={styles.wrapper}>
          <VacancyBlock date={vacancy.date} info={vacancy.vacancies} />
        </div>
      ))}
      {Object.keys(vacancies).length === 0 && (
        <div className={styles.container}>
          <p className={styles.text}>
            Не удалось найти вакансии с выбранными параметрами.
            <br />
            Попробуйте другие.
          </p>
        </div>
      )}
      <Pagination pages={pages} page={page} handleSetPage={handleSetPage} />
    </>
  );
};
