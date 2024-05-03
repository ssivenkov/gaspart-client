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
import ReactPaginate from "react-paginate";
import {IQueryParams} from "@/types/catalog";
import {useRouter} from "next/router";
import {IBoilerParts} from "@/types/boilerParts";

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const mode = useStore($mode);
  const boilerParts = useStore($boilerParts);
  const router = useRouter();
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const pagesCount = Math.ceil(boilerParts.count / 20);
  const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0;
  const [spinner, setSpinner] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(isValidOffset ? +query.offset - 1 : 0);

  const loadBoilerParts = async () => {
    try {
      setSpinner(true);
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        });

        resetPagination(data);
        return;
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push({
            query: {
              ...query,
              offset: 1,
            }
          }, undefined, { shallow: true });

          setCurrentPage(0);
          setBoilerParts(data);

          return;
        }
      }

      const offset = +query.offset - 1;
      const result = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${offset}`);

      setCurrentPage(offset);
      setBoilerParts(result);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  }

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0);
    setBoilerParts(data);
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0');

      if (selected > pagesCount) {
        resetPagination(data);
        return;
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 2)) {
        resetPagination(data)
        return;
      }

      const result = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${selected}`);
      router.push({
        query: {
          ...router.query,
          offset: selected + 1
        }
      }, undefined, { shallow: true });

      setCurrentPage(selected);
      setBoilerParts(result);
    } catch (error) {

    }
  }

  useEffect(() => {
    loadBoilerParts();
  }, []);

  console.log('rows -', boilerParts.rows);

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
        <ReactPaginate
          containerClassName={styles.catalog__bottom__list}
          pageClassName={styles.catalog__bottom__list__item}
          pageLinkClassName={styles.catalog__bottom__list__item__link}
          previousClassName={styles.catalog__bottom__list__prev}
          nextClassName={styles.catalog__bottom__list__next}
          breakClassName={styles.catalog__bottom__list__break}
          breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
          breakLabel="..."
          pageCount={pagesCount}
          forcePage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  )
};

export default CatalogPage;
