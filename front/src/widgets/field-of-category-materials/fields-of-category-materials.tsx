'use client';

import { useBoolean } from '@/utils/hooks/use-boolean';
import { useSettingsContext } from '@/shared/settings';
import { useState, useCallback, useLayoutEffect } from 'react';
import { DeleteFieldDialogTexts } from '@/utils/const/dialog-texts';
import AlertDialog from '@/shared/dialogs/alert-dialog/alert-dialog';
import { templaterCreatorTexts } from '@/utils/helpers/templater-creator';
import { FieldOfCategoryMaterialEditableColumns } from '@/widgets/field-of-category-materials/editable-columns';
import { FieldOfCategoryMaterialRequiredCreateColumns } from '@/widgets/field-of-category-materials/required-columns';
import { FieldsOfCategoryMaterialsProps } from '@/widgets/field-of-category-materials/field-of-category-material.props';
import { NewFieldOfCategoryMaterialId } from '@/widgets/field-of-category-materials/new-field-of-category-material-id.const';
import { TFieldsOfCategoryMaterialTableEntity } from '@/widgets/field-of-category-materials/field-of-category-material.entity';
import { FieldOfCategoryMaterialColumnSchema } from '@/utils/tables-schemas/field-category/field-category-columns-schema.enum';
import {
  HandbookGetCommand,
  FieldTypeGetCommand,
  FieldTypeGetAllCommand,
  CategoryMaterialGetAllCommand,
  FieldUnitMeasurementGetCommand,
  FieldUnitMeasurementGetAllCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@numart/house-admin-contracts';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import { ruRU } from '@mui/x-data-grid/locales';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  MuiEvent,
  GridRowId,
  GridSlots,
  GridState,
  GridColDef,
  gridClasses,
  GridRowModes,
  useGridApiRef,
  GridRowParams,
  GridInitialState,
  GridRowModesModel,
  GridToolbarExport,
  GridPaginationModel,
  GridToolbarContainer,
  GridRowSelectionModel,
  GridCellEditStopParams,
  GridToolbarFilterButton,
  GridCellEditStopReasons,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from '@mui/x-data-grid';

import { isEntityFieldUnitMeasurementTG } from 'src/utils/type-guards/is-entity-field-unit-measurement.type-guard';

import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
import {
  CustomNoRowsOverlay,
  CustomNoResultsOverlay,
} from 'src/shared/no-rows-overlay/NoRowsOverlay';

import { columnsInitialState } from './table-initial-state';

export default function FieldsOfCategoryMaterials({
  fieldsOfCategoryMaterialsInfo,
}: FieldsOfCategoryMaterialsProps) {
  const settings = useSettingsContext();
  const isDialogOpen = useBoolean();

  console.log(fieldsOfCategoryMaterialsInfo);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const fieldOfCategoryMaterialsEntity = fieldsOfCategoryMaterialsInfo.map((elem) => ({
    ...elem,
    isNew: false,
  }));
  const [rows, setRows] = useState<TFieldsOfCategoryMaterialTableEntity[]>(
    fieldOfCategoryMaterialsEntity
  );
  const [isCreateRowMode, setIsCreateRowMode] = useState<boolean>(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { workspaceInfo } = useWorkspaceInfoStore();

  const apiRef = useGridApiRef();
  const [gridStateBeforeCreate, setGridStateBeforeCreate] = useState<GridState>(
    apiRef.current.state
  );
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>();

  const [
    fieldsOfCategoryMaterialsDataGridInitialState,
    setFieldsOfCategoryMaterialsMaterialsDataGridInitialState,
  ] = useState<GridInitialState>();

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const saveFieldsOfCategoryMaterialsDataGridState = useCallback(() => {
    if (apiRef?.current?.exportState && localStorage) {
      const currentState = apiRef.current.exportState();
      localStorage.setItem('fieldsOfCategoryMaterialsDataGridState', JSON.stringify(currentState));
    }
  }, [apiRef]);

  useLayoutEffect(() => {
    const stateFromLocalStorage = localStorage?.getItem('fieldsOfCategoryMaterialsDataGridState');
    setFieldsOfCategoryMaterialsMaterialsDataGridInitialState(
      stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : {}
    );

    // handle refresh and navigating away/refreshing
    window.addEventListener('beforeunload', saveFieldsOfCategoryMaterialsDataGridState);

    return () => {
      // in case of an SPA remove the event-listener
      window.removeEventListener('beforeunload', saveFieldsOfCategoryMaterialsDataGridState);
      saveFieldsOfCategoryMaterialsDataGridState();
    };
  }, [saveFieldsOfCategoryMaterialsDataGridState]);

  const addRequiredColumnsToTable = (requiredCreateColumns: string[]): void => {
    const tableStateAtStart = apiRef.current.state;
    setGridStateBeforeCreate(tableStateAtStart);
    const initialColumnVisibilityModel = tableStateAtStart?.columns.columnVisibilityModel;
    const visibleColumns = apiRef.current.getVisibleColumns().map((column) => column.field);
    const isSubArray = requiredCreateColumns.every((arrElem) => visibleColumns.includes(arrElem));
    if (!isSubArray) {
      const startValue: Record<string, boolean> = {};
      const newColumnVisibilityModel = requiredCreateColumns.reduce((acc, curValue) => {
        acc[curValue] = true;
        return acc;
      }, startValue);
      const finalNewColumnVisibilityModel = {
        ...initialColumnVisibilityModel,
        ...newColumnVisibilityModel,
      };
      apiRef.current.setColumnVisibilityModel(finalNewColumnVisibilityModel);
    }
    restrictHideRequiredColumns(requiredCreateColumns, tableStateAtStart);
  };

  // DOC сделать hideable=false для всех обязательных столбцов
  const restrictHideRequiredColumns = (
    requiredCreateColumns: string[],
    tableStateAtStart: GridState
  ) => {
    requiredCreateColumns.forEach((column) => {
      const requiredFieldInTable = tableStateAtStart.columns.lookup[column];
      requiredFieldInTable.hideable = false;
    });
  };

  // DOC сделать hideable=true для всех обязательных столбцов
  const allowHideRequiredColumns = (
    requiredCreateColumns: string[],
    tableStateCurrent: GridState
  ) => {
    requiredCreateColumns.forEach((column) => {
      const requiredFieldInTable = tableStateCurrent.columns.lookup[column];
      requiredFieldInTable.hideable = true;
    });
  };

  const editToolbar = () => {
    // const handleClickAddMaterial = () => {
    //   const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    //   const responsiblePartners =
    //     handbookInfo.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
    //   const categoryMaterials =
    //     workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
    //   const unitMeasurements =
    //     workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
    //
    //   addRequiredColumnsToTable(MaterialRequiredCreateColumns);
    //
    //   setRows((oldRows) => {
    //     const newRow: TFieldsOfCategoryMaterialTableEntity = {
    //       [FieldOfCategoryMaterialColumnSchema.uuid]: NewFieldOfCategoryMaterialId,
    //       [FieldOfCategoryMaterialColumnSchema.numInOrder]: 9999999,
    //       [FieldOfCategoryMaterialColumnSchema.name]: 'Наименование поля',
    //       [FieldOfCategoryMaterialColumnSchema.comment]: 'Описание поля',
    //       // [FieldOfCategoryMaterialColumnSchema.fieldType]: 'Описание нового материала',
    //       // [FieldOfCategoryMaterialColumnSchema.fieldVariantsForSelectorFieldType]: '',
    //       [FieldOfCategoryMaterialColumnSchema.defaultValue]: 'Значение по умолчанию',
    //       // [FieldOfCategoryMaterialColumnSchema.isRequired]: responsiblePartners[0],
    //       // [FieldOfCategoryMaterialColumnSchema.unitOfMeasurement]: '',
    //       // [FieldOfCategoryMaterialColumnSchema.categoriesMaterial]: '',
    //       isNew: true,
    //     };
    //     return [newRow, ...oldRows];
    //   });
    //
    //   setIsCreateRowMode((prevMode) => !prevMode);
    //   setRowModesModel((oldModel) => ({
    //     [NewFieldOfCategoryMaterialId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    //     ...oldModel,
    //   }));
    //
    //   const currentRowsIds = apiRef.current.getAllRowIds();
    //   currentRowsIds.forEach((rowId) => {
    //     apiRef.current.selectRow(rowId, false, true);
    //   });
    // };

    // const isCreateRowButtonVisible = () => {
    //   const newRow = apiRef.current.getRowWithUpdatedValues(NewFieldOfCategoryMaterialId, 'ignore');
    //
    //   if (
    //     newRow?.name &&
    //     typeof newRow?.categoryMaterial &&
    //     newRow?.unitMeasurement &&
    //     (newRow?.price || newRow?.price === 0)
    //   ) {
    //     return true;
    //   }
    //   return false;
    // };

    // const isResetSettingsVisible = (): boolean => {
    //   const curTableState = apiRef.current.state;
    //   const initialState = columnsInitialState;
    //
    //   const isEqColumns = !deepEqualAndIn(curTableState, initialState);
    //
    //   const columnsCurrent = apiRef.current.state.columns.lookup;
    //   const columnsInitial = columnsInitialState.columns?.dimensions;
    //   const isEqWidths = deepEqualAndInTableKeys(columnsCurrent, columnsInitial);
    //   return isEqColumns || isEqWidths;
    // };

    const handleClickResetSettingsTable = () => {
      apiRef.current.restoreState(columnsInitialState);
      localStorage.setItem(
        'fieldsOfCategoryMaterialsDataGridState',
        JSON.stringify(columnsInitialState)
      );
    };

    const isDeleteRowVisible = (): boolean => {
      const rowsIdToDelete = rowSelectionModel;
      return rowsIdToDelete.length > 0;
    };

    return (
      <GridToolbarContainer
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>
          <Button
            color="primary"
            disabled={isCreateRowMode}
            startIcon={<AddIcon />}
            // onClick={handleClickAddMaterial}
          >
            Создать поле
          </Button>

          {isDeleteRowVisible() && (
            <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeleteRowClick}>
              Удалить
            </Button>
          )}

          {isCreateRowMode && (
            <Button
              color="primary"
              startIcon={<CheckIcon />}
              // disabled={!isCreateRowButtonVisible()}
              // onClick={handleSaveClick}
            >
              Подтвердить
            </Button>
          )}

          {isCreateRowMode && (
            <Button color="warning" startIcon={<BlockIcon />} onClick={handleCancelRowClick}>
              Отменить создание поля
            </Button>
          )}

          {/* {isResetSettingsVisible() && !isCreateRowMode && ( */}
          {/*  <Button */}
          {/*    color="warning" */}
          {/*    startIcon={<RestartAltIcon />} */}
          {/*    onClick={handleClickResetSettingsTable} */}
          {/*  > */}
          {/*    Вернуться к исходным настройкам */}
          {/*  </Button> */}
          {/* )} */}
        </Box>

        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <Box sx={{ flexGrow: 1 }} />
          <GridToolbarExport
            slotProps={{
              tooltip: { title: 'Выгрузить данные' },
              button: { variant: 'outlined' },
            }}
          />
        </GridToolbarContainer>
      </GridToolbarContainer>
    );
  };

  const handleDeleteRowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    isDialogOpen.onTrue();
  };

  const handleCancelRowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const startTableState = gridStateBeforeCreate;
    const oldColumnVisibilityModel = startTableState.columns.columnVisibilityModel;

    if (typeof startTableState === 'object' && Object.keys(startTableState).length !== 0) {
      apiRef.current.restoreState(startTableState);
      apiRef.current.setColumnVisibilityModel(oldColumnVisibilityModel);
    }

    allowHideRequiredColumns(FieldOfCategoryMaterialRequiredCreateColumns, apiRef.current.state);

    handleCancelClick(NewFieldOfCategoryMaterialId);
  };

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.uuid === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.uuid !== id));
    }

    setIsCreateRowMode((prevValue) => !prevValue);
  };

  const handleCellEditStop = async (params: GridCellEditStopParams, event: MuiEvent) => {
    const rowCurrentState = apiRef.current.getRowWithUpdatedValues(params.id, params.field);
    const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    const workspaceId = handbookInfo.workspaceUuid;
    const handbookId = handbookInfo.uuid;

    // const updatedRow = (await fieldsOfCategoryMaterialsUpdateHandler(
    //   { [params.field]: rowCurrentState[params.field] } as TFieldsOfCategoryMaterialTableEntity,
    //   workspaceId as string,
    //   handbookId,
    //   params.row.categoryMaterialUuid,
    //   params.row.uuid
    // )) as FieldOfCategoryMaterialUpdateCommand.ResponseEntity;

    if (params.reason !== GridCellEditStopReasons.shiftTabKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  // const handleSaveClick = async () => {
  //   const id = NewFieldOfCategoryMaterialId;
  //   const isNewRow = apiRef.current.getRow(id)?.isNew;
  //   let finalRow: string | FieldOfCategoryMaterialCreateCommand.ResponseEntity | ErrorFromBackend =
  //     '';
  //
  //   const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
  //   const responsiblePartners =
  //     handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
  //   const categoryMaterials =
  //     workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
  //   const unitMeasurements =
  //     workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
  //   const workspaceId = handbookInfo.workspaceUuid;
  //   const handbookId = handbookInfo.uuid;
  //   if (isNewRow) {
  //     const newRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');
  //     finalRow = (await fieldsOfCategoryMaterialsCreateHandler(
  //       newRowLocally as TFieldsOfCategoryMaterialTableEntity,
  //       workspaceId as string,
  //       handbookId,
  //       responsiblePartners,
  //       categoryMaterials,
  //       unitMeasurements
  //     )) as MaterialCreateCommand.ResponseEntity;
  //   } else {
  //     throw new Error('isNewRow = false, problem with creating a new row');
  //   }
  //
  //   setRowModesModel({
  //     ...rowModesModel,
  //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
  //   });
  //   setIsCreateRowMode((prevValue) => !prevValue);
  //   setRows((oldRows) => {
  //     const updatedRow = {
  //       ...finalRow,
  //       isNew: false,
  //     } as TMaterialTableEntity;
  //     return oldRows.map((row) => (row.uuid === id ? updatedRow : row));
  //   });
  // };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const allFieldsOfCategoryMaterialsTableColumns: GridColDef[] = [
    {
      field: FieldOfCategoryMaterialColumnSchema.uuid,
      headerName: 'id',
      width: 130,
      sortable: false,
      filterable: false,
      resizable: false,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
      disableReorder: true,
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.numInOrder,
      headerName: 'Номер п/п',
      minWidth: 90,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.name,
      headerName: 'Наименование',
      minWidth: 220,
      width: fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.name?.width,
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      hideable: false,
      hideSortIcons: true,
      sortable: false,
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.fieldType,
      headerName: 'Тип поля',
      minWidth: 170,
      width: fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.fieldType?.width,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      type: 'singleSelect',
      valueOptions: (params) => {
        const fieldTypes = workspaceInfo?.allFieldTypes as FieldTypeGetAllCommand.ResponseEntity;
        const fieldTypeNames = fieldTypes && fieldTypes.map((elem) => elem.name);

        return fieldTypeNames;
      },
      valueGetter: (value: FieldTypeGetCommand.ResponseEntity, row) => value.name,
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.comment,
      headerName: 'Описание',
      minWidth: 190,
      width: fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.comment?.width,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.isRequired,
      headerName: 'Обязательность заполнения',
      minWidth: 140,
      width: fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.isRequired?.width,
      type: 'boolean',
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.defaultValue,
      headerName: 'Значение по умолчанию',
      align: 'left',
      headerAlign: 'left',
      minWidth: 100,
      width:
        fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.defaultValue?.width,
      editable: true,
      // renderCell: (params) => {
      //   const rowWithValues = apiRef.current.getRowWithUpdatedValues(params.row.uuid, '');
      //   console.log(params);
      //   console.log(rowWithValues);
      //   return <>111</>;
      // },
      // valueParser: (value, row, column, apiRefCurrent) => value.toLowerCase(),
      // renderEditCell: (params) => {
      //   const rowWithValues = apiRef.current.getRowWithUpdatedValues(params.row.uuid, '');
      //   if (rowWithValues.fieldType.jsType === 'number') {
      //     params.
      //   }
      // },
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.unitOfMeasurement,
      headerName: 'Ед. изм.',
      align: 'left',
      headerAlign: 'left',
      minWidth: 100,
      width:
        fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.unitOfMeasurement
          ?.width,
      editable: true,
      type: 'singleSelect',
      valueOptions: (params) => {
        const fieldUnitMeasurements =
          workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
        const fieldUnitMeasurementNames =
          fieldUnitMeasurements && fieldUnitMeasurements.map((elem) => elem.name);

        return fieldUnitMeasurementNames;
      },
      valueGetter: (value: FieldUnitMeasurementGetCommand.ResponseEntity, row) =>
        isEntityFieldUnitMeasurementTG(value) ? value.name : value,
    },
    // {
    //   field: FieldOfCategoryMaterialColumnSchema.characteristicsMaterial,
    //   valueGetter: (value, row) => {
    //     const {
    //       characteristicsMaterial,
    //     }: { characteristicsMaterial: CharacteristicsMaterialGetAllCommand.ResponseEntity } = row;
    //     let finishValue = 'Характеристики отсутствуют';
    //     if (characteristicsMaterial && characteristicsMaterial.length > 0) {
    //       finishValue = '';
    //       let counter = 1;
    //       const allFieldUnitMeasurements =
    //         workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
    //       const allFieldsOfCategoryMaterial =
    //         workspaceInfo?.allFieldsOfCategoryMaterialsOfHandbook as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
    //
    //       finishValue = characteristicsMaterial.reduce((acc, curValue) => {
    //         const thisCharateristicFieldOfCategoryMaterial = allFieldsOfCategoryMaterial.find(
    //           (elem) => elem.uuid === curValue.fieldOfCategoryMaterialUuid
    //         );
    //
    //         let thisCharateristicUnitMeasurementName: string;
    //         if (allFieldUnitMeasurements && !isErrorFieldTypeGuard(allFieldUnitMeasurements)) {
    //           thisCharateristicUnitMeasurementName = thisCharateristicFieldOfCategoryMaterial
    //             ?.unitOfMeasurement?.name as string;
    //           acc += `${counter}) ${thisCharateristicFieldOfCategoryMaterial?.name} = ${curValue.value}${thisCharateristicUnitMeasurementName && thisCharateristicUnitMeasurementName !== '-' ? ` (${thisCharateristicUnitMeasurementName}); ` : '; '}`;
    //         }
    //
    //         counter += 1;
    //         return acc;
    //       }, finishValue);
    //     }
    //     return finishValue;
    //   },
    //   headerName: 'Характеристики',
    //   align: 'left',
    //   headerAlign: 'left',
    //   minWidth: 250,
    //   width:
    //     fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.characteristicsMaterial
    //       ?.width,
    // }
  ];

  const handleClickDialogYesDeleteRow = async () => {
    const rowIdToDelete = rowSelectionModel[0];
    const rowInfo = apiRef.current.getRow(rowIdToDelete);
    const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
    const categoryMaterials =
      workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
    const workspaceId = handbookInfo.workspaceUuid;
    const handbookId = handbookInfo.uuid;
    // await materialDeleteHandler(rowInfo, workspaceId as string, handbookId, categoryMaterials);
    setRows(rows.filter((row) => row.uuid !== rowIdToDelete));
  };

  const onClickYesDialog = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await handleClickDialogYesDeleteRow();
    isDialogOpen.onFalse();
  };

  return (
    <>
      <Container maxWidth="xl">
        {fieldsOfCategoryMaterialsDataGridInitialState ? (
          <>
            <Typography variant="h4"> Справочник полей категорий материалов</Typography>
            <CustomBreadcrumbs
              // heading="Carousel"
              sx={{
                paddingRight: 3,
                marginBottom: 2,
                marginTop: 1,
                width: '100%',
                maxWidth: 'xl',
              }}
            />

            <Box sx={{ width: '100%' }}>
              <DataGrid
                apiRef={apiRef}
                localeText={{
                  columnsManagementReset: 'Сбросить',
                  columnsManagementShowHideAllText: 'Показать/скрыть все',
                  ...ruRU.components.MuiDataGrid.defaultProps.localeText,
                }}
                initialState={{
                  ...columnsInitialState,
                  ...fieldsOfCategoryMaterialsDataGridInitialState,
                }}
                rows={rows}
                columns={[
                  {
                    ...GRID_CHECKBOX_SELECTION_COL_DEF,
                    hideable: false,
                    headerName: 'Выбор строки',
                    cellClassName: 'MuiDataGrid-cellCheckbox',
                    headerClassName: 'MuiDataGrid-columnHeaderCheckbox',
                  },
                  ...allFieldsOfCategoryMaterialsTableColumns,
                ]}
                getRowId={(row) => row.uuid}
                loading={!workspaceInfo}
                editMode={isCreateRowMode ? 'row' : 'cell'}
                pageSizeOptions={[5, 10, 20, 50, 100]}
                paginationModel={paginationModel}
                onPaginationModelChange={(paginationModelGrid) =>
                  setPaginationModel(paginationModelGrid)
                }
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                isCellEditable={(params) => {
                  const isCellInEditableColumn = FieldOfCategoryMaterialEditableColumns.includes(
                    params.field
                  );
                  const isNewRow = params.row?.isNew;
                  return isNewRow || isCellInEditableColumn;
                }}
                // slots={{ toolbar: GridToolbar }}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
                  noResultsOverlay: CustomNoResultsOverlay,
                  toolbar: editToolbar as GridSlots['toolbar'],
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel },
                }}
                autoHeight
                getRowHeight={() => 'auto'}
                isRowSelectable={(params: GridRowParams) => {
                  if (!isCreateRowMode) {
                    return true;
                  }

                  return false;
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                sx={{
                  [`& .${gridClasses.cell}`]: {
                    border: 'none',
                    minHeight: '50px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  },
                  '& .MuiDataGrid-cell--editable': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? `#DBDBDE24` : `rgba(9, 9, 9, 0.11)`,
                  },
                }}
                disableRowSelectionOnClick
                checkboxSelection
                disableMultipleRowSelection
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => {
                  setColumnVisibilityModel(newModel);
                }}
                onCellEditStop={handleCellEditStop}
              />
            </Box>
          </>
        ) : (
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        )}
      </Container>

      {isDialogOpen && (
        <AlertDialog
          isDialogOpen={isDialogOpen}
          onClickYes={onClickYesDialog}
          titleDialog={DeleteFieldDialogTexts.titleDialog}
          textDialog={templaterCreatorTexts(
            DeleteFieldDialogTexts.textDialog,
            rowSelectionModel[0] as string
          )}
        />
      )}
    </>
  );
}
