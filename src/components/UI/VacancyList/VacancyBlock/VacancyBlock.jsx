import { VacancyCard } from './VacancyCard/VacancyCard';
import styles from './VacancyBlock.module.css';

export const VacancyBlock = ({ date, info }) => {
  return (
    <div className={styles.wrapper}>
      {date ? (
        <h2 className={styles.heading}>{date}</h2>
      ) : (
        <div className={styles.loader}></div>
      )}
      <ul className={styles.list}>
        {info.map((vacancy, index) => (
          <VacancyCard key={index} vacancy={vacancy} />
        ))}
      </ul>
    </div>
  );
};
