import { useState } from 'react';
import { Dropdown } from '@components/UI/Dropdown/Dropdown';
import { Input } from '@components/UI/Input/Input';
// import styles from './FilterItem.module.css';

export const FilterItem = ({
  type = "input",
  name,
  icon: Icon,
  items
}) => {
  const [cityValue, setCityValue] = useState("");

  return type === "dropdown" ? (
    <Dropdown
      name={name}
      icon={Icon}
      items={items}
    />
  ) : (
    <Input
      type="search"
      name={name}
      icon={Icon}
      value={cityValue}
      onChange={(e) => setCityValue(e.target.value)}
    />
  );
};
