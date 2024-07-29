import styles from "./Shield.module.css";

export const Shield = ({ children, className = "" }) => {
  return <div className={`${styles.block} ${className}`}>{children}</div>;
};
