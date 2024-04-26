import React, {forwardRef} from 'react';
import {useStore} from "effector-react";
import {AnimatePresence, motion} from "framer-motion";
import {$mode} from "@/context/mode";
import LogoutSVG from "@/components/elements/svg/LogoutSVG/LogoutSVG";
import ProfileSvg from "@/components/elements/svg/ProfileSVG/ProfileSVG";
import {withClickOutside} from "@/utils/WIthClickOutside";
import {IWrappedComponentProps} from "@/types/common";
import styles from "@/styles/common/profileDropdown/index.module.scss";
import {$user} from "@/context/user";
import {logoutFx} from "@/app/api/auth";
import {useRouter} from "next/router";

const ProfileDropdown = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({open, setOpen}, ref) => {
    const router = useRouter();
    const mode = useStore($mode);
    const user = useStore($user);
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

    const toggleProfileDropdown = () => setOpen(!open);

    const handleLogout = async () => {
      await logoutFx('/users/logout');

      router.push('/');
    }

    return (
      <div className={styles.profile} ref={ref}>
        <button className={styles.profile__button} onClick={toggleProfileDropdown}>
          <span className={styles.profile__span}>
            <ProfileSvg/>
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{opacity: 0, scale: 0}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0}}
              className={`${styles.profile__dropdown} ${darkModeClass}`}
              style={{transformOrigin: 'right top'}}
            >
              <li className={styles.profile__dropdown__user}>
                <span
                  className={`${styles.profile__dropdown__username} ${darkModeClass}`}
                >
                  {user.username}
                </span>
                <span
                  className={`${styles.profile__dropdown__email} ${darkModeClass}`}
                >
                  {user.email}
                </span>
              </li>
              <li className={styles.profile__dropdown__item}>
                <button
                  onClick={handleLogout}
                  className={styles.profile__dropdown__item__button}
                >
                  <span
                    className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}
                  >
                    Выйти
                  </span>
                  <span
                    className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}
                  >
                    <LogoutSVG/>
                  </span>
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  });

ProfileDropdown.displayName = 'ProfileDropdown';

export default withClickOutside(ProfileDropdown);
