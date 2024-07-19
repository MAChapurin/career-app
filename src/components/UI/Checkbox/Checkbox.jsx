import { CheckSVG } from "../IconsSVG/CheckSVG";
import styles from "./Checkbox.module.css";

export const Checkbox = ({
  id,
  name,
  value,
  text,
  ...props
}) => {
  return (
    <label htmlFor={id} className={styles.label}>
      <input
        className={styles.input}
        type="checkbox"
        name={name}
        id={id}
        value={value}
        {...props}
      />
      <span className={styles.checkbox}>
        <CheckSVG />
      </span>
      {text}
    </label>
  )
}