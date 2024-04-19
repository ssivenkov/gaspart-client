import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useRouter} from "next/router";
import {useStore} from "effector-react";
import NameInput from '@/components/elements/pages/AuthPage/NameInput';
import {IInputs} from '@/types/auth';
import PasswordInput from '@/components/elements/pages/AuthPage/PasswordInput';
import {signInFx} from '@/app/api/auth';
import {showAuthError} from '@/utils/errors';
import {$mode} from "@/context/mode";
import styles from '@/styles/pages/auth/index.module.scss';
import spinnerStyles from '@/styles/common/spinner/index.module.scss';

const SignInForm = () => {
  const [spinner, setSpinner] = useState<boolean>(false);

  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';
  const route = useRouter();

  const {
    register,
    formState: {errors},
    handleSubmit,
    resetField,
  } = useForm<IInputs>();

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true);

      await signInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      });

      resetField('name');
      resetField('password');
      route.push('/dashboard');
    } catch (error) {
      showAuthError(error);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>Войти</h2>
      <NameInput register={register} errors={errors}/>
      <PasswordInput register={register} errors={errors}/>
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner}/> : 'SIGN IN'}
      </button>
    </form>
  );
}

export default SignInForm;
