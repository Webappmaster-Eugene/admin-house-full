import * as Yup from 'yup';
import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/utils/routes/paths';
import { useRouter } from 'src/utils/hooks/router-hooks';

import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import { CreateCategoryProps } from 'src/shared/popups/create-category-form/create-category-form.props';

export type IUserItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
};

export default function CreateCategoryForm({
  openCreateCategoryPopup,
  onCloseCreateCategoryPopup,
  allFields,
  allGlobalCategories,
}: CreateCategoryProps) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const tagsAll = allFields?.map((field) => field.name);
  // const tagsForInput = categoryTemplateNameToTagsParser(
  //   currentCategoryInfo.templateName,
  //   allFields
  // );
  const defaultGlobalCategoryName = allGlobalCategories.find((value) => value.name === 'MATERIALS');

  const CreateNewCategorySchema = Yup.object().shape({
    name: Yup.string().required('Необходимо заполнить наименование категории'),
    comment: Yup.string(),
    categoryMaterialStatus: Yup.string().required('Необходимо заполнить статус категории'),
    tagsTemplate: Yup.array().of(Yup.string()),
    globalCategoryMaterialName: Yup.string().required(
      'Необходимо заполнить наименование глобальной категории для текущей категории'
    ),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      comment: '',
      categoryMaterialStatus: 'ACTIVE',
      tagsTemplate: [''],
      globalCategoryMaterialName: defaultGlobalCategoryName as unknown as string,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(CreateNewCategorySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmitForm = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Create success!');
      router.push(paths.dashboard.categoryMaterials);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmitForm}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {/* <RHFSwitch */}
            {/*  name="isVerified" */}
            {/*  labelPlacement="start" */}
            {/*  label={ */}
            {/*    <> */}
            {/*      <Typography variant="subtitle2" sx={{ mb: 0.5 }}> */}
            {/*        Email Verified */}
            {/*      </Typography> */}
            {/*      <Typography variant="body2" sx={{ color: 'text.secondary' }}> */}
            {/*        Disabling this will automatically send the user a verification email */}
            {/*      </Typography> */}
            {/*    </> */}
            {/*  } */}
            {/*  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }} */}
            {/* /> */}

            <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
              <Button variant="soft" color="error">
                Delete User
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                // loading={isSubmitting}
                onClick={() => {
                  onCloseCreateCategoryPopup();
                  reset();
                }}
              >
                Отменить
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
