'use client';

import moment from 'moment';
import { useBoolean } from '@/utils/hooks/use-boolean';
import { useSettingsContext } from '@/shared/settings';
import AlertDialog from '@/shared/dialogs/alert-dialog/alert-dialog';
import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { templaterCreatorTexts } from '@/utils/helpers/templater-creator';
import { NewMaterialId } from '@/widgets/materials/new-material-id.const';
import { MaterialEditableColumns } from '@/widgets/materials/editable-columns';
import { MaterialRequiredCreateColumns } from '@/widgets/materials/required-columns';
import {
  HandbookGetCommand,
  MaterialCreateCommand,
  MaterialUpdateCommand,
  FieldTypeGetAllCommand,
  PriceChangingGetAllCommand,
  CategoryMaterialGetCommand,
  CategoryMaterialGetAllCommand,
  MaterialUpdateCategoryCommand,
  FieldUnitMeasurementGetCommand,
  FieldUnitMeasurementGetAllCommand,
  CharacteristicsMaterialGetCommand,
  FieldUnitMeasurementCreateCommand,
  FieldUnitMeasurementDeleteCommand,
  GlobalCategoryMaterialGetAllCommand,
  CharacteristicsMaterialGetAllCommand,
  ResponsiblePartnerProducerGetCommand,
  FieldOfCategoryMaterialGetAllCommand,
  CharacteristicsMaterialCreateCommand,
  ResponsiblePartnerProducerGetAllCommand,
  FieldVariantsForSelectorFieldTypeGetAllCommand,
  FieldVariantsForSelectorFieldTypeCreateCommand,
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
import RestartAltIcon from '@mui/icons-material/RestartAlt';
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
  GridEventListener,
  GridPaginationModel,
  GridToolbarContainer,
  GridRowSelectionModel,
  GridCellEditStopParams,
  GridRowEditStopReasons,
  GridToolbarFilterButton,
  GridCellEditStopReasons,
  GridToolbarColumnsButton,
  GridColumnVisibilityModel,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from '@mui/x-data-grid';

import { toRubles } from 'src/utils/helpers/intl';
import { UuidRegexForTest } from 'src/utils/regex/uuid.regex';
import { deepEqualAndIn } from 'src/utils/helpers/deep-equal-and-in';
import { DeleteMaterialDialogTexts } from 'src/utils/const/dialog-texts';
import { EntityActivityStatus } from 'src/utils/const/entity-activity-status.enum';
import { deepEqualAndInTableKeys } from 'src/utils/helpers/deep-equal-in-tablekeys';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import { materialDeleteHandler } from 'src/utils/table-handlers/materials/material-delete.handler';
import { materialCreateHandler } from 'src/utils/table-handlers/materials/material-create.handler';
import { MaterialColumnSchema } from 'src/utils/tables-schemas/material/material-columns-schema.enum';
import { isEntityCategoryMaterialTG } from 'src/utils/type-guards/is-entity-category-material.type-guard';
import { isEntityResponsiblePartnerTG } from 'src/utils/type-guards/is-entity-responsible-partner.type-guard';
import { isEntityFieldUnitMeasurementTG } from 'src/utils/type-guards/is-entity-field-unit-measurement.type-guard';

import { MaterialsProps } from 'src/widgets/materials/material.props';
import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
import { TMaterialTableEntity } from 'src/widgets/materials/material.entity';
import { columnsInitialState } from 'src/widgets/materials/table-initial-state';
import { updateMaterial } from 'src/api/actions/material/update-material.action';
import CreateCategoryForm from 'src/shared/popups/create-category-form/create-category-form';
import { updateMaterialCategory } from 'src/api/actions/material/update-material-category.action';
import {
  CustomNoRowsOverlay,
  CustomNoResultsOverlay,
} from 'src/shared/no-rows-overlay/NoRowsOverlay';
import { getConcreteMaterialInHandbook } from 'src/api/actions/material/get-concrete-material-in-handbook.action';
import { createFieldUnitMeasurement } from 'src/api/actions/field-unit-measurement/create-field-unit-measurement.action';
import { deleteFieldUnitMeasurement } from 'src/api/actions/field-unit-measurement/delete-field-unit-measurement.action';
import { deleteCharacteristicOfMaterial } from 'src/api/actions/characteristics/delete-characteristic-of-material.action';
import { createCharacteristicOfMaterial } from 'src/api/actions/characteristics/create-characteristic-of-material.action';
import { DataGridCellCategory } from 'src/shared/mui-data-grid/datagrid-materials-cell-category/datagrid-materials-cell-category';
import { createFieldVariantOfFieldOfCategory } from 'src/api/actions/field-variants/create-field-variant-in-field-of-category-material.action';
import { deleteFieldVariantOfFieldOfCategory } from 'src/api/actions/field-variants/delete-field-variant-in-field-of-category-material.action';
import { getAllFieldUnitMeasurementsOfHandbook } from 'src/api/actions/field-unit-measurement/get-all-field-unit-measurements-of-handbook.action';
import { DataGridCellCharacteristic } from 'src/shared/mui-data-grid/datagrid-materials-cell-characteristic/datagrid-materials-cell-characteristic';
import { DataGridCellUnitMeasurement } from 'src/shared/mui-data-grid/datagrid-materials-cell-unit-measurement/datagrid-materials-cell-unit-measurement';
import { renderCellExpandWithIcon } from 'src/shared/mui-data-grid/datagrid-materials-cell-name/components/datagrid-materials-cell-name/datagrid-materials-cell-name-with-icon.export';

export default function Materials({
  materialsInfo,
  additionalFields,
  currentCategory,
}: MaterialsProps) {
  const settings = useSettingsContext();
  const isDialogOpen = useBoolean();
  const isDialogCreateNewCategoryOpen = useBoolean();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const allMaterialsEntity = materialsInfo.map((elem) => {
    let materialToRow = { ...elem, isNew: false };
    if (elem && elem?.characteristicsMaterial) {
      // @ts-ignore
      const characteristicsOfCurrentMaterial = elem?.characteristicsMaterial?.reduce(
        (acc: CharacteristicsMaterialGetAllCommand.ResponseEntity, curValue) => {
          // @ts-ignore
          acc[curValue?.fieldOfCategoryMaterialUuid] = curValue;
          return acc;
        },
        {}
      );

      if (characteristicsOfCurrentMaterial) {
        materialToRow = { ...materialToRow, ...characteristicsOfCurrentMaterial };
      }
    }
    return materialToRow;
  });

  const [rows, setRows] = useState<TMaterialTableEntity[]>(allMaterialsEntity);
  const [isCreateRowMode, setIsCreateRowMode] = useState<boolean>(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { workspaceInfo } = useWorkspaceInfoStore();

  useEffect(() => {
    const allMaterialsInfoUpdatedEntity = materialsInfo.map((elem) => {
      let materialToRow = { ...elem, isNew: false };
      if (elem && elem?.characteristicsMaterial) {
        // @ts-ignore
        const characteristicsOfCurrentMaterial = elem?.characteristicsMaterial?.reduce(
          (acc: CharacteristicsMaterialGetAllCommand.ResponseEntity, curValue) => {
            // @ts-ignore
            acc[curValue?.fieldOfCategoryMaterialUuid] = curValue;
            return acc;
          },
          {}
        );

        if (characteristicsOfCurrentMaterial) {
          materialToRow = { ...materialToRow, ...characteristicsOfCurrentMaterial };
        }
      }
      return materialToRow;
    });
    setRows(allMaterialsInfoUpdatedEntity);
  }, [materialsInfo, additionalFields]);

  const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
  const responsiblePartners =
    handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
  const allFieldsOfCategoryMaterialInHandbook =
    workspaceInfo?.allFieldsOfCategoryMaterialsOfHandbook as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  const allFieldTypesInWorkspace =
    workspaceInfo?.allFieldTypes as FieldTypeGetAllCommand.ResponseEntity;
  const allCategoryMaterialsInHandbook =
    workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
  const allUnitMeasurementsInHandbook =
    workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
  const allFieldVariantsOfHandbook = (workspaceInfo?.allFieldsVariantsOfHandbook ||
    []) as FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity;
  const allGlobalCategories = (workspaceInfo?.allGlobalCategories ||
    []) as GlobalCategoryMaterialGetAllCommand.ResponseEntity;
  const workspaceId = handbookInfo?.workspaceUuid;
  const handbookId = handbookInfo?.uuid;

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
    } else {
      console.log(`Произошла ошибка при запросе: ${fieldOfCategoryMaterialId}
       ${fieldVariantForSelectorFieldTypeId}
        ${createFieldVariantOfCategoryDto}
        ${typeAction}`);
    }
  };

  const handleClickAddNewCategory = () => {
    isDialogCreateNewCategoryOpen.onTrue();
  };

  const handleCreateCategoryPopupClose = () => {
    isDialogCreateNewCategoryOpen.onFalse();
  };

  let fieldsOfCurrentCategoryToTable: GridColDef[] = [];
  if (additionalFields) {
    fieldsOfCurrentCategoryToTable = additionalFields.map((fieldOfCurrentCategory) => {
      const fieldTypeOfCellInColumnInTable = allFieldTypesInWorkspace?.find(
        (field) => field.uuid === fieldOfCurrentCategory?.fieldTypeUuid
      );
      return {
        field: fieldOfCurrentCategory.uuid,
        headerName: fieldOfCurrentCategory.name,
        minWidth: 90,
        align: 'left',
        filterable: false,
        hideable: false,
        sortable: false,
        disableColumnMenu: true,
        disableReorder: true,
        headerAlign: 'left',
        type: fieldTypeOfCellInColumnInTable?.jsType === 'array' ? 'singleSelect' : 'string',
        editable: true,
        valueGetter: (value: CharacteristicsMaterialGetCommand.ResponseEntity, row) => value?.value,
        valueOptions: (params) => {
          const fieldVariantsForSelectorFieldTypeOfField =
            allFieldsOfCategoryMaterialInHandbook?.find(
              (field) => field.uuid === params.field
            )?.fieldVariantsForSelectorFieldType;
          return fieldVariantsForSelectorFieldTypeOfField?.map((field) => field.value);
        },
        renderEditCell: (params) => {
          const currentFieldOfCategoryMaterialInRow = allFieldsOfCategoryMaterialInHandbook?.find(
            (field) => field.uuid === params.field
          );

          const isSelect = currentFieldOfCategoryMaterialInRow?.fieldType?.jsType === 'array';
          const isOnlyDigits = currentFieldOfCategoryMaterialInRow?.fieldType?.jsType === 'number';
          const fieldVariantsForSelectorFieldType =
            currentFieldOfCategoryMaterialInRow?.fieldVariantsForSelectorFieldType;

          const optionsForSelect = fieldVariantsForSelectorFieldType?.map(
            (fieldVariant) => fieldVariant
          ) as FieldVariantsForSelectorFieldTypeGetAllCommand.ResponseEntity;

          return (
            <DataGridCellCharacteristic
              id={params.id}
              field={params.field}
              isSelect={isSelect}
              optionsForSelect={optionsForSelect}
              defaultValue={params?.value}
              isOnlyDigits={isOnlyDigits}
              allFieldVariantsOfHandbook={allFieldVariantsOfHandbook}
              fieldCategoryId={params.field}
              handleClickAddNewFieldVariants={handleClickAddNewFieldVariants}
            />
          );
        },
      };
    });
  }

  const apiRef = useGridApiRef();
  const [gridStateBeforeCreate, setGridStateBeforeCreate] = useState<GridState>(
    apiRef.current.state
  );
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>();

  const [materialsDataGridInitialState, setMaterialsDataGridInitialState] =
    useState<GridInitialState>();

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const saveMaterialsDataGridState = useCallback(() => {
    if (apiRef?.current?.exportState) {
      const currentState = apiRef.current.exportState();
      if (currentCategory) {
        localStorage.setItem(
          `allMaterialsIn${currentCategory.uuid}CategoryIn${handbookId}HandbookDataGridState`,
          JSON.stringify(currentState)
        );
      } else {
        localStorage.setItem(
          `allMaterialsIn${handbookId}HandbookDataGridState`,
          JSON.stringify(currentState)
        );
      }
    }
  }, [apiRef]);

  useLayoutEffect(() => {
    const stateFromLocalStorage = localStorage?.getItem('materialsDataGridState');
    setMaterialsDataGridInitialState(
      stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : {}
    );

    // handle refresh and navigating away/refreshing
    window.addEventListener('beforeunload', saveMaterialsDataGridState);

    return () => {
      // in case of an SPA remove the event-listener
      window.removeEventListener('beforeunload', saveMaterialsDataGridState);
      saveMaterialsDataGridState();
    };
  }, [saveMaterialsDataGridState]);

  const addRequiredColumnsToTable = (requiredCreateColumns: string[]): void => {
    const tableStateAtStart = apiRef.current.state;
    setGridStateBeforeCreate(tableStateAtStart);
    const initialColumnVisibilityModel = tableStateAtStart?.columns.columnVisibilityModel;
    // const allColumnsOfTable = apiRef.current.getAllColumns();
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
    const handleClickAddMaterial = () => {
      addRequiredColumnsToTable(MaterialRequiredCreateColumns);
      const currentState = apiRef.current.exportState();
      const filterState = currentState.filter?.filterModel;
      filterState?.items.forEach((elem) => {
        apiRef.current.deleteFilterItem(elem);
      });

      const currentCategoryToDefaultChange =
        currentCategory ||
        allCategoryMaterialsInHandbook.filter(
          (categoryMaterial) => categoryMaterial.name === 'Общая'
        )[0];

      setRows((oldRows) => {
        const newRow: TMaterialTableEntity = {
          [MaterialColumnSchema.uuid]: NewMaterialId,
          [MaterialColumnSchema.numInOrder]: 0,
          [MaterialColumnSchema.name]: 'Наименование материала',
          [MaterialColumnSchema.namePublic]: 'Сокр. наименование',
          [MaterialColumnSchema.comment]: 'Описание нового материала',
          [MaterialColumnSchema.price]: 0,
          [MaterialColumnSchema.sourceInfo]: 'Укажите источник',
          [MaterialColumnSchema.responsiblePartner]: responsiblePartners[0],
          [MaterialColumnSchema.categoryMaterial]: currentCategoryToDefaultChange,
          [MaterialColumnSchema.unitMeasurement]: allUnitMeasurementsInHandbook.filter(
            (unitMeasurement) => unitMeasurement.name === 'отсутствует'
          )[0],
          [MaterialColumnSchema.unitMeasurementUuid]: allUnitMeasurementsInHandbook.filter(
            (unitMeasurement) => unitMeasurement.name === 'отсутствует'
          )[0]?.uuid,
          [MaterialColumnSchema.priceChanges]: [],
          [MaterialColumnSchema.characteristicsMaterial]: [],
          [MaterialColumnSchema.updatedAt]: new Date(),
          isNew: true,
        };
        if (additionalFields && additionalFields?.length !== 0) {
          additionalFields.forEach((field, index) => {
            const fieldId = field.uuid;
            if (field?.defaultValue) {
              newRow[fieldId] = { uuid: index, value: field?.defaultValue };
            }
          });
        }
        return [newRow, ...oldRows];
      });

      setIsCreateRowMode((prevMode) => !prevMode);
      setRowModesModel((oldModel) => ({
        [NewMaterialId]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        ...oldModel,
      }));

      const currentRowsIds = apiRef.current.getAllRowIds();
      currentRowsIds.forEach((rowId) => {
        apiRef.current.selectRow(rowId, false, true);
      });

      const currentRowsState = apiRef.current.state;
      console.log(currentRowsState);
      // currentRowsModels.forEach((rowModel) => {
      //   console.log(rowModel);
      //   // apiRef.current.selectRow(rowId, false, true);
      // });
    };

    const isCreateRowButtonVisible = () => {
      const newRow = apiRef.current.getRowWithUpdatedValues(NewMaterialId, 'ignore');

      if (
        newRow?.name &&
        typeof newRow?.categoryMaterial &&
        newRow?.unitMeasurement &&
        (newRow?.price || newRow?.price === 0)
      ) {
        return true;
      }
      return false;
    };

    const isResetSettingsVisible = (): boolean => {
      const curTableState = apiRef.current.state;
      const initialState = columnsInitialState;

      const isNotEqWithDefaultColumns = !deepEqualAndIn(curTableState, initialState);

      const columnsCurrent = apiRef.current.state.columns.lookup;
      const columnsInitial = columnsInitialState.columns?.dimensions;
      const isNotEqWithDefaultWidthsOfColumns = deepEqualAndInTableKeys(
        columnsCurrent,
        columnsInitial
      );
      return isNotEqWithDefaultColumns || isNotEqWithDefaultWidthsOfColumns;
    };

    const handleClickResetSettingsTable = () => {
      localStorage.setItem('materialsDataGridState', JSON.stringify(columnsInitialState));
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
            onClick={handleClickAddMaterial}
          >
            Добавить материал
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
            <Button color="warning" startIcon={<BlockIcon />} onClick={handleCancelRowClick}>
              Отменить создание материала
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
    isDialogOpen.onTrue();
  };

  const handleCancelRowClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const startTableState = gridStateBeforeCreate;
    const oldColumnVisibilityModel = startTableState.columns.columnVisibilityModel;
    if (typeof startTableState === 'object' && Object.keys(startTableState).length !== 0) {
      apiRef.current.restoreState(startTableState);
      apiRef.current.setColumnVisibilityModel(oldColumnVisibilityModel);
    }

    allowHideRequiredColumns(MaterialRequiredCreateColumns, apiRef.current.state);

    handleCancelClick(NewMaterialId);
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

  // const handleEditClick = (id: GridRowId) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  // };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = async (params, event: MuiEvent) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleCellEditStop = async (params: GridCellEditStopParams, event: MuiEvent) => {
    const rowCurrentState = apiRef.current.getRowWithUpdatedValues(params.id, params.field);

    let updateValueDto: MaterialUpdateCommand.Request = {};

    if (params.field === MaterialColumnSchema.unitMeasurement) {
      const newUnitMeasurementId = allUnitMeasurementsInHandbook?.find(
        (unitMeasurement) => unitMeasurement.name === rowCurrentState[params.field]
      )?.uuid as string;
      updateValueDto = { unitMeasurementUuid: newUnitMeasurementId };
    } else if (UuidRegexForTest.test(params.field)) {
      const categoryMaterialId = params.row?.categoryMaterialUuid;
      const materialId = params.row?.uuid;
      const characteristicId = params.row[params.field]?.uuid;
      const fieldCategoryMaterialId = params?.field;
      const createCharacteristicMaterialDto: CharacteristicsMaterialCreateCommand.Request = {
        value: rowCurrentState[params.field] as string,
        characteristicsMaterialStatus: EntityActivityStatus.ACTIVE,
      };

      // apiRef.current.setEditCellValue({
      //   id: params.id,
      //   field: params.field,
      //   value: rowCurrentState[params.field],
      //   debounceMs: 200,
      // });

      setRows((prevValue) =>
        prevValue.map((elem) => {
          if (elem.uuid === params.id) {
            const characteristic = elem.characteristicsMaterial?.find(
              (element) => element.fieldOfCategoryMaterialUuid === params.field
            );
            if (characteristic) {
              characteristic.value = rowCurrentState[params.field];
            }
          }
          return elem;
        })
      );

      if (characteristicId) {
        await deleteCharacteristicOfMaterial(
          workspaceId as string,
          handbookId,
          categoryMaterialId,
          materialId,
          characteristicId
        );
      }

      const newCharacteristic = await createCharacteristicOfMaterial(
        workspaceId as string,
        handbookId,
        categoryMaterialId,
        materialId,
        fieldCategoryMaterialId,
        createCharacteristicMaterialDto
      );
    } else if (
      params.field === MaterialColumnSchema.categoryMaterial &&
      allCategoryMaterialsInHandbook
    ) {
      const newCategoryId = allCategoryMaterialsInHandbook?.find(
        (categoryMaterial) => categoryMaterial.name === rowCurrentState[params.field]
      )?.uuid;
      if (newCategoryId) {
        const updateCategoryOfMaterialDto: MaterialUpdateCategoryCommand.Request = {
          categoryMaterialUuid: newCategoryId,
        };
        const materialWithUpdatedCategoryRow = (await updateMaterialCategory(
          workspaceId as string,
          handbookId,
          params.row.categoryMaterialUuid,
          params.row.uuid,
          updateCategoryOfMaterialDto
        )) as MaterialUpdateCategoryCommand.ResponseEntity;
        console.log(materialWithUpdatedCategoryRow);
      }
    } else {
      updateValueDto = {
        [params.field]: rowCurrentState[params.field],
      };
    }

    if (Object.keys(updateValueDto).length) {
      const updatedRow = (await updateMaterial(
        workspaceId as string,
        handbookId,
        params.row.categoryMaterialUuid,
        params.row.uuid,
        updateValueDto
      )) as MaterialUpdateCommand.ResponseEntity;
      // const updatedRow = (await materialUpdateHandler(
      //   updateValueDto,
      //   workspaceId as string,
      //   handbookId,
      //   params.row.categoryMaterialUuid,
      //   params.row.uuid
      // ))
    }

    if (params.reason !== GridCellEditStopReasons.shiftTabKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveClick = async () => {
    const id = NewMaterialId;
    const isNewRow = apiRef.current.getRow(id)?.isNew;
    let finalRow: MaterialCreateCommand.ResponseEntity;

    if (isNewRow) {
      const newRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');

      finalRow = (await materialCreateHandler(
        newRowLocally as TMaterialTableEntity,
        workspaceId as string,
        handbookId,
        responsiblePartners,
        allCategoryMaterialsInHandbook,
        allUnitMeasurementsInHandbook
      )) as MaterialCreateCommand.ResponseEntity;

      const allCharacteristicsForMaterial = Object.entries(newRowLocally).map(
        async ([key, value]) => {
          if (UuidRegexForTest.test(key) && value) {
            const createCharacteristicMaterialDto: CharacteristicsMaterialCreateCommand.Request = {
              value,
              characteristicsMaterialStatus: EntityActivityStatus.ACTIVE,
            };

            const newMaterialCharacteristic = (await createCharacteristicOfMaterial(
              workspaceId as string,
              handbookId,
              finalRow.categoryMaterialUuid,
              finalRow.uuid,
              key,
              createCharacteristicMaterialDto
            )) as CharacteristicsMaterialCreateCommand.ResponseEntity;
            return newMaterialCharacteristic;
          }
        }
      );
    } else {
      throw new Error('isNewRow = false, problem with creating a new row');
    }

    const finalRowWithChangesAndCharacteristics = (await getConcreteMaterialInHandbook(
      workspaceId as string,
      handbookId,
      finalRow.categoryMaterialUuid,
      finalRow.uuid
    )) as MaterialCreateCommand.ResponseEntity;

    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    setIsCreateRowMode((prevValue) => !prevValue);
    setRows((oldRows) => {
      const updatedRow = {
        ...finalRowWithChangesAndCharacteristics,
        isNew: false,
      } as TMaterialTableEntity;
      return oldRows.map((row) => (row.uuid === id ? updatedRow : row));
    });
  };

  // const handleDeleteClick = (id: GridRowId) => async () => {
  //   const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
  //   handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
  //   const categoryMaterials =
  //     workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
  //   const workspaceId = handbookInfo.workspaceUuid;
  //   const handbookId = handbookInfo.uuid;
  //   const rowLocally = apiRef.current.getRow(id);
  //   await fieldsOfCategoryMaterialsDeleteHandler(rowLocally, workspaceId as string, handbookId, categoryMaterials);
  //   setRows(rows.filter((row) => row.uuid !== id));
  // };

  // const processRowUpdate = (newRow: TMaterialTableEntity) => {
  //   const updatedRow = { ...newRow, isNew: false };
  //   setRows(rows.map((row) => (row.uuid === newRow.uuid ? updatedRow : row)));
  //   return updatedRow;
  // };

  // const handleProcessRowUpdateError = (error: Error) => {
  //   console.error('error while update row in table of materials', error);
  // };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleClickAddNewUnitMeasurement = async (
    createNewUnitMeasurementDto: FieldUnitMeasurementCreateCommand.Request
  ) => {
    const newFieldUnitMeasurement = (await createFieldUnitMeasurement(
      workspaceId as string,
      handbookId,
      createNewUnitMeasurementDto
    )) as FieldUnitMeasurementCreateCommand.ResponseEntity;
    return newFieldUnitMeasurement;
  };

  const handleClickDeleteUnitMeasurement = async (unitMeasurementId: string) => {
    const oldFieldUnitMeasurement = (await deleteFieldUnitMeasurement(
      workspaceId as string,
      handbookId,
      unitMeasurementId
    )) as FieldUnitMeasurementDeleteCommand.ResponseEntity;
    return oldFieldUnitMeasurement;
  };

  const allMaterialsTableColumns: GridColDef[] = [
    {
      field: MaterialColumnSchema.uuid,
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
      field: MaterialColumnSchema.numInOrder,
      headerName: 'Номер п/п',
      minWidth: 90,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: MaterialColumnSchema.name,
      headerName: 'Наименование',
      minWidth: 220,
      width: materialsDataGridInitialState?.columns?.dimensions?.name?.width,
      flex: 1,
      // width: materialsDataGridInitialState?.columns?.dimensions?.name?.width,
      // flex: materialsDataGridInitialState?.columns?.dimensions?.name?.width ? undefined : 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      hideable: false,
      hideSortIcons: true,
      // resizable: true,
      sortable: false,
      renderCell: (params) =>
        renderCellExpandWithIcon(
          params,
          allCategoryMaterialsInHandbook as CategoryMaterialGetAllCommand.ResponseEntity
        ),
    },
    {
      field: MaterialColumnSchema.namePublic,
      headerName: 'Сокращенно',
      minWidth: 170,
      width: materialsDataGridInitialState?.columns?.dimensions?.namePublic?.width,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      // renderHeader: (params) => (
      //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
      //   </Box>
      // ),
    },
    {
      field: MaterialColumnSchema.comment,
      headerName: 'Описание',
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.comment?.width,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      // renderHeader: (params) => (
      //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
      //   </Box>
      // ),
    },
    {
      field: MaterialColumnSchema.price,
      valueFormatter: (value) => toRubles(Number(value)),
      headerName: 'Цена',
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.price?.width,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      editable: true,
      // renderHeader: (params) => (
      //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
      //   </Box>
      // ),
    },
    {
      field: MaterialColumnSchema.sourceInfo,
      // flex: 1,
      headerName: 'Источник цены',
      valueGetter: (value, row) => {
        let finishValue = 'Источник не указан';
        if (value) {
          finishValue = value;
        }
        return finishValue;
      },
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.sourceInfo?.width,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      // renderHeader: (params) => (
      //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
      //   </Box>
      // ),
    },
    {
      field: MaterialColumnSchema.responsiblePartner,
      type: 'singleSelect',
      valueOptions: (params) => {
        const responsiblePartnerNames =
          responsiblePartners && responsiblePartners.map((elem) => elem.name);

        return responsiblePartnerNames;
      },
      valueGetter: (value: ResponsiblePartnerProducerGetCommand.ResponseEntity, row) =>
        isEntityResponsiblePartnerTG(value) ? value.name : value,
      headerName: 'Поставщик',
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.responsiblePartner?.width,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      // renderHeader: (params) => (
      //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
      //   </Box>
      // ),
    },
    {
      field: MaterialColumnSchema.categoryMaterial,
      headerName: 'Категория',
      align: 'left',
      headerAlign: 'left',
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.categoryMaterial?.width,
      editable: !currentCategory,
      sortable: !currentCategory,
      filterable: !currentCategory,
      type: 'singleSelect',
      valueOptions: (params) => {
        const categoryNames =
          allCategoryMaterialsInHandbook && allCategoryMaterialsInHandbook.map((elem) => elem.name);

        return categoryNames;
      },
      renderEditCell: (params) => {
        const optionsForSelect =
          allCategoryMaterialsInHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
        const isSelect = true;

        return (
          <DataGridCellCategory
            id={params.id}
            field={params.field}
            isSelect={isSelect}
            optionsForSelect={optionsForSelect}
            defaultValue={params?.value}
            handleClickAddNewCategory={handleClickAddNewCategory}
          />
        );
      },
      valueGetter: (value: TMaterialTableEntity, row) =>
        isEntityCategoryMaterialTG(value) ? value.name : value,
    },
    {
      field: MaterialColumnSchema.unitMeasurement,
      headerName: 'Ед. изм.',
      align: 'left',
      headerAlign: 'left',
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.unitMeasurement?.width,
      editable: true,
      type: 'singleSelect',
      valueOptions: (params) => {
        const fieldUnitMeasurementNames =
          allUnitMeasurementsInHandbook &&
          allUnitMeasurementsInHandbook?.map((elem: any) => elem.name);

        return fieldUnitMeasurementNames;
      },
      renderEditCell: (params) => {
        const optionsForSelect = allUnitMeasurementsInHandbook;

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
      field: MaterialColumnSchema.priceChanges,
      valueGetter: (value, row) => {
        const prices: PriceChangingGetAllCommand.ResponseEntity = row.priceChanges;
        let finishValue = 'Изменений цены не было';
        if (prices && prices.length > 0) {
          finishValue = '';
          let counter = 1;
          finishValue = prices.reduce((acc, curValue) => {
            acc += `${counter}) Старая цена: ${curValue.oldPrice}, новая цена: ${curValue.newPrice} от ${curValue.createdAt}`;
            acc += curValue?.source ? ` источник - ${curValue.source}; ` : '; ';
            counter += 1;
            return acc;
          }, finishValue);
        }
        return finishValue;
      },
      headerName: 'Изменения цены',
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.priceChanges?.width,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: MaterialColumnSchema.characteristicsMaterial,
      valueGetter: (value, row) => {
        const {
          characteristicsMaterial,
        }: { characteristicsMaterial: CharacteristicsMaterialGetAllCommand.ResponseEntity } = row;
        let finishValue = 'Характеристики отсутствуют';
        if (characteristicsMaterial && characteristicsMaterial.length > 0) {
          finishValue = '';
          let counter = 1;
          finishValue = characteristicsMaterial.reduce((acc, curValue) => {
            const thisCharateristicFieldOfCategoryMaterial =
              allFieldsOfCategoryMaterialInHandbook.find(
                (elem) => elem.uuid === curValue.fieldOfCategoryMaterialUuid
              );

            let thisCharateristicUnitMeasurementName: string;
            if (
              getAllFieldUnitMeasurementsOfHandbook &&
              !isErrorFieldTypeGuard(getAllFieldUnitMeasurementsOfHandbook)
            ) {
              thisCharateristicUnitMeasurementName = thisCharateristicFieldOfCategoryMaterial
                ?.unitOfMeasurement?.name as string;
              acc += `${counter}) ${thisCharateristicFieldOfCategoryMaterial?.name} = ${curValue.value}${thisCharateristicUnitMeasurementName && thisCharateristicUnitMeasurementName !== '-' ? ` (${thisCharateristicUnitMeasurementName}); ` : '; '}`;
            }

            counter += 1;
            return acc;
          }, finishValue);
        }
        return finishValue;
      },
      headerName: 'Характеристики',
      align: 'left',
      headerAlign: 'left',
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.characteristicsMaterial?.width,
    },
    {
      field: MaterialColumnSchema.updatedAt,
      // type: 'dateTime',
      valueGetter: (value, row) => {
        const finishValue = moment(row.updatedAt).locale('ru').format('DD.MM.YYYY HH:mm:ss');
        return finishValue;
      },
      resizable: false,
      headerName: 'Дата обновления',
      minWidth: 50,
      width: materialsDataGridInitialState?.columns?.dimensions?.updatedAt?.width,
    },
  ];
  if (
    additionalFields &&
    fieldsOfCurrentCategoryToTable &&
    Array.isArray(fieldsOfCurrentCategoryToTable)
  ) {
    // const fieldsOfCurrentCategoryToTable
    allMaterialsTableColumns.push(...fieldsOfCurrentCategoryToTable);
  }

  const handleClickDialogYesDeleteRow = async () => {
    const rowIdToDelete = rowSelectionModel[0];
    const rowInfo = apiRef.current.getRow(rowIdToDelete);
    await materialDeleteHandler(
      rowInfo,
      workspaceId as string,
      handbookId,
      allCategoryMaterialsInHandbook
    );
    setRows(rows.filter((row) => row.uuid !== rowIdToDelete));
  };

  const onClickYesDialog = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await handleClickDialogYesDeleteRow();
    isDialogOpen.onFalse();
  };

  return (
    <>
      <Container maxWidth="xl">
        {materialsDataGridInitialState ? (
          <>
            <Typography variant="h4">
              {!currentCategory
                ? 'Справочник материалов'
                : `Справочник материалов из категории ${currentCategory?.name}`}
            </Typography>

            {allCategoryMaterialsInHandbook && (
              <CustomBreadcrumbs
                // heading="Carousel"
                sx={{
                  paddingRight: 3,
                  marginBottom: 2,
                  marginTop: 1,
                  width: '100%',
                  maxWidth: 'xl',
                }}
                allEntitiesForBreadcrumbs={allCategoryMaterialsInHandbook}
                // concreteCrumbName="Листовые"
              />
            )}

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
                  ...materialsDataGridInitialState,
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
                  ...allMaterialsTableColumns,
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
                // onRowEditStop={handleRowEditStop}
                // processRowUpdate={processRowUpdate}
                // onProcessRowUpdateError={handleProcessRowUpdateError}
                isCellEditable={(params) => {
                  if (isCreateRowMode) {
                    return params?.row?.isNew;
                  }
                  let isCellInEditableColumn =
                    MaterialEditableColumns.includes(params.field) ||
                    UuidRegexForTest.test(params.field);

                  if (params.field === 'name' && params.row?.categoryMaterial.templateName) {
                    const allNeedFieldsUuidsInCategoryMaterialTemplateName =
                      allCategoryMaterialsInHandbook
                        .find(
                          (item: CategoryMaterialGetCommand.ResponseEntity) =>
                            item.uuid === params.row.categoryMaterialUuid
                        )
                        ?.fieldsOfCategoryMaterialsInTemplate?.map((item: any) => item.uuid);
                    const allFieldUuidsInCharacteristicsOfMaterial =
                      params.row.characteristicsMaterial.map(
                        (item: CharacteristicsMaterialGetCommand.ResponseEntity) =>
                          item.fieldOfCategoryMaterialUuid
                      );

                    const havingSomeTemplateCharacteristic =
                      allNeedFieldsUuidsInCategoryMaterialTemplateName?.some((elem: string) =>
                        allFieldUuidsInCharacteristicsOfMaterial?.includes(elem)
                      );
                    const havingAllTemplateCharacteristics =
                      allNeedFieldsUuidsInCategoryMaterialTemplateName?.every((elem: string) =>
                        allFieldUuidsInCharacteristicsOfMaterial?.includes(elem)
                      );

                    if (havingAllTemplateCharacteristics || havingSomeTemplateCharacteristic) {
                      isCellInEditableColumn = false;
                    }
                  }
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
                // getRowSpacing={(params) => ({
                //   top: params.isFirstVisible ? 0 : 5,
                //   bottom: params.isLastVisible ? 0 : 5,
                // })}
                isRowSelectable={(params: GridRowParams) => {
                  if (!isCreateRowMode) {
                    return true;
                  }

                  return false;
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                // onCellClick={handleCellClick}
                rowSelectionModel={rowSelectionModel}
                // autosizeOptions={{
                //   columns: [MaterialColumnSchema.name],
                //   includeOutliers: true,
                //   includeHeaders: true,
                // }}
                sx={{
                  [`& .${gridClasses.main}`]: {
                    //   #element::-webkit-scrollbar-track {
                    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
                    // border-radius: 10px;
                    // background-color: #f9f9fd;
                    // }
                  },
                  [`& .${gridClasses.cell}`]: {
                    border: 'none',
                    minHeight: '50px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  },
                  // [`& .${gridClasses.cellOffsetLeft}`]: {
                  //   // minWidth: '100%',
                  //   backgroundColor: (theme) =>
                  //     theme.palette.mode === 'light' ? grey[800] : grey[900],
                  //   width: '100%',
                  // },
                  [`& .${gridClasses.main}`]: {
                    // bgcolor: `${grey[50]}`,
                  },
                  // [`& .${gridClasses.row}`]: {
                  //   borderBottom: `0.5px solid ${grey[50]}`,
                  // },
                  '& .MuiDataGrid-cell--editable': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light' ? `#DBDBDE24` : `rgba(9, 9, 9, 0.11)`,
                  },
                  //   [`& .${gridClasses.row}`]: {
                  //     bgcolor: (theme) => (theme.palette.mode === 'light' ? grey[200] : grey[900]),
                  //   },
                  //   '& .MuiDataGrid-cell--editable': {
                  //     bgcolor: (theme) =>
                  //       theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
                  //   },
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
          titleDialog={DeleteMaterialDialogTexts.titleDialog}
          textDialog={templaterCreatorTexts(
            DeleteMaterialDialogTexts.textDialog,
            rowSelectionModel[0] as string
          )}
        />
      )}
      {workspaceInfo && (
        <CreateCategoryForm
          isOpenCreateCategoryPopup={isDialogCreateNewCategoryOpen.value}
          allGlobalCategories={allGlobalCategories}
          onCloseCreateCategoryPopup={handleCreateCategoryPopupClose}
          allFields={allFieldsOfCategoryMaterialInHandbook}
        />
      )}
    </>
  );
}
