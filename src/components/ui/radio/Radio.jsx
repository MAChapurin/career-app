import styles from "./styles.module.css";

const Radio = ({
  name = "",
  value = "",
  className = "",
  children,
  ...props
}) => {
  return (
    <label className={`${styles.block} ${className}`}>
      <input
        {...props}
        className={styles.input}
        name={name}
        type="radio"
        value={value}
      />
      <span className={styles.field}></span>
      {children && <span className={styles.text}>{children}</span>}
    </label>
  );
};

export default Radio;
