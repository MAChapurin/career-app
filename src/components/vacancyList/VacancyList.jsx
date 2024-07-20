import styles from "./VacancyList.module.css";
import VacancyBlock from "./vacancyBlock/VacancyBlock";
import useVacanciesStore from "../../store/useVacanciesStore";
import { Pagination } from "../pagination/Pagination";

const VacancyList = ({ data }) => {
  const {
    fetchVacancyList,
    paginationPages,
    paginationPage,
    setPaginationPage,
    isLoading,
    hideHiddenVacancies,
  } = useVacanciesStore();

  const vacancyBlocks = data.map((item, index) => (
    <VacancyBlock key={index} title={item.date} cards={item.vacancy} />
  ));

  const handleSetPaginationPage = (page) => {
    setPaginationPage(page);
    hideHiddenVacancies();
  };

  return (
    <>
      <ul className={styles.wrapper}>{vacancyBlocks}</ul>
      {paginationPages > 0 && (
        <Pagination
          page={paginationPage}
          setPage={handleSetPaginationPage}
          pages={paginationPages}
          fetchCallback={fetchVacancyList}
          disabled={isLoading}
        />
      )}
    </>
  );
};

export default VacancyList;
