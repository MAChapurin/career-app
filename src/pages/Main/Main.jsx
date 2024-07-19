import { FilterList } from "@components/UI/FilterList/FilterList";
import { VacancyList } from "@components/UI/VacancyList/VacancyList";
import { filterItems } from "@constants";
import { useFilterParams } from "@hooks/useFilterParams";


export const Main = () => {
  const params = useFilterParams()
  return (
    <main>
      {/* <p style={{
        width: '100dvw',
        whiteSpace: 'wrap',
        wordBreak: 'break-all'
      }}>{params}
      </p> */}
      <FilterList items={filterItems} />
      <VacancyList />
    </main>
  );
};
