import { create } from "zustand";
import daysApiFilter from "../utils/daysApiFilter";

const useVacanciesStore = create((set, get) => ({
  vacancyList: [],
  paginationPage: 0,
  paginationPages: 0,
  isLoading: false,
  error: [],
  setPaginationPage: (paginationPage) => {
    set({ paginationPage });
  },
  fetchVacancyList: async (page, isTodayOnly = false) => {
    try {
      set({ isLoading: true });
      let API = `https://api.hh.ru/vacancies?text=frontend+developer+React&only_with_salary=true&currency_code=RUR&salary=50000&order_by=publication_time&per_page=18&page=${page}`;
      if (isTodayOnly)
        API += `&date_from=${new Date(Date.now())
          .toLocaleDateString({
            timeZone: "Europe/Moscow",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\//g, "-")}`;
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Отсутствует связь со сторонним сервисом");
      }
      const data = await response.json();
      set({ paginationPages: data?.pages });
      const vacancyListData = data.items.map((item) => {
        const { name, salary, area, published_at, experience, employer, id } =
          item;
        return {
          name,
          salary,
          area,
          published_at,
          experience,
          employer,
          id,
        };
      });
      set({ vacancyList: daysApiFilter(vacancyListData) });
    } catch (errorStatus) {
      set({ error: errorStatus });
    } finally {
      set({ isLoading: false });
    }
  },
  hiddenVacancies: {},
  tempHiddenVacancies: {},
  addHiddenVacancy: (id) => {
    const prev = get().tempHiddenVacancies;
    set({ tempHiddenVacancies: { ...prev, [id]: true } });
  },
  removeHiddenVacancy: (id) => {
    const prev = get().tempHiddenVacancies;
    set({ tempHiddenVacancies: { ...prev, [id]: false } });
  },
  hideHiddenVacancies: () => {
    set({ hiddenVacancies: get().tempHiddenVacancies });
  },
}));

export default useVacanciesStore;
