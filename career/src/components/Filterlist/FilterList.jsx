import styles from './FilterList.module.css';
import { FilterItem } from '../FilterItem/FilterItem';
import { LocationSVG } from '../IconsSVG/LocationSVG';
import { BriefCaseSVG } from '../IconsSVG/BriefCaseSVG';
import { FilterSVG } from '../IconsSVG/FilterSVG';

export const FilterList = () => {
  return (
    <section className={styles.filterList}>
      <FilterItem
        IconBefore={LocationSVG}
        placeholder='Город'
        name='location'
      />
      <FilterItem
        IconBefore={BriefCaseSVG}
        placeholder='Тип занятости'
        name='employment'
        isArrowIcon={true}
      />
      <FilterItem
        IconBefore={FilterSVG}
        placeholder='Дополнительные фильтры'
        name='additionalFilters'
        isArrowIcon={true}
      />
    </section>
  );
};
