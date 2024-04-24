import React from 'react';
import HeaderTop from "@/components/modules/Header/HeaderTop";
import styles from '@/styles/common/header/index.module.scss';
import HeaderBottom from "@/components/modules/Header/HeaderBottom";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderTop />
      <HeaderBottom />
    </header>
  );
};

export default Header;
