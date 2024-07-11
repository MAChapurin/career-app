import { HoverSVG } from '@components/UI/IconsSVG/HoverSVG';
import { useDetailVacancyStore } from '@store/detailVacancyStore';
import { useVacancyStore } from "@store/vacancyStore"
import { useEffect } from 'react';
import { EyeSVG } from '../IconsSVG/EyeSVG';

import styles from './VacancyDetail.module.css'

export const VacancyDetail = () => {
  const { vacancyDetail } = useDetailVacancyStore();
  const { blackList, toggleToBlackList } = useVacancyStore()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [vacancyDetail.id])
  return (
    <div className={styles.content}>
      <div className={styles.leftSite}>
        <div>
          <h2 className={styles.title}>
            {vacancyDetail.name}
          </h2>
          <span className={styles.wages}>{vacancyDetail.wages}</span>
        </div>
        <div className={styles.requirements}>
          <h4>Требования к вакансии</h4>
          <ul className={styles.requirementsList}>
            {vacancyDetail.requirements?.map((item, index) =>
              <li key={index} className={styles.requirementsItem}>
                <item.icon className={styles.requirementsIcon} />
                <span>{item.name}</span>
              </li>)}
          </ul>
        </div>
        <button className={`${styles.btn} ${styles.hidBtn}`} onClick={() => toggleToBlackList(vacancyDetail.id)}>
          {blackList.includes(vacancyDetail.id) ?
            <>
              <EyeSVG className={styles.btnIcon} />
              Показать
            </>
            :
            <>
              <HoverSVG className={styles.btnIcon} />
              Скрыть
            </>}
        </button>
        <div className={styles.descr}>
          <h3 className={styles.titleDescr}>Описание</h3>
          <div dangerouslySetInnerHTML={{ __html: vacancyDetail.description }} />
        </div>
        <div className={styles.skillBlock}>
          {vacancyDetail.key_skills?.length > 0 && <div>
            <h3 className={styles.skillTitle}>Ключевые навыки</h3>
            <ul className={styles.skillList}>
              {vacancyDetail.key_skills.map((item, index) => {
                return (
                  <li key={index} className={styles.skillItem}>{item.name}</li>
                )
              })}
            </ul>
          </div>}
          <div className={styles.published}>Ваканися опубликована {vacancyDetail.published_at} в г. {vacancyDetail.area}</div>
        </div>

      </div>
      <div className={styles.rigntSite}>
        {vacancyDetail.logo && <img className={styles.logo} src={vacancyDetail.logo} alt="Лого" />}
        <span className={styles.company}>{vacancyDetail.company}</span>
        <span className={styles.address}>{vacancyDetail.address}</span>
      </div>
    </div>
  )
}
