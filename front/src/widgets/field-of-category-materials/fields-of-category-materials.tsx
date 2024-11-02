'use client';

import { useBoolean } from '@/utils/hooks/use-boolean';
import { useSettingsContext } from '@/shared/settings';
import { deepEqualAndIn } from '@/utils/helpers/deep-equal-and-in';
import AlertDialog from '@/shared/dialogs/alert-dialog/alert-dialog';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { templaterCreatorTexts } from '@/utils/helpers/templater-creator';
import { deepEqualAndInTableKeys } from '@/utils/helpers/deep-equal-in-tablekeys';
import { isErrorFieldTypeGuard } from '@/utils/type-guards/is-error-field.type-guard';
import { DeleteFieldDialogTexts, ChangeTypeFieldDialogTexts } from '@/utils/const/dialog-texts';
import { isEntityFieldTypeTypeGuard } from '@/utils/type-guards/is-entity-field-type.type-guard';
import { FieldTypeToChange } from '@/widgets/field-of-category-materials/field-type-to-change.type';
import { CellValueBeforeEdit } from '@/widgets/field-of-category-materials/cell-value-before-edit.type';
import { FieldOfCategoryMaterialEditableColumns } from '@/widgets/field-of-category-materials/editable-columns';
import { FieldOfCategoryMaterialRequiredCreateColumns } from '@/widgets/field-of-category-materials/required-columns';
import FormVariantsChangingDialog from '@/shared/dialogs/form-variants-changing-dialog/form-variants-changing-dialog';
import { FieldsOfCategoryMaterialsProps } from '@/widgets/field-of-category-materials/field-of-category-material.props';
import { NewFieldOfCategoryMaterialId } from '@/widgets/field-of-category-materials/new-field-of-category-material-id.const';
import { TFieldsOfCategoryMaterialTableEntity } from '@/widgets/field-of-category-materials/field-of-category-material.entity';
import { FieldOfCategoryMaterialColumnSchema } from '@/utils/tables-schemas/field-category/field-category-columns-schema.enum';
import { fieldOfCategoryMaterialCreateHandler } from '@/utils/table-handlers/fields-of-category-materials/fields-of-category-materials-create.handler';
import { fieldsOfCategoryMaterialsUpdateHandler } from '@/utils/table-handlers/fields-of-category-materials/fields-of-category-materials-update.handler';
import { fieldsOfCategoryMaterialsDeleteHandler } from '@/utils/table-handlers/fields-of-category-materials/fields-of-category-materials-delete.handler';
import {
  HandbookGetCommand,
  FieldTypeGetCommand,
  WorkspaceGetCommand,
  FieldTypeGetAllCommand,
  CategoryMaterialGetAllCommand,
  FieldUnitMeasurementGetCommand,
  FieldUnitMeasurementGetAllCommand,
  FieldOfCategoryMaterialUpdateCommand,
  FieldOfCategoryMaterialCreateCommand,
  FieldVariantsForSelectorFieldTypeGetCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
} from '@numart/house-admin-contracts';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
// import BlockIcon from '@mui/icons-material/Block';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import { ruRU } from '@mui/x-data-grid/locales';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
  GridCellEditStartParams,
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
  const isDeleteFieldCategoryDialogOpen = useBoolean();
  const isChangeTypeFieldOfCategoryDialogOpen = useBoolean();
  const isChangingFieldVariantsForFieldOfCategoryDialogOpen = useBoolean();

  const [fieldTypeToChange, setFieldTypeToChange] = useState<FieldTypeToChange | null>(null);
  const [cellValueBeforeEdit, setCellValueBeforeEdit] = useState<CellValueBeforeEdit | null>(null);

  const [valueOfDefaultValueForSelect, setValueOfDefaultValueForSelect] = useState<string>('');
  const [fieldVariantsOfCurrentFieldOfCategory, setFieldVariantsOfCurrentFieldOfCategory] =
    useState<FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity>([]);

  console.log(fieldsOfCategoryMaterialsInfo);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const fieldOfCategoryMaterialsStartDataEntity = fieldsOfCategoryMaterialsInfo.map((elem) => ({
    ...elem,
    isNew: false,
  }));

  const [rows, setRows] = useState<TFieldsOfCategoryMaterialTableEntity[]>(
    fieldOfCategoryMaterialsStartDataEntity
  );

  const [isCreateRowMode, setIsCreateRowMode] = useState<boolean>(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { workspaceInfo } = useWorkspaceInfoStore();
  const allFieldVariantsInHandbook = (workspaceInfo?.allFieldsVariantsOfHandbook ||
    []) as FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity;

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

  useEffect(() => {
    const fieldOfCategoryMaterialsStartDataEntityUpdated = fieldsOfCategoryMaterialsInfo.map(
      (elem) => ({
        ...elem,
        isNew: false,
      })
    );
    setRows(fieldOfCategoryMaterialsStartDataEntityUpdated);
  }, [fieldsOfCategoryMaterialsInfo]);

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
    const handleClickAddFieldOfCategoryMaterial = () => {
      const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
      const categoryMaterials =
        workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
      const unitMeasurements =
        workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
      const allTypesOfField = workspaceInfo?.allFieldTypes as FieldTypeGetAllCommand.ResponseEntity;

      addRequiredColumnsToTable(FieldOfCategoryMaterialRequiredCreateColumns);

      setRows((oldRows) => {
        const newRow: TFieldsOfCategoryMaterialTableEntity = {
          [FieldOfCategoryMaterialColumnSchema.uuid]: NewFieldOfCategoryMaterialId,
          [FieldOfCategoryMaterialColumnSchema.numInOrder]: 0,
          [FieldOfCategoryMaterialColumnSchema.name]: 'Наименование поля',
          [FieldOfCategoryMaterialColumnSchema.comment]: 'Описание поля',
          [FieldOfCategoryMaterialColumnSchema.fieldType]:
            allTypesOfField.find((typeOfField) => typeOfField.jsType === 'string') ||
            allTypesOfField[0],
          [FieldOfCategoryMaterialColumnSchema.fieldVariantsForSelectorFieldType]: [],
          [FieldOfCategoryMaterialColumnSchema.fieldTypeUuid]:
            allTypesOfField.find((typeOfField) => typeOfField.jsType === 'string')?.uuid ||
            allTypesOfField[0]?.uuid,
          [FieldOfCategoryMaterialColumnSchema.defaultValue]: '',
          [FieldOfCategoryMaterialColumnSchema.isRequired]: true,
          [FieldOfCategoryMaterialColumnSchema.unitOfMeasurement]:
            unitMeasurements?.find((unit) => unit.isDefault) || unitMeasurements[0],
          [FieldOfCategoryMaterialColumnSchema.categoriesMaterial]: [],
          isNew: true,
        };
        return [newRow, ...oldRows];
      });

      setIsCreateRowMode((prevMode) => !prevMode);
      setRowModesModel((oldModel) => ({
        [NewFieldOfCategoryMaterialId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        ...oldModel,
      }));

      const currentRowsIds = apiRef.current.getAllRowIds();
      currentRowsIds.forEach((rowId) => {
        apiRef.current.selectRow(rowId, false, true);
      });
    };

    const isCreateRowButtonVisible = () => {
      const newRow = apiRef.current.getRowWithUpdatedValues(NewFieldOfCategoryMaterialId, 'ignore');

      // if (
      //   newRow?.name &&
      //   typeof newRow?.categoryMaterial &&
      //   newRow?.unitMeasurement &&
      //   (newRow?.price || newRow?.price === 0)
      // ) {
      return true;
      // }
      // return false;
    };

    const isResetSettingsVisible = (): boolean => {
      const curTableState = apiRef.current.state;
      const initialState = columnsInitialState;

      const isEqColumns = !deepEqualAndIn(curTableState, initialState);

      const columnsCurrent = apiRef.current.state.columns.lookup;
      const columnsInitial = columnsInitialState.columns?.dimensions;
      const isEqWidths = deepEqualAndInTableKeys(columnsCurrent, columnsInitial);
      return isEqColumns || isEqWidths;
    };

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
            onClick={handleClickAddFieldOfCategoryMaterial}
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
              disabled={!isCreateRowButtonVisible()}
              onClick={handleSaveClick}
            >
              Подтвердить
            </Button>
          )}

          {isCreateRowMode && (
            <Button
              color="warning"
              startIcon={<BlockIcon />}
              onClick={handleCancelCreatingNewRowClick}
            >
              Отменить создание поля
            </Button>
          )}

          {isResetSettingsVisible() && !isCreateRowMode && (
            <Button
              color="warning"
              startIcon={<RestartAltIcon />}
              onClick={handleClickResetSettingsTable}
            >
              Вернуться к исходным настройкам
            </Button>
          )}
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
    isDeleteFieldCategoryDialogOpen.onTrue();
  };

  const handleCancelCreatingNewRowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const startTableState = gridStateBeforeCreate;
    const oldColumnVisibilityModel = startTableState.columns.columnVisibilityModel;

    if (typeof startTableState === 'object' && Object.keys(startTableState).length !== 0) {
      apiRef.current.restoreState(startTableState);
      apiRef.current.setColumnVisibilityModel(oldColumnVisibilityModel);
    }

    allowHideRequiredColumns(FieldOfCategoryMaterialRequiredCreateColumns, apiRef.current.state);

    handleCancelCreatingClick(NewFieldOfCategoryMaterialId);
  };

  const handleCancelCreatingClick = (id: GridRowId) => {
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

  const handleClickAddNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials = () => {
    isChangingFieldVariantsForFieldOfCategoryDialogOpen.onTrue();
  };

  // const handleCellEdit = async (
  //   rowCurrentState: GridValidRowModel,
  //   handbookInfo: HandbookGetCommand.ResponseEntity,
  //   params: GridCellEditStopParams,
  //   event: MuiEvent
  // ) => {
  //   const workspaceId = handbookInfo.workspaceUuid;
  //   const handbookId = handbookInfo.uuid;
  //   const allFieldTypes = workspaceInfo?.allFieldTypes;
  //
  //   const updateFieldOfCategoryDto: Partial<TFieldsOfCategoryMaterialTableEntity> = {
  //     [params.field]: rowCurrentState[params.field],
  //   };
  //
  //   if (params.field === 'fieldType') {
  //     updateFieldOfCategoryDto = { ...updateFieldOfCategoryDto, defaultValue: null };
  //   }
  //
  //   const updatedRow = (await fieldsOfCategoryMaterialsUpdateHandler(
  //     updateFieldOfCategoryDto as TFieldsOfCategoryMaterialTableEntity,
  //     workspaceId as string,
  //     handbookId,
  //     params.row.uuid,
  //     allFieldTypes
  //   )) as FieldOfCategoryMaterialUpdateCommand.ResponseEntity;
  //
  //   setValueOfDefaultValueForSelect('');
  //
  //   if (params.reason !== GridCellEditStopReasons.shiftTabKeyDown) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };

  const handleCellEditStop = async (params: GridCellEditStopParams, event: MuiEvent) => {
    const rowCurrentState = apiRef.current.getRowWithUpdatedValues(params.id, params.field);
    const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    const currentWorkspaceInfo =
      workspaceInfo?.currentWorkspaceInfo as WorkspaceGetCommand.ResponseEntity;
    const workspaceId = currentWorkspaceInfo.uuid;
    const handbookId = handbookInfo.uuid;
    const allFieldTypes = workspaceInfo?.allFieldTypes as FieldTypeGetAllCommand.ResponseEntity;

    if (params.field === 'fieldType') {
      const oldFieldOfCategory = fieldsOfCategoryMaterialsInfo.find(
        (row) => row.uuid === params.id
      );
      const oldFieldTypeName = oldFieldOfCategory?.fieldType?.name;
      const newFieldTypeName = rowCurrentState[params.field];
      if (oldFieldTypeName !== newFieldTypeName) {
        setFieldTypeToChange({
          idOfFieldOfCategoryRow: params.id as string,
          oldFieldOfCategory,
          updatedFieldOfCategory: rowCurrentState,
          params,
          oldFieldTypeName,
          newFieldTypeName,
          workspaceFullInfo: {
            allFieldTypes,
            workspaceId,
            handbookId,
          },
        });
        isChangeTypeFieldOfCategoryDialogOpen.onTrue();
      }
    } else if (params.field === 'defaultValue' && params.value === '') {
      isChangingFieldVariantsForFieldOfCategoryDialogOpen.onTrue();
    } else {
      const updateFieldOfCategoryDto: Partial<TFieldsOfCategoryMaterialTableEntity> = {
        [params.field]: rowCurrentState[params.field],
      };

      const updatedRow = (await fieldsOfCategoryMaterialsUpdateHandler(
        updateFieldOfCategoryDto as TFieldsOfCategoryMaterialTableEntity,
        workspaceId as string,
        handbookId,
        params.row.uuid,
        allFieldTypes
      )) as FieldOfCategoryMaterialUpdateCommand.ResponseEntity;

      setValueOfDefaultValueForSelect('');

      if (params.reason !== GridCellEditStopReasons.shiftTabKeyDown) {
        event.defaultMuiPrevented = true;
      }
    }
  };

  const handleCellEditStart = async (params: GridCellEditStartParams, event: MuiEvent) => {
    setCellValueBeforeEdit({ id: params.id as string, value: params.value });
  };

  const handleSaveClick = async () => {
    const id = NewFieldOfCategoryMaterialId;
    const isNewRow = apiRef.current.getRow(id)?.isNew;
    let finalRow: FieldOfCategoryMaterialCreateCommand.ResponseEntity;

    const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    const unitMeasurements =
      workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
    const workspaceId = handbookInfo.workspaceUuid;
    const handbookId = handbookInfo.uuid;
    if (isNewRow) {
      const newRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');
      finalRow = (await fieldOfCategoryMaterialCreateHandler(
        newRowLocally as TFieldsOfCategoryMaterialTableEntity,
        workspaceId as string,
        handbookId,
        unitMeasurements
      )) as FieldOfCategoryMaterialCreateCommand.ResponseEntity;
    } else {
      throw new Error('isNewRow = false, problem with creating a new row');
    }

    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    setIsCreateRowMode((prevValue) => !prevValue);
    setRows((oldRows) => {
      const updatedRow = {
        ...finalRow,
        isNew: false,
      } as TFieldsOfCategoryMaterialTableEntity;
      return oldRows.map((row) => (row.uuid === id ? updatedRow : row));
    });
  };

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
      valueGetter: (value: FieldTypeGetCommand.ResponseEntity, row) =>
        isEntityFieldTypeTypeGuard(value) ? value.name : value,
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
      renderEditCell: (params) => {
        const isSelect = params.row?.fieldType?.jsType === 'array';
        const isOnlyDigits = params.row?.fieldType?.jsType === 'number';
        const optionsForSelect = params.row?.fieldVariantsForSelectorFieldType?.map(
          (fieldVariant: FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity) =>
            fieldVariant.value
        );

        const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const newValue = event.target.value;
          setValueOfDefaultValueForSelect(newValue);

          if (isSelect && optionsForSelect.includes(newValue)) {
            params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
          } else {
            params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
          }
        };

        return isSelect ? (
          <TextField
            onChange={handleChange}
            select
            sx={{ width: '100%' }}
            value={params.value || valueOfDefaultValueForSelect}
            // defaultValue={params.value}
          >
            {optionsForSelect
              .map((option: string) => (
                <MenuItem sx={{ width: '100%' }} key={option} value={option}>
                  {option}
                </MenuItem>
              ))
              .concat(
                <MenuItem
                  sx={{ width: '100%', fontSize: '12px' }}
                  key="addNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials"
                  value=""
                  onClick={
                    handleClickAddNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials
                  }
                >
                  <AddIcon sx={{ maxWidth: '13px' }} /> Добавить
                </MenuItem>
              )}
          </TextField>
        ) : (
          <TextField
            onChange={handleChange}
            value={params.value || valueOfDefaultValueForSelect}
            // defaultValue={params.value}
            type={isOnlyDigits ? 'number' : 'text'}
          />
        );
      },
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
    {
      field: FieldOfCategoryMaterialColumnSchema.categoriesMaterial,
      headerName: 'Используется в категориях',
      minWidth: 190,
      width:
        fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.categoriesMaterial
          ?.width,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueGetter: (categories: CategoryMaterialGetAllCommand.ResponseEntity, row) => {
        const categoriesNames = categories?.map((category) => category?.name);
        return categoriesNames?.join(', ');
      },
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.categoriesMaterialsTemplatesIncludesThisField,
      headerName: 'Используется в наименовании категорий',
      minWidth: 190,
      width:
        fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions
          ?.categoriesMaterialsTemplatesIncludesThisField?.width,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueGetter: (
        categoriesMaterialsTemplatesIncludesThisField: CategoryMaterialGetAllCommand.ResponseEntity,
        row
      ) => {
        const categoriesNames = categoriesMaterialsTemplatesIncludesThisField?.map(
          (category) => category.name
        );
        return categoriesNames ? categoriesNames?.join(', ') : '';
      },
    },
  ];

  const handleClickYesDeleteFieldCategoryDialog = async () => {
    const rowIdToDelete = rowSelectionModel[0];
    const rowInfo = apiRef.current.getRow(rowIdToDelete);
    const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    const workspaceId = handbookInfo.workspaceUuid;
    const handbookId = handbookInfo.uuid;
    await fieldsOfCategoryMaterialsDeleteHandler(workspaceId as string, handbookId, rowInfo.uuid);
    setRows(rows.filter((row) => row.uuid !== rowIdToDelete));
  };

  const handleClickYesChangeTypeFieldOfCategory = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newFieldType = fieldTypeToChange?.workspaceFullInfo.allFieldTypes.find(
      (elem) => elem.name === fieldTypeToChange?.newFieldTypeName
    );
    const updateFieldOfCategoryDto: Partial<TFieldsOfCategoryMaterialTableEntity> = {
      fieldTypeUuid: newFieldType?.uuid || fieldTypeToChange?.updatedFieldOfCategory?.fieldTypeUuid,
      defaultValue: null,
    };

    const updatedRow = (await fieldsOfCategoryMaterialsUpdateHandler(
      updateFieldOfCategoryDto as TFieldsOfCategoryMaterialTableEntity,
      fieldTypeToChange?.workspaceFullInfo.workspaceId as string,
      fieldTypeToChange?.workspaceFullInfo.handbookId as string,
      fieldTypeToChange?.idOfFieldOfCategoryRow as string,
      fieldTypeToChange?.workspaceFullInfo?.allFieldTypes as FieldTypeGetAllCommand.ResponseEntity
    )) as FieldOfCategoryMaterialUpdateCommand.ResponseEntity;

    if (!isErrorFieldTypeGuard(updatedRow)) {
      const fieldOfCategoryMaterialsUpdatedDataEntity = fieldsOfCategoryMaterialsInfo.map(
        (elem) => ({
          ...elem,
          isNew: false,
        })
      );

      // setRows(
      // (oldRows) =>
      // oldRows.map((row) => {
      //   console.log(row.uuid === fieldTypeToChange?.idOfFieldOfCategoryRow);
      //   if (row.uuid === fieldTypeToChange?.idOfFieldOfCategoryRow) {
      //     row.defaultValue = '';
      //     return row;
      //   }
      //   return row;
      // })
      // fieldOfCategoryMaterialsUpdatedDataEntity;
      // );
    }

    setValueOfDefaultValueForSelect('');
  };

  const onClickYesDeleteFieldCategoryDialog = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    await handleClickYesDeleteFieldCategoryDialog();
    isDeleteFieldCategoryDialogOpen.onFalse();
  };

  const onClickYesChangeTypeFieldOfCategoryDialog = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    await handleClickYesChangeTypeFieldOfCategory(event);
    isChangeTypeFieldOfCategoryDialogOpen.onFalse();
    setFieldTypeToChange(null);
    setCellValueBeforeEdit(null);
  };

  const onClickNoChangeTypeFieldOfCategoryDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRows((oldRows) =>
      oldRows.map((row) => {
        if (cellValueBeforeEdit && row.uuid === cellValueBeforeEdit.id) {
          row.fieldType = cellValueBeforeEdit?.value as FieldTypeGetCommand.ResponseEntity;
          return row;
        }
        return row;
      })
    );
    setFieldTypeToChange(null);
    setCellValueBeforeEdit(null);
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
                loading={!workspaceInfo || !fieldsOfCategoryMaterialsInfo || !rows}
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
                  return isNewRow || (isCellInEditableColumn && !isCreateRowMode);
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
                isRowSelectable={(params: GridRowParams) => !isCreateRowMode}
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
                onCellEditStart={handleCellEditStart}
              />
            </Box>
          </>
        ) : (
          <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
        )}
      </Container>

      {isDeleteFieldCategoryDialogOpen && (
        <AlertDialog
          isDialogOpen={isDeleteFieldCategoryDialogOpen}
          onClickYes={onClickYesDeleteFieldCategoryDialog}
          titleDialog={DeleteFieldDialogTexts.titleDialog}
          textDialog={templaterCreatorTexts(
            DeleteFieldDialogTexts.textDialog,
            rowSelectionModel[0] as string
          )}
        />
      )}

      <AlertDialog
        isDialogOpen={isChangeTypeFieldOfCategoryDialogOpen}
        onClickYes={onClickYesChangeTypeFieldOfCategoryDialog}
        titleDialog={ChangeTypeFieldDialogTexts.titleDialog}
        textDialog={templaterCreatorTexts(ChangeTypeFieldDialogTexts.textDialog, [
          fieldTypeToChange?.idOfFieldOfCategoryRow,
          fieldTypeToChange?.oldFieldTypeName,
          fieldTypeToChange?.newFieldTypeName,
        ])}
        onClickNo={onClickNoChangeTypeFieldOfCategoryDialog}
      />

      {allFieldVariantsInHandbook && (
        <FormVariantsChangingDialog
          options={allFieldVariantsInHandbook}
          dialog={isChangingFieldVariantsForFieldOfCategoryDialogOpen}
        />
      )}
    </>
  );
}
