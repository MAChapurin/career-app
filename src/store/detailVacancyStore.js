import { formatDetailVacancy } from "@utils/formatDetailsVacancy";
import { formatVacancy } from "@utils/formatFetch";
import { create } from "zustand";

export const useDetailVacancyStore = create((set) => ({
  vacancySimilar: [],
  setVacancySimilar: (newSimilar) => set({ vacancySimilar: newSimilar }),
  similarPage: 1,
  setSimilarPage: (newSimilarPage) => set({ similarPage: newSimilarPage }),
  vacancyDetail: [],
  setVacancyDetail: (newVacancy) => set({ vacancyDetail: newVacancy }),
  addSimilary: (data) => set(state => ({
    vacancySimilar: [
      ...state.vacancySimilar,
      { data }
    ]
  })),
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
  fetchSimilar: async (similarId, similarPage) => {
    try {
      set({ loading: true });
      const response = await fetch(`https://api.hh.ru/vacancies/${similarId}/similar_vacancies?per_page=${6}&page=${similarPage - 1 ?? 0}`);
      if (!response.ok) throw new Error('Что-то пошло не так. Попробуйте позже');

      const result = await response.json();


      const vacancyListData = result.items.map((item) => formatVacancy(item))

      set({ vacancySimilar: vacancyListData })
      // addSimilary(vacancyListData)

    } catch (e) {

      if (e.name === 'TypeError') {
        set({ error: 'Ошибка в запросе' });
      } else {
        set({ error: e.message });
      }

    } finally {
      set({ loading: false });
    }
  }

}));
