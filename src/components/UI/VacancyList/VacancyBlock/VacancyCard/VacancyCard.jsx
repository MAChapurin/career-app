import { HoverSVG } from '@components/UI/IconsSVG/HoverSVG';
import { StarSVG } from '@components/UI/IconsSVG/StarSVG';
import styles from './VacancyCard.module.css';

export const VacancyCard = ({ vacancy }) => {
  const isEmpty = Object.keys(vacancy).length;
  return (
    <>
      {isEmpty ? (
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
      ) : (
        <li className={styles.card}>
          <div className={styles.headingAndHover}>
            <div className={styles.loaderHeader}></div>
          </div>
          <p className={styles.loaderPar}>{vacancy.wages}</p>
          <p className={styles.loaderCom}>{vacancy.company}</p>
          <p className={styles.loaderTxt}>{vacancy.location}</p>
          <div className={styles.experience}>
            <div className={styles.loaderBall}></div>
            <p className={styles.loaderExp}>{vacancy.experience}</p>
          </div>
        </li>
      )}
    </>
  );
};
