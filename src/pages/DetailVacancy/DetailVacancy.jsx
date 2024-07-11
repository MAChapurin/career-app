import { ChevronSVG } from '@components/UI/IconsSVG/ChevronSVG';
import { SimilarVacancy } from '@components/UI/SimilarVacancy/SimilarVacancy';
import { VacancyDetail } from '@components/UI/VacancyDetail/VacancyDetail';
import { APP_PAGE } from '@constants';
import { useRouteStore } from '@store/routeStore';
import styles from './DetailVacancy.module.css'

export const DetailVacancy = () => {
  const { setPageApp } = useRouteStore();

  return (
    <div className={styles.wrapper}>
      <button className={`${styles.btn} ${styles.back}`} onClick={() => setPageApp(APP_PAGE.main)}>
        <ChevronSVG className={styles.icon} />
        К результатам поиска
      </button>
      <VacancyDetail />
      <SimilarVacancy />
    </div>
  )
}
