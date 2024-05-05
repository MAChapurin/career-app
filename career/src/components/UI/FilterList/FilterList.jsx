import { FilterItem } from './FilterItem/FilterItem';
import { BriefCaseSVG } from '../IconsSVG/BriefCaseSVG';
import { FilterSVG } from '../IconsSVG/FilterSVG';
import { LocationSVG } from '../IconsSVG/LocationSVG';
import styles from './FilterList.module.css';
import clsx from '@utils/clsx';

export const FilterList = ({ items }) => {
  return (
    <section className={styles.container}>
      <div className={styles.filters}>
        {items.map((item) => (
          <FilterItem
            key={item.name}
            type={item.type}
            name={item.name}
            icon={item.icon}
            items={item.items}
          />
        ))}
      </div>
      <button className={clsx("btn", styles.resetBtn)}>
        Сбросить все фильтры
      </button>
    </section>
  );
};
