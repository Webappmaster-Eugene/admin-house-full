'use client';

import { useSnackbar } from 'notistack';
import { useState, useCallback } from 'react';
import { CategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useBoolean } from 'src/utils/hooks/use-boolean';

import Iconify from 'src/shared/iconify';
import EmptyContent from 'src/shared/empty-content';
import { ConfirmDialog } from 'src/shared/custom-dialog';
import { useTable, getComparator } from 'src/shared/table';
import { defaultFilters } from 'src/widgets/categories/category-materials/consts';
import FileManagerNewFolderDialog from 'src/widgets/categories/file-manager-new-folder-dialog';
import { IFileFilters, IFileFilterValue } from 'src/widgets/categories/category-materials/types';
import { CategoryMaterialProps } from 'src/widgets/categories/category-materials/category-materials.props';
import FileManagerTable from 'src/widgets/categories/category-materials/category-table/file-manager-table';
import { applyFilterHandler } from 'src/widgets/categories/category-materials/helpers/apply-filter.handler';
import FileManagerFilters from 'src/widgets/categories/category-materials/category-filters/file-manager-filters';

import FileManagerFiltersResult from '../file-manager-filters-result';

export default function CategoryMaterials({ materials, categories }: CategoryMaterialProps) {
  const { enqueueSnackbar } = useSnackbar();

  const table = useTable({ defaultRowsPerPage: 10 });

  const confirm = useBoolean();

  const upload = useBoolean();

  const [view, setView] = useState('list');

  const [tableData, setTableData] =
    useState<CategoryMaterialGetAllCommand.ResponseEntity>(categories);

  const [filters, setFilters] = useState<IFileFilters>(defaultFilters);

  const dataFiltered = applyFilterHandler({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset = !!filters.name;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleChangeView = useCallback(
    (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
      if (newView !== null) {
        setView(newView);
      }
    },
    []
  );

  const handleFilters = useCallback(
    (name: string, value: IFileFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteItem = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.uuid !== id);

      enqueueSnackbar('Удаление успешно произведено!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, enqueueSnackbar, table, tableData]
  );

  const handleDeleteItems = useCallback(() => {
    const deleteRows = tableData.filter(
      (categoryMaterial) => !table.selected.includes(categoryMaterial.uuid)
    );

    enqueueSnackbar('Удаление успешно произведено!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, enqueueSnackbar, table, tableData]);

  const renderFilters = (
    <Stack
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
    >
      <FileManagerFilters filters={filters} onFilters={handleFilters} />

      <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
        <ToggleButton value="list">
          <Iconify icon="solar:list-bold" />
        </ToggleButton>

        <ToggleButton value="grid">
          <Iconify icon="mingcute:dot-grid-fill" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );

  const renderResults = (
    <FileManagerFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  return (
    <>
      <Container maxWidth="xl">
        <Stack
          spacing={2.5}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4"> Справочник категорий</Typography>
          <IconButton
            size="small"
            color="primary"
            onClick={upload.onTrue}
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <Iconify icon="mingcute:add-line" />
          </IconButton>
        </Stack>
        <Stack
          spacing={2.5}
          sx={{
            my: { xs: 3, md: 5 },
          }}
        >
          {renderFilters}

          {canReset && renderResults}
        </Stack>

        {notFound ? (
          <EmptyContent
            filled
            title="No Data"
            sx={{
              py: 10,
            }}
          />
        ) : (
          <>
            {/* {view === 'list' ? ( */}
            <FileManagerTable
              table={table}
              dataFiltered={dataFiltered}
              onDeleteRow={handleDeleteItem}
              notFound={notFound}
              onOpenConfirm={confirm.onTrue}
            />
            {/* ) : ( */}
            {/* <FileManagerGridView */}
            {/*  table={table} */}
            {/*  dataFiltered={dataFiltered} */}
            {/*  onDeleteItem={handleDeleteItem} */}
            {/*  onOpenConfirm={confirm.onTrue} */}
            {/* /> */}
            {/* )} */}
          </>
        )}
      </Container>

      <FileManagerNewFolderDialog open={upload.value} onClose={upload.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Удаление категории"
        content={
          <Typography>
            Вы уверены, что хотите удалить <strong> {table.selected.length} </strong> категор(ий)и?
            (Материалы внутри категорий не будут удалены, а переместятся в общую категорию)
          </Typography>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteItems();
              confirm.onFalse();
            }}
          >
            Удалить
          </Button>
        }
      />

      {/* <FileManagerNewFolderDialog */}
      {/*  open={newFolder.value} */}
      {/*  onClose={newFolder.onFalse} */}
      {/*  title="Создание новой категории" */}
      {/*  onCreate={() => { */}
      {/*    newFolder.onFalse(); */}
      {/*    setFolderName(''); */}
      {/*    console.info('CREATE NEW FOLDER', folderName); */}
      {/*  }} */}
      {/*  folderName={folderName} */}
      {/*  onChangeFolderName={handleChangeFolderName} */}
      {/* /> */}
    </>
  );
}
