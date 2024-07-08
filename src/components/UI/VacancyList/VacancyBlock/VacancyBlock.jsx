import { VacancyCard } from './VacancyCard/VacancyCard';
import styles from './VacancyBlock.module.css';
import { useVacancyStore } from '@store/vacancyStore';

export const VacancyBlock = ({ date, info }) => {
  const { blackList } = useVacancyStore()
  const filterVacancy = info.filter((vacancy) => !blackList.includes(vacancy.id))
  return (
    filterVacancy.length > 0 && <div className={styles.wrapper}>
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
  );
};
