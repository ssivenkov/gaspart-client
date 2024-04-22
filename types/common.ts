import {MultiValue, SingleValue} from "react-select";

export interface IWrappedComponentProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

export interface ISelectOption {
  value: string | number;
  label: string | number;
}

export type TSelectOption = MultiValue<ISelectOption> | SingleValue<ISelectOption | null>
