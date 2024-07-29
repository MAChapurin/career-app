import { useState } from "react";
import Checkbox from "../../ui/checkbox/Checkbox";
import Radio from "../../ui/radio/Radio";
import { IconsFilter } from "../../icons-filter";
import useVacanciesStore from "../../../store/useVacanciesStore";
import { Shield } from "../../shield/Shield";
import { setFilterCounts } from "../../../utils/setFilterCounts";
import styles from "./styles.module.css";

const FilterDropdonwList = ({ data, openedParent }) => {
  const [items, setItems] = useState(data);

  const handleShowSection = (id) => {
    setItems(
      items.map((el) => {
        if (el.id === id) {
          return { ...el, opened: !el.opened };
        } else {
          return el;
        }
      })
    );
  };

  const [setFilterParams] = useVacanciesStore((state) => [
    state.setFilterParams,
  ]);

  return (
    <ul
      className={`scrollbar-main ${styles.block} ${
        openedParent ? styles.openedParent : ""
      }`}
    >
      {items.map((el) =>
        el.items ? (
          <li
            key={el.id}
            className={`${
              !el.title
                ? styles.nosection
                : `js-filter-subparent-block ${styles.section}`
            } ${
              (el.title && el.opened) || !el.title
                ? styles.opened
                : styles.closed
            }`}
          >
            {el.title ? (
              <button
                onClick={() => handleShowSection(el.id)}
                className={`btn-reset ${styles.title}`}
              >
                {el.icon ? el.icon : ""}
                {el.title}

                <div className={styles["right-side"]}>
                  <Shield className="js-filter-block-count opacity-0"></Shield>
                  <span className={styles.arrow}>
                    <IconsFilter icon={"arrow"} />
                  </span>
                </div>
              </button>
            ) : (
              ""
            )}
            <ul className={`list-reset ${styles.list} `}>
              {el.multiple
                ? el.items.map((subEl) => (
                    <li key={subEl.name}>
                      <Checkbox
                        onChange={(e) => {
                          setFilterParams(el.name, subEl.value, true);
                          setFilterCounts(e);
                        }}
                        className={styles.item}
                        name={el.name}
                        value={subEl.value}
                      >
                        {subEl.name}
                      </Checkbox>
                    </li>
                  ))
                : el.items.map((subEl) => (
                    <li key={subEl.name}>
                      <Radio
                        onChange={(e) => {
                          setFilterParams(el.name, subEl.value);
                          setFilterCounts(e);
                        }}
                        className={styles.item}
                        name={el.name}
                        value={subEl.value}
                      >
                        {subEl.name}
                      </Radio>
                    </li>
                  ))}
            </ul>
            {el.otherItems && el.otherItems.length
              ? el.otherItems.map((otherEl) =>
                  otherEl.items ? (
                    <ul
                      key={otherEl.id}
                      className={`list-reset ${styles.list} `}
                    >
                      {otherEl.multiple
                        ? otherEl.items.map((otherSubEl) => (
                            <li key={otherSubEl.name}>
                              <Checkbox
                                onChange={(e) => {
                                  setFilterParams(
                                    otherEl.name,
                                    otherSubEl.value,
                                    true
                                  );

                                  setFilterCounts(e);
                                }}
                                className={styles.item}
                                name={otherEl.name}
                                value={otherSubEl.value}
                              >
                                {otherSubEl.name}
                              </Checkbox>
                            </li>
                          ))
                        : otherEl.items.map((otherSubEl) => (
                            <li key={otherSubEl.name}>
                              <Radio
                                onChange={(e) => {
                                  setFilterParams(
                                    otherEl.name,
                                    otherSubEl.value
                                  );
                                  setFilterCounts(e);
                                }}
                                className={styles.item}
                                name={otherEl.name}
                                value={otherSubEl.value}
                              >
                                {otherSubEl.name}
                              </Radio>
                            </li>
                          ))}
                    </ul>
                  ) : (
                    ""
                  )
                )
              : ""}
          </li>
        ) : (
          ""
        )
      )}
    </ul>
  );
};

export default FilterDropdonwList;
