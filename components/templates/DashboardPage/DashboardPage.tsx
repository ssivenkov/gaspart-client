import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import BrandsSlider from "@/components/modules/DashboardPage/BrandsSlider";
import {IBoilerParts} from "@/types/boilerParts";
import {getBestsellersOrNewPartsFx} from "@/app/api/boilerParts";
import styles from '@/styles/pages/dashboard/index.module.scss';
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import DashboardSlider from "@/components/modules/DashboardPage/DashboardSlider";

const DashboardPage = () => {
  const [bestsellers, setBestsellers] = useState<IBoilerParts>({} as IBoilerParts);
  const [newParts, setNewParts] = useState<IBoilerParts>({} as IBoilerParts);
  const [spinner, setSpinner] = useState<boolean>(false);

  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const loadBoilerParts = async () => {
    try {
      setSpinner(true);
      const bestsellers = await getBestsellersOrNewPartsFx('/boiler-parts/bestsellers');
      const newParts = await getBestsellersOrNewPartsFx('/boiler-parts/new');

      setBestsellers(bestsellers);
      setNewParts(newParts);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSpinner(false);
    }
  }

  useEffect(() => {
    loadBoilerParts();
  }, []);

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandsSlider/>
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Детали для газовых котлов
        </h2>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner}/>
        </div>
        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__title} ${darkModeClass}`}>
            Новинки
          </h3>
          <DashboardSlider items={newParts.rows || []} spinner={spinner}/>
        </div>
        <div className={styles.dashboard__about}>
          <h3 className={`${styles.dashboard__parts__title} ${styles.dashboard__about__title} ${darkModeClass}`}>
            О компании
          </h3>
          <p className={`${styles.dashboard__about__text} ${darkModeClass}`}>
            Инструкции и схемы помогут разобраться в эксплуатации, определить неисправность и правильно выбрать запчасть для ремонта Вашего газового оборудования. Купить запчасть, деталь для ремонта газового котла возможно в любом населенном пункте Российской Федерации.
          </p>
        </div>
      </div>
    </section>
  )
};

export default DashboardPage;
