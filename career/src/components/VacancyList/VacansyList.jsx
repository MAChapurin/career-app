import styles from './VacansyList.module.css';
import { VacansyBlock } from '../VacancyBlock/VacansyBlock';

export const VacansyList = () => {
  return (
    <>
      {Array.from({ length: 2 }, (_, index) => (
        <div key={index} className={styles.wrapper}>
          <VacansyBlock date='Сегодня, 2 января' />
        </div>
      ))}
    </>
  );
};
