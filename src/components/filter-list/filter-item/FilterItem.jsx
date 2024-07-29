import { FilterInput } from "../filter-input/FilterInput";
import { FilterDropdown } from "../filter-dropdown/FilterDropdown";

export function FilterItem({ icon, placeholder, data, dropdown }) {
  if (dropdown) {
    return <FilterDropdown data={data} icon={icon} placeholder={placeholder} />;
  } else {
    return <FilterInput data={data} icon={icon} placeholder={placeholder} />;
  }
}
