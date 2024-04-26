import {ISignInFx, ISignUpFx} from "@/types/auth";
import instance from "@/app/axiosClient";
import {toast} from "react-toastify";
import {createEffect} from "effector-next";
import {AxiosError} from "axios";
import {HTTPStatus} from "@/constants";

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

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await instance.get(url);

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false;
      }
    }

    toast.error((error as Error).message);
  }
});
