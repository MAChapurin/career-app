import { LIMIT_CAR_FOR_SIMILARY } from '@constants';
import { useDetailVacancyStore } from '@store/detailVacancyStore';
import { useEffect, useState } from 'react';
import { SekeletonCard } from '../VacancyList/VacancyBlock/VacancyCard/SekeletonCard';
import { VacancyCard } from '../VacancyList/VacancyBlock/VacancyCard/VacancyCard';

import styles from './SimilarVacancy.module.css';

export const SimilarVacancy = () => {
  const [similarVacancies, setSimilarVacancies] = useState([]);
  const [similarPage, setSimilarPage] = useState(1);

  const { vacancyDetail, fetchSimilarVacancy, similaryPages, loadingSimilary } =
    useDetailVacancyStore();

  useEffect(() => {
    if (!vacancyDetail.id) return;
    const fetchData = async () => {
      const loadVacancy = await fetchSimilarVacancy(
        vacancyDetail.id,
        similarPage - 1
      );
      if (similarPage === 1) setSimilarVacancies(loadVacancy);
      else setSimilarVacancies([...similarVacancies, ...loadVacancy]);
    };
    fetchData();
  }, [similarPage, vacancyDetail.id]);
  return (
    <>
      <h3 className={styles.moreVacancy}>Похожие вакансии</h3>
      <ul className={styles.listSimilar}>
        {similarVacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            setSimilarVacancies={setSimilarVacancies}
            setSimilarPage={setSimilarPage}
            eye={false}
          />
        ))}
      </ul>
      {loadingSimilary && (
        <ul className={styles.listSimilar}>
          {Array.from({ length: LIMIT_CAR_FOR_SIMILARY }).map((_, index) => (
            <SekeletonCard key={index} />
          ))}
        </ul>
      )}
      <div className={styles.btnWrapper}>
        <button
          className={styles.btn}
          disabled={similarPage - 1 >= similaryPages}
          onClick={() => setSimilarPage((similarPage) => similarPage + 1)}
        >
          Показать еще
        </button>
      </div>
    </>
  );
};
