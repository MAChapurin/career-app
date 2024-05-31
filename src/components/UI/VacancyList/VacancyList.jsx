import { useEffect, useState } from "react";
import { VacancyBlock } from "./VacancyBlock/VacancyBlock";
import { useVacancyStore } from "@store/vacancyStore";
import { Pagination } from "../Pagination/Pagination";
import styles from "./VacancyList.module.css";

const defLimit = 18;
const defCity = "Москва";

export const VacancyList = () => {
  const [vacancies, fetchVacancies, pages, loading] = useVacancyStore(
    (state) => [
      state.vacancies,
      state.fetchVacancies,
      state.pages,
      state.loading,
    ]
  );

  const [city, setCity] = useState(defCity);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchVacancies(city, page - 1, defLimit);
  }, []);

  let vacancyObjects = loading
    ? Array.from({ length: 10 }).map(() => ({
        date: "",
        vacancies: [{}, {}, {}],
      }))
    : Object.values(vacancies);

  const handleSetPage = (newPage) => {
    fetchVacancies(city, newPage - 1, defLimit);
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
