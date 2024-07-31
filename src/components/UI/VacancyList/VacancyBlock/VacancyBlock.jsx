import { VacancyCard } from './VacancyCard/VacancyCard';
import { useVacancyStore } from '@store/vacancyStore';

import styles from './VacancyBlock.module.css';
import { useFiltersStore } from '@store/useFiltersStore';

export const VacancyBlock = ({ date, info }) => {
  const { blackList } = useVacancyStore();
  const { isHiddenVacancyFilterChecked } = useFiltersStore();
  const filterVacancy = info.filter((vacancy) =>
    isHiddenVacancyFilterChecked ? vacancy : !blackList.includes(vacancy.id)
  );
  return (
    filterVacancy.length > 0 && (
      <div className={styles.wrapper}>
        {date ? (
          <h2 className={styles.heading}>{date}</h2>
        ) : (
          <div className={styles.loader}></div>
        )}
        <ul className={styles.list}>
          {filterVacancy.map((vacancy, index) => (
            <VacancyCard key={index} vacancy={vacancy} />
          ))}
        </ul>
      </div>
    )
  );
};
