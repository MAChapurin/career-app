import { cn } from "../../../../utils";
import Button from "../../../button/Button";
import styles from "./HeaderNav.module.css";

const HeaderNav = ({ className }) => {
  return (
    <nav className={cn(styles.controls, className)}>
      <Button className={styles.navButton}>Поиск вакансий</Button>
      <Button className={styles.navButton} disabled>
        Избранные вакансии
      </Button>
    </nav>
  );
};

export default HeaderNav;
