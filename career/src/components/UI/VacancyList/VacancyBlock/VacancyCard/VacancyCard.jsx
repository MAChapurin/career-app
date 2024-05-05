import { HoverSVG } from '@components/UI/IconsSVG/HoverSVG';
import { StarSVG } from '@components/UI/IconsSVG/StarSVG';
import styles from './VacancyCard.module.css';

export const VacancyCard = ({ vacancy }) => {
  return (
    <li className={styles.card}>
      <div className={styles.headingAndHover}>
        <h1 className={styles.heading}>{vacancy.name}</h1>
        <div className={styles.icon}>
          <HoverSVG />
        </div>
      </div>
      <p className={styles.wages}>{vacancy.wages}</p>
      <p className={`${styles.text} ${styles.mb8}`}>{vacancy.company}</p>
      <p className={styles.text}>{vacancy.location}</p>
      <div className={styles.experience}>
        <StarSVG />
        <p className={styles.text}>{vacancy.experience}</p>
      </div>
    </li>
  );
};
