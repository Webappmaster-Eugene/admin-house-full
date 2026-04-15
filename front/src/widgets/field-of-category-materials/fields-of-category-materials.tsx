'use client';

import dayjs from 'dayjs';
import isEqual from 'lodash/isEqual';
import { useSnackbar } from 'notistack';
import { useBoolean } from '@/utils/hooks/use-boolean';
import { useSettingsContext } from '@/shared/settings';
import AlertDialog from '@/shared/dialogs/alert-dialog/alert-dialog';
import { useState, useEffect, useCallback, useLayoutEffect, SetStateAction, Dispatch } from 'react';
import { templaterCreatorTexts } from '@/utils/helpers/templater-creator';
import { DeleteFieldDialogTexts, ChangeTypeFieldDialogTexts } from '@/utils/const/dialog-texts';
import { isEntityFieldTypeTypeGuard } from '@/utils/type-guards/is-entity-field-type.type-guard';
import { FieldTypeToChange } from '@/widgets/field-of-category-materials/field-type-to-change.type';
import { CellValueBeforeEdit } from '@/widgets/field-of-category-materials/cell-value-before-edit.type';
import { FieldOfCategoryMaterialEditableColumns } from '@/widgets/field-of-category-materials/editable-columns';
import { FieldOfCategoryMaterialRequiredCreateColumns } from '@/widgets/field-of-category-materials/required-columns';
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
  FieldUnitMeasurementCreateCommand,
  FieldUnitMeasurementDeleteCommand,
  FieldOfCategoryMaterialUpdateCommand,
  FieldOfCategoryMaterialCreateCommand,
  FieldVariantsForSelectorFieldTypeGetCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
  FieldVariantsForSelectorFieldTypeCreateCommand,
} from '@numart/house-admin-contracts';

import type { Theme } from '@mui/material/styles';
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
  GridEventListener,
  GridPaginationModel,
  GridToolbarContainer,
  GridRowSelectionModel,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  GridRowEditStopReasons,
  GridToolbarFilterButton,
  GridCellEditStartParams,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridToolbarProps,
  ToolbarPropsOverrides,
} from '@mui/x-data-grid';

import { isEntityFieldUnitMeasurementTG } from 'src/utils/type-guards/is-entity-field-unit-measurement.type-guard';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
import {
  CustomNoRowsOverlay,
  CustomNoResultsOverlay,
} from 'src/shared/no-rows-overlay/NoRowsOverlay';
import { createFieldUnitMeasurement } from 'src/api/actions/field-unit-measurement/create-field-unit-measurement.action';
import { deleteFieldUnitMeasurement } from 'src/api/actions/field-unit-measurement/delete-field-unit-measurement.action';
import { createFieldVariantOfFieldOfCategory } from 'src/api/actions/field-variants/create-field-variant-in-field-of-category-material.action';
import { deleteFieldVariantOfFieldOfCategory } from 'src/api/actions/field-variants/delete-field-variant-in-field-of-category-material.action';
import { DataGridCellCharacteristic } from 'src/shared/mui-data-grid/datagrid-materials-cell-characteristic/datagrid-materials-cell-characteristic';
import { DataGridCellUnitMeasurement } from 'src/shared/mui-data-grid/datagrid-materials-cell-unit-measurement/datagrid-materials-cell-unit-measurement';

import { columnsInitialState } from './table-initial-state';

