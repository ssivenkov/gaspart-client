import React, {useState} from 'react';
import {useStore} from "effector-react";
import {$mode} from "@/context/mode";
import Select from "react-select";
import {TSelectOption} from "@/types/common";
import {
  controlStyles,
  inputStyles,
  menuStyles,
  optionStyles
} from "@/styles/common/searchInput";

const SearchInput = () => {
  const mode = useStore($mode);
  const [searchOption, setSearchOption] = useState<TSelectOption>(null);

  const handleSearchOptionChange = (selectedOption: TSelectOption) => {
    setSearchOption(selectedOption);
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...inputStyles,
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
      isClearable={true}
      openMenuOnClick={false}
      options={[1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15].map((item) => ({ value: item, label: item }))}
    />
  );
};

export default SearchInput;
