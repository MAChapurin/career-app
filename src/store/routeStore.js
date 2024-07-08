import { create } from "zustand";
import { APP_PAGE } from "@constants";

export const useRouteStore = create((set) => ({
  pageApp: APP_PAGE.main,
  setPageApp: (newPage) => set({ pageApp: newPage }),
}));

