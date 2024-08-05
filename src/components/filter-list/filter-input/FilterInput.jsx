import useFilterFieldInput from "../../../hooks/useFilterFieldInput";
import { IconsFilter } from "../../icons-filter";
import Checkbox from "../../ui/checkbox/Checkbox";
import { Shield } from "../../shield/Shield";
import styles from "./styles.module.css";
import Icon from "../../icon/Icon";

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
    searchList,
    checkedCityList,
    setCheckedCityList,
  } = useFilterFieldInput({ data });

  return (
    <div className={`${styles.wrapper}`} ref={ref}>
      <label
        className={`${styles.block} ${inputFocus ? styles.focus : ""} ${
          opened ? styles.opened : ""
        } ${showCross ? styles["hide-shield"] : ""}`}
      >
        <IconsFilter icon={icon} />
        <input
          type="text"
          placeholder={placeholder}
          className={`js-input-city ${styles.input}`}
          value={input}
          onChange={handleSetInput}
          onFocus={handleSetFocus}
          onBlur={handleSetBlur}
        />
        {showCross && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className={`btn-reset ${styles.reset}`}
          >
            <Icon name="clear" />
          </button>
        )}

        {!!checkedCityList.length && (
          <Shield className={styles.shield}>{checkedCityList.length}</Shield>
        )}
      </label>
      <div
        className={`scrollbar-main ${styles.dropdown} ${
          opened ? styles.opened : ""
        }`}
      >
        <ul className={`list-reset ${styles.list} `}>
          {searchList.length
            ? searchList.map((el) => {
                const isset = checkedCityList.find((item) => item.id === el.id);

                return (
                  <li key={el.id}>
                    <Checkbox
                      onChange={(e) => {
                        setCheckedCityList(el);
                      }}
                      className={styles.item}
                      checked={!!isset}
                      value={el.id}
                    >
                      {el.name}
                    </Checkbox>
                  </li>
                );
              })
            : checkedCityList.length
            ? checkedCityList.map((el) => (
                <li key={el.id}>
                  <Checkbox
                    onChange={(e) => {
                      setCheckedCityList(el);
                    }}
                    className={styles.item}
                    checked={true}
                    value={el.id}
                  >
                    {el.name}
                  </Checkbox>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};
