import { formatDetailVacancy } from "@utils/formatDetailsVacancy";
import { formatVacancy } from "@utils/formatFetch";
import { create } from "zustand";

export const useDetailVacancyStore = create((set) => ({
  vacancyDetail: [],
  setVacancyDetail: (newVacancy) => set({ vacancyDetail: newVacancy }),
  similaryPages: null,
  setSimilaryPages: (pages) => set({ similaryPages: pages }),
  error: '',
  loading: false,
  fetchVacancy: async (vacancyId) => {

    try {
      const response = await fetch(`https://api.hh.ru/vacancies/${vacancyId}`);
      if (!response.ok) throw new Error('Что-то пошло не так. Попробуйте позже');
      const result = await response.json();
      set({ vacancyDetail: formatDetailVacancy(result) });

    } catch (e) {

      if (e.name === 'TypeError') {
        set({ error: 'Ошибка в запросе' });
      } else {
        set({ error: e.message });
      }

    } finally {
    }
  },
  fetchSimilarVacancy: async (id, page) => {
    if (!id) return;
    try {
      set({ loading: true });
      const response = await fetch(`https://api.hh.ru/vacancies/${id}/similar_vacancies/?page=${page}&per_page=6`);
      const result = await response.json()
      set({ similaryPages: result.pages })
      const prepairData = result.items.map((item) => formatVacancy(item))
      return prepairData
    } catch (e) {
      set({ error: e.message });
      return null;
    } finally {
      set({ loading: false });
    }
  }
}));
