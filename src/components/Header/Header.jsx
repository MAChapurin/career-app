import { LogoSVG } from '@components/UI/IconsSVG/LogoSVG';
import { MenuSVG } from '@components/UI/IconsSVG/MenuSVG';
import { XMarkSolidSVG } from '@components/UI/IconsSVG/XMarkSolidSVG';
import { Footer } from '@components/Footer/Footer';
import { SCREEN_TYPES } from '@constants';
import styles from './Header.module.css';
import clsx from '@utils/clsx';
import useResize from '@hooks/useResize';
import { useState, useEffect } from 'react';

const NavMenu = ({ className, onClick = () => {} }) => (
  <menu className={className}>
    <button
      type="button"
      className={clsx(styles.button, styles.active)}
      onClick={onClick}
    >
      Поиск вакансий
    </button>
    <button type="button" className={styles.button} onClick={onClick}>
      Избранные вакансии
    </button>
  </menu>
);

export const Header = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const currentScreenType = useResize();

  useEffect(() => {
    const body = document.querySelector('body');
    body?.setAttribute(
      'style',
      `overflow-y: ${isModalOpened ? 'hidden' : 'auto'}`
    );
  }, [isModalOpened]);

  useEffect(() => {
    if (currentScreenType >= SCREEN_TYPES.MOBILE && isModalOpened) {
      setIsModalOpened(false);
    }
  }, [currentScreenType]);

  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <LogoSVG className={styles.logo} />
          <NavMenu className={styles.menu} />
          <button
            className={styles.mobileMenuBtn}
            onClick={() => {
              setIsModalOpened((prev) => !prev);
            }}
          >
            {isModalOpened ? (
              <XMarkSolidSVG className={styles.mobileMenuIcon} />
            ) : (
              <MenuSVG className={styles.mobileMenuIcon} />
            )}
          </button>
        </header>
      </div>
      <div className={clsx(styles.modal, isModalOpened && styles.active)}>
        <div className={styles.menuMobileWrapper}>
          <NavMenu
            className={styles.menuMobile}
            onClick={() => {
              setIsModalOpened((prev) => !prev);
            }}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};
