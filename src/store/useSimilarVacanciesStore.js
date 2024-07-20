import { create } from "zustand";
import SIMILAR_VACANCIES_PER_PAGE from "../constants/SIMILAR_VACANCIES_PER_PAGE";

const useSimilarVacanciesStore = create((set, get) => ({
  similarVacanciesPage: 0,
  incrementSimilarVacanciesPage: () => {
    set({ similarVacanciesPage: get().similarVacanciesPage + 1 });
  },
  similarVacanciesPagesCount: 0,
  similarVacancies: [],
  isLoading: false,
  error: false,
  fetchSimilarVacancies: async (vacancyId) => {
    try {
      set({ isLoading: true });
      const page = get().similarVacanciesPage;
      const API = `https://api.hh.ru/vacancies/${vacancyId}/similar_vacancies?&per_page=${SIMILAR_VACANCIES_PER_PAGE}&page=${page}`;
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Отсутствует связь со сторонним сервисом");
      }
      const data = await response.json();
      set({ similarVacancies: [...get().similarVacancies, ...data.items] });
      set({
        similarVacanciesPagesCount: Math.ceil(
          data.found / SIMILAR_VACANCIES_PER_PAGE
        ),
      });
    } catch (errorStatus) {
      set({ error: errorStatus });
    } finally {
      set({ isLoading: false });
    }
  },
  resetSimilarVacancies: () => {
    set({ similarVacancies: [] });
    set({ similarVacanciesPage: 0 });
  },
}));

export default useSimilarVacanciesStore;
