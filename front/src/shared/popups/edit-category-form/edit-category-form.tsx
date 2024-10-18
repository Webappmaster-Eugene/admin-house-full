import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { StatusesEntities } from '@/utils/types/statuses-entities.type';
import { useWorkspaceInfoStore } from '@/store/workspace/workspace.store';
import { isErrorFieldTypeGuard } from '@/utils/type-guards/is-error-field.type-guard';
import { updateCategoryMaterial } from '@/api/actions/category-material/update-category-material.action';
import {
  HandbookGetCommand,
  WorkspaceGetCommand,
  CategoryMaterialUpdateCommand,
  CategoryMaterialGetAllCommand,
  FieldOfCategoryMaterialGetCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { categoryTemplateNameToTagsParser } from 'src/utils/helpers/parsers/category-template-name-parser/category-template-name-to-tags.parser';

import { RHFSelect } from 'src/shared/hook-form/rhf-select';
import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import RHFAutocomplete from 'src/shared/hook-form/rhf-autocomplete';
import { RHFFieldsAutocomplete } from 'src/shared/hook-form/rhf-fields-autocomplete';
import { EditCategoryProps } from 'src/shared/popups/edit-category-form/edit-category-form.props';
import RHFAutocompleteTemplateName from 'src/shared/hook-form/rhf-autocomplete-category-template-name/rhf-autocomplete-template-name';

export default function EditCategoryForm({
  currentCategoryInfo,
  isOpenEditCategoryForm,
  onCloseEditCategoryForm,
  allFields,
  allGlobalCategories,
  setTableData,
}: EditCategoryProps) {
  const { workspaceInfo, setWorkspaceInfo } = useWorkspaceInfoStore((state) => state);

  const currentWorkspaceInfo =
    workspaceInfo?.currentWorkspaceInfo as WorkspaceGetCommand.ResponseEntity;
  const currentHandbookInfo =
    workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;

  const { enqueueSnackbar } = useSnackbar();

  const tagsAll = allFields?.map((field) => field.name);

  const allRequiredFieldsOfCategoryInWorkspace =
    currentCategoryInfo?.fieldsOfCategoryMaterials?.filter(
      (field) => field.isRequired
    ) as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;

  const allNotRequiredFieldsOfCategoryInWorkspace =
    currentCategoryInfo?.fieldsOfCategoryMaterials?.filter(
      (field) => !field.isRequired
    ) as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;

  const tagsForInput = categoryTemplateNameToTagsParser(
    currentCategoryInfo?.templateName,
    allFields
  );

  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Необходимо заполнить наименование категории'),
    comment: Yup.string(),
    uuid: Yup.string().required('Необходимо заполнить ID категории'),
    categoryMaterialStatus: Yup.string().required('Необходимо заполнить статус категории'),
    numInOrder: Yup.number().required('Необходимо заполнить порядковый номер категории'),
    tagsTemplate: Yup.array().of(Yup.string()),
    requiredFieldsInCategory: Yup.array().of(Yup.object()),
    notRequiredFieldsInCategory: Yup.array().of(Yup.object()),
    globalCategoryMaterialName: Yup.string().required(
      'Необходимо заполнить наименование глобальной категории для текущей категории'
    ),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCategoryInfo?.name || '',
      comment: currentCategoryInfo?.comment || '',
      uuid: currentCategoryInfo?.uuid || '',
      categoryMaterialStatus: currentCategoryInfo?.categoryMaterialStatus || 'ACTIVE',
      numInOrder: currentCategoryInfo?.numInOrder as number,
      tagsTemplate: tagsForInput,
      requiredFieldsInCategory: allRequiredFieldsOfCategoryInWorkspace,
      notRequiredFieldsInCategory: allNotRequiredFieldsOfCategoryInWorkspace,
      globalCategoryMaterialName: currentCategoryInfo?.globalCategoryMaterial?.name || '',
    }),
    [tagsForInput, currentCategoryInfo]
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    // resetField,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  useEffect(() => {
    const allFieldsNamesInRequiredFields =
      values?.requiredFieldsInCategory &&
      values.requiredFieldsInCategory.map(
        (field) => ('name' in field && typeof field?.name === 'string' && field?.name) || ''
      );

    const allFieldsNamesInNotRequiredFields =
      values?.notRequiredFieldsInCategory &&
      values.notRequiredFieldsInCategory.map(
        (field) => ('name' in field && typeof field?.name === 'string' && field?.name) || ''
      );

    values.tagsTemplate?.forEach((tag) => {
      const fieldOfCategoryMaterial = allFields.find((field) => field.name === tag);
      if (
        allFieldsNamesInRequiredFields &&
        Array.isArray(allFieldsNamesInRequiredFields) &&
        !allFieldsNamesInRequiredFields?.includes(tag as string) &&
        fieldOfCategoryMaterial &&
        fieldOfCategoryMaterial.isRequired
      ) {
        setValue('requiredFieldsInCategory', [
          ...(values?.requiredFieldsInCategory || []),
          fieldOfCategoryMaterial,
        ]);
      }

      if (
        allFieldsNamesInNotRequiredFields &&
        Array.isArray(allFieldsNamesInNotRequiredFields) &&
        !allFieldsNamesInNotRequiredFields?.includes(tag as string) &&
        fieldOfCategoryMaterial &&
        !fieldOfCategoryMaterial.isRequired
      ) {
        setValue('notRequiredFieldsInCategory', [
          ...(values?.notRequiredFieldsInCategory || []),
          fieldOfCategoryMaterial,
        ]);
      }
    });
  }, [values.tagsTemplate]);

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      const globalCategoryMaterialUuid = allGlobalCategories?.find(
        (globalCategory) => globalCategory.nameRu === data.globalCategoryMaterialName
      )?.uuid as string;

      const tagsInTemplate: Array<FieldOfCategoryMaterialGetCommand.ResponseEntity> = [];
      const allFieldsToCreateCategory: Array<FieldOfCategoryMaterialGetCommand.ResponseEntity> = [
        ...((data?.requiredFieldsInCategory as Array<FieldOfCategoryMaterialGetCommand.ResponseEntity>) ||
          []),
        ...((data?.notRequiredFieldsInCategory as Array<FieldOfCategoryMaterialGetCommand.ResponseEntity>) ||
          []),
      ];

      const templateName =
        data?.tagsTemplate &&
        allFields &&
        data.tagsTemplate.reduce((acc, tag) => {
          if (tag) {
            if (tagsAll.includes(tag)) {
              const fieldOfCategoryInNewCategory = allFields?.find((field) => field.name === tag);
              if (fieldOfCategoryInNewCategory) {
                tagsInTemplate.push(fieldOfCategoryInNewCategory);
                // @ts-ignore
                acc += fieldOfCategoryInNewCategory?.uniqueNameForTemplate || '';
              }
            } else {
              acc += tag;
            }
          }
          return acc;
        }, '');

      const updateCategoryDto: CategoryMaterialUpdateCommand.Request = {
        name: data.name,
        comment: data.comment,
        categoryMaterialStatus: data?.categoryMaterialStatus as StatusesEntities,
        templateName,
        fieldsOfCategoryMaterials: allFieldsToCreateCategory,
        fieldsOfCategoryMaterialsInTemplate: tagsInTemplate,
      };

      const updatedCreatedCategoryMaterial = await updateCategoryMaterial(
        currentWorkspaceInfo?.uuid,
        currentHandbookInfo?.uuid,
        currentCategoryInfo?.uuid,
        updateCategoryDto
      );

      if (!isErrorFieldTypeGuard(updatedCreatedCategoryMaterial)) {
        setTableData((prevData: CategoryMaterialGetAllCommand.ResponseEntity) => {
          const newDataToReturn = prevData.map((category) => {
            if (category.uuid === updatedCreatedCategoryMaterial?.uuid) {
              return updatedCreatedCategoryMaterial;
            }
            return category;
          });
          return newDataToReturn;
        });
      }

      reset();
      onCloseEditCategoryForm();
      enqueueSnackbar('Обновление категории прошло успешно!');
    } catch (error) {
      console.error(error);
    }
  });

  interface Movie {
    title: string;
    year: number;
  }

  const options: Movie[] = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
  ];

  return (
    currentCategoryInfo && (
      <Dialog
        fullWidth
        maxWidth={false}
        open={isOpenEditCategoryForm}
        onClose={onCloseEditCategoryForm}
        PaperProps={{
          sx: { maxWidth: 920 },
        }}
      >
        <FormProvider methods={methods} onSubmit={onSubmitForm}>
          <DialogTitle>Изменение категории</DialogTitle>

          <DialogContent>
            {currentCategoryInfo && currentCategoryInfo?.materials?.length === 0 && (
              <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
                В категории отсутствуют материалы
              </Alert>
            )}

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFSelect
                name="categoryMaterialStatus"
                label="Статус"
                sx={{
                  mt: '10px',
                }}
                disabled
                defaultValue={
                  currentCategoryInfo?.categoryMaterialStatus
                    ? currentCategoryInfo?.categoryMaterialStatus
                    : 'ACTIVE'
                }
              >
                {[
                  { label: 'Активный', value: 'ACTIVE' },
                  { label: 'Отключен', value: 'INACTIVE' },
                  { label: 'Удален', value: 'DELETED' },
                ].map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
              <RHFTextField name="uuid" disabled label="Id" value={currentCategoryInfo?.uuid} />

              <RHFAutocomplete
                name="globalCategoryMaterialName"
                type="global-category"
                label="Глобальная категория"
                placeholder="Выбор глобальной категории"
                fullWidth
                disabled
                options={allGlobalCategories?.map((value) => value?.nameRu as string)}
                value={currentCategoryInfo?.globalCategoryMaterial?.nameRu}
                getOptionLabel={(option) => option}
              />

              <RHFTextField
                name="name"
                label="Наименование"
                defaultValue={currentCategoryInfo?.name}
              />

              <RHFTextField
                disabled
                name="numInOrder"
                label="Номер п/п"
                defaultValue={currentCategoryInfo?.numInOrder}
              />

              <RHFTextField
                multiline
                name="comment"
                label="Описание категории"
                defaultValue={currentCategoryInfo?.comment}
              />

              {Array.isArray(tagsForInput) && currentCategoryInfo && (
                <RHFAutocompleteTemplateName
                  name="tagsTemplate"
                  options={tagsAll}
                  defValue={tagsForInput}
                  disabled={currentCategoryInfo.isDefault}
                />
              )}

              {currentCategoryInfo && (
                <RHFFieldsAutocomplete
                  type="required"
                  disabled={currentCategoryInfo.isDefault}
                  name="requiredFieldsInCategory"
                  options={allRequiredFieldsOfCategoryInWorkspace}
                  tagsInTemplate={values.tagsTemplate as string[]}
                  defValue={
                    currentCategoryInfo?.fieldsOfCategoryMaterials
                      ?.filter((field) => field.isRequired)
                      .map((field) => field) as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
                  }
                />
              )}

              {currentCategoryInfo && (
                <RHFFieldsAutocomplete
                  type="not-required"
                  disabled={currentCategoryInfo.isDefault}
                  name="notRequiredFieldsInCategory"
                  options={allNotRequiredFieldsOfCategoryInWorkspace}
                  tagsInTemplate={values.tagsTemplate as string[]}
                  defValue={
                    currentCategoryInfo?.fieldsOfCategoryMaterials
                      ?.filter((field) => !field.isRequired)
                      .map((field) => field) as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
                  }
                />
              )}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={(event) => {
                reset();
                onCloseEditCategoryForm();
              }}
            >
              Отменить
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Сохранить
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    )
  );
}
