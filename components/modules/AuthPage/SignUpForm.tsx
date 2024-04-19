import NameInput from "@/components/elements/pages/AuthPage/NameInput";
import {useForm} from "react-hook-form";
import {IInputs} from "@/types/auth";
import EmailInput from "@/components/elements/pages/AuthPage/EmailInput";
import PasswordInput from "@/components/elements/pages/AuthPage/PasswordInput";
import {signUpFx} from "@/app/api/auth";
import {showAuthError} from "@/utils/errors";
import {useState} from "react";
import styles from "@/styles/pages/auth/index.module.scss";
import spinnerStyles from "@/styles/common/spinner/index.module.scss";
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const [spinner, setSpinner] = useState<boolean>(false);

  const mode = useStore($mode);
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>();

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true);

      const userData = await signUpFx({
        url: '/users/signup',
        username: data.name,
        email: data.email,
        password: data.password,
      });

      if (!userData) {
        return;
      }

      resetField('name');
      resetField('email');
      resetField('password');
      switchForm();
    } catch (error) {
      showAuthError(error);
    } finally {
      setSpinner(false);
    }
  }

  return (
    <form className={`${styles.form} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title} ${darkModeClass}`}>
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}>
        {spinner ? <div className={spinnerStyles.spinner}/> : 'SIGN UP'}
      </button>
    </form>
  );
}

export default SignUpForm;
