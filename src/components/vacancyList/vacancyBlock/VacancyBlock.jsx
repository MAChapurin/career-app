import React from "react";
import CARD_CONDITIONS from "../../../constants/CARD_CONDITIONS";
import PAGES from "../../../constants/PAGES";
import styles from "./VacancyBlock.module.css";
import VacancyCard from "./vacancyCard/VacancyCard";
import useVacanciesStore from "../../../store/useVacanciesStore";
import useVacancyDescriptionStore from "../../../store/useVacancyDescriptionStore";
import useSimilarVacanciesStore from "../../../store/useSimilarVacanciesStore";
import usePages from "../../../store/usePages";

const VacancyBlock = ({
  title,
  cards,
  hasTitle = true,
  onVacancyClick = () => {},
}) => {
  const {
    tempHiddenVacancies,
    hiddenVacancies,
    hideHiddenVacancies,
    filterParams,
  } = useVacanciesStore((state) => ({
    tempHiddenVacancies: state.tempHiddenVacancies,
    hiddenVacancies: state.hiddenVacancies,
    hideHiddenVacancies: state.hideHiddenVacancies,
    filterParams: state.filterParams,
  }));
  const fetchVacancyDescription = useVacancyDescriptionStore(
    (state) => state.fetchVacancyDescription
  );
  const resetSimilarVacancies = useSimilarVacanciesStore(
    (state) => state.resetSimilarVacancies
  );
  const setCurrentPage = usePages((state) => state.setCurrentPage);

  let hiddenCards = 0;

  const isIncludeHiddenVacancies = filterParams["label"]
    ? filterParams["label"].includes("include_hidden_vacancies")
    : false;

  const cardsJsx = cards.map((card) => {
    let condition = CARD_CONDITIONS.shown;
    if (tempHiddenVacancies[card.id] && !isIncludeHiddenVacancies) {
      condition = CARD_CONDITIONS.hidden;
      hiddenCards++;
    } else if (tempHiddenVacancies[card.id]) {
      condition = CARD_CONDITIONS.temporallyShown;
    }

    return (
      <VacancyCard
        card={card}
        key={card.id}
        condition={condition}
        onClick={() => {
          resetSimilarVacancies();
          fetchVacancyDescription(card.id);
          setCurrentPage(PAGES.vacancyDescription);
          onVacancyClick();
          hideHiddenVacancies();
        }}
      />
    );
  });

  const isBlockEmpty = hiddenCards >= cards.length;

  const localDate = new Date();
  const publishedDate = new Date(title);
  return (
    <li className={styles.wrapper}>
      {title && (
        <h3 className={styles.title}>
          {publishedDate.getDate() === localDate.getDate() &&
            publishedDate.getMonth() === localDate.getMonth() &&
            publishedDate.getFullYear() === localDate.getFullYear() && (
              <>Сегодня, </>
            )}
          <>
            {publishedDate.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
            })}
          </>
          <>
            {" "}
            {publishedDate.getFullYear() !== localDate.getFullYear() &&
              localDate.getFullYear()}
          </>
        </h3>
      )}
      {isBlockEmpty && hasTitle ? (
        <p>Вы скрыли все вакансии этого блока на этой странице.</p>
      ) : (
        <ul className={styles.cardsBlock}>{cardsJsx}</ul>
      )}
    </li>
  );
};

export default VacancyBlock;
