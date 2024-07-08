import { ChevronSVG } from '@components/UI/IconsSVG/ChevronSVG';
import { HoverSVG } from '@components/UI/IconsSVG/HoverSVG';
import { VacancyCard } from '@components/UI/VacancyList/VacancyBlock/VacancyCard/VacancyCard';
import { APP_PAGE } from '@constants';
import { useDetailVacancyStore } from '@store/detailVacancyStore';
import { useRouteStore } from '@store/routeStore';
import { useVacancyStore } from '@store/vacancyStore';
import React, { useEffect } from 'react'

import styles from './vacancyDetail.module.css'

export const VacancyDetail = () => {
  const { setPageApp } = useRouteStore();

  const { vacancyDetail, vacancySimilar, loading, similarPage, setSimilarPage, fetchSimilar } = useDetailVacancyStore();
  const { blackList, addToBlackList } = useVacancyStore()

  const loadMoreSimilary = () => {
    setSimilarPage(similarPage + 1)
  }

  const handleBlackList = () => {
    if (blackList.length && blackList.find((list) => list.id === vacancyDetail.id)) return
    addToBlackList(vacancyDetail.id)
  }

  useEffect(() => {
    if (!vacancyDetail.id) return
    fetchSimilar(vacancyDetail.id, similarPage)
  }, [similarPage, vacancyDetail.id])

  return (
    <>
      <div className={styles.wrapper}>
        <button className={`${styles.btn} ${styles.back}`} onClick={() => setPageApp(APP_PAGE.main)}>
          <ChevronSVG className={styles.icon} />
          К результатам поиска
        </button>
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
            <button className={`${styles.btn} ${styles.hidBtn}`} onClick={handleBlackList}>
              <HoverSVG className={styles.btnIcon} />
              Скрыть
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
      </div>
      <div className={styles.bottom}>
        <h3 className={styles.moreVacancy}>Похожие вакансии</h3>
        <ul className={styles.listSimilar}>
          {vacancySimilar.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </ul>
        <div className={styles.btnWrapper}>
          <button className={`${styles.btn} ${styles.lodaMore}`} onClick={() => loadMoreSimilary()}>Показать еще</button>
        </div>
      </div>
    </>
  )
}
