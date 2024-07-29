import { IconCheck } from "../icons";
import styles from "./styles.module.css";

const Checkbox = ({
  className = "",
  name = "",
  value = "",
  children,
  ...props
}) => {
  return (
    <label className={`${styles.block} ${className}`}>
      <input
        {...props}
        className={styles.input}
        name={name}
        value={value}
        type="checkbox"
      />
      <span className={styles.field}>
        <IconCheck className={styles.icon} />
      </span>
      {children && <span className={styles.text}>{children}</span>}
    </label>
  );
};

export default Checkbox;
