import {CSSObjectWithLabel, GroupBase, OptionProps, StylesConfig} from "react-select";
import {ISelectOption} from "@/types/common";

export const controlStyles = (defaultStyles: CSSObjectWithLabel, theme: string) => ({
  ...defaultStyles,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: '1px solid #9E9E9E',
  height: '40px',
  boxShadow: 'none',
  borderRadius: '4px',
  '&hover': {
    borderColor: '#9E9E9E',
  },
  '& .css-1dimb5e-singleValue': {
    color: theme === 'dark' ? '#F2F2F2' : '#222222',
  },
  borderRight: 'none',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
});

export const menuStyles = (defaultStyles: CSSObjectWithLabel, theme: string) => ({
  ...defaultStyles,
  boxShadow: '0 4px 20px rgb(0 0 0 / 7%)',
  borderRadius: '4px',
  height: 'auto',
  overflow: 'hidden',
  backgroundColor: theme === 'dark' ? '#2D2D2D' : '#F2F2F2F2',
  width: 'calc(100% + 40px)',
  minHeight: 30,
});

export const optionStyles = (
  defaultStyles: CSSObjectWithLabel,
  theme: string,
  state: OptionProps<ISelectOption, boolean, GroupBase<ISelectOption>>,
) => {
  const backgroundHoverForLightMode = state.isSelected
    ? state.isSelected
      ? '#9E9E9E'
      : '#F2F2F2'
    : state.isSelected
      ? '#F2F2F2'
      : '#9E9E9E';

  const backgroundHoverForDarkMode = state.isSelected
    ? state.isSelected
      ? '#F2F2F2'
      : '#9E9E9E'
    : state.isSelected
      ? '#9E9E9E'
      : '#F2F2F2';

  const colorHoverForLightMode = state.isSelected
    ? state.isSelected
      ? '#F2F2F2'
      : '#9E9E9E'
    : state.isSelected
      ? '#9E9E9E'
      : '#F2F2F2';

  const colorHoverForDarkMode = state.isSelected
    ? state.isSelected
      ? '#9E9E9E'
      : '#F2F2F2'
    : state.isSelected
      ? '#F2F2F2'
      : '#9E9E9E';

  return {
    ...defaultStyles,
    cursor: 'pointer',
    padding: '6px 12px',
    margin: 0,
    backgroundColor: theme === 'dark'
      ? state.isSelected
        ? '#F2F2F2'
        : '#2D2D2D'
      : state.isSelected
        ? '#2D2D2D'
        : '#F2F2F2',
    color: theme === 'dark'
      ? state.isSelected
        ? '#222222'
        : '#F2F2F2'
      : state.isSelected
        ? '#F2F2F2'
        : '#222222',
    '&:hover': {
      backgroundColor: theme === 'dark'
        ? backgroundHoverForDarkMode
        : backgroundHoverForLightMode,
      color: theme === 'dark'
        ? colorHoverForDarkMode
        : colorHoverForLightMode
    }
  }
}

export const inputStyles: StylesConfig<ISelectOption, boolean, GroupBase<ISelectOption>> = {
  indicatorSeparator: () => ({
    border: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 30,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#454545',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'gray',
    }
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#b9babb'
  }),
};
