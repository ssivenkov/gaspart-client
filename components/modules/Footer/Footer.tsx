import React from 'react';
import FooterLogo from "@/components/modules/Footer/FooterLogo";
import OnlineStoreContent from "@/components/modules/Footer/OnlineStoreContent";
import CompanyContent from "@/components/modules/Footer/CompanyContent";
import Link from "next/link";
import MarkerSvg from "@/components/elements/svg/MarkerSVG/MarkerSVG";
import PhoneSVG from "@/components/elements/svg/PhoneSVG/PhoneSVG";
import EmailSVG from "@/components/elements/svg/EmailSVG/EmailSVG";
import styles from '@/styles/common/footer/index.module.scss';
import {useMediaQuery} from "@/hooks/useMediaQuery";
import Accordion from "@/components/elements/common/Accordion/Accordion";

const Footer = () => {
  const isMedia750 = useMediaQuery(750);
  const isMedia500 = useMediaQuery(500);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__inner}>
            <div className={styles.footer__top__item}>
              {!isMedia500 &&
                <>
                  <h3 className={styles.footer__top__item__title}>
                    Интернет-магазин
                  </h3>
                  <OnlineStoreContent />
                </>
              }
              {isMedia500 &&
                <Accordion
                  title="Интернет-магазин"
                  titleCLass={styles.footer__top__item__title}
                  arrowOpenClass={styles.open}
                >
                  <OnlineStoreContent />
                  <div style={{ height: 17 }}></div>
                </Accordion>
              }
            </div>
            <div className={styles.footer__top__item}>
              {!isMedia500 &&
                <>
                  <h3 className={styles.footer__top__item__title}>
                    Компания
                  </h3>
                  <OnlineStoreContent />
                </>
              }
              {isMedia500 &&
                <Accordion
                  title="Компания"
                  titleCLass={styles.footer__top__item__title}
                  arrowOpenClass={styles.open}
                >
                  <CompanyContent />
                  <div style={{ height: 17 }}></div>
                </Accordion>
              }
            </div>
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>
              Контакты
            </h3>
            <ul className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}>
              <li className={styles.footer__top__item__list__item}>
                <Link href="/contacts" passHref legacyBehavior>
                  <a className={styles.footer__top__item__list__item__link}>
                    <span>Наш адрес:</span>
                    <span>г. Москва, ул. ... д. ...</span>
                    <span>
                      <MarkerSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href='tel:780955555555'
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>Наш контактный телефон:</span>
                  <span>+7(8095) 555-55-55</span>
                  <span>
                      <PhoneSVG />
                    </span>
                </a>
              </li>
              <li className={styles.footer__top__item__list__item}>
                <a
                  href="mailto:info@zapchasti.com.ru"
                  className={styles.footer__top__item__list__item__link}
                >
                  <span>E-mail:</span>
                  <span>info@zapchasti.com.ru</span>
                  <span>
                      <EmailSVG />
                    </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы принимаем к оплате:
              </h3>
              <ul className={styles.footer__bottom__block__pay}>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/apple_pay.png" alt="apple pay" />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/google_pay.png" alt="google pay" />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/mastercard.png" alt="mastercard" />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/visa.png" alt="visa" />
                </li>
              </ul>
            </div>
            <div className={styles.footer__bottom__block__right}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы в соцсетях:
              </h3>
              <ul className={styles.footer__bottom__block__social}>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={styles.footer__bottom__block__social__item_vk}
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={styles.footer__bottom__block__social__item_fb}
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={styles.footer__bottom__block__social__item_inst}
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    href="#"
                    className={styles.footer__bottom__block__social__item_ytb}
                  />
                </li>
              </ul>
            </div>
          </div>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>
              © «Детали для газовых котлов» 2021.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
