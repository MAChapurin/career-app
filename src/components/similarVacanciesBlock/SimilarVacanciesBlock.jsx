import VacancyBlock from "../vacancyList/vacancyBlock/VacancyBlock";
import styles from "./SimilarVacanciesBlock.module.css";
import useSimilarVacanciesStore from "../../store/useSimilarVacanciesStore";
import SkeletonBlock from "../Skeleton/SkeletonBlock/SkeletonBlock";
import { scrollUp } from "../../utils";
import { useEffect } from "react";
import SIMILAR_VACANCIES_PER_PAGE from "../../constants/SIMILAR_VACANCIES_PER_PAGE";
const SimilarVacanciesBlock = ({ vacancyId }) => {
  const {
    incrementSimilarVacanciesPage,
    similarVacanciesPage,
    similarVacanciesPagesCount,
    similarVacancies,
    isLoading,
    fetchSimilarVacancies,
  } = useSimilarVacanciesStore();

  const expandSimilarVacancies = (id) => {
    if (id) {
      incrementSimilarVacanciesPage();
      fetchSimilarVacancies(id);
    }
  };

  useEffect(() => {
    expandSimilarVacancies(vacancyId);
  }, [vacancyId]);

  return (
    <section className={styles.block}>
      <h3 className={styles.title}>Похожие вакансии</h3>
      <VacancyBlock
        cards={similarVacancies}
        hasTitle={false}
        onVacancyClick={scrollUp}
      />
      {isLoading && (
        <SkeletonBlock count={SIMILAR_VACANCIES_PER_PAGE} hasTitle={false} />
      )}
      {similarVacanciesPage < similarVacanciesPagesCount && (
        <div className={styles.btnWrapper}>
          <button
            onClick={() => {
              expandSimilarVacancies(vacancyId);
            }}
            disabled={isLoading}
            className={styles.btn}
          >
            Показать еще
          </button>
        </div>
      )}
    </section>
  );
};

export default SimilarVacanciesBlock;
