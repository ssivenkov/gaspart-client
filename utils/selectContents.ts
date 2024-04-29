import {createSelectOption} from "@/utils/common";

export const selectCategoryOption1 = 'Сначала дешевые';
export const selectCategoryOption2 = 'Сначала дорогие';
export const selectCategoryOption3 = 'По популярности';

export const categoryOptions = [
  selectCategoryOption1,
  selectCategoryOption2,
  selectCategoryOption3
].map(createSelectOption);
