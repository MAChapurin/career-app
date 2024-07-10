import React from 'react';
import styles from './VacancyCard.module.css';
import Icon from '../../../icon/Icon';

const VacancyCard = ({ card }) => {

  const { name, salary, experience, area, employer } = card;

  const convertСurrency = (cur) => {
    switch (cur) {
      case 'RUR':
        return `₽`
      case 'USD':
        return '$'
      default:
        return cur
    }
  }

  return (
    <li className={styles.card}>
      <div className={styles.main}>
        <div className={styles.headerBlock}>
          <h4 className={styles.title}>{name}</h4>
          <span className={styles.salary}>
            {salary ?
              `${salary.from && `${salary.to ? '' : 'от'} ${salary.from.toLocaleString()}` || ''} ${salary.from && salary.to && '-' || ''} ${salary.to && `${salary.from ? '' : 'до'} ${salary.to.toLocaleString()}` || ''} ${salary.currency ? convertСurrency(salary.currency) : ''}  `
              :
              'Доход не указан'
            }
          </span>
        </div>
        <div className={styles.controlsBlock}>
          <Icon name={'slashEye'} className={styles.eye} />
        </div>
      </div>
      <div className={styles.additional}>
        <div className={styles.upContent}>
          <p>{employer.name}</p>
          <p>{area.name}</p>
        </div>
        <p className={styles.experience}>
          <Icon name={'star'} className={styles.star} />
          {experience && experience.name}
        </p>
      </div>
    </li>
  );
};

export default VacancyCard;