export default function FieldsOfCategoryMaterials({
  fieldsOfCategoryMaterialsInfo,
}: FieldsOfCategoryMaterialsProps) {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const isDeleteFieldCategoryDialogOpen = useBoolean();
  const isChangeTypeFieldOfCategoryDialogOpen = useBoolean();
  const isChangingFieldVariantsForFieldOfCategoryDialogOpen = useBoolean();
  const startLink = process.env.NEXT_PUBLIC_FRONT_ADDRESS;

  const [fieldTypeToChange, setFieldTypeToChange] = useState<FieldTypeToChange | null>(null);
  const [cellValueBeforeEdit, setCellValueBeforeEdit] = useState<CellValueBeforeEdit | null>(null);

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
  const fullWorkspaceInfo =
    workspaceInfo?.currentWorkspaceInfo as WorkspaceGetCommand.ResponseEntity;
  const fullHandbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
  const allCategoryMaterialsOfHandbook =
    workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
  const allUnitMeasurementsOfHandbook =
    workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
  const allTypesOfFieldOfHandbook =
    workspaceInfo?.allFieldTypes as FieldTypeGetAllCommand.ResponseEntity;
  const allFieldVariantsOfHandbook = (workspaceInfo?.allFieldsVariantsOfHandbook ||
    []) as FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity;
  const workspaceId = fullWorkspaceInfo?.uuid;
  const handbookId = fullHandbookInfo?.uuid;

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
      localStorage.setItem(
        `fieldsOfCategoryMaterialsIn${handbookId}HandbookDataGridState`,
        JSON.stringify(currentState)
      );
    }
  }, [apiRef, handbookId]);

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
    const storageKey = `fieldsOfCategoryMaterialsIn${handbookId}HandbookDataGridState`;
    const stateFromLocalStorage = localStorage?.getItem(storageKey);
    setFieldsOfCategoryMaterialsMaterialsDataGridInitialState(
      stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : {}
    );

    window.addEventListener('beforeunload', saveFieldsOfCategoryMaterialsDataGridState);

    return () => {
      window.removeEventListener('beforeunload', saveFieldsOfCategoryMaterialsDataGridState);
      saveFieldsOfCategoryMaterialsDataGridState();
    };
  }, [saveFieldsOfCategoryMaterialsDataGridState, handbookId]);

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
      addRequiredColumnsToTable(FieldOfCategoryMaterialRequiredCreateColumns);

      const currentState = apiRef.current.exportState();
      const filterState = currentState.filter?.filterModel;
      filterState?.items.forEach((elem) => {
        apiRef.current.deleteFilterItem(elem);
      });

      setRows((oldRows) => {
        const newRow: TFieldsOfCategoryMaterialTableEntity = {
          [FieldOfCategoryMaterialColumnSchema.uuid]: NewFieldOfCategoryMaterialId,
          [FieldOfCategoryMaterialColumnSchema.numInOrder]: 0,
          [FieldOfCategoryMaterialColumnSchema.name]: 'Наименование поля',
          [FieldOfCategoryMaterialColumnSchema.comment]: 'Описание поля',
          [FieldOfCategoryMaterialColumnSchema.fieldType]:
            allTypesOfFieldOfHandbook.find((typeOfField) => typeOfField.jsType === 'string') ||
            allTypesOfFieldOfHandbook[0],
          [FieldOfCategoryMaterialColumnSchema.fieldVariantsForSelectorFieldType]: [],
          [FieldOfCategoryMaterialColumnSchema.fieldTypeUuid]:
            allTypesOfFieldOfHandbook.find((typeOfField) => typeOfField.jsType === 'string')
              ?.uuid || allTypesOfFieldOfHandbook[0]?.uuid,
          [FieldOfCategoryMaterialColumnSchema.defaultValue]: '',
          [FieldOfCategoryMaterialColumnSchema.isRequired]: true,
          [FieldOfCategoryMaterialColumnSchema.unitOfMeasurement]:
            allUnitMeasurementsOfHandbook?.find((unit) => unit.isDefault) ||
            allUnitMeasurementsOfHandbook[0],
          [FieldOfCategoryMaterialColumnSchema.unitOfMeasurementUuid]:
            allUnitMeasurementsOfHandbook?.find((unit) => unit.isDefault)?.uuid ||
            allUnitMeasurementsOfHandbook[0]?.uuid,
          [FieldOfCategoryMaterialColumnSchema.categoriesMaterial]: [],
          [FieldOfCategoryMaterialColumnSchema.updatedAt]: new Date(),
          [FieldOfCategoryMaterialColumnSchema.characteristicsMaterial]: [],
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
      if (!apiRef.current?.exportState) return false;
      const currentExportedState = apiRef.current.exportState();
      return !isEqual(currentExportedState, columnsInitialState);
    };

    const handleClickResetSettingsTable = () => {
      const storageKey = `fieldsOfCategoryMaterialsIn${handbookId}HandbookDataGridState`;
      localStorage.setItem(storageKey, JSON.stringify(columnsInitialState));
      apiRef.current.restoreState(columnsInitialState);
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

  // const handleClickAddNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials = () => {
  //   isChangingFieldVariantsForFieldOfCategoryDialogOpen.onTrue();
  // };

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

  const handleRowEditStop: GridEventListener<'rowEditStop'> = async (params, event: MuiEvent) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleCellEditStop = async (params: GridCellEditStopParams, event: MuiEvent) => {
    if (params.reason !== GridCellEditStopReasons.shiftTabKeyDown) {
      event.defaultMuiPrevented = true;
    }

    const rowCurrentState = apiRef.current.getRowWithUpdatedValues(params.id, params.field);

    let updateFieldOfCategoryDto: FieldOfCategoryMaterialUpdateCommand.Request;

    if (params.field === FieldOfCategoryMaterialColumnSchema.fieldType) {
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
            allFieldTypes: allTypesOfFieldOfHandbook,
            workspaceId,
            handbookId,
          },
        });
        isChangeTypeFieldOfCategoryDialogOpen.onTrue();
      }
    } else if (
      params.field === FieldOfCategoryMaterialColumnSchema.defaultValue &&
      params.value === ''
    ) {
      isChangingFieldVariantsForFieldOfCategoryDialogOpen.onTrue();
      // setFieldOfCategoryToChangeFieldVariants();
    } else if (params.field === FieldOfCategoryMaterialColumnSchema.unitOfMeasurement) {
      const newUnitMeasurementId = allUnitMeasurementsOfHandbook?.find(
        (unitMeasurement) => unitMeasurement.name === rowCurrentState[params.field]
      )?.uuid as string;
      updateFieldOfCategoryDto = { unitOfMeasurementUuid: newUnitMeasurementId };
    } else {
      updateFieldOfCategoryDto = {
        [params.field]: rowCurrentState[params.field],
      };

      const updatedRow = await fieldsOfCategoryMaterialsUpdateHandler(
        updateFieldOfCategoryDto as FieldOfCategoryMaterialUpdateCommand.Request,
        workspaceId as string,
        handbookId,
        params.row?.uuid,
        allTypesOfFieldOfHandbook
      );
      if (isErrorFieldTypeGuard(updatedRow)) {
        enqueueSnackbar('Ошибка при сохранении поля категории', { variant: 'error' });
      }
    }
  };

  const handleCellEditStart = async (params: GridCellEditStartParams, event: MuiEvent) => {
    setCellValueBeforeEdit({ id: params.id as string, value: params.value });
  };

  const handleSaveClick = async () => {
    const id = NewFieldOfCategoryMaterialId;
    const isNewRow = apiRef.current.getRow(id)?.isNew;

    if (!isNewRow) {
      enqueueSnackbar('Ошибка создания поля: строка не помечена как новая', { variant: 'error' });
      return;
    }

    const newRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');
    const createResult = await fieldOfCategoryMaterialCreateHandler(
      newRowLocally as TFieldsOfCategoryMaterialTableEntity,
      workspaceId as string,
      handbookId
    );

    if (isErrorFieldTypeGuard(createResult)) {
      enqueueSnackbar('Ошибка при создании поля категории', { variant: 'error' });
      return;
    }

    const finalRow = createResult as FieldOfCategoryMaterialCreateCommand.ResponseEntity;

    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    setIsCreateRowMode((prevValue) => !prevValue);
    setRows((oldRows) =>
      oldRows.map((row) =>
        row.uuid === id ? ({ ...finalRow, isNew: false } as TFieldsOfCategoryMaterialTableEntity) : row
      )
    );
    enqueueSnackbar('Поле категории успешно создано', { variant: 'success' });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleClickAddNewUnitMeasurement = async (
    createNewUnitMeasurementDto: FieldUnitMeasurementCreateCommand.Request
  ): Promise<FieldUnitMeasurementCreateCommand.ResponseEntity> => {
    const result = await createFieldUnitMeasurement(
      workspaceId as string,
      handbookId,
      createNewUnitMeasurementDto
    );
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Ошибка при создании единицы измерения', { variant: 'error' });
      return result as unknown as FieldUnitMeasurementCreateCommand.ResponseEntity;
    }
    return result;
  };

  const handleClickDeleteUnitMeasurement = async (
    unitMeasurementId: string
  ): Promise<FieldUnitMeasurementDeleteCommand.ResponseEntity> => {
    const result = await deleteFieldUnitMeasurement(
      workspaceId as string,
      handbookId,
      unitMeasurementId
    );
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Ошибка при удалении единицы измерения', { variant: 'error' });
      return result as unknown as FieldUnitMeasurementDeleteCommand.ResponseEntity;
    }
    return result;
  };

  const allFieldsOfCategoryMaterialsTableColumns: GridColDef[] = [
    {
      field: FieldOfCategoryMaterialColumnSchema.uuid,
      headerName: 'id',
      width: fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.uuid?.width,
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
      width: fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.numInOrder?.width,
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
        const fieldTypeNames =
          allTypesOfFieldOfHandbook && allTypesOfFieldOfHandbook.map((elem) => elem.name);
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
          (fieldVariant: FieldVariantsForSelectorFieldTypeGetCommand.ResponseEntity) => fieldVariant
        );

        return (
          <DataGridCellCharacteristic
            id={params.id}
            field={params.field}
            isSelect={isSelect}
            optionsForSelect={optionsForSelect}
            defaultValue={params?.value}
            isOnlyDigits={isOnlyDigits}
            allFieldVariantsOfHandbook={allFieldVariantsOfHandbook}
            fieldCategoryId={params.row.uuid}
            handleClickAddNewFieldVariants={handleClickAddNewFieldVariants}
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
        const fieldUnitMeasurementNames =
          allUnitMeasurementsOfHandbook && allUnitMeasurementsOfHandbook.map((elem) => elem.name);

        return fieldUnitMeasurementNames;
      },
      renderEditCell: (params) => {
        const optionsForSelect = allUnitMeasurementsOfHandbook;

        return (
          <DataGridCellUnitMeasurement
            id={params.id}
            field={params.field}
            optionsForSelect={optionsForSelect}
            defaultValue={params?.value}
            handleClickAddNewUnitMeasurement={handleClickAddNewUnitMeasurement}
            handleClickDeleteUnitMeasurement={handleClickDeleteUnitMeasurement}
          />
        );
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
        return categoriesNames?.join(', ') || 'не представлено';
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
        return categoriesNames?.join(', ') || 'не представлено';
      },
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.characteristicsMaterial,
      headerName: 'Количество привязанных характеристик',
      minWidth: 210,
      width:
        fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.characteristicsMaterial
          ?.width,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      hideable: true,
      hideSortIcons: true,
      sortable: false,
      valueGetter: (value, row) => {
        const characteristicsMaterialLength = row.characteristicsMaterial.length;
        return characteristicsMaterialLength || 'не создано';
      },
    },
    {
      field: FieldOfCategoryMaterialColumnSchema.updatedAt,
      valueGetter: (value, row) => {
        const formattedDate = dayjs(row.updatedAt).format('DD.MM.YYYY HH:mm:ss');
        return formattedDate;
      },
      headerName: 'Дата изменения',
      minWidth: 150,
      width: fieldsOfCategoryMaterialsDataGridInitialState?.columns?.dimensions?.updatedAt?.width,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      hideable: true,
      hideSortIcons: true,
      sortable: false,
    },
  ];

  const handleClickYesDeleteFieldCategoryDialog = async () => {
    const rowIdToDelete = rowSelectionModel[0];
    const rowInfo = apiRef.current.getRow(rowIdToDelete);
    await fieldsOfCategoryMaterialsDeleteHandler(workspaceId as string, handbookId, rowInfo.uuid);
    setRows(rows.filter((row) => row.uuid !== rowIdToDelete));
  };

  const handleClickAddNewFieldVariants = async (
    fieldOfCategoryMaterialId: string,
    fieldVariantForSelectorFieldTypeId?: string,
    createFieldVariantOfCategoryDto?: FieldVariantsForSelectorFieldTypeCreateCommand.Request,
    typeAction: 'add' | 'delete' = 'add'
  ) => {
    if (typeAction === 'add' && createFieldVariantOfCategoryDto) {
      const newField = await createFieldVariantOfFieldOfCategory(
        workspaceId as string,
        handbookId,
        fieldOfCategoryMaterialId,
        createFieldVariantOfCategoryDto
      );
    } else if (typeAction === 'delete' && fieldVariantForSelectorFieldTypeId) {
      const deletedField = await deleteFieldVariantOfFieldOfCategory(
        workspaceId as string,
        handbookId,
        fieldOfCategoryMaterialId,
        fieldVariantForSelectorFieldTypeId
      );
    }
  };

  const handleClickYesChangeTypeFieldOfCategory = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const newFieldType = fieldTypeToChange?.workspaceFullInfo.allFieldTypes.find(
      (elem) => elem.name === fieldTypeToChange?.newFieldTypeName
    );
    const updateFieldOfCategoryDto: FieldOfCategoryMaterialUpdateCommand.Request = {
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
            <Typography variant="h4"> Справочник полей для категорий</Typography>
            <CustomBreadcrumbs
              // heading="Carousel"
              sx={{
                paddingRight: 3,
                marginBottom: 2,
                marginTop: 1,
                width: '100%',
                maxWidth: 'xl',
              }}
              concreteCrumbs={[
                {
                  name: 'Дашборд',
                  href: `https://alibaba.hhos.ru/dashboard`,
                },
                { name: 'Поля категорий' },
              ]}
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
                  if (isCreateRowMode) {
                    return params?.row?.isNew;
                  }

                  if (params.field === 'isRequired') {
                    return params.row?.categoriesMaterialsTemplatesIncludesThisField?.length === 0;
                  }

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
                  toolbar: { setRows, setRowModesModel } as unknown as {setRows: Partial<GridToolbarProps & ToolbarPropsOverrides>, setRowModesModel: Dispatch<SetStateAction<GridRowModesModel>>},
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
                    bgcolor: (theme: Theme) =>
                      theme.palette.mode === 'light' ? `#DBDBDE35` : `rgba(9, 9, 9, 0.11)`,
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
                onRowEditStop={handleRowEditStop}
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
    </>
  );
}
