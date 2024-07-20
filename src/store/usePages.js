import { create } from "zustand";
import PAGES from "../constants/PAGES";

const usePages = create((set) => ({
  currentPage: PAGES.vacancies,
  setCurrentPage: (targetPage) => {
    set({ currentPage: targetPage });
  },
}));

export default usePages;
