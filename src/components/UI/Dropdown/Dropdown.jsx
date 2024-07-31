import useOutsideClickObserver from '@hooks/useOutsideClickObserver';
import { ChevronSVG } from '../IconsSVG/ChevronSVG';
import clsx from '@utils/clsx';
import styles from './Dropdown.module.css';
import { RadioButton } from '../RadioButton/RadioButton';
import { Checkbox } from '../Checkbox/Checkbox';
import { useFiltersStore } from '@store/useFiltersStore';
import { useFiltersCounter } from '@hooks/useFiltersCounter';
import { useState } from 'react';
import { useVacancyStore } from '@store/vacancyStore';

export const Dropdown = ({
  type = 'default',
  name,
  icon: Icon,
  items,
  active = false,
  group,
  value,
  isMobile,
}) => {
  const [isActive, setIsActive] = useState(active);
  const {
    addCheckbox,
    checkboxes,
    removeCheckbox,
    addRadio,
    addTechnology,
    technologies,
    radios,
    removeTechnology,
    setHiddenVacancyFilterCheckedTrue,
    setHiddenVacancyFilterCheckedFalse,
  } = useFiltersStore();
  const { groupLength } = useFiltersCounter(group);
  const { setPage } = useVacancyStore();
  const counterValue = value || groupLength;

  const ref = useOutsideClickObserver(() => {
    if (type === 'default') {
      setIsActive(false);
    }
  });

  const toggle = () => {
    setIsActive((prev) => !prev);
  };

  const checkboxHandler = (e) => {
    const name = e.target.name;
    const id = e.target.id;
    const newParam = [name, id].join('=');
    const isChecked = e.target.checked;
    const isStackFilter = e.target.name === 'stack';
    const isHiddenFilter = e.target.id === 'hidden';
    if (isHiddenFilter) {
      isChecked
        ? setHiddenVacancyFilterCheckedTrue()
        : setHiddenVacancyFilterCheckedFalse();
    }
    if (isStackFilter) {
      isChecked ? addTechnology(id) : removeTechnology(id);
    } else {
      isChecked ? addCheckbox(newParam) : removeCheckbox(newParam);
    }
    setPage(1);
  };

  const radioHandler = (e) => {
    addRadio(e.target.name + '=' + e.target.id);
    setPage(1);
  };

  return (
    <div
      ref={ref}
      className={clsx(
        styles.dropdown,
        type === 'nested' && styles.nested,
        isMobile &&
          isActive &&
          name === 'Дополнительные фильтры' &&
          styles.absolute
      )}
    >
      <button
        className={clsx(
          'btn',
          styles.dropdownToggle,
          isActive && styles.active
        )}
        onClick={toggle}
      >
        <Icon className={styles.icon} />
        {(!isMobile || isActive) && <h3 className={styles.title}>{name}</h3>}
        {counterValue > 0 && (
          <span className={styles.count}>{counterValue}</span>
        )}
        {!isMobile && <ChevronSVG className={styles.chevronIcon} />}
      </button>
      <div className={clsx(styles.dropdownMenu, isActive && styles.active)}>
        <ul className={styles.dropdownList}>
          {items.map((item) =>
            item.type === 'dropdown' ? (
              <li key={item.name}>
                <Dropdown
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  items={item.items}
                  type="nested"
                  group={item.group}
                />
              </li>
            ) : item.type === 'radio' ? (
              <li key={`${item.name}-${item.value}`}>
                <RadioButton
                  key={`${item.name}-${item.value}`}
                  id={item.id}
                  name={item.name}
                  value={item.name}
                  text={item.text}
                  onChange={radioHandler}
                  checked={radios.includes(`${item.name}=${item.id}`)}
                />
              </li>
            ) : item.type === 'checkbox' ? (
              <li key={`${item.name}-${item.value}`}>
                <Checkbox
                  key={`${item.name}-${item.value}`}
                  id={item.id}
                  name={item.name}
                  value={item.name}
                  text={item.text}
                  checked={
                    checkboxes.includes(`${item.name}=${item.id}`) ||
                    technologies.includes(item.id) ||
                    ''
                  }
                  onChange={checkboxHandler}
                />
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
};
