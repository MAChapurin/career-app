import React, { useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styles from "./Layout.module.css";
import HeaderNav from "./header/header-nav/HeaderNav";
import { cn } from "../../utils";

const Layout = ({ children }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const isMenuShown = menuOpened && !isDesktop;

  return (
    <div className={styles.bg}>
      <Header menuOpened={menuOpened} setMenuOpened={setMenuOpened} />
      <div className={cn(styles.wrapper, isMenuShown && styles.menuOpened)}>
        {isMenuShown && <HeaderNav />}
        <div className={cn(styles.content)}>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
