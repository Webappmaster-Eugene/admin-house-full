'use client';

import moment from 'moment';
import { useBoolean } from '@/utils/hooks/use-boolean';
import { useSettingsContext } from '@/shared/settings';
import { useState, useCallback, useLayoutEffect } from 'react';
import { AlertDialogTexts } from '@/widgets/materials/dialog-texts';
import AlertDialog from '@/shared/dialogs/alert-dialog/alert-dialog';
import { ErrorFromBackend } from '@/utils/types/error-from-backend.type';
import { templaterCreatorTexts } from '@/utils/helpers/templater-creator';
import { NewMaterialId } from '@/widgets/materials/new-material-id.const';
import { MaterialEditableColumns } from '@/widgets/materials/editable-columns';
import { MaterialRequiredCreateColumns } from '@/widgets/materials/required-columns';
import {
  HandbookGetCommand,
  MaterialCreateCommand,
  MaterialUpdateCommand,
  PriceChangingGetAllCommand,
  CategoryMaterialGetAllCommand,
  FieldUnitMeasurementGetCommand,
  FieldUnitMeasurementGetAllCommand,
  CharacteristicsMaterialGetAllCommand,
  ResponsiblePartnerProducerGetCommand,
  ResponsiblePartnerProducerGetAllCommand,
} from '@numart/house-admin-contracts';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
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

import { toRubles } from 'src/utils/helpers/intl';
import { deepEqualAndIn } from 'src/utils/helpers/deep-equal-and-in';
import { deepEqualAndInTableKeys } from 'src/utils/helpers/deep-equal-in-tablekeys';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import { materialDeleteHandler } from 'src/utils/table-handlers/materials/material-delete.handler';
import { materialCreateHandler } from 'src/utils/table-handlers/materials/material-create.handler';
import { materialUpdateHandler } from 'src/utils/table-handlers/materials/material-update.handler';
import { MaterialColumnSchema } from 'src/utils/tables-schemas/material/material-columns-schema.enum';
import { isEntityCategoryMaterialTG } from 'src/utils/type-guards/is-entity-category-material.type-guard';
import { isEntityResponsiblePartnerTG } from 'src/utils/type-guards/is-entity-responsible-partner.type-guard';
import { isEntityFieldUnitMeasurementTG } from 'src/utils/type-guards/is-entity-field-unit-measurement.type-guard';

import { MaterialsProps } from 'src/widgets/materials/material.props';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
import { TMaterialTableEntity } from 'src/widgets/materials/material.entity';
import { CustomNoRowsOverlay } from 'src/shared/no-rows-overlay/NoRowsOverlay';
import { columnsInitialState } from 'src/widgets/materials/table-initial-state';

