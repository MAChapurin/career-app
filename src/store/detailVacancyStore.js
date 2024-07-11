import { LIMIT_CAR_FOR_SIMILARY } from "@constants";
import { formatDetailVacancy } from "@utils/formatDetailsVacancy";
import { formatVacancy } from "@utils/formatFetch";
import { create } from "zustand";

export const useDetailVacancyStore = create((set) => ({
  vacancyDetail: [],
  setVacancyDetail: (newVacancy) => set({ vacancyDetail: newVacancy }),
  similaryPages: null,
  setSimilaryPages: (pages) => set({ similaryPages: pages }),
  errorDetail: '',
  loadDetail: false,
  errorSimilary: '',
  loadingSimilary: false,
  fetchVacancy: async (vacancyId) => {

    try {
      set({ loadDetail: true });
      const response = await fetch(`https://api.hh.ru/vacancies/${vacancyId}`);
      if (!response.ok) throw new Error('Что-то пошло не так. Попробуйте позже');
      const result = await response.json();
      set({ vacancyDetail: formatDetailVacancy(result) });

    } catch (e) {

      if (e.name === 'TypeError') {
        set({ errorDetail: 'Ошибка в запросе' });
      } else {
        set({ errorDetail: e.message });
      }

    } finally {
      set({ loadDetail: false });
    }
  },
  fetchSimilarVacancy: async (id, page) => {
    if (!id) return;
    try {
      set({ loadingSimilary: true });
      const response = await fetch(`https://api.hh.ru/vacancies/${id}/similar_vacancies/?page=${page}&per_page=${LIMIT_CAR_FOR_SIMILARY}`);
      const result = await response.json()
      set({ similaryPages: result.pages })
      const prepairData = result.items.map((item) => formatVacancy(item))
      return prepairData
    } catch (e) {
      set({ errorSimilary: e.message });
      return null;
    } finally {
      set({ loadingSimilary: false });
    }
  }
}));
