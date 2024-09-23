import { IFileFilters, IFileFilterValue } from 'src/widgets/categories/category-materials/types';

export type CategoryFiltersProps = {
  filters: IFileFilters;
  onFilters: (name: string, value: IFileFilterValue) => void;
};
