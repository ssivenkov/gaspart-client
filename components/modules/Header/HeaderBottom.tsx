import React from 'react';
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import Link from "next/link";
import SearchSVG from "@/components/elements/common/SearchSVG/SearchSVG";
import SearchInput from "@/components/elements/common/SearchInput/SearchInput";
import ThemeModeToggler from "@/components/elements/common/themeModeToggler/ThemeModeToggler";
import CartPopup from "@/components/modules/Header/CartPopup/CartPopup";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import styles from "@/styles/common/header/index.module.scss";

const HeaderBottom = () => {
  const isMedia950= useMediaQuery(950);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <div className={styles.header__bottom}>
      <div className={`container ${styles.header__bottom__container}`}>
        <h1 className={styles.header__logo}>
          <Link href="/dashboard" legacyBehavior passHref>
            <a className={styles.header__logo__link}>
              <img src="/img/logo.svg" alt="logo"/>
              <span className={`${styles.header__logo__link__text} ${darkModeClass}`}>
                Детали для газовых котлов
              </span>
            </a>
          </Link>
        </h1>
        <div className={styles.header__search}>
          <SearchInput />
          <button className={`${styles.header__search__btn} ${darkModeClass}`}>
            <span className={styles.header__search__btn__span}>
              <SearchSVG />
            </span>
          </button>
        </div>
        <div className={styles.header__shopping_cart}>
          {!isMedia950 && <ThemeModeToggler/>}
          <CartPopup />
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
