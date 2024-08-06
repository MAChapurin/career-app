import { FilterInput } from "../filter-input/FilterInput";
import { FilterDropdown } from "../filter-dropdown/FilterDropdown";

export function FilterItem({
  icon,
  placeholder,
  data,
  dropdown,
  collapsed,
  setOpenedFilter,
}) {
  if (dropdown) {
    return (
      <FilterDropdown
        data={data}
        icon={icon}
        placeholder={placeholder}
        collapsed={collapsed}
        setOpenedFilter={setOpenedFilter}
      />
    );
  } else {
    return (
      <FilterInput
        data={data}
        icon={icon}
        placeholder={placeholder}
        setOpenedFilter={setOpenedFilter}
      />
    );
  }
}
