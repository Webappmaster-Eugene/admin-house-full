import { CategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import { IFileFilters } from 'src/widgets/categories/category-materials/types';

export function applyFilterHandler({
  inputData,
  comparator,
  filters,
}: {
  inputData?: CategoryMaterialGetAllCommand.ResponseEntity;
  comparator: (a: any, b: any) => number;
  filters: IFileFilters;
}) {
  const { name } = filters;

  const stabilizedThis = inputData?.map((el, index) => [el, index] as const);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (stabilizedThis && stabilizedThis?.length > 0) {
    inputData = stabilizedThis?.map((el) => el[0]);
  }

  if (name && Array.isArray(inputData)) {
    inputData = inputData?.filter(
      (file) => file.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
