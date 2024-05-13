import { create } from 'zustand';
import { formatVacancy } from '@utils/formatFetch';
import { formatDate } from '@utils/formatDate';

export const useVacancyStore = create((set) => ({
  vacancies: [],
  fetchVacancies: async (city) => {
    try {
      const response = await fetch(
        `https://api.hh.ru/vacancies?text=frontend${city}&only_with_salary=true&per_page=100`
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

      set({ vacancies: groupedVacancies });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  },
}));
