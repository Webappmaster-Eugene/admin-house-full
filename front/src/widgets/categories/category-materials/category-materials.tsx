'use client';

import { useSnackbar } from 'notistack';
import { useState, useCallback } from 'react';
import {
  HandbookGetCommand,
  WorkspaceGetCommand,
  CategoryMaterialGetCommand,
  CategoryMaterialGetAllCommand,
  GlobalCategoryMaterialGetAllCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

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
import CustomBreadcrumbs from 'src/shared/breadcrumbs/custom-breadcrumbs';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
import { defaultFilters } from 'src/widgets/categories/category-materials/consts';
import EditCategoryForm from 'src/shared/popups/edit-category-form/edit-category-form';
import CreateCategoryForm from 'src/shared/popups/create-category-form/create-category-form';
import { IFileFilters, IFileFilterValue } from 'src/widgets/categories/category-materials/types';
import { CategoryMaterialProps } from 'src/widgets/categories/category-materials/category-materials.props';
import FileManagerTable from 'src/widgets/categories/category-materials/category-table/file-manager-table';
import { applyFilterHandler } from 'src/widgets/categories/category-materials/helpers/apply-filter.handler';
import FileManagerGridView from 'src/widgets/categories/category-materials/category-grid/file-manager-grid-view';
import FileManagerFilters from 'src/widgets/categories/category-materials/category-filters/file-manager-filters';
import { deleteOneCategoryMaterial } from 'src/api/actions/category-material/delete-one-category-material.action';
import { deleteManyCategoryMaterial } from 'src/api/actions/category-material/delete-many-category-material.action';

import FileManagerFiltersResult from '../file-manager-filters-result';

export default function CategoryMaterials({
  materials,
  allCategoriesInWorkspace,
}: CategoryMaterialProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [categoryToChange, setCategoryToChange] = useState<
    CategoryMaterialGetCommand.ResponseEntity | undefined
  >(undefined);

  const { workspaceInfo } = useWorkspaceInfoStore((state) => state);
  const currentWorkspaceInfo =
    workspaceInfo?.currentWorkspaceInfo as WorkspaceGetCommand.ResponseEntity;
  const currentHandbookInfo =
    workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;

  const allFields =
    workspaceInfo?.allFieldsOfCategoryMaterialsOfHandbook as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;

  const allGlobalCategories =
    workspaceInfo?.allGlobalCategories as GlobalCategoryMaterialGetAllCommand.ResponseEntity;

  const table = useTable({ defaultRowsPerPage: 10 });

  const confirm = useBoolean();

  const isCreatingNewCategory = useBoolean();

  const isChangingCategory = useBoolean();

  const [view, setView] = useState('list');

  const [tableData, setTableData] =
    useState<CategoryMaterialGetAllCommand.ResponseEntity>(allCategoriesInWorkspace);

  const [filters, setFilters] = useState<IFileFilters>(defaultFilters);

  const dataFiltered = applyFilterHandler({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset = !!filters.name;

  const notFound = (!dataFiltered?.length && canReset) || !dataFiltered?.length;

  const handleChangeView = (event: React.MouseEvent<HTMLElement>, newView: string | null) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleChangeCategory = (
    event: React.MouseEvent<HTMLElement>,
    newCategoryInfoToChange: CategoryMaterialGetCommand.ResponseEntity
  ) => {
    setCategoryToChange(newCategoryInfoToChange);
    isChangingCategory.onTrue();
  };

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
    async (id: string) => {
      const allRowsWithoutDeleted = tableData.filter((row) => row.uuid !== id);
      await deleteOneCategoryMaterial(currentWorkspaceInfo?.uuid, currentHandbookInfo?.uuid, id);

      setTableData(allRowsWithoutDeleted);

      table.onUpdatePageDeleteRow(dataInPage?.length);
      enqueueSnackbar('Удаление успешно произведено!');
    },
    [dataInPage?.length, enqueueSnackbar, table, tableData]
  );

  const handleDeleteItems = useCallback(async () => {
    const selectedCategoriesToDelete = table.selected;
    const allRowsWithoutDeleted = tableData.filter(
      (categoryMaterialInTable) => !table.selected.includes(categoryMaterialInTable?.uuid as string)
    );
    await deleteManyCategoryMaterial(
      currentWorkspaceInfo?.uuid,
      currentHandbookInfo?.uuid,
      selectedCategoriesToDelete
    );

    setTableData(allRowsWithoutDeleted);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage?.length,
      totalRowsFiltered: dataFiltered?.length,
    });
    enqueueSnackbar('Удаление успешно произведено!');
  }, [dataInPage?.length, enqueueSnackbar, table, tableData]);

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
      results={dataFiltered?.length || 0}
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
            onClick={isCreatingNewCategory.onTrue}
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
            title="Данные отсутствуют"
            sx={{
              py: 10,
            }}
          />
        ) : (
          <>
            {view === 'list' ? (
              <FileManagerTable
                table={table}
                dataFiltered={dataFiltered}
                onDeleteRow={handleDeleteItem}
                notFound={notFound}
                onOpenConfirm={confirm.onTrue}
                onOpenChangerPopup={handleChangeCategory}
              />
            ) : (
              <FileManagerGridView
                table={table}
                dataFiltered={dataFiltered}
                onDeleteItem={handleDeleteItem}
                onOpenConfirm={confirm.onTrue}
                onOpenChangerPopup={handleChangeCategory}
              />
            )}
          </>
        )}
      </Container>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Удаление категории"
        content={
          <>
            <Typography>
              Вы уверены, что хотите удалить <strong> {table.selected.length} </strong>{' '}
              категор(ий)и?
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              (материалы внутри категорий не будут удалены, а переместятся в общую категорию)
            </Typography>
          </>
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
      {categoryToChange && (
        <EditCategoryForm
          allFields={allFields}
          allGlobalCategories={allGlobalCategories}
          currentCategoryInfo={categoryToChange as CategoryMaterialGetCommand.ResponseEntity}
          isOpenEditCategoryForm={isChangingCategory.value}
          onCloseEditCategoryForm={isChangingCategory.onFalse}
        />
      )}

      {workspaceInfo && (
        <CreateCategoryForm
          isOpenCreateCategoryPopup={isCreatingNewCategory.value}
          allGlobalCategories={allGlobalCategories}
          onCloseCreateCategoryPopup={isCreatingNewCategory.onFalse}
          allFields={allFields}
        />
      )}
    </>
  );
}
