import styles from './FilterItem.module.css';
import { ChevronSVG } from '../IconsSVG/ChevronSVG';

export const FilterItem = ({
  IconBefore,
  placeholder,
  name = 'filter',
  isArrowIcon,
}) => {
  return (
    <div className={styles.filter}>
      <IconBefore />
      <input
        type='text'
        placeholder={placeholder}
        name={name}
        className={styles.input}
      />
      {isArrowIcon && <ChevronSVG />}
    </div>
  );
};
