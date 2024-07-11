import { useEffect, useState } from "react";
import { VacancyBlock } from "./VacancyBlock/VacancyBlock";
import { useVacancyStore } from "@store/vacancyStore";
import { Pagination } from "../Pagination/Pagination";
import styles from "./VacancyList.module.css";

const defCity = "Москва";

export const VacancyList = () => {
  const [vacancies, fetchVacancies, pages, loading, page, setPage, blackList] = useVacancyStore(
    (state) => [
      state.vacancies,
      state.fetchVacancies,
      state.pages,
      state.loading,
      state.page,
      state.setPage,
      state.blackList
    ]
  );

  const [city, setCity] = useState(defCity);

  useEffect(() => {
    fetchVacancies(city, page - 1);
  }, []);

  let vacancyObjects = loading
    ? Array.from({ length: 18 }).map(() => ({
      date: "",
      vacancies: [{}, {}, {}],
    }))
    : (Object.values(vacancies));

  const handleSetPage = (newPage) => {
    fetchVacancies(city, newPage - 1);
    setPage(newPage);
  };

  return (
    <>
      {vacancyObjects.map((vacancy, index) => (
        <div key={index} className={styles.wrapper}>
          <VacancyBlock date={vacancy.date} info={vacancy.vacancies} />
        </div>
      ))}

      <Pagination pages={pages} page={page} handleSetPage={handleSetPage} />
    </>
  );
};
