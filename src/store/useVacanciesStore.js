import { create } from "zustand";
import daysApiFilter from "../utils/daysApiFilter";
import { VacanciesService } from "../api/VacancyService";
import { resetFilterCounts } from "../utils/setFilterCounts";

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

    const params = get().filterParams;
    try {
      set({ isLoading: true });
      const data = await VacanciesService.get(page, 18, isTodayOnly, params);

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
  filterParams: {},
  setFilterParams: (key, value, multiple=false) => {
    const params = get().filterParams;


    if(multiple) {

      if(!params[key]) {
        params[key] = [];
      }

      const isset = params[key].find(el=>el===value);

      if(isset) {
        params[key] = params[key].filter(el=> el!==value);
      } else {
        params[key].push(value);
      }

      if(!params[key].length) {
        delete params[key];
      }

    } else {
      params[key] = value;
    }

    get().fetchVacancyList();

  },

  resetFilterParams: () => {
    set({filterParams: {}});
    resetFilterCounts();
    get().fetchVacancyList();
  },
}));

export default useVacanciesStore;
