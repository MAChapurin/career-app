import { useState } from "react";
import useOutsideClickObserver from "@hooks/useOutsideClickObserver";
import { ChevronSVG } from "../IconsSVG/ChevronSVG";
import clsx from "@utils/clsx";
import styles from "./Dropdown.module.css";
import { RadioButton } from "../RadioButton/RadioButton";
import { Checkbox } from "../Checkbox/Checkbox";

export const Dropdown = ({
  type = "default",
  name,
  icon: Icon,
  items,
  active = false
}) => {
  const [isActive, setIsActive] = useState(active);
  const ref = useOutsideClickObserver(() => {
    if (type === "default") {
      setIsActive(false);
    }
  });

  const toggle = () => {
    setIsActive(prev => !prev);
  }

  return (
    <div ref={ref} className={clsx(styles.dropdown, type === "nested" && styles.nested)}>
      <button
        className={clsx("btn", styles.dropdownToggle, isActive && styles.active)}
        onClick={toggle}
      >
        <Icon className={styles.icon} />
        <h3 className={styles.title}>
          {name}
        </h3>
        <ChevronSVG className={styles.chevronIcon} />
      </button>
      <div className={clsx(styles.dropdownMenu, isActive && styles.active)}>
        <ul className={styles.dropdownList}>
          {items.map((item) => item.type === "dropdown" ? (
            <li>
              <Dropdown
                key={item.name}
                name={item.name}
                icon={item.icon}
                items={item.items}
                type="nested"
              />
            </li>
          ) : item.type === "radio" ? (
            <li>
              <RadioButton
                key={`${item.name}-${item.value}`}
                id={item.id}
                name={item.name}
                value={item.name}
                text={item.text}
              />
            </li>
          ) : item.type === "checkbox" ? (
            <li>
              <Checkbox
                key={`${item.name}-${item.value}`}
                id={item.id}
                name={item.name}
                value={item.name}
                text={item.text}
              />
            </li>
          ) : null)}
        </ul>
      </div>
    </div>
  )
}