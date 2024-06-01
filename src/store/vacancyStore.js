import { create } from 'zustand';
import { formatVacancy } from '@utils/formatFetch';
import { formatDate } from '@utils/formatDate';



export const useVacancyStore = create((set) => ({
  pages: 0,
  loading: false,
  vacancies: [],
  fetchVacancies: async (city, page=0, limit=18) => {

    try {
      set({loading: true});
      const response = await fetch(
        `https://api.hh.ru/vacancies?text=frontend${city}&only_with_salary=true&page=${page}&per_page=${limit}&order_by=publication_time`
      );
      const data = await response.json();
      const groupedVacancies = {};


      data.items.forEach((item) => {
        const date = formatDate(item.published_at);
        if (!groupedVacancies[date]) {
          groupedVacancies[date] = { date: date, vacancies: [] };
        }
        groupedVacancies[date].vacancies.push(formatVacancy(item));
      });

      set({ vacancies: groupedVacancies, pages: data.pages });
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      set({loading: false});
    }
  },
}));
