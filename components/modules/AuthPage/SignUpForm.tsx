import NameInput from "@/components/elements/AuthPage/NameInput";
import {useForm} from "react-hook-form";
import {IInputs} from "@/types/auth";
import EmailInput from "@/components/elements/AuthPage/EmailInput";
import PasswordInput from "@/components/elements/AuthPage/PasswordInput";
import {signUpFx} from "@/app/api/auth";
import {showAuthError} from "@/utils/errors";
import {useState} from "react";
import styles from "@/styles/pages/auth/index.module.scss";
import spinnerStyles from "@/styles/common/spinner/index.module.scss";

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const [spinner, setSpinner] = useState<boolean>(false);

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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form__title} ${styles.title}`}>
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button className={`${styles.form__button} ${styles.button} ${styles.submit}`}>
        {spinner ? <div className={spinnerStyles.spinner}/> : 'SIGN UP'}
      </button>
    </form>
  );
}

export default SignUpForm;
