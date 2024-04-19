import styles from "@/styles/pages/auth/index.module.scss";
import {IAuthPageInputProps} from "@/types/auth";

const NameInput = ({ register, errors }: IAuthPageInputProps) => {
  const minLength = 2;

  return (
    <label className={styles.form__label}>
      <input
        {...register('name', {
          required: 'Введите имя',
          minLength,
          pattern: {
            value: /^[а-яА-Яa-zA-ZёЁ]*$/,
            message: 'Недопустимое значение',
          }
        })}
        className={styles.form__input}
        type="text"
        placeholder="Name"
      />
      {errors.name && (
        <span className={styles.error_alert}>{errors.name?.message}</span>
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <span className={styles.error_alert}>`Минимум символов: ${minLength}`</span>
      )}
    </label>
  )
}

export default NameInput;
