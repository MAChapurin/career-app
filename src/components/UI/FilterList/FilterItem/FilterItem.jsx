import { Dropdown } from '@components/UI/Dropdown/Dropdown';
import { FilterCity } from '@components/UI/FilterCity/FilterCity';
import styles from './FilterItem.module.css';

export const FilterItem = ({
  type = 'input',
  name,
  icon: Icon,
  group,
  items,
  value,
  isMobile,
}) => {
  return (
    <div className={styles.filterItem}>
      {type === 'dropdown' ? (
        <Dropdown
          name={name}
          icon={Icon}
          items={items}
          group={group}
          value={value}
          isMobile={isMobile}
        />
      ) : (
        <FilterCity type="search" name={name} icon={Icon} isMobile={isMobile} />
      )}
    </div>
  );
};
