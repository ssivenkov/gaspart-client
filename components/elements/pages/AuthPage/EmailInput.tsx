import {IAuthPageInputProps} from "@/types/auth";
import styles from "@/styles/pages/auth/index.module.scss";

const EmailInput = ({ register, errors }: IAuthPageInputProps) => (
  <label className={styles.form__label}>
    <input
      {...register('email', {
        required: 'Введите email',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Не правильный email',
        }
      })}
      className={styles.form__input}
      type="email"
      placeholder="Email"
    />
    {errors.email && (
      <span className={styles.error_alert}>{errors.email?.message}</span>
    )}
  </label>
)

export default EmailInput;
