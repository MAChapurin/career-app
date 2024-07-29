import useFilterFieldInput from "../../../hooks/useFilterFieldInput";
import { IconCross } from "../../ui/icons";
import { IconsFilter } from "../../icons-filter";
import Checkbox from "../../ui/checkbox/Checkbox";
import styles from "./styles.module.css";

export const FilterInput = ({ data, icon, placeholder }) => {
  const {
    input,
    inputFocus,
    handleSetInput,
    handleSetFocus,
    handleSetBlur,
    handleReset,
    showCross,
    opened,
    ref,
  } = useFilterFieldInput();

  return (
    <div className={styles.wrapper} ref={ref}>
      <label
        className={`${styles.block} ${inputFocus ? styles.focus : ""} ${
          opened ? styles.opened : ""
        }`}
      >
        <IconsFilter icon={icon} />
        <input
          type="text"
          placeholder={placeholder}
          className={styles.input}
          value={input}
          onChange={handleSetInput}
          onFocus={handleSetFocus}
          onBlur={handleSetBlur}
        />
        {showCross && (
          <button onClick={handleReset} className={`btn-reset ${styles.reset}`}>
            <IconCross className={styles.cross} />
          </button>
        )}
      </label>
      <div
        className={`scrollbar-main ${styles.dropdown} ${
          opened ? styles.opened : ""
        }`}
      >
        <ul className={`list-reset ${styles.list} `}>
          <li>
            <Checkbox className={styles.item}>Скоро тут будут города</Checkbox>
          </li>
        </ul>
      </div>
    </div>
  );
};
