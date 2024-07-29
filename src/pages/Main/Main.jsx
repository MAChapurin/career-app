import { FilterList } from "@components/UI/FilterList/FilterList";
import { VacancyList } from "@components/UI/VacancyList/VacancyList";
import { filterItems } from "@constants";

export const Main = () => {
  return (
    <main>
      <FilterList items={filterItems} />
      <VacancyList />
    </main>
  );
};
