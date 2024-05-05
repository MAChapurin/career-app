import styles from "./RadioButton.module.css";

export const RadioButton = ({
  id,
  name,
  value,
  onChange,
  checked,
  text = ""
}) => {
  return (
    <label htmlFor={id} className={styles.label}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <span className={styles.radioBtn} />
      {text}
    </label>
  )
}