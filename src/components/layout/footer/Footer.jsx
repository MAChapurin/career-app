import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      Проект выполнен в рамках стажировки{" "}
      <a target="_blank" href="https://preax.ru">
        PREAX
      </a>
    </footer>
  );
};

export default Footer;
