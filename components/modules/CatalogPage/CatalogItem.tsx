import React, {useState} from 'react';
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import {IBoilerPart} from "@/types/boilerParts";
import Link from "next/link";
import {formatPrice} from "@/utils/common";
import {$shoppingCart} from "@/context/shopping-cart";
import CartHoverCheckedSVG from "@/components/elements/svg/CartHoverCheckedSVG/CartHoverCheckedSVG";
import CartHoverSvg from "@/components/elements/svg/CartHoverSVG/CartHoverSVG";
import styles from "@/styles/pages/catalog/index.module.scss";
import spinnerStyles from "@/styles/common/spinner/index.module.scss";

const CatalogItem = ({item}: {item: IBoilerPart}) => {
  const mode = useStore($mode);
  const shoppingCart = useStore($shoppingCart);
  const isInCart = shoppingCart.some((cartItem) => cartItem.partId === item.id);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const [spinner, setSpinner] = useState<boolean>(false);

  return (
    <li className={`${styles.catalog__list__item} ${darkModeClass}`}>
      <img src={JSON.parse(item.images)[0]} alt={item.name}/>
      <div className={styles.catalog__list__item__inner}>
        <Link href={`/catalog/${item.id}`} passHref legacyBehavior>
          <a>
            <h3 className={styles.catalog__list__item__title}>
              {item.name}
            </h3>
            <span className={styles.catalog__list__item__code}>
              Артикул: {item.vendor_code}`
            </span>
            <span className={styles.catalog__list__item__price}>
              {formatPrice(item.price)} ₽
            </span>
          </a>
        </Link>
      </div>
      <button
        className={`
          ${styles.catalog__list__item__cart}
          ${isInCart ? styles.added : ''}
        `}
        disabled={spinner}
      >
        {spinner
          ? (
            <div
              className={spinnerStyles.spinner}
              style={{ top: 6, left: 6 }}
            />
          )
          : (
            <span>
              {isInCart ? <CartHoverCheckedSVG/> : <CartHoverSvg/>}
            </span>
          )
        }
      </button>
    </li>
  );
};

export default CatalogItem;
