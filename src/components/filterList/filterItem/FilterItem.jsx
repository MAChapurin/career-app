import React, { useState } from "react";
import styles from "./FilterItem.module.css";
import Icon from "../../icon/Icon";
import Button from "../../button/Button";

const FilterItem = ({
  iconName,
  type = "dropdown",
  text,
  isOpenFilter,
  onClick,
  level,
  children,
  className,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <li
      className={`${styles.wrapper} ${
        type === "input" && styles.inputWrapper
      } ${className}`}
      onClick={onClick}
      data-level={level}
    >
      <div
        className={styles.title}
        data-active={isOpenFilter ? "true" : "false"}
      >
        <Icon name={iconName} className={styles.icon} />
        {(type === "input" && (
          <input
            className={styles.input}
            type="text"
            placeholder={text}
            value={value}
            onChange={handleChange}
            data-active={value ? "true" : "false"}
          />
        )) || <span className={styles.input}>{text}</span>}
        {(type === "dropdown" && (
          <Icon
            name="chevron"
            className={`${styles.chevron} ${isOpenFilter ? styles.active : ""}`}
          />
        )) ||
          (value && (
            <Button
              onClick={() => {
                setValue("");
              }}
            >
              <Icon name="clear" className={styles.iconClear} />
            </Button>
          ))}
      </div>
      {isOpenFilter && children}
    </li>
  );
};

export default FilterItem;
