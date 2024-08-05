import Icon from "../../icon/Icon";
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
        <Icon name="check" />
      </span>
      {children && <span className={styles.text}>{children}</span>}
    </label>
  );
};

export default Checkbox;
