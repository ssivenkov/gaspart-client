import React from 'react';
import BrandSliderArrowSvg from "@/components/elements/svg/BrandSliderArrowSVG/BrandSliderArrowSVG";
import {IBrandsSliderArrow} from "@/types/elements";
import styles from '@/styles/pages/dashboard/index.module.scss';

const BrandSliderPrevArrow = (props: IBrandsSliderArrow) => (
  <button
    className={`${styles.dashboard__brands__slider__arrow} ${styles.dashboard__brands__slider__arrow_prev} ${props.modeClass}`}
    onClick={props.onClick}
  >
    <span>
      <BrandSliderArrowSvg />
    </span>
  </button>
);

export default BrandSliderPrevArrow;
