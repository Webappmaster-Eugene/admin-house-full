// 'use client';
//
// import moment from 'moment';
// import { toRubles } from '@/utils/helpers/intl';
// import { useSettingsContext } from '@/shared/settings';
// import { useState, useCallback, useLayoutEffect } from 'react';
// import { deepEqualAndIn } from '@/utils/helpers/deep-equal-and-in';
// import { MaterialsProps } from '@/widgets/materials/material.props';
// import { useWorkspaceInfoStore } from '@/store/workspace/workspace.store';
// import { TMaterialTableEntity } from '@/widgets/materials/material.entity';
// import { CustomNoRowsOverlay } from '@/shared/no-rows-overlay/NoRowsOverlay';
// import { columnsInitialState } from '@/widgets/materials/table-initial-state';
// import { MaterialEditableColumns } from '@/widgets/materials/editable-columns';
// import { deepEqualAndInTableKeys } from '@/utils/helpers/deep-equal-in-tablekeys';
// import { isErrorFieldTypeGuard } from '@/utils/type-guards/is-error-field.type-guard';
// import { materialEditHandler } from '@/utils/table-handlers/materials/material-edit.handler';
// import { fieldsOfCategoryMaterialsCreateHandler } from '@/utils/table-handlers/materials/material-create.handler';
// import { fieldsOfCategoryMaterialsDeleteHandler } from '@/utils/table-handlers/materials/material-delete.handler';
// import { MaterialColumnSchema } from '@/utils/tables-schemas/material/material-columns-schema.enum';
// import { isEntityCategoryMaterialTG } from '@/utils/type-guards/is-entity-category-material.type-guard';
// import { isEntityResponsiblePartnerTG } from '@/utils/type-guards/is-entity-responsible-partner.type-guard';
// import { isEntityFieldUnitMeasurementTG } from '@/utils/type-guards/is-entity-field-unit-measurement.type-guard';
// import {
//   HandbookGetCommand,
//   PriceChangingGetAllCommand,
//   CategoryMaterialGetAllCommand,
//   FieldUnitMeasurementGetCommand,
//   FieldUnitMeasurementGetAllCommand,
//   CharacteristicsMaterialGetAllCommand,
//   ResponsiblePartnerProducerGetCommand,
//   ResponsiblePartnerProducerGetAllCommand,
// } from '@numart/house-admin-contracts';
//
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { grey } from '@mui/material/colors';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import SaveIcon from '@mui/icons-material/Save';
// import Container from '@mui/material/Container';
// import { ruRU } from '@mui/x-data-grid/locales';
// import { CircularProgress } from '@mui/material';
// import Typography from '@mui/material/Typography';
// import CancelIcon from '@mui/icons-material/Close';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';
// import {
//   DataGrid,
//   GridRowId,
//   GridSlots,
//   GridColDef,
//   gridClasses,
//   GridRowModes,
//   useGridApiRef,
//   GridRowParams,
//   GridInitialState,
//   GridRowModesModel,
//   GridEventListener,
//   GridToolbarExport,
//   GridPaginationModel,
//   GridActionsCellItem,
//   GridToolbarContainer,
//   GridRowSelectionModel,
//   GridRowEditStopReasons,
//   GridToolbarFilterButton,
//   GridToolbarColumnsButton,
//   GRID_CHECKBOX_SELECTION_COL_DEF,
// } from '@mui/x-data-grid';
//
// export default function FieldsOfCategoryMaterials({ materialsInfo }: MaterialsProps) {
//   const settings = useSettingsContext();
//
//   const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
//     pageSize: 10,
//     page: 0,
//   });
//   const materialsEntity = materialsInfo.map((elem) => ({ ...elem, isNew: false }));
//   const [rows, setRows] = useState<TMaterialTableEntity[]>(materialsEntity);
//   const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
//   const { workspaceInfo } = useWorkspaceInfoStore();
//   const apiRef = useGridApiRef();
//
//   const [materialsDataGridInitialState, setMaterialsDataGridInitialState] =
//     useState<GridInitialState>();
//
//   const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
//
//   const saveMaterialsDataGridState = useCallback(() => {
//     if (apiRef?.current?.exportState && localStorage) {
//       const currentState = apiRef.current.exportState();
//       localStorage.setItem('materialsDataGridState', JSON.stringify(currentState));
//     }
//   }, [apiRef]);
//
//   useLayoutEffect(() => {
//     const stateFromLocalStorage = localStorage?.getItem('materialsDataGridState');
//     setMaterialsDataGridInitialState(
//       stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : {}
//     );
//
//     // handle refresh and navigating away/refreshing
//     window.addEventListener('beforeunload', saveMaterialsDataGridState);
//
//     return () => {
//       // in case of an SPA remove the event-listener
//       window.removeEventListener('beforeunload', saveMaterialsDataGridState);
//       saveMaterialsDataGridState();
//     };
//   }, [saveMaterialsDataGridState]);
//
//   const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
//     if (params.reason === GridRowEditStopReasons.rowFocusOut) {
//       event.defaultMuiPrevented = true;
//     }
//   };
//
//   const editToolbar = () => {
//     const handleClickAddMaterial = () => {
//       const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
//       const responsiblePartners =
//         handbookInfo.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
//       const categoryMaterials =
//         workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
//       const unitMeasurements =
//         workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
//
//       const uuid = 'newIdMaterial';
//
//       setRows((oldRows) => {
//         const newRow: TMaterialTableEntity = {
//           [MaterialColumnSchema.uuid]: uuid,
//           [MaterialColumnSchema.name]: 'Новый материал',
//           [MaterialColumnSchema.namePublic]: 'Сокр. наименование',
//           [MaterialColumnSchema.comment]: 'Описание нового материала',
//           [MaterialColumnSchema.price]: 0,
//           [MaterialColumnSchema.sourceInfo]: 'Укажите источник',
//           [MaterialColumnSchema.responsiblePartner]: responsiblePartners[0],
//           [MaterialColumnSchema.categoryMaterial]: categoryMaterials[0],
//           [MaterialColumnSchema.unitMeasurement]: unitMeasurements[0],
//           [MaterialColumnSchema.priceChanges]: [],
//           [MaterialColumnSchema.characteristicsMaterial]: [],
//           [MaterialColumnSchema.updatedAt]: new Date(),
//           isNew: true,
//         };
//         return [...oldRows, newRow];
//       });
//
//       setRowModesModel((oldModel) => ({
//         ...oldModel,
//         [uuid]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//       }));
//     };
//
//     const isResetSettingsVisible = (): boolean => {
//       const curTableState = apiRef.current.state;
//       const initialState = columnsInitialState;
//
//       const isEqColumns = !deepEqualAndIn(curTableState, initialState);
//
//       const columnsCurrent = apiRef.current.state.columns.lookup;
//       const columnsInitial = columnsInitialState.columns?.dimensions;
//       const isEqWidths = deepEqualAndInTableKeys(columnsCurrent, columnsInitial);
//       return isEqColumns || isEqWidths;
//     };
//
//     const handleClickResetSettingsTable = () => {
//       apiRef.current.restoreState(columnsInitialState);
//       localStorage.setItem('materialsDataGridState', JSON.stringify(columnsInitialState));
//       // apiRef.current.setState((prevState) => {
//       //   localStorage.setItem('materialsDataGridState', JSON.stringify(columnsInitialState));
//       //   return { ...prevState, columnsInitialState };
//       // });
//     };
//
//     const isDeleteRowVisible = (): boolean => {
//       const rowsIdToDelete = rowSelectionModel;
//       return rowsIdToDelete.length > 0;
//     };
//
//     const handleDeleteClick = (id: GridRowId) => async () => {
//       const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
//       handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
//       const categoryMaterials =
//         workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
//       const workspaceId = handbookInfo.workspaceUuid;
//       const handbookId = handbookInfo.uuid;
//       const rowLocally = apiRef.current.getRow(id);
//       await fieldsOfCategoryMaterialsDeleteHandler(rowLocally, workspaceId as string, handbookId, categoryMaterials);
//       setRows(rows.filter((row) => row.uuid !== id));
//     };
//
//     const handleClickDeleteRow = async () => {
//       const rowIdToDelete = rowSelectionModel[0];
//       const rowInfo = apiRef.current.getRow(rowIdToDelete);
//       const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
//       handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
//       const categoryMaterials =
//         workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
//       const workspaceId = handbookInfo.workspaceUuid;
//       const handbookId = handbookInfo.uuid;
//       await fieldsOfCategoryMaterialsDeleteHandler(rowInfo, workspaceId as string, handbookId, categoryMaterials);
//       setRows(rows.filter((row) => row.uuid !== rowIdToDelete));
//     };
//
//     return (
//       <GridToolbarContainer
//         sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
//       >
//         <Box>
//           <Button color="primary" startIcon={<AddIcon />} onClick={handleClickAddMaterial}>
//             Добавить материал
//           </Button>
//
//           {isDeleteRowVisible() && (
//             <Button color="error" startIcon={<DeleteIcon />} onClick={handleClickDeleteRow}>
//               Удалить
//             </Button>
//           )}
//
//           {isResetSettingsVisible() && (
//             <Button
//               color="warning"
//               startIcon={<RestartAltIcon />}
//               onClick={handleClickResetSettingsTable}
//             >
//               Вернуться к исходным настройкам
//             </Button>
//           )}
//         </Box>
//
//         {/* <Button color="primary" startIcon={<DisabledByDefaultIcon />} onClick={handleClick}> */}
//         {/*  Сбросить выбор */}
//         {/* </Button> */}
//         {/* <Button color="primary" startIcon={<DeleteForeverIcon />} onClick={handleClick}> */}
//         {/*  Удалить выбранные */}
//         {/* </Button> */}
//         {/* https://codesandbox.io/p/sandbox/67209637how-to-reset-the-check-box-in-material-ui-data-grid-programmatically-ciqyr?file=%2Fdemo.tsx%3A30%2C7 */}
//
//         {/* <GridToolbar /> */}
//         <GridToolbarContainer>
//           <GridToolbarColumnsButton />
//           <GridToolbarFilterButton />
//           {/* <GridToolbarDensitySelector */}
//           {/*  slotProps={{ tooltip: { title: 'Изменить density' } }} */}
//           {/* /> */}
//           <Box sx={{ flexGrow: 1 }} />
//           <GridToolbarExport
//             slotProps={{
//               tooltip: { title: 'Выгрузить данные' },
//               button: { variant: 'outlined' },
//             }}
//           />
//         </GridToolbarContainer>
//       </GridToolbarContainer>
//     );
//   };
//
//   const handleEditClick = (id: GridRowId) => () => {
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
//   };
//
//   const handleSaveClick = (id: GridRowId) => async () => {
//     const isNewRow = apiRef.current.getRow(id)?.isNew;
//     const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
//     const responsiblePartners =
//       handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
//     const categoryMaterials =
//       workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
//     const unitMeasurements =
//       workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
//     const workspaceId = handbookInfo.workspaceUuid;
//     const handbookId = handbookInfo.uuid;
//     if (isNewRow) {
//       const newRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');
//       await fieldsOfCategoryMaterialsCreateHandler(
//         newRowLocally as TMaterialTableEntity,
//         workspaceId as string,
//         handbookId,
//         responsiblePartners,
//         categoryMaterials,
//         unitMeasurements
//       );
//     } else {
//       const updatedRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');
//
//       await materialEditHandler(
//         updatedRowLocally as TMaterialTableEntity,
//         workspaceId as string,
//         handbookId,
//         responsiblePartners
//       );
//     }
//     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
//   };
//
//   const handleDeleteClick = (id: GridRowId) => async () => {
//     const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
//     handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
//     const categoryMaterials =
//       workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
//     const workspaceId = handbookInfo.workspaceUuid;
//     const handbookId = handbookInfo.uuid;
//     const rowLocally = apiRef.current.getRow(id);
//     await fieldsOfCategoryMaterialsDeleteHandler(rowLocally, workspaceId as string, handbookId, categoryMaterials);
//     setRows(rows.filter((row) => row.uuid !== id));
//   };
//
//   const handleCancelClick = (id: GridRowId) => () => {
//     setRowModesModel({
//       ...rowModesModel,
//       [id]: { mode: GridRowModes.View, ignoreModifications: true },
//     });
//
//     const editedRow = rows.find((row) => row.uuid === id);
//     if (editedRow?.isNew) {
//       setRows(rows.filter((row) => row.uuid !== id));
//     }
//   };
//
//   const processRowUpdate = (newRow: TMaterialTableEntity) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.uuid === newRow.uuid ? updatedRow : row)));
//     return updatedRow;
//   };
//
//   const handleProcessRowUpdateError = (error: Error) => {
//     console.error('error while update row in table of materials', error);
//   };
//
//   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
//     setRowModesModel(newRowModesModel);
//   };
//
//   const allMaterialsTableColumns: GridColDef[] = [
//     {
//       field: MaterialColumnSchema.uuid,
//       headerName: 'id',
//       width: 130,
//       sortable: false,
//       filterable: false,
//       resizable: false,
//       align: 'left',
//       headerAlign: 'left',
//       disableColumnMenu: true,
//       disableReorder: true,
//     },
//     {
//       field: MaterialColumnSchema.name,
//       headerName: 'Наименование',
//       minWidth: 160,
//       width: materialsDataGridInitialState?.columns?.dimensions?.name?.width,
//       flex: materialsDataGridInitialState?.columns?.dimensions?.name?.width ? undefined : 1,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       hideable: false,
//       hideSortIcons: true,
//       resizable: false,
//       sortable: false,
//     },
//     {
//       field: MaterialColumnSchema.namePublic,
//       headerName: 'Сокращенно',
//       minWidth: 170,
//       width: materialsDataGridInitialState?.columns?.dimensions?.namePublic?.width,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       renderHeader: (params) => (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
//         </Box>
//       ),
//     },
//     {
//       field: MaterialColumnSchema.comment,
//       headerName: 'Описание',
//       minWidth: 190,
//       width: materialsDataGridInitialState?.columns?.dimensions?.comment?.width,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       renderHeader: (params) => (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
//         </Box>
//       ),
//     },
//     {
//       field: MaterialColumnSchema.price,
//       valueFormatter: (value) => toRubles(Number(value)),
//       headerName: 'Цена',
//       minWidth: 140,
//       width: materialsDataGridInitialState?.columns?.dimensions?.price?.width,
//       type: 'number',
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       renderHeader: (params) => (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
//         </Box>
//       ),
//     },
//     {
//       field: MaterialColumnSchema.sourceInfo,
//       // flex: 1,
//       headerName: 'Источник цены',
//       valueGetter: (value, row) => {
//         let finishValue = 'Источник не указан';
//         if (value) {
//           finishValue = value;
//         }
//         return finishValue;
//       },
//       minWidth: 150,
//       width: materialsDataGridInitialState?.columns?.dimensions?.sourceInfo?.width,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       renderHeader: (params) => (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
//         </Box>
//       ),
//     },
//     {
//       field: MaterialColumnSchema.responsiblePartner,
//       type: 'singleSelect',
//       valueOptions: (params) => {
//         const handbookInfo =
//           workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
//         const responsiblePartners =
//           handbookInfo.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
//
//         const responsiblePartnerNames =
//           responsiblePartners && responsiblePartners.map((elem) => elem.name);
//
//         return responsiblePartnerNames;
//       },
//       valueGetter: (value: ResponsiblePartnerProducerGetCommand.ResponseEntity, row) =>
//         isEntityResponsiblePartnerTG(value) ? value.name : value,
//       headerName: 'Поставщик',
//       minWidth: 110,
//       width: materialsDataGridInitialState?.columns?.dimensions?.responsiblePartner?.width,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//       renderHeader: (params) => (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
//         </Box>
//       ),
//     },
//     {
//       field: MaterialColumnSchema.categoryMaterial,
//       headerName: 'Категория',
//       align: 'left',
//       headerAlign: 'left',
//       minWidth: 100,
//       width: materialsDataGridInitialState?.columns?.dimensions?.categoryMaterial?.width,
//       editable: true,
//       type: 'singleSelect',
//       valueOptions: (params) => {
//         const category-materials =
//           workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
//         const categoryNames = category-materials && category-materials.map((elem) => elem.name);
//
//         return categoryNames;
//       },
//       valueGetter: (value: TMaterialTableEntity, row) =>
//         isEntityCategoryMaterialTG(value) ? value.name : value,
//     },
//     {
//       field: MaterialColumnSchema.unitMeasurement,
//       headerName: 'Ед. изм.',
//       align: 'left',
//       headerAlign: 'left',
//       minWidth: 100,
//       width: materialsDataGridInitialState?.columns?.dimensions?.unitMeasurement?.width,
//       editable: true,
//       type: 'singleSelect',
//       valueOptions: (params) => {
//         const fieldUnitMeasurements =
//           workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;
//         const fieldUnitMeasurementNames =
//           fieldUnitMeasurements && fieldUnitMeasurements.map((elem) => elem.name);
//
//         return fieldUnitMeasurementNames;
//       },
//       valueGetter: (value: FieldUnitMeasurementGetCommand.ResponseEntity, row) =>
//         isEntityFieldUnitMeasurementTG(value) ? value.name : value,
//     },
//     {
//       field: MaterialColumnSchema.priceChanges,
//       valueGetter: (value, row) => {
//         const prices: PriceChangingGetAllCommand.ResponseEntity = row.priceChanges;
//         let finishValue = 'Изменений цены не было';
//         if (prices && prices.length > 0) {
//           finishValue = '';
//           let counter = 1;
//           finishValue = prices.reduce((acc, curValue) => {
//             acc += `${counter}) Старая цена: ${curValue.oldPrice}, новая цена: ${curValue.newPrice} от ${curValue.createdAt}`;
//             acc += curValue?.source ? ` источник - ${curValue.source}; ` : '; ';
//             counter += 1;
//             return acc;
//           }, finishValue);
//         }
//         return finishValue;
//       },
//       headerName: 'Изменения цены',
//       minWidth: 130,
//       width: materialsDataGridInitialState?.columns?.dimensions?.priceChanges?.width,
//       align: 'left',
//       headerAlign: 'left',
//     },
//     {
//       field: MaterialColumnSchema.characteristicsMaterial,
//       valueGetter: (value, row) => {
//         const {
//           characteristicsMaterial,
//         }: { characteristicsMaterial: CharacteristicsMaterialGetAllCommand.ResponseEntity } = row;
//         let finishValue = 'Характеристики отсутствуют';
//         if (characteristicsMaterial && characteristicsMaterial.length > 0) {
//           finishValue = '';
//           let counter = 1;
//           const allFieldUnitMeasurements = workspaceInfo?.allFieldsUnitMeasurementsOfHandbook;
//
//           finishValue = characteristicsMaterial.reduce((acc, curValue) => {
//             let charateristicUnitMeasurement;
//             if (!isErrorFieldTypeGuard(allFieldUnitMeasurements)) {
//               const charateristicUnitMeasurementObject = allFieldUnitMeasurements?.find(
//                 (elem) => elem.uuid === curValue.fieldUnitMeasurementUuid
//               );
//
//               charateristicUnitMeasurement = charateristicUnitMeasurementObject?.name;
//             }
//             acc += `${counter}) ${curValue.name} = ${curValue.value}${charateristicUnitMeasurement && charateristicUnitMeasurement !== '-' ? ` (${charateristicUnitMeasurement}); ` : '; '}`;
//
//             counter += 1;
//             return acc;
//           }, finishValue);
//         }
//         return finishValue;
//       },
//       headerName: 'Характеристики',
//       align: 'left',
//       headerAlign: 'left',
//       minWidth: 250,
//       width: materialsDataGridInitialState?.columns?.dimensions?.characteristicsMaterial?.width,
//     },
//     {
//       field: MaterialColumnSchema.updatedAt,
//       // type: 'dateTime',
//       valueGetter: (value, row) => {
//         const finishValue = moment(row.updatedAt).locale('ru').format('DD.MM.YYYY HH:mm:ss');
//         return finishValue;
//       },
//       resizable: false,
//       headerName: 'Дата обновления',
//       minWidth: 170,
//       width: materialsDataGridInitialState?.columns?.dimensions?.updatedAt?.width,
//     },
//     {
//       field: MaterialColumnSchema.actions,
//       // type: 'boolean',
//       // renderCell: (params) => <MaterialActionsTable {...{ params, rowId, setRowId }} />,
//       type: 'actions',
//       resizable: false,
//       disableColumnMenu: true,
//       disableReorder: true,
//       editable: false,
//       hideable: false,
//       hideSortIcons: true,
//       sortable: false,
//       cellClassName: 'actions',
//       headerName: 'Действия',
//       minWidth: 130,
//       width: materialsDataGridInitialState?.columns?.dimensions?.__check__?.width,
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
//
//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               sx={{
//                 color: 'primary.main',
//               }}
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }
//
//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];
//
//   return (
//     <Container maxWidth="xl">
//       <Typography variant="h4"> Справочник материалов</Typography>
//       <Box sx={{ width: '100%', maxWidth: '100vw' }}>
//         {materialsDataGridInitialState ? (
//           <DataGrid
//             apiRef={apiRef}
//             localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
//             initialState={{
//               ...columnsInitialState,
//               ...materialsDataGridInitialState,
//             }}
//             rows={rows}
//             columns={[
//               {
//                 ...GRID_CHECKBOX_SELECTION_COL_DEF,
//                 hideable: false,
//                 headerName: 'Выбор строки',
//                 cellClassName: 'MuiDataGrid-cellCheckbox',
//                 headerClassName: 'MuiDataGrid-columnHeaderCheckbox',
//               },
//               ...allMaterialsTableColumns,
//             ]}
//             getRowId={(row) => row.uuid}
//             loading={!workspaceInfo}
//             editMode="row"
//             pageSizeOptions={[5, 10, 20, 50, 100]}
//             paginationModel={paginationModel}
//             onPaginationModelChange={(paginationModelGrid) =>
//               setPaginationModel(paginationModelGrid)
//             }
//             rowModesModel={rowModesModel}
//             onRowModesModelChange={handleRowModesModelChange}
//             onRowEditStop={handleRowEditStop}
//             processRowUpdate={processRowUpdate}
//             isCellEditable={(params) => {
//               const isEditableRow = MaterialEditableColumns.includes(params.field);
//               const isNewRow = params.row?.isNew;
//               return isNewRow || isEditableRow;
//             }}
//             // slots={{ toolbar: GridToolbar }}
//             slots={{
//               noRowsOverlay: CustomNoRowsOverlay,
//               toolbar: editToolbar as GridSlots['toolbar'],
//             }}
//             slotProps={{
//               toolbar: { setRows, setRowModesModel },
//             }}
//             onProcessRowUpdateError={handleProcessRowUpdateError}
//             autoHeight
//             getRowHeight={() => 'auto'}
//             getRowSpacing={(params) => ({
//               top: params.isFirstVisible ? 0 : 5,
//               bottom: params.isLastVisible ? 0 : 5,
//             })}
//             isRowSelectable={(params: GridRowParams) =>
//               // params.row.characteristicsMaterial.length === 0
//               params.row.characteristicsMaterial.length !== 0
//             }
//             onRowSelectionModelChange={(newRowSelectionModel) => {
//               setRowSelectionModel(newRowSelectionModel);
//             }}
//             rowSelectionModel={rowSelectionModel}
//             autosizeOptions={{
//               columns: [MaterialColumnSchema.name],
//               includeOutliers: true,
//               includeHeaders: true,
//             }}
//             sx={{
//               [`& .${gridClasses.row}`]: {
//                 bgcolor: (theme) => (theme.palette.mode === 'light' ? grey[200] : grey[900]),
//               },
//               '& .MuiDataGrid-cell--editable': {
//                 bgcolor: (theme) =>
//                   theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
//               },
//             }}
//             // disableRowSelectionOnClick
//             checkboxSelection
//             disableMultipleRowSelection
//           />
//         ) : (
//           <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
//         )}
//       </Box>
//     </Container>
//   );
// }
