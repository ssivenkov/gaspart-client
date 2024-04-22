import React from 'react';
import LocationSVG from "@/components/elements/LocationSVG/LocationSVG";
import styles from '@/styles/common/cityButton/index.module.scss';
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";

const CityButton = () => {
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  return (
    <button className={styles.city}>
      <span className={`${styles.city__span} ${darkModeClass}`}>
        <LocationSVG/>
      </span>
      <span className={`${styles.city__text} ${darkModeClass}`}>Москва</span>
    </button>
  );
};

export default CityButton;
