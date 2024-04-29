import React, {useState} from 'react';
import {TSelectOption} from "@/types/common";
import Select from "react-select";
import {optionStyles} from "@/styles/common/searchInput";
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import {createSelectOption} from "@/utils/common";
import styles from '@/styles/pages/catalog/index.module.scss';
import {controlStyles, menuStyles, selectStyles} from "@/styles/pages/catalog/select";
import {categoryOptions} from "@/utils/selectContents";

const FilterSelect = () => {
  const mode = useStore($mode);
  const [categoryOption, setCategoryOption] = useState<TSelectOption>(null);

  const defaultSelectString = 'Сначала дешевые';

  const handleSearchOptionChange = (selectedOption: TSelectOption) => {
    setCategoryOption(selectedOption);
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption(defaultSelectString)}
      onChange={handleSearchOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#F2F2F2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        })
      }}
      isSearchable={false}
      options={categoryOptions}
    />
  );
};

export default FilterSelect;
