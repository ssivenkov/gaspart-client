import {IAuthPageInputProps} from "@/types/auth";
import styles from "@/styles/auth/index.module.scss";

const PasswordInput = ({ register, errors }: IAuthPageInputProps) => {
  const minLength = 8;

  return (
    <label className={styles.form__label}>
      <input
        {...register('password', {
          required: 'Введите пароль',
          minLength
        })}
        className={styles.form__input}
        type="password"
        placeholder="Password"
      />
      {errors.password && (
        <span className={styles.error_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>
          Минимум символов: {minLength}
        </span>
      )}
    </label>
  )
}

export default PasswordInput;
