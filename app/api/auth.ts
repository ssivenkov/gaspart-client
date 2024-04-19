import {ISignInFx, ISignUpFx} from "@/types/auth";
import instance from "@/app/axiosClient";
import {toast} from "react-toastify";
import {createEffect} from "effector-next";

export const signUpFx = createEffect(async ({ url, username, email, password }: ISignUpFx) => {
  const { data } = await instance.post(url, { username, email, password });

  if (data.warningMessage) {
    toast.warning(data.warningMessage);
    return;
  }

  toast.success('Регистрация прошла успешно');

  return data;
});

export const signInFx = createEffect(async ({ url, username, password }: ISignInFx) => {
  const { data } = await instance.post(url, { username, password });

  toast.success('Вход выполнен');

  return data;
});
