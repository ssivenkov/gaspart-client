import React, {useState} from 'react';
import {ISelectOption, TSelectOption} from "@/types/common";
import Select from "react-select";
import {optionStyles} from "@/styles/common/searchInput";
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import {createSelectOption} from "@/utils/common";
import {controlStyles, menuStyles, selectStyles} from "@/styles/pages/catalog/select";
import {
  categoryOptions,
  selectCategoryOption1,
  selectCategoryOption2,
  selectCategoryOption3
} from "@/utils/selectContents";
import {
  setBoilerParts,
  setBoilerPartsByPopularity,
  setBoilerPartsChipFirst,
  setBoilerPartsExpensiveFirst
} from "@/context/boilerParts";

const FilterSelect = () => {
  const mode = useStore($mode);
  const [categoryOption, setCategoryOption] = useState<TSelectOption>(null);

  const defaultSelectString = selectCategoryOption1;

  const handleSortOptionChange = (selectedOption: TSelectOption) => {
    setCategoryOption(selectedOption);

    switch ((selectedOption as ISelectOption).value) {
      case selectCategoryOption1:
        setBoilerPartsChipFirst();
        break;

      case selectCategoryOption2:
        setBoilerPartsExpensiveFirst();
        break;

      case selectCategoryOption3:
        setBoilerPartsByPopularity();
        break;

      default:
        break;
    }
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption(defaultSelectString)}
      onChange={handleSortOptionChange}
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