export default function Materials({ materialsInfo }: MaterialsProps) {
  const settings = useSettingsContext();
  const isDialogOpen = useBoolean();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const materialsEntity = materialsInfo.map((elem) => ({ ...elem, isNew: false }));
  const [rows, setRows] = useState<TMaterialTableEntity[]>(materialsEntity);
  const [isCreateRowMode, setIsCreateRowMode] = useState<boolean>(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { workspaceInfo } = useWorkspaceInfoStore();
  const apiRef = useGridApiRef();
  const [gridStateBeforeCreate, setGridStateBeforeCreate] = useState<GridState>(
    apiRef.current.state
  );
  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>();

  const [materialsDataGridInitialState, setMaterialsDataGridInitialState] =
    useState<GridInitialState>();

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const saveMaterialsDataGridState = useCallback(() => {
    if (apiRef?.current?.exportState && localStorage) {
      const currentState = apiRef.current.exportState();
      localStorage.setItem('materialsDataGridState', JSON.stringify(currentState));
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

  // const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
  //   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };

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
      // console.log(initialColumnVisibilityModel);
      // console.log(finalNewColumnVisibilityModel);
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
      const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
      const responsiblePartners =
        handbookInfo.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
      const categoryMaterials =
        workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
      const unitMeasurements =
        workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;

      addRequiredColumnsToTable(MaterialRequiredCreateColumns);

      setRows((oldRows) => {
        const newRow: TMaterialTableEntity = {
          [MaterialColumnSchema.uuid]: NewMaterialId,
          [MaterialColumnSchema.numInOrder]: 9999999,
          [MaterialColumnSchema.name]: 'Наименование материала',
          [MaterialColumnSchema.namePublic]: 'Сокр. наименование',
          [MaterialColumnSchema.comment]: 'Описание нового материала',
          [MaterialColumnSchema.price]: 0,
          [MaterialColumnSchema.sourceInfo]: 'Укажите источник',
          [MaterialColumnSchema.responsiblePartner]: responsiblePartners[0],
          [MaterialColumnSchema.categoryMaterial]: categoryMaterials.filter(
            (categoryMaterial) => categoryMaterial.name === 'Общая'
          )[0],
          [MaterialColumnSchema.unitMeasurement]: unitMeasurements.filter(
            (unitMeasurement) => unitMeasurement.name === 'отсутствует'
          )[0],
          [MaterialColumnSchema.priceChanges]: [],
          [MaterialColumnSchema.characteristicsMaterial]: [],
          [MaterialColumnSchema.updatedAt]: new Date(),
          isNew: true,
        };
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
      // apiRef.current.startRowEditMode({ id: NewMaterialId });
      // apiRef.current.restoreState(tableStateBeforeCreate);
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

      const isEqColumns = !deepEqualAndIn(curTableState, initialState);

      const columnsCurrent = apiRef.current.state.columns.lookup;
      const columnsInitial = columnsInitialState.columns?.dimensions;
      const isEqWidths = deepEqualAndInTableKeys(columnsCurrent, columnsInitial);
      return isEqColumns || isEqWidths;
    };

    const handleClickResetSettingsTable = () => {
      apiRef.current.restoreState(columnsInitialState);
      localStorage.setItem('materialsDataGridState', JSON.stringify(columnsInitialState));
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
    // console.log(oldColumnVisibilityModel);
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

  const handleCellEditStop = async (params: GridCellEditStopParams, event: MuiEvent) => {
    const rowCurrentState = apiRef.current.getRowWithUpdatedValues(params.id, params.field);
    const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    const workspaceId = handbookInfo.workspaceUuid;
    const handbookId = handbookInfo.uuid;

    const updatedRow = (await materialUpdateHandler(
      { [params.field]: rowCurrentState[params.field] } as TMaterialTableEntity,
      workspaceId as string,
      handbookId,
      params.row.categoryMaterialUuid,
      params.row.uuid
    )) as MaterialUpdateCommand.ResponseEntity;

    if (params.reason !== GridCellEditStopReasons.shiftTabKeyDown) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSaveClick = async () => {
    const id = NewMaterialId;
    const isNewRow = apiRef.current.getRow(id)?.isNew;
    let finalRow: string | MaterialCreateCommand.ResponseEntity | ErrorFromBackend = '';

    const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    const responsiblePartners =
      handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
    const categoryMaterials =
      workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
    const unitMeasurements =
      workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
    const workspaceId = handbookInfo.workspaceUuid;
    const handbookId = handbookInfo.uuid;
    if (isNewRow) {
      const newRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');
      finalRow = (await materialCreateHandler(
        newRowLocally as TMaterialTableEntity,
        workspaceId as string,
        handbookId,
        responsiblePartners,
        categoryMaterials,
        unitMeasurements
      )) as MaterialCreateCommand.ResponseEntity;
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
  //   await materialDeleteHandler(rowLocally, workspaceId as string, handbookId, categoryMaterials);
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
      minWidth: 160,
      width: materialsDataGridInitialState?.columns?.dimensions?.name?.width,
      flex: materialsDataGridInitialState?.columns?.dimensions?.name?.width ? undefined : 1,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      hideable: false,
      hideSortIcons: true,
      resizable: false,
      sortable: false,
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
      minWidth: 190,
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
      minWidth: 140,
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
      minWidth: 150,
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
        const handbookInfo =
          workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
        const responsiblePartners =
          handbookInfo.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;

        const responsiblePartnerNames =
          responsiblePartners && responsiblePartners.map((elem) => elem.name);

        return responsiblePartnerNames;
      },
      valueGetter: (value: ResponsiblePartnerProducerGetCommand.ResponseEntity, row) =>
        isEntityResponsiblePartnerTG(value) ? value.name : value,
      headerName: 'Поставщик',
      minWidth: 110,
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
      minWidth: 100,
      width: materialsDataGridInitialState?.columns?.dimensions?.categoryMaterial?.width,
      editable: true,
      type: 'singleSelect',
      valueOptions: (params) => {
        const categories =
          workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
        const categoryNames = categories && categories.map((elem) => elem.name);

        return categoryNames;
      },
      valueGetter: (value: TMaterialTableEntity, row) =>
        isEntityCategoryMaterialTG(value) ? value.name : value,
    },
    {
      field: MaterialColumnSchema.unitMeasurement,
      headerName: 'Ед. изм.',
      align: 'left',
      headerAlign: 'left',
      minWidth: 100,
      width: materialsDataGridInitialState?.columns?.dimensions?.unitMeasurement?.width,
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
      minWidth: 130,
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
          const allFieldUnitMeasurements = workspaceInfo?.allFieldsUnitMeasurementsOfHandbook;

          finishValue = characteristicsMaterial.reduce((acc, curValue) => {
            let charateristicUnitMeasurement;
            if (!isErrorFieldTypeGuard(allFieldUnitMeasurements)) {
              const charateristicUnitMeasurementObject = allFieldUnitMeasurements?.find(
                (elem) => elem.uuid === curValue.fieldOfCategoryMaterial.unitOfMeasurementUuid
              );

              charateristicUnitMeasurement = charateristicUnitMeasurementObject?.name;
            }
            acc += `${counter}) ${curValue.value} = ${curValue.value}${charateristicUnitMeasurement && charateristicUnitMeasurement !== '-' ? ` (${charateristicUnitMeasurement}); ` : '; '}`;

            counter += 1;
            return acc;
          }, finishValue);
        }
        return finishValue;
      },
      headerName: 'Характеристики',
      align: 'left',
      headerAlign: 'left',
      minWidth: 250,
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
      minWidth: 170,
      width: materialsDataGridInitialState?.columns?.dimensions?.updatedAt?.width,
    },
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
    await materialDeleteHandler(rowInfo, workspaceId as string, handbookId, categoryMaterials);
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
            <Typography variant="h4"> Справочник материалов</Typography>
            <Box sx={{ width: '100%', maxWidth: '100vw' }}>
              <DataGrid
                apiRef={apiRef}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
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
                  const isCellInEditableColumn = MaterialEditableColumns.includes(params.field);
                  const isCellWithoutCharacteristicsMaterial =
                    params.field === MaterialColumnSchema.name &&
                    params.row?.characteristicsMaterial?.length === 0;
                  const isNewRow = params.row?.isNew;
                  return isNewRow || isCellInEditableColumn || isCellWithoutCharacteristicsMaterial;
                }}
                // slots={{ toolbar: GridToolbar }}
                slots={{
                  noRowsOverlay: CustomNoRowsOverlay,
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
                  if (params.row.characteristicsMaterial.length === 0 && !isCreateRowMode) {
                    return true;
                  }

                  return false;
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                autosizeOptions={{
                  columns: [MaterialColumnSchema.name],
                  includeOutliers: true,
                  includeHeaders: true,
                }}
                sx={{
                  [`& .${gridClasses.cell}`]: {
                    border: 'none',
                    minHeight: '50px',
                    height: '100%',
                  },
                  [`& .${gridClasses.main}`]: {
                    // bgcolor: `${grey[50]}`,
                  },
                  [`& .${gridClasses.row}`]: {
                    borderBottom: `0.5px solid ${grey[50]}`,
                  },
                  '& .MuiDataGrid-cell--editable': {
                    bgcolor: `${grey[50]}`,
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
                // onCellEditStart={handleCellEditStop}
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
          titleDialog={AlertDialogTexts.titleDialog}
          textDialog={templaterCreatorTexts(
            AlertDialogTexts.textDialog,
            rowSelectionModel[0] as string
          )}
        />
      )}
    </>
  );
}
