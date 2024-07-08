import { ChevronSVG } from '@components/UI/IconsSVG/ChevronSVG';
import { HoverSVG } from '@components/UI/IconsSVG/HoverSVG';
import { VacancyCard } from '@components/UI/VacancyList/VacancyBlock/VacancyCard/VacancyCard';
import { APP_PAGE } from '@constants';
import { useDetailVacancyStore } from '@store/detailVacancyStore';
import { useRouteStore } from '@store/routeStore';
import { useVacancyStore } from '@store/vacancyStore';
import React, { Children, useEffect, useState } from 'react'

import styles from './vacancyDetail.module.css'

export const VacancyDetail = () => {
  const [similarVacancies, setSimilarVacancies] = useState([]);
  const [similarPage, setSimilarPage] = useState(1);

  const { setPageApp } = useRouteStore();

  const { vacancyDetail, fetchSimilarVacancy, similaryPages } = useDetailVacancyStore();
  const { blackList, toggleToBlackList } = useVacancyStore()

  useEffect(() => {
    if (!vacancyDetail.id) return
    const fetchData = async () => {
      const vac = await fetchSimilarVacancy(vacancyDetail.id, similarPage - 1)
      if (similarPage === 1) setSimilarVacancies(vac);
      else setSimilarVacancies([...similarVacancies, ...vac]);
    };
    fetchData()
  }, [similarPage, vacancyDetail.id])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [vacancyDetail.id])


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
            <button className={`${styles.btn} ${styles.hidBtn}`} onClick={() => toggleToBlackList(vacancyDetail.id)}>
              <HoverSVG className={styles.btnIcon} />

              {blackList.includes(vacancyDetail.id) ? 'Показать' : 'Скрыть'}

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
          {similarVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              setSimilarVacancies={setSimilarVacancies}
              setSimilarPage={setSimilarPage}
              eye={false}
            />
          ))}
        </ul>
        <div className={styles.btnWrapper}>
          <button
            className={`${styles.btn} ${styles.lodaMore}`}
            disabled={similarPage - 1 >= similaryPages}
            onClick={() => setSimilarPage(similarPage => similarPage + 1)}>Показать еще</button>
        </div>
      </div>
    </>
  )
}
