import { useFiltersCounter } from '@hooks/useFiltersCounter';
import { FilterItem } from './FilterItem/FilterItem';
import styles from './FilterList.module.css';
import clsx from '@utils/clsx';
import { SCREEN_TYPES } from '@constants';
import { useFiltersStore } from '@store/useFiltersStore';
import useResize from '@hooks/useResize';
import { filterItems, filterInputItems } from '@constants';

export const FilterList = () => {
  const { allFilterLength, restAllLength } = useFiltersCounter();
  const { clearFilters } = useFiltersStore();
  const currentScreenType = useResize();

  const isTablet = currentScreenType <= SCREEN_TYPES.TABLET;
  const isMobile = currentScreenType <= SCREEN_TYPES.MOBILE;
  const notRestFilterItems = filterItems.slice(0, -1);
  const restFilterItem = filterItems.at(-1);

  return (
    <section className={styles.container}>
      <div className={styles.filterList}>
        {filterInputItems.map((item) => (
          <FilterItem
            key={item.name}
            type={item.type}
            name={item.name}
            icon={item.icon}
            isMobile={isMobile}
          />
        ))}
        {isTablet ? (
          <FilterItem
            key={restFilterItem.name}
            type={restFilterItem.type}
            name={restFilterItem.name}
            icon={restFilterItem.icon}
            items={[...notRestFilterItems, ...restFilterItem.items]}
            value={restAllLength}
            group={restFilterItem?.group}
            isMobile={isMobile}
          />
        ) : (
          filterItems.map((item) => (
            <FilterItem
              key={item.name}
              type={item.type}
              name={item.name}
              icon={item.icon}
              items={item.items}
              value={item?.value}
              group={item?.group}
            />
          ))
        )}
      </div>
      <button
        className={clsx('btn', styles.resetBtn)}
        style={{
          opacity: allFilterLength > 0 ? 1 : 0,
          pointerEvents: allFilterLength > 0 ? 'all' : 'none',
        }}
        onClick={clearFilters}
      >
        Сбросить все фильтры
      </button>
    </section>
  );
};
