import styles from './Footer.module.css';

export const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.text}>
      Проект выполнен в рамках стажировки{' '}
      <a href='https://preax.ru' target='_blank'>
        PREAX
      </a>
    </p>
  </footer>
);
