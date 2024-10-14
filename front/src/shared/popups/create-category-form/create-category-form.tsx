import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  HandbookGetCommand,
  WorkspaceGetCommand,
  CategoryMaterialCreateCommand,
  FieldOfCategoryMaterialGetCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useRouter } from 'src/utils/hooks/router-hooks';
import { StatusesEntities } from 'src/utils/types/statuses-entities.type';
import { isCurrentUserTypeGuard } from 'src/utils/type-guards/is-current-user.type-guard';
import { isUserWithRelatedWorkspaceTG } from 'src/utils/type-guards/is-user-with-related-workspace.type-guard';

import { RHFSelect } from 'src/shared/hook-form/rhf-select';
import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import RHFAutocomplete from 'src/shared/hook-form/rhf-autocomplete';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { RHFFieldsAutocomplete } from 'src/shared/hook-form/rhf-fields-autocomplete';
import { CreateCategoryProps } from 'src/shared/popups/create-category-form/create-category-form.props';
import { getFullWorkspaceInfo } from 'src/api/realisation-requests/workspace.global-getter.realisation';
import { createCategoryMaterial } from 'src/api/actions/category-material/create-category-material.action';
import RHFAutocompleteTemplateName from 'src/shared/hook-form/rhf-autocomplete-category-template-name/rhf-autocomplete-template-name';

export default function CreateCategoryForm({
  isOpenCreateCategoryPopup,
  onCloseCreateCategoryPopup,
  allFields,
  allGlobalCategories,
}: CreateCategoryProps) {
  const router = useRouter();

  const { workspaceInfo, setWorkspaceInfo } = useWorkspaceInfoStore((state) => state);

  const currentWorkspaceInfo =
    workspaceInfo?.currentWorkspaceInfo as WorkspaceGetCommand.ResponseEntity;
  const currentHandbookInfo =
    workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;

  const { enqueueSnackbar } = useSnackbar();
  const tagsAll = allFields?.map((field) => field.name);

  const CreateNewCategorySchema = Yup.object().shape({
    name: Yup.string().required('Необходимо заполнить наименование категории'),
    comment: Yup.string(),
    categoryMaterialStatus: Yup.string().required('Необходимо заполнить статус категории'),
    tagsTemplate: Yup.array().of(Yup.string()),
    requiredFieldsInCategory: Yup.array().of(Yup.object()),
    notRequiredFieldsInCategory: Yup.array().of(Yup.object()),
    globalCategoryMaterialName: Yup.string().required(
      'Необходимо заполнить наименование глобальной категории для текущей категории'
    ),
  });

  const defaultValues = {
    name: '',
    comment: '',
    categoryMaterialStatus: 'ACTIVE',
    tagsTemplate: [],
    requiredFieldsInCategory: [],
    notRequiredFieldsInCategory: [],
    globalCategoryMaterialName:
      allGlobalCategories &&
      (allGlobalCategories!.find((value) => value?.name === 'MATERIALS')?.nameRu as string),
  };

  // console.log(JSON.stringify(defaultValues));

  const methods = useForm({
    resolver: yupResolver(CreateNewCategorySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    getValues,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const allRequiredFieldsOfCategoryInWorkspace = allFields?.filter(
    (field) => field.isRequired
  ) as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;

  const allNotRequiredFieldsOfCategoryInWorkspace = allFields?.filter(
    (field) => !field.isRequired
  ) as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;

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

      // console.log(templateName);
      const createCategoryDto: CategoryMaterialCreateCommand.Request = {
        name: data.name,
        comment: data.comment,
        categoryMaterialStatus: data?.categoryMaterialStatus as StatusesEntities,
        globalCategoryMaterialUuid,
        templateName,
        fieldsOfCategoryMaterials: allFieldsToCreateCategory,
        fieldsOfCategoryMaterialsInTemplate: tagsInTemplate,
      };

      const createdCategoryMaterial = await createCategoryMaterial(
        currentWorkspaceInfo?.uuid,
        currentHandbookInfo?.uuid,
        createCategoryDto
      );
      console.info('DATA1', createdCategoryMaterial);

      const currentUserInfo = await getCurrentUser();
      if (
        isCurrentUserTypeGuard(currentUserInfo) &&
        isUserWithRelatedWorkspaceTG(currentUserInfo)
      ) {
        const updatedWorkspaceInfo = await getFullWorkspaceInfo(currentUserInfo);
        setWorkspaceInfo(updatedWorkspaceInfo);
      }
      // if (!isErrorFieldTypeGuard(createdCategoryMaterial)) {
      //   const updateCategoryDto: CategoryMaterialUpdateCommand.Request = {
      //     fieldsOfCategoryMaterials: allFieldsToCreateCategory,
      //     fieldsOfCategoryMaterialsInTemplate: tagsInTemplate,
      //   };
      //   const updatedCreatedCategoryMaterial = await updateCategoryMaterial(
      //     currentWorkspaceInfo?.uuid,
      //     currentHandbookInfo?.uuid,
      //     createdCategoryMaterial?.uuid,
      //     updateCategoryDto
      //   );
      //   console.info('DATA2', updateCategoryDto);
      //   console.info('DATA3', updatedCreatedCategoryMaterial);
      // }

      reset();
      onCloseCreateCategoryPopup();
      // router.push(paths.dashboard.categoryMaterials);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Новая категория не создана, произошда ошибка', error);
      throw new Error('isNewRow = false, problem with creating a new row');
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={isOpenCreateCategoryPopup}
      onClose={onCloseCreateCategoryPopup}
      PaperProps={{
        sx: { maxWidth: 920 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmitForm}>
        <DialogTitle>Создание новой категории</DialogTitle>

        <DialogContent>
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
              defaultValue="ACTIVE"
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

            {/* {allGlobalCategories[0] && ( */}
            {/*  <RHFGlobalCategoriesAutocomplete */}
            {/*    type="global-category" */}
            {/*    name="globalCategoryMaterialName" */}
            {/*    options={allGlobalCategories} */}
            {/*    defValue={allGlobalCategories[0]} */}
            {/*  /> */}
            {/* )} */}

            {allGlobalCategories[0] && (
              <RHFAutocomplete
                name="globalCategoryMaterialName"
                type="global-category"
                label="Глобальная категория"
                placeholder="Выбор глобальной категории"
                fullWidth
                isOptionEqualToValue={(option, value) => option === value}
                disabled
                options={allGlobalCategories?.map((value) => value?.nameRu as string)}
                defaultValue={
                  allGlobalCategories.find((globalCategory) => globalCategory.name === 'MATERIALS')
                    ?.nameRu
                }
                getOptionLabel={(option) => option}
              />
            )}

            <RHFTextField name="name" label="Наименование" />

            <RHFTextField multiline name="comment" label="Описание категории" />

            {Array.isArray(tagsAll) && (
              <RHFAutocompleteTemplateName name="tagsTemplate" options={tagsAll} defValue={[]} />
            )}

            <RHFFieldsAutocomplete
              type="required"
              name="requiredFieldsInCategory"
              options={allRequiredFieldsOfCategoryInWorkspace}
              defValue={[]}
            />

            <RHFFieldsAutocomplete
              type="not-required"
              name="notRequiredFieldsInCategory"
              options={allNotRequiredFieldsOfCategoryInWorkspace}
              defValue={[]}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={(event) => {
              reset();
              onCloseCreateCategoryPopup();
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
