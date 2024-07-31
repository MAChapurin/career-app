import { HoverSVG } from '@components/UI/IconsSVG/HoverSVG';
import { StarSVG } from '@components/UI/IconsSVG/StarSVG';
import { APP_PAGE } from '@constants';
import { useDetailVacancyStore } from '@store/detailVacancyStore';
import { useRouteStore } from '@store/routeStore';
import { useVacancyStore } from '@store/vacancyStore';
import { SekeletonCard } from './SekeletonCard';
import styles from './VacancyCard.module.css';
import { EyeSVG } from '@components/UI/IconsSVG/EyeSVG';

export const VacancyCard = ({
  vacancy,
  setSimilarVacancies = () => {},
  setSimilarPage = () => {},
  eye = true,
}) => {
  const isEmpty = !Object.keys(vacancy).length;

  const { setPageApp } = useRouteStore();
  const { fetchVacancy } = useDetailVacancyStore();
  const { blackList, toggleToBlackList } = useVacancyStore();
  const handleBlackList = (e) => {
    e.stopPropagation();
    toggleToBlackList(vacancy.id);
  };
  const handleDetailVacancy = () => {
    fetchVacancy(vacancy.id);
    setPageApp(APP_PAGE.vacancy);
    setSimilarVacancies([]);
    setSimilarPage(1);
  };

  return (
    <>
      {isEmpty ? (
        <SekeletonCard />
      ) : (
        <li className={styles.card} onClick={handleDetailVacancy}>
          <div className={styles.headingAndHover}>
            <h1 className={styles.heading}>{vacancy.name}</h1>
            {eye && (
              <div className={styles.icon} onClick={(e) => handleBlackList(e)}>
                {blackList.includes(vacancy.id) ? (
                  <EyeSVG className={styles.eye} />
                ) : (
                  <HoverSVG />
                )}
              </div>
            )}
          </div>
          <p className={styles.wages}>{vacancy.wages}</p>
          <p className={`${styles.text} ${styles.mb8}`}>{vacancy.company}</p>
          <p className={styles.text}>{vacancy.location}</p>
          <div className={styles.experience}>
            <StarSVG />
            <p className={styles.text}>{vacancy.experience}</p>
          </div>
        </li>
      )}
    </>
  );
};
