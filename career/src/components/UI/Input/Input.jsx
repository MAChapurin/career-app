import { useRef } from "react";
import { XMarkSolidSVG } from "../IconsSVG/XMarkSolidSVG";
import clsx from "@utils/clsx";
import styles from "./Input.module.css";

export const Input = ({
  type = "text",
  name,
  icon: Icon,
  value,
  onChange
}) => {
  const ref = useRef(null);
  const isClearBtnShown = type === "search" && !!value;

  const onClear = () => {
    onChange({ target: { value: "" } });
    ref.current?.focus();
  }

  return (
    <div className={clsx(styles.inputWrapper, isClearBtnShown && styles.clearBtnShown)}>
      <Icon className={styles.icon} />
      <input
        ref={ref}
        type={type}
        className={styles.input}
        name={name}
        placeholder={name}
        value={value}
        onChange={onChange}
      />
      {isClearBtnShown && (
        <button className={clsx("btn", styles.clearBtn)} onClick={onClear}>
          <XMarkSolidSVG />
        </button>
      )}
    </div>
  )
}