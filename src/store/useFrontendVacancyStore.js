import { create } from 'zustand'
import daysApiFilter from '../utils/daysApiFilter'

const useFrontendVacancyStore = create((set) => ({
  vacancyList: [],
  isLoading: false,
  error: [],
  fetchVacancyList: async (isTodayOnly = false) => {
    try {
      set({ isLoading: true })
      let API = `https://api.hh.ru/vacancies?text=frontend+developer+React&only_with_salary=true&currency_code=RUR&salary=50000&order_by=publication_time&per_page=100`
      if (isTodayOnly) API += `&date_from=${new Date(Date.now())
        .toLocaleDateString({
          timeZone: "Europe/Moscow",
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
        .replace(/\//g, '-')}`;
      const response = await fetch(API)
      if (!response.ok) {
        throw new Error('Отсутствует связь со сторонним сервисом');
      }
      const data = await response.json()
      const vacancyListData = data.items.map((item) => {
        const {
          name,
          salary,
          area,
          published_at,
          experience,
          employer,
          id
        } = item
        return {
          name,
          salary,
          area,
          published_at,
          experience,
          employer,
          id
        }
      })
      set({ vacancyList: daysApiFilter(vacancyListData) })
    } catch (errorStatus) {
      set({ error: errorStatus })
    } finally {
      set({ isLoading: false })
    }
  },
}))

export default useFrontendVacancyStore;
