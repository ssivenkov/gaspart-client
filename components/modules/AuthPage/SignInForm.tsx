import NameInput from '@/components/elements/AuthPage/NameInput';
import {IInputs} from '@/types/auth';
import {useForm} from 'react-hook-form';
import PasswordInput from '@/components/elements/AuthPage/PasswordInput';
import {signInFx} from '@/app/api/auth';
import {useState} from 'react';
import {showAuthError} from '@/utils/errors';
import styles from '@/styles/pages/auth/index.module.scss';
import spinnerStyles from '@/styles/common/spinner/index.module.scss';

const SignInForm = () => {
  const [spinner, setSpinner] = useState<boolean>(false);

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
    } catch (error) {
      showAuthError(error);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title}`}>Войти</h2>
      <NameInput register={register} errors={errors}/>
      <PasswordInput register={register} errors={errors}/>
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
        {spinner ? <div className={spinnerStyles.spinner}/> : 'SIGN IN'}
      </button>
    </form>
  );
}

export default SignInForm;
