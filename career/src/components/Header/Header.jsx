import { LogoSVG } from '@components/UI/IconsSVG/LogoSVG';
import styles from './Header.module.css';
import clsx from '@utils/clsx';

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <LogoSVG />
        <menu className={styles.menu}>
          <button type='button' className={clsx(styles.button, styles.active)}>
            Поиск вакансий
          </button>
          <button type='button' className={styles.button}>
            Избранные вакансии
          </button>
        </menu>
      </header>
    </div>
  );
};
