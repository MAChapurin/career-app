import { VacansyCard } from '../VacancyCard/VacansyCard';
import styles from './VacansyBlock.module.css';

const vacansy = {
  name: 'Junior Frontend-разработчик',
  wages: 'от 30 000 ₽',
  company: 'Интернет Люди',
  location: 'Ярославль',
  experience: 'Опыт от 1 года до 3 лет',
};

export const VacansyBlock = ({ date }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{date}</h1>
      <ul className={styles.list}>
        {Array.from({ length: 18 }, (_, index) => (
          <VacansyCard key={index} vacansy={vacansy} />
        ))}
      </ul>
    </div>
  );
};
