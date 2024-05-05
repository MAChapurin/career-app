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
  const ref = useOutsideClickObserver(() => setIsActive(false));

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
        {items.map((item) => item.type === "dropdown" ? (
          <Dropdown
            key={item.name}
            name={item.name}
            icon={item.icon}
            items={item.items}
            type="nested"
          />
        ) : item.type === "radio" ? (
          <RadioButton
            key={`${item.name}-${item.value}`}
            id={item.id}
            name={item.name}
            value={item.name}
            text={item.text}
          />
        ) : item.type === "checkbox" ? (
          <Checkbox
            key={`${item.name}-${item.value}`}
            id={item.id}
            name={item.name}
            value={item.name}
            text={item.text}
          />
        ) : null)}
      </div>
    </div>
  )
}