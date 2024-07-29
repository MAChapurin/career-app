import { useState } from "react";
import FilterItem from "../filterList-broke/filterItem/FilterItem";
import Checkbox from "../checkbox/Checkbox";
import NestedLayout from "../nestedLayout/NestedLayout";

const AdditionalFilters = ({ list }) => {
  const [isOpenFilter, setIsOpenFilter] = useState(() =>
    Object.fromEntries(list.map((_, index) => [index, false]))
  );

  const toggleFilter = (e, index) => {
    e.stopPropagation();
    setIsOpenFilter((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return list.map((item, index) => (
    <FilterItem
      key={index}
      iconName={item.icon}
      text={item.title}
      isOpenFilter={isOpenFilter[index]}
      level="low"
      onClick={(e) => {
        toggleFilter(e, index);
      }}
    >
      <NestedLayout>
        {item.radio && <Checkbox list={item.radio} type="radio" id={item.id} />}
        {item.checkbox && (
          <Checkbox list={item.checkbox} type="checkbox" id={item.id} />
        )}
      </NestedLayout>
    </FilterItem>
  ));
};

export default AdditionalFilters;
