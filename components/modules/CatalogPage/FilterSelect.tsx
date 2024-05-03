import React, {useEffect, useState} from 'react';
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
  $boilerParts,
  setBoilerPartsByPopularity,
  setBoilerPartsChipFirst,
  setBoilerPartsExpensiveFirst
} from "@/context/boilerParts";
import {useRouter} from "next/router";
import {FilterQuery} from "@/constants";

const FilterSelect = () => {
  const mode = useStore($mode);
  const boilerParts = useStore($boilerParts);
  const [categoryOption, setCategoryOption] = useState<TSelectOption>(null);
  const router = useRouter();
  const defaultSelectString = selectCategoryOption1;

  const updateRouteParam = (first: string) => {
    router.push(
      {
        query: {
          ...router.query,
          first
        }
      },
      undefined,
      { shallow: true }
    );
  }

  const handleSortOptionChange = (selectedOption: TSelectOption) => {
    setCategoryOption(selectedOption);

    switch ((selectedOption as ISelectOption).value) {
      case selectCategoryOption1:
        setBoilerPartsChipFirst();
        updateRouteParam(FilterQuery.CHEAP);
        break;

      case selectCategoryOption2:
        setBoilerPartsExpensiveFirst();
        updateRouteParam(FilterQuery.EXPENSIVE);
        break;

      case selectCategoryOption3:
        setBoilerPartsByPopularity();
        updateRouteParam(FilterQuery.POPULAR);
        break;

      default:
        break;
    }
  }

  const updateCategoryOption = (value: string) => {
    setCategoryOption({ value, label: value })
  }

  useEffect(() => {
    if (boilerParts.rows) {
      switch (router.query.first) {
        case FilterQuery.CHEAP:
          updateCategoryOption(selectCategoryOption1);
          setBoilerPartsChipFirst();
          break;

        case FilterQuery.EXPENSIVE:
          updateCategoryOption(selectCategoryOption2);
          setBoilerPartsExpensiveFirst();
          break;

        case FilterQuery.POPULAR:
          updateCategoryOption(selectCategoryOption3);
          setBoilerPartsByPopularity();
          break;

        default:
          updateCategoryOption(selectCategoryOption1);
          setBoilerPartsChipFirst();
          break;
      }
    }
  }, [boilerParts.rows, router.query.first]);

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
