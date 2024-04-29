import {createEffect} from "effector-next";
import instance from "@/app/axiosClient";

export const getBestsellersOrNewPartsFx = createEffect(async (url: string) => {
  const { data } = await instance.get(url);

  return data;
});

export const getBoilerPartsFx = createEffect(async (url: string) => {
  const { data } = await instance.get(url);

  return data;
});
