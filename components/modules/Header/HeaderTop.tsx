import React from 'react';
import Link from "next/link";
import CityButton from "@/components/elements/common/CityButton/CityButton";
import ProfileDropdown from "@/components/modules/Header/ProfileDropdown";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import ThemeModeToggler from "@/components/elements/common/themeModeToggler/ThemeModeToggler";
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import styles from '@/styles/common/header/index.module.scss';
import {usePopup} from "@/hooks/usePopup";

const HeaderTop = () => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const { toggleOpen, open, closePopup } = usePopup();
  const isMedia950= useMediaQuery(950);

  return (
    <div className={styles.header__top}>
      <div className={`container ${styles.header__top__container}`}>
        {!isMedia950 && <CityButton/>}
        {isMedia950 && (
          <button
            className={`${styles.burger_menu} ${
              open ? styles.open : ''
            } ${darkModeClass}`}
            onClick={toggleOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
        <nav className={`${styles.header__nav} ${
          open ? styles.open : ''
        } ${darkModeClass}`}>
          <ul className={styles.header__nav__list}>
            <li className={styles.header__nav__list__item}>
              <Link href="/shopping-payment" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Доставка и оплата
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/about" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  О компании
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/catalog" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Каталог
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/contacts" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Контакты
                </a>
              </Link>
            </li>
            <li className={styles.header__nav__list__item}>
              <Link href="/wholesale-buyers" passHref legacyBehavior>
                <a
                  className={`${styles.header__nav__list__item__link} ${darkModeClass}`}
                  onClick={closePopup}
                >
                  Оптовым покупателям
                </a>
              </Link>
            </li>
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <CityButton />
              </li>
            )}
            {isMedia950 && (
              <li className={styles.header__nav__list__item}>
                <ThemeModeToggler />
              </li>
            )}
          </ul>
        </nav>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default HeaderTop;
