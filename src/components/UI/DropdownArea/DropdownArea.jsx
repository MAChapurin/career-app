import { Checkbox } from '../Checkbox/Checkbox';
import { useFiltersStore } from '@store/useFiltersStore';
import { useVacancyStore } from '@store/vacancyStore';
import styles from './DropdownArea.module.css';

export const DropdownArea = ({ cities }) => {
  const { areas, addArea, removeArea } = useFiltersStore();
  const { setPage } = useVacancyStore();
  return (
    <div className={styles.container}>
      <div className={styles.block} />
      <ul className={styles.dropdownList}>
        {cities.map((item) => {
          return (
            <li key={item.id}>
              <Checkbox
                id={item.id}
                name={item.name}
                value={item.id}
                text={item.name}
                checked={areas.includes(item.id)}
                onChange={(e) => {
                  const id = e.target.value;
                  e.target.checked ? addArea(id) : removeArea(id);
                  setPage(1);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
