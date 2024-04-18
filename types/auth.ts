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