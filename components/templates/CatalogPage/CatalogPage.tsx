import {useEffect, useState} from "react";
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import {AnimatePresence} from "framer-motion";
import ManufacturersBlock from "@/components/modules/CatalogPage/ManufacturersBlock";
import FilterSelect from "@/components/modules/CatalogPage/FilterSelect";
import {getBoilerPartsFx} from "@/app/api/boilerParts";
import {$boilerParts, setBoilerParts} from "@/context/boilerParts";
import {toast} from "react-toastify";
import styles from '@/styles/pages/catalog/index.module.scss';
import skeletonStyles from '@/styles/common/skeleton/index.module.scss';
import CatalogItem from "@/components/modules/CatalogPage/CatalogItem";

const CatalogPage = () => {
  const mode = useStore($mode);
  const boilerParts = useStore($boilerParts);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const [spinner, setSpinner] = useState<boolean>(false);

  const loadBoilerParts = async () => {
    try {
      setSpinner(true);
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');

      setBoilerParts(data);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  }

  useEffect(() => {
    loadBoilerParts();
  }, []);

  console.log(boilerParts);

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
      </div>
      <div className={`${styles.catalog__top} ${darkModeClass}`}>
        {false && <AnimatePresence>
          <ManufacturersBlock title={'Производитель котлов:'}/>
        </AnimatePresence>}
        {false && <AnimatePresence>
          <ManufacturersBlock title={'Производитель запчастей:'}/>
        </AnimatePresence>}
        <div className={styles.catalog__top__inner}>
          <button
            className={`${styles.catalog__top__reset} ${darkModeClass}`}
            disabled={true}
          >
            Сбросить фильтры
          </button>
          <FilterSelect />
        </div>
      </div>
      <div className={styles.catalog__bottom}>
        <div className={styles.catalog__bottom__inner}>
          <div>
            Filters
          </div>
          {spinner
            ?
            <ul className={skeletonStyles.skeleton}>
              {Array.from(new Array(8)).map(
                (_, index) => (
                  <li
                    key={index}
                    className={`
                      ${skeletonStyles.skeleton__item}
                      ${mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''}
                    `}
                  >
                    <div className={skeletonStyles.skeleton__item__light}/>
                  </li>
                ))
              }
            </ul>
            :
            <ul className={styles.catalog__list}>
              {boilerParts.rows?.length
                ? (
                  boilerParts.rows.map((item) => (
                    <CatalogItem
                      key={item.id}
                      item={item}
                    />
                  ))
                ) : (
                  <span>Список товаров пуст</span>
                )
              }
            </ul>
          }
        </div>
      </div>
    </section>
  )
};

export default CatalogPage;
