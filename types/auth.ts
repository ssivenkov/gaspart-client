import {FieldErrors, UseFormRegister} from "react-hook-form";

export interface IInputs {
  name: string;
  email: string;
  password: string;
}

export interface IAuthPageInputProps {
  register: UseFormRegister<IInputs>;
  errors: FieldErrors<IInputs>;
}

export interface ISignUpFx {
  url: string;
  username: string;
  email: string;
  password: string;
}

export interface ISignInFx {
  url: string;
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  userId: number | string;
  email: string;
}
