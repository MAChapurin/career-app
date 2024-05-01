import styles from './VacancyList.module.css';
import { VacancyBlock } from '../VacancyBlock/VacancyBlock';

export const VacancyList = () => {
  return (
    <>
      {Array.from({ length: 2 }, (_, index) => (
        <div key={index} className={styles.wrapper}>
          <VacancyBlock date='Сегодня, 2 января' />
        </div>
      ))}
    </>
  );
};
