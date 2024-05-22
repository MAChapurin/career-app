import React from 'react';
import styles from './VacancyBlock.module.css';
import VacancyCard from './vacancyCard/VacancyCard';

const VacancyBlock = ({ title, cards }) => {

  const localDate = new Date();
  const publishedDate = new Date(title);

  return (
    <li className={styles.wrapper}>
      <h3 className={styles.title}>
        {
          publishedDate.getDate() === localDate.getDate() &&
          publishedDate.getMonth() === localDate.getMonth() &&
          publishedDate.getFullYear() === localDate.getFullYear() && <>Сегодня, </>
        }
        <>{publishedDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}</>
        <> {publishedDate.getFullYear() !== localDate.getFullYear() && localDate.getFullYear()}</>
      </h3>
      <ul className={styles.cardsBlock}>
        {cards.map((card) => (
          <VacancyCard card={card} key={card.id} />
        ))}
      </ul>
    </li>
  );
};

export default VacancyBlock;
