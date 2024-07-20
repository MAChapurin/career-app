import Icon from "../../components/icon/Icon";
import React from "react";
import CompanyCard from "../../components/companyCard/CompanyCard";
import SimilarVacanciesBlock from "../../components/similarVacanciesBlock/SimilarVacanciesBlock";
import useVacancyDescriptionStore from "../../store/useVacancyDescriptionStore";
import useVacanciesStore from "../../store/useVacanciesStore";
import usePages from "../../store/usePages";
import useSimilarVacanciesStore from "../../store/useSimilarVacanciesStore";
import PAGES from "../../constants/PAGES";
import styles from "./AboutVacancy.module.css";
import { formatSalary, formatPublicationInfo } from "../../utils";

const AboutVacancy = () => {
  const setCurrentPage = usePages((state) => state.setCurrentPage);
  const {
    addHiddenVacancy,
    removeHiddenVacancy,
    tempHiddenVacancies,
    hideHiddenVacancies,
  } = useVacanciesStore();
  const { vacancyDescription, resetVacancyDescription } =
    useVacancyDescriptionStore();
  const resetSimilarVacancies = useSimilarVacanciesStore(
    (state) => state.resetSimilarVacancies
  );

  const companyLogoSrc = vacancyDescription?.employer?.logo_urls?.[240] || null;
  const vacancyId = vacancyDescription?.id;
  const publicationInfo =
    formatPublicationInfo(
      vacancyDescription?.published_at,
      vacancyDescription?.area?.name
    ) || null;

  return (
    <>
      <button
        onClick={() => {
          resetSimilarVacancies();
          setCurrentPage(PAGES.vacancies);
          resetVacancyDescription();
        }}
        className={styles.goBackBtn}
      >
        <Icon name="chevron" className={styles.arrowLeft}></Icon>
        <p className={styles.goBackBtnText}>К результатам поиска</p>
      </button>
      <div className={styles.vacancyInfo}>
        <main className={styles.main}>
          <div className={styles.block}>
            <div className={styles.headerBlock}>
              <h2 className={styles.title}>{vacancyDescription?.name}</h2>
              <span className={styles.salary}>
                {formatSalary(vacancyDescription?.salary?.from, {
                  max: vacancyDescription?.salary?.to,
                  currency: vacancyDescription?.salary?.currency,
                  type: "long",
                })}
              </span>
            </div>
            <div className={styles.headerBlock}>
              <h3 className={styles.requirementsTitle}>
                Требования к вакансии
              </h3>
              <ul className={styles.requirements}>
                {vacancyDescription?.experience?.name && (
                  <li className={styles.requirement}>
                    <Icon name={"star"} className={styles.requirementIcon} />
                    <span className={styles.requirementDescription}>
                      {vacancyDescription?.experience?.name}
                    </span>
                  </li>
                )}
                {vacancyDescription?.employment?.name && (
                  <li className={styles.requirement}>
                    <Icon
                      name={"briefCase"}
                      className={styles.requirementIcon}
                    />
                    <span className={styles.requirementDescription}>
                      {vacancyDescription?.employment?.name}
                    </span>
                  </li>
                )}
                {vacancyDescription?.schedule?.name && (
                  <li className={styles.requirement}>
                    <Icon name={"clock"} className={styles.requirementIcon} />
                    <span className={styles.requirementDescription}>
                      {vacancyDescription?.schedule?.name}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {tempHiddenVacancies[vacancyId] ? (
            <button
              onClick={() => {
                removeHiddenVacancy(vacancyId);
                hideHiddenVacancies();
              }}
              className={styles.hideBtn}
            >
              <Icon name={"openEye"} className={styles.hideBtnIcon} />
              <span className={styles.hideBtnText}>Показать</span>
            </button>
          ) : (
            <button
              onClick={() => {
                addHiddenVacancy(vacancyId);
                hideHiddenVacancies();
              }}
              className={styles.hideBtn}
            >
              <Icon name={"slashEye"} className={styles.hideBtnIcon} />
              <span className={styles.hideBtnText}>Скрыть</span>
            </button>
          )}
          {vacancyDescription?.description && (
            <div className={styles.description}>
              <h5 className={styles.descriptionTitle}>Описание</h5>
              <div
                className={styles.descriptionContent}
                dangerouslySetInnerHTML={{
                  __html: vacancyDescription?.description,
                }}
              ></div>
            </div>
          )}
          {vacancyDescription?.key_skills?.length > 0 && (
            <div className={styles.block}>
              <h6 className={styles.skillsTitle}>Ключевые навыки</h6>
              <ul className={styles.skills}>
                {vacancyDescription?.key_skills.map((skill) => (
                  <li key={skill.name} className={styles.skill}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className={styles.date}>{publicationInfo}</p>
        </main>
        <aside className={styles.asideRight}>
          <CompanyCard
            logoSrc={companyLogoSrc}
            name={vacancyDescription?.employer?.name}
            address={vacancyDescription?.address?.raw}
          />
        </aside>
      </div>
      <SimilarVacanciesBlock vacancyId={vacancyId} />
    </>
  );
};

export default AboutVacancy;
