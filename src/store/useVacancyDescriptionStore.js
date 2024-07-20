import { create } from "zustand";

const useVacancyDescriptionStore = create((set) => ({
  vacancyDescription: {},
  isLoading: false,
  error: false,
  fetchVacancyDescription: async (vacancyId) => {
    try {
      set({ isLoading: true });
      const API = `https://api.hh.ru/vacancies/${vacancyId}`;
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Отсутствует связь со сторонним сервисом");
      }
      const data = await response.json();
      set({ vacancyDescription: data });
    } catch (errorStatus) {
      set({ error: errorStatus });
    } finally {
      set({ isLoading: false });
    }
  },
  resetVacancyDescription: () => {
    set({ vacancyDescription: {} });
  },
}));

export default useVacancyDescriptionStore;
