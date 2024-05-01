import { VacancyCard } from '../VacancyCard/VacancyCard';
import styles from './VacancyBlock.module.css';

const vacansy = {
  name: 'Junior Frontend-разработчик',
  wages: 'от 30 000 ₽',
  company: 'Интернет Люди',
  location: 'Ярославль',
  experience: 'Опыт от 1 года до 3 лет',
};

export const VacancyBlock = ({ date }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{date}</h1>
      <ul className={styles.list}>
        {Array.from({ length: 18 }, (_, index) => (
          <VacancyCard key={index} vacansy={vacansy} />
        ))}
      </ul>
    </div>
  );
};
