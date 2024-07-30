import { create } from "zustand";
import daysApiFilter from "../utils/daysApiFilter";
import { VacanciesService } from "../api/VacancyService";
import { isEmptyObj } from "../utils/isEmptyObj";
import cities from '../data/cities.json';
import { searchCityById } from "../utils/searchCity";

const SESSION_FILTER_NAME = 'career-filter';

const radioInitial = {
  search_period: '0',
  experience: 'doesNotMatter',
  salary: 'doesNotMatter'
};

const sessionParams = sessionStorage.getItem(SESSION_FILTER_NAME) ? JSON.parse(sessionStorage.getItem(SESSION_FILTER_NAME)) : {};
const initialfilterParams = !isEmptyObj(sessionParams) ? sessionParams : radioInitial;

let initialCheckedCityList = [];
if(!isEmptyObj(sessionParams) && sessionParams['area'] && sessionParams['area'].length) {
  initialCheckedCityList = searchCityById(cities[0].areas, sessionParams['area']);
}

const useVacanciesStore = create((set, get) => ({
  vacancyList: [],
  paginationPage: 0,
  paginationPages: 0,
  isLoading: false,
  error: [],
  setPaginationPage: (paginationPage) => {
    set({ paginationPage });
  },
  fetchVacancyList: async (page=0, isTodayOnly = false) => {

    try {
      set({ isLoading: true });
      const data = await VacanciesService.get(page, 18, isTodayOnly, get().filterParams);

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
  filterParams: initialfilterParams,
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

    sessionStorage.setItem(SESSION_FILTER_NAME, JSON.stringify(params));

    get().fetchVacancyList();

  },

  checkedCityList: initialCheckedCityList,
  setCheckedCityList: (item) => {
    const list = get().checkedCityList;
    const founded = list.find(el=>el.id === item.id);

    if(founded) {
      set({checkedCityList: list.filter(el=> el.id!==item.id)});
    } else {
      set({checkedCityList: [...list, item]});
    }

    get().setFilterParams('area', item.id, true);
  },

  resetFilterParams: () => {
    set({filterParams: {}});
    set({checkedCityList: []});
    sessionStorage.removeItem(SESSION_FILTER_NAME);
    get().fetchVacancyList();
  },
}));

export default useVacanciesStore;
