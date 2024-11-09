import { GridInitialState } from '@mui/x-data-grid';

export const columnsInitialVisibilityModel = {
  __check__: true,
  uuid: false,
  name: true,
  numInOrder: true,
  comment: false,
  isRequired: true,
  unitOfMeasurement: true,
  defaultValue: false,
  categoriesMaterial: false,
  fieldType: true,
  fieldVariantsForSelectorFieldType: false,
  categoriesMaterialsTemplatesIncludesThisField: false,
};

export const columnsInitialState: GridInitialState = {
  columns: {
    dimensions: {
      uuid: {
        maxWidth: -1,
        minWidth: 130,
        width: 130,
      },
      numInOrder: {
        maxWidth: -1,
        minWidth: 90,
        width: 90,
      },
      name: {
        maxWidth: -1,
        minWidth: 220,
        // width: 703,
        // width: 160,
        // width: undefined,
        flex: 1,
      },
      fieldType: {
        maxWidth: -1,
        minWidth: 170,
      },
      comment: {
        maxWidth: -1,
        minWidth: 190,
        width: 190,
      },
      isRequired: {
        maxWidth: -1,
        minWidth: 140,
        width: 190,
      },
      defaultValue: {
        maxWidth: -1,
        minWidth: 100,
        width: 190,
      },
      unitOfMeasurement: {
        maxWidth: -1,
        minWidth: 100,
        width: 100,
      },
      categoriesMaterial: {
        maxWidth: -1,
        minWidth: 190,
        width: 190,
      },
      categoriesMaterialsTemplatesIncludesThisField: {
        maxWidth: -1,
        minWidth: 190,
        width: 190,
      },
      updatedAt: {
        maxWidth: -1,
        minWidth: 150,
        width: 170,
      },
      characteristicsMaterial: {
        maxWidth: -1,
        minWidth: 10,
        width: 10,
      },
    },
    columnVisibilityModel: columnsInitialVisibilityModel,
  },
  density: 'compact',
  pagination: { paginationModel: { page: 0, pageSize: 10 } },
  preferencePanel: { open: false },
  // sorting: { sortModel: [{ field: 'updatedAt', sort: 'desc' }] },
  sorting: {
    sortModel: [{ field: 'numInOrder', sort: 'asc' }],
  },
};
