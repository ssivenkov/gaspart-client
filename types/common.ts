import {MultiValue, SingleValue} from "react-select";
import * as React from "react";

export interface IWrappedComponentProps {
  open: boolean;
  setOpen: (arg0: boolean) => void;
}

export interface ISelectOption {
  value: string | number;
  label: string | number;
}

export type TSelectOption = MultiValue<ISelectOption> | SingleValue<ISelectOption | null>

export interface IAccordion {
  children: React.ReactNode;
  title: string | false;
  titleCLass: string;
  arrowOpenClass: string;
}

export interface ILayoutProps {
  children: React.ReactNode;
}
