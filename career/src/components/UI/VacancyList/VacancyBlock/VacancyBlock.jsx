import { VacancyCard } from './VacancyCard/VacancyCard';
import styles from './VacancyBlock.module.css';

const vacancy = {
  name: 'Junior Frontend-разработчик',
  wages: 'от 30 000 ₽',
  company: 'Интернет Люди',
  location: 'Ярославль',
  experience: 'Опыт от 1 года до 3 лет',
};

export const VacancyBlock = ({ date }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{date}</h2>
      <ul className={styles.list}>
        {Array.from({ length: 18 }, (_, index) => (
          <VacancyCard key={index} vacancy={vacancy} />
        ))}
      </ul>
    </div>
  );
};
