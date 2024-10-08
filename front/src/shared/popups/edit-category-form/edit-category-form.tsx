import * as Yup from 'yup';
import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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
import { EditCategoryProps } from 'src/shared/popups/edit-category-form/edit-category-form.props';
import RHFAutocompleteTemplateName from 'src/shared/hook-form/rhf-autocomplete-category-template-name/rhf-autocomplete-template-name';

export default function EditCategoryForm({
  currentCategoryInfo,
  open,
  onClose,
  allFields,
  allGlobalCategories,
}: EditCategoryProps) {
  const { enqueueSnackbar } = useSnackbar();

  const tagsAll = allFields?.map((field) => field.name);
  const tagsForInput = categoryTemplateNameToTagsParser(
    currentCategoryInfo.templateName,
    allFields
  );

  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Необходимо заполнить наименование категории'),
    comment: Yup.string(),
    uuid: Yup.string().required('Необходимо заполнить ID категории'),
    categoryMaterialStatus: Yup.string().required('Необходимо заполнить статус категории'),
    numInOrder: Yup.number().required('Необходимо заполнить порядковый номер категории'),
    tagsTemplate: Yup.array().of(Yup.string()),
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
      globalCategoryMaterialName: currentCategoryInfo?.globalCategoryMaterial?.name || '',
    }),
    [tagsForInput, currentCategoryInfo]
  );

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      await reset();
      onClose();
      enqueueSnackbar('Обновление категории успешно!');
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
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
              options={allGlobalCategories.map((value) => value?.nameRu as string)}
              value={currentCategoryInfo.globalCategoryMaterial.nameRu}
              getOptionLabel={(option) => option}
            />

            <RHFTextField name="name" label="Наименование" value={currentCategoryInfo.name} />

            <RHFTextField
              disabled
              name="numInOrder"
              label="Номер п/п"
              value={currentCategoryInfo.numInOrder}
            />

            <RHFTextField
              multiline
              name="comment"
              label="Описание категории"
              value={currentCategoryInfo.comment}
            />

            {Array.isArray(tagsForInput) && tagsAll && (
              <RHFAutocompleteTemplateName
                name="tagsTemplate"
                options={tagsAll}
                defValue={tagsForInput}
                disabled={false}
              />
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={(event) => {
              onClose();
              reset();
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
  );
}
