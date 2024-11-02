import { GridInitialState } from '@mui/x-data-grid';

export const columnsInitialVisibilityModel = {
  __check__: true,
  categoryMaterial: true,
  unitMeasurement: true,
  price: true,
  updatedAt: false,
  uuid: false,
  numInOrder: false,
  characteristicsMaterial: false,
  comment: false,
  namePublic: false,
  priceChanges: false,
  responsiblePartner: false,
  sourceInfo: false,
};

export const columnsInitialState: GridInitialState = {
  columns: {
    dimensions: {
      categoryMaterial: {
        maxWidth: -1,
        minWidth: 50,
        width: 100,
      },
      characteristicsMaterial: {
        maxWidth: -1,
        minWidth: 50,
        width: 250,
      },
      comment: {
        maxWidth: -1,
        minWidth: 50,
        width: 190,
      },
      name: {
        maxWidth: -1,
        minWidth: 220,
        // width: 703,
        // width: 160,
        // width: undefined,
        flex: 1,
      },
      namePublic: {
        maxWidth: -1,
        minWidth: 170,
        width: 100,
      },
      price: {
        maxWidth: -1,
        minWidth: 50,
        width: 100,
        // flex: 0,
      },
      priceChanges: {
        maxWidth: -1,
        minWidth: 50,
        width: 130,
      },
      responsiblePartner: {
        maxWidth: -1,
        minWidth: 50,
        width: 110,
        // flex: 0,
      },
      sourceInfo: {
        maxWidth: -1,
        minWidth: 50,
        width: 150,
      },
      numInOrder: {
        maxWidth: -1,
        minWidth: 90,
        width: 100,
      },
      unitMeasurement: {
        maxWidth: -1,
        minWidth: 50,
        width: 100,
      },
      updatedAt: {
        maxWidth: -1,
        minWidth: 50,
        width: 170,
      },
    },
    columnVisibilityModel: columnsInitialVisibilityModel,
  },
  density: 'compact',
  // pagination: { paginationModel: { page: 0, pageSize: 10 } },
  preferencePanel: { open: false },
  sorting: {
    sortModel: [{ field: 'numInOrder', sort: 'asc' }],
  },
};
