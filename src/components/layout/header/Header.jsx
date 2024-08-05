import React, { useState } from "react";
import Icon from "../../icon/Icon";
import { cn } from "../../../utils";
import Button from "../../button/Button";
import styles from "./Header.module.css";
import HeaderNav from "./header-nav/HeaderNav";
import useMediaQuery from "../../../hooks/useMediaQuery";

const Header = ({ menuOpened, setMenuOpened }) => {
  const isDesktop = useMediaQuery("(min-width:1024px)");

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Icon name="logo" className={styles.logo} />
        {isDesktop ? (
          <HeaderNav />
        ) : (
          <button
            className={cn("btn-reset", styles.burgerBtn)}
            onClick={() => setMenuOpened((prev) => !prev)}
          >
            <Icon name={menuOpened ? "clear" : "menu"} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
