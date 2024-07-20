import styles from "./VacancyCard.module.css";
import Icon from "../../../icon/Icon";
import { convertСurrency } from "../../../../utils";
import useVacanciesStore from "../../../../store/useVacanciesStore";
import CARD_CONDITIONS from "../../../../constants/CARD_CONDITIONS";

const VacancyCard = ({ card, condition, onClick = () => {} }) => {
  const { name, salary, experience, area, employer, id } = card;
  const { addHiddenVacancy, removeHiddenVacancy } = useVacanciesStore(
    (state) => ({
      addHiddenVacancy: state.addHiddenVacancy,
      removeHiddenVacancy: state.removeHiddenVacancy,
    })
  );

  if (condition === CARD_CONDITIONS.hidden) {
    return <></>;
  }

  return (
    <li
      className={styles.card}
      onClick={() => {
        onClick();
      }}
    >
      <div className={styles.main}>
        <div className={styles.headerBlock}>
          <h4 className={styles.title}>{name}</h4>
          <span className={styles.salary}>
            {salary
              ? `${
                  (salary.from &&
                    `${
                      salary.to ? "" : "от"
                    } ${salary.from.toLocaleString()}`) ||
                  ""
                } ${(salary.from && salary.to && "-") || ""} ${
                  (salary.to &&
                    `${
                      salary.from ? "" : "до"
                    } ${salary.to.toLocaleString()}`) ||
                  ""
                } ${salary.currency ? convertСurrency(salary.currency) : ""}  `
              : "Доход не указан"}
          </span>
        </div>
        <div className={styles.controlsBlock}>
          {condition === CARD_CONDITIONS.temporallyShown ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeHiddenVacancy(id);
              }}
              className={styles.btn}
            >
              <Icon name={"openEye"} className={styles.eye} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addHiddenVacancy(id);
              }}
              className={styles.btn}
            >
              <Icon name={"slashEye"} className={styles.eye} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.additional}>
        <div className={styles.upContent}>
          <p>{employer.name}</p>
          <p>{area.name}</p>
        </div>
        <p className={styles.experience}>
          <Icon name={"star"} className={styles.star} />
          {experience && experience.name}
        </p>
      </div>
    </li>
  );
};

export default VacancyCard;
