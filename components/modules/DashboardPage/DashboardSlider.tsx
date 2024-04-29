import React, {useEffect} from 'react';
import Slider from "react-slick";
import {useStore} from "effector-react";
import {useMediaQuery} from "@/hooks/useMediaQuery";
import {$mode} from "@/context/mode";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {IDashboardSlider} from "@/types/dashboard";
import Link from "next/link";
import {formatPrice} from "@/utils/common";
import styles from '@/styles/pages/dashboard/index.module.scss';
import skeletonStyles from '@/styles/common/skeleton/index.module.scss';

const DashboardSlider = ({items, spinner, goToPartPage}: IDashboardSlider) => {
  const isMedia560 = useMediaQuery(560);
  const isMedia768 = useMediaQuery(768);
  const isMedia800 = useMediaQuery(800);
  const isMedia1030 = useMediaQuery(1030);
  const isMedia1366 = useMediaQuery(1366);
  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const settings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows : false,
    slidesToScroll: isMedia768 ? 1 : 2,
  };

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344
  }

  useEffect(() => {
    const sliders = document.querySelectorAll(`.${styles.dashboard__slider}`);

    sliders.forEach((slider) => {
      const list = slider?.querySelector('.slick-list') as HTMLElement;

      list.style.height = isMedia560 ? '276px' : '390px';
      list.style.padding = '0 5px';
      list.style.marginRight = isMedia560 ? '-8px' : isMedia800 ? '-15px' : '0';
    })
  }, [isMedia560, isMedia768]);

  return (
    <Slider {...settings} className={styles.dashboard__slider}>
      {spinner ?
        [...Array(8)].map((item) => (
          <div
            className={`${skeletonStyles.skeleton__item} ${mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`}
            key={Date.now()}
            style={{width: `${width}px`}}
          >
            <div className={skeletonStyles.skeleton__item__light}/>
          </div>
        ))
        : items.length ? (
          items.map((item) => (
            <div
              className={`${styles.dashboard__slide} ${darkModeClass}`}
              key={item.id}
              style={width}
            >
              <img src={JSON.parse(item.images)[0]} alt={item.name}/>
              <div className={styles.dashboard__silde__inner}>
                <Link href={goToPartPage ? `/catalog/${item.id}` : '/catalog'} passHref legacyBehavior>
                  <a href="">
                    <h3 className={styles.dashboard__slide__title}>
                      {item.name}
                    </h3>
                  </a>
                </Link>
                <span className={styles.dashboard__slide__code}>
                  Артикул: {item.vendor_code}
                </span>
                <span className={styles.dashboard__slide__price}>
                  {formatPrice(item.price)} ₽
                </span>
              </div>
            </div>
          ))
        ) : (<span>Список товаров пуст</span>)
      }
    </Slider>
  );
};

export default DashboardSlider;
