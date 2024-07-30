import { useState } from "react";
import Checkbox from "../../ui/checkbox/Checkbox";
import Radio from "../../ui/radio/Radio";
import { IconsFilter } from "../../icons-filter";
import useVacanciesStore from "../../../store/useVacanciesStore";
import { Shield } from "../../shield/Shield";
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

  const [setFilterParams, filterParams] = useVacanciesStore((state) => [
    state.setFilterParams,
    state.filterParams,
  ]);

  return (
    <ul
      className={`scrollbar-main ${styles.block} ${
        openedParent ? styles.openedParent : ""
      }`}
    >
      {items.map((el) => {
        let count = "";

        if (filterParams[el.name]) {
          if (typeof filterParams[el.name] === "string") {
            count = "1";
            if (
              filterParams[el.name] === "0" ||
              filterParams[el.name] === "doesNotMatter"
            ) {
              count = "";
            }
          } else {
            count = filterParams[el.name].length;
          }
        }

        return el.items ? (
          <li
            key={el.id}
            className={`${!el.title ? styles.nosection : `${styles.section}`} ${
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
                  <Shield className={`${!count ? "opacity-0" : ""}`}>
                    {count}
                  </Shield>
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
                ? el.items.map((subEl) => {
                    let selected = false;
                    if (filterParams[el.name]) {
                      selected = filterParams[el.name].includes(subEl.value);
                    }

                    return (
                      <li key={subEl.name}>
                        <Checkbox
                          onChange={() =>
                            setFilterParams(el.name, subEl.value, true)
                          }
                          className={styles.item}
                          name={el.name}
                          value={subEl.value}
                          checked={selected}
                        >
                          {subEl.name}
                        </Checkbox>
                      </li>
                    );
                  })
                : el.items.map((subEl) => {
                    let selected = false;
                    if (filterParams[el.name] === subEl.value) {
                      selected = true;
                    }
                    return (
                      <li key={subEl.name}>
                        <Radio
                          onChange={() => setFilterParams(el.name, subEl.value)}
                          className={styles.item}
                          name={el.name}
                          value={subEl.value}
                          checked={selected}
                        >
                          {subEl.name}
                        </Radio>
                      </li>
                    );
                  })}
            </ul>
            {el.otherItems && el.otherItems.length
              ? el.otherItems.map((otherEl) =>
                  otherEl.items ? (
                    <ul
                      key={otherEl.id}
                      className={`list-reset ${styles.list} `}
                    >
                      {otherEl.multiple
                        ? otherEl.items.map((otherSubEl) => {
                            let selected = false;

                            if (filterParams[otherEl.name]) {
                              selected = filterParams[otherEl.name].includes(
                                otherSubEl.value
                              );
                            }
                            return (
                              <li key={otherSubEl.name}>
                                <Checkbox
                                  onChange={() =>
                                    setFilterParams(
                                      otherEl.name,
                                      otherSubEl.value,
                                      true
                                    )
                                  }
                                  className={styles.item}
                                  name={otherEl.name}
                                  value={otherSubEl.value}
                                  checked={selected}
                                >
                                  {otherSubEl.name}
                                </Checkbox>
                              </li>
                            );
                          })
                        : otherEl.items.map((otherSubEl, index) => {
                            let selected = false;
                            if (
                              filterParams[otherEl.name] === otherSubEl.value
                            ) {
                              selected = true;
                            }

                            return (
                              <li key={otherSubEl.name}>
                                <Radio
                                  onChange={() =>
                                    setFilterParams(
                                      otherEl.name,
                                      otherSubEl.value
                                    )
                                  }
                                  className={styles.item}
                                  name={otherEl.name}
                                  value={otherSubEl.value}
                                  checked={selected}
                                >
                                  {otherSubEl.name}
                                </Radio>
                              </li>
                            );
                          })}
                    </ul>
                  ) : (
                    ""
                  )
                )
              : ""}
          </li>
        ) : (
          ""
        );
      })}
    </ul>
  );
};

export default FilterDropdonwList;
