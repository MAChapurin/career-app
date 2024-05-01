import styles from './VacancyCard.module.css';
import { StarSVG } from '../IconsSVG/StarSVG';
import { HoverSVG } from '../IconsSVG/HoverSVG';

export const VacancyCard = ({ vacansy }) => {
  return (
    <li className={styles.card}>
      <div className={styles.headingAndHover}>
        <h1 className={styles.heading}>{vacansy.name}</h1>
        <div className={styles.icon}>
          <HoverSVG />
        </div>
      </div>
      <p className={styles.wages}>{vacansy.wages}</p>
      <p className={`${styles.text} ${styles.mb8}`}>{vacansy.company}</p>
      <p className={styles.text}>{vacansy.location}</p>
      <div className={styles.experience}>
        <StarSVG />
        <p className={styles.text}>{vacansy.experience}</p>
      </div>
    </li>
  );
};
