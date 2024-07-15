'use client';

import moment from 'moment';
import { useState } from 'react';
import { useSettingsContext } from '@/shared/settings';
import {
  HandbookGetCommand,
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
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
  DataGrid,
  GridRowId,
  GridSlots,
  GridColDef,
  gridClasses,
  GridToolbar,
  GridRowModes,
  useGridApiRef,
  GridRowModesModel,
  GridEventListener,
  GridPaginationModel,
  GridActionsCellItem,
  GridToolbarContainer,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { toRubles } from 'src/utils/helpers/intl';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import { materialEditHandler } from 'src/utils/table-handlers/materials/material-edit.handler';
import { materialCreateHandler } from 'src/utils/table-handlers/materials/material-create.handler';
import { materialDeleteHandler } from 'src/utils/table-handlers/materials/material-delete.handler';
import { MaterialColumnSchema } from 'src/utils/tables-schemas/material/material-columns-schema.enum';
import { isEntityCategoryMaterialTG } from 'src/utils/type-guards/is-entity-category-material.type-guard';
import { isEntityResponsiblePartnerTG } from 'src/utils/type-guards/is-entity-responsible-partner.type-guard';
import { isEntityFieldUnitMeasurementTG } from 'src/utils/type-guards/is-entity-field-unit-measurement.type-guard';

import { MaterialsProps } from 'src/widgets/materials/material.props';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
import { TMaterialTableEntity } from 'src/widgets/materials/material.entity';
import { MaterialEditableColumns } from 'src/widgets/materials/editable-rows';

export default function Materials({ materialsInfo }: MaterialsProps) {
  const settings = useSettingsContext();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const materialsEntity = materialsInfo.map((elem) => ({ ...elem, isNew: false }));
  const [rows, setRows] = useState<TMaterialTableEntity[]>(materialsEntity);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { workspaceInfo } = useWorkspaceInfoStore();
  const apiRef = useGridApiRef();

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const editToolbar = () => {
    const handleClick = () => {
      const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
      const responsiblePartners =
        handbookInfo.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
      const categoryMaterials =
        workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
      const unitMeasurements =
        workspaceInfo?.allFieldsUnitMeasurementsOfHandbook as FieldUnitMeasurementGetAllCommand.ResponseEntity;

      // const partnerNames = responsiblePartners && responsiblePartners.map((elem) => elem.name);

      const uuid = 'new id';
      setRows((oldRows) => {
        const newRow: TMaterialTableEntity = {
          [MaterialColumnSchema.uuid]: uuid,
          [MaterialColumnSchema.name]: 'Новый материал',
          [MaterialColumnSchema.namePublic]: 'Сокр. наименование',
          [MaterialColumnSchema.comment]: 'Описание нового материала',
          [MaterialColumnSchema.price]: 0,
          [MaterialColumnSchema.sourceInfo]: 'Укажите источник',
          [MaterialColumnSchema.responsiblePartner]: responsiblePartners[0],
          [MaterialColumnSchema.categoryMaterial]: categoryMaterials[0],
          [MaterialColumnSchema.unitMeasurement]: unitMeasurements[0],
          [MaterialColumnSchema.priceChanges]: [],
          [MaterialColumnSchema.characteristicsMaterial]: [],
          [MaterialColumnSchema.updatedAt]: new Date(),
          isNew: true,
        };
        return [...oldRows, newRow];
      });
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [uuid]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Добавить материал
        </Button>
        <GridToolbar />
      </GridToolbarContainer>
    );
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => async () => {
    const isNewRow = apiRef.current.getRow(id)?.isNew;
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
      await materialCreateHandler(
        newRowLocally as TMaterialTableEntity,
        workspaceId as string,
        handbookId,
        responsiblePartners,
        categoryMaterials,
        unitMeasurements
      );
    } else {
      const updatedRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');

      await materialEditHandler(
        updatedRowLocally as TMaterialTableEntity,
        workspaceId as string,
        handbookId,
        responsiblePartners
      );
    }
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
    const categoryMaterials =
      workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
    const workspaceId = handbookInfo.workspaceUuid;
    const handbookId = handbookInfo.uuid;
    const rowLocally = apiRef.current.getRow(id);
    await materialDeleteHandler(rowLocally, workspaceId as string, handbookId, categoryMaterials);
    setRows(rows.filter((row) => row.uuid !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.uuid === id);
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.uuid !== id));
    }
  };

  const processRowUpdate = (newRow: TMaterialTableEntity) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.uuid === newRow.uuid ? updatedRow : row)));
    return updatedRow;
  };

  const handleProcessRowUpdateError = (error: Error) => {
    console.error('error while update row in table of materials', error);
  };

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
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: MaterialColumnSchema.name,
      headerName: 'Название',
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: MaterialColumnSchema.namePublic,
      headerName: 'Сокращенное',
      width: 170,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderHeader: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
        </Box>
      ),
    },
    {
      field: MaterialColumnSchema.comment,
      headerName: 'Описание',
      width: 190,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderHeader: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
        </Box>
      ),
    },
    {
      field: MaterialColumnSchema.price,
      valueFormatter: (value) => toRubles(Number(value)),
      headerName: 'Цена',
      width: 100,
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderHeader: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
        </Box>
      ),
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
      width: 150,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderHeader: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
        </Box>
      ),
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
      width: 110,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderHeader: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
        </Box>
      ),
    },
    {
      field: MaterialColumnSchema.categoryMaterial,
      headerName: 'Категория',
      align: 'left',
      headerAlign: 'left',
      width: 100,
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
      width: 100,
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
      width: 130,
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
                (elem) => elem.uuid === curValue.fieldUnitMeasurementUuid
              );

              charateristicUnitMeasurement = charateristicUnitMeasurementObject?.name;
            }
            acc += `${counter}) ${curValue.name} = ${curValue.value}${charateristicUnitMeasurement && charateristicUnitMeasurement !== '-' ? ` (${charateristicUnitMeasurement}); ` : '; '}`;

            counter += 1;
            return acc;
          }, finishValue);
        }
        return finishValue;
      },
      headerName: 'Характеристики',
      align: 'left',
      headerAlign: 'left',
      width: 250,
    },
    {
      field: MaterialColumnSchema.updatedAt,
      // type: 'dateTime',
      valueGetter: (value, row) => {
        const finishValue = moment(row.updatedAt).locale('ru').format('DD.MM.YYYY HH:mm:ss');
        return finishValue;
      },
      headerName: 'Дата обновления',
      width: 100,
    },
    {
      field: MaterialColumnSchema.actions,
      // type: 'boolean',
      // renderCell: (params) => <MaterialActionsTable {...{ params, rowId, setRowId }} />,
      type: 'actions',
      cellClassName: 'actions',
      headerName: 'Действия',
      width: 180,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Справочник материалов</Typography>
      <div style={{ width: '100%', maxWidth: '100vw' }}>
        <DataGrid
          rows={rows}
          columns={allMaterialsTableColumns}
          getRowId={(row) => row.uuid}
          apiRef={apiRef}
          loading={!workspaceInfo}
          editMode="row"
          pageSizeOptions={[5, 10, 20, 50, 100]}
          paginationModel={paginationModel}
          onPaginationModelChange={(paginationModelGrid) => setPaginationModel(paginationModelGrid)}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          isCellEditable={(params) => {
            const isEditableRow = MaterialEditableColumns.includes(params.field);
            const isNewRow = params.row?.isNew;
            return isNewRow || isEditableRow;
          }}
          // slots={{ toolbar: GridToolbar }}
          slots={{
            toolbar: editToolbar as GridSlots['toolbar'],
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          autoHeight
          getRowHeight={() => 'auto'}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) => (theme.palette.mode === 'light' ? grey[200] : grey[900]),
            },
            '& .MuiDataGrid-cell--editable': {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)'),
            },
          }}
          // disableRowSelectionOnClick
          // checkboxSelection
        />
      </div>
    </Container>
  );
}
