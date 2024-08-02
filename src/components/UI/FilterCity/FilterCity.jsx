import { useFiltersStore } from '@store/useFiltersStore';
import { Input } from '../Input/Input';
import AREA_DB from '../../../db/cities.json';
import styles from './FilterCity.module.css';
import { DropdownArea } from '../DropdownArea/DropdownArea';
import { useState } from 'react';
import useOutsideClickObserver from '@hooks/useOutsideClickObserver';
import clsx from '@utils/clsx';

export const FilterCity = ({ name, icon: Icon, isMobile }) => {
  const { areas, city, setCity } = useFiltersStore();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClickObserver(() => setIsOpen(false));

  const cities = [
    ...AREA_DB[0].areas.map((area) => area.areas).flat(),
    ...AREA_DB[0].areas.map(({ name, id }) => ({ name, id })),
  ].filter((el) => el.name.toLowerCase().startsWith(city.toLowerCase()));

  const checkedCities = cities.filter((el) => areas.includes(el.id));
  const isBorderBottomShow =
    isOpen &&
    ((cities.length > 0 && city.length >= 3) ||
      (checkedCities.length > 0 && city.length < 3));

  return (
    <div
      className={clsx(styles.container, isMobile && isOpen && styles.absolute)}
      ref={ref}
    >
      <div className={styles.inputWrap}>
        <Input
          id="city-search"
          type="search"
          name={name}
          icon={Icon}
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onFocus={() => {
            if (checkedCities) {
              setIsOpen(true);
            }
          }}
          count={areas.length}
          style={{
            borderRadius: isBorderBottomShow ? '16px 16px 0 0' : '16px',
          }}
        />
      </div>
      {city.length < 3 && isOpen && <DropdownArea cities={checkedCities} />}
      {city.length >= 3 && isOpen && <DropdownArea cities={cities} />}
    </div>
  );
};
