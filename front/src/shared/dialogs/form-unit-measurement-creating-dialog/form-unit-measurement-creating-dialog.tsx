import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, MouseEvent } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import { EntityActivityStatus } from 'src/utils/const/entity-activity-status.enum';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';
import { frontendFromBackendErrors } from 'src/utils/const/frontend-from-backend.errors';
import { isNameInErrorTypeGuard } from 'src/utils/type-guards/is-name-in-error.type-guard';

import FormProvider, { RHFTextField } from 'src/shared/hook-form';
import { FormUnitMeasurementCreatingDialogProps } from 'src/shared/dialogs/form-unit-measurement-creating-dialog/form-unit-measurement-creating-dialog.props';

export default function FormUnitMeasurementCreatingDialog({
  dialog,
  handleClickAddUnitMeasurement,
  handleChangeAfterCreating,
}: FormUnitMeasurementCreatingDialogProps) {
  const [errorMsg, setErrorMsg] = useState('');

  const CreateNewUnitMeasurementSchema = Yup.object().shape({
    name: Yup.string().required('Наименование единицы измерения не может быть пустым'),
    comment: Yup.string(),
  });

  const defaultValues = {
    name: '',
    comment: '',
  };

  const methods = useForm({
    resolver: yupResolver(CreateNewUnitMeasurementSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data, event) => {
    if (event) {
      event?.preventDefault();
    }

    const newUnitMeasurement = await handleClickAddUnitMeasurement({
      name: data.name,
      comment: data.comment,
      fieldUnitMeasurementStatus: EntityActivityStatus.ACTIVE,
    });
    handleChangeAfterCreating(newUnitMeasurement.name);

    if (!isErrorFieldTypeGuard(newUnitMeasurement)) {
      reset();
      dialog.onFalse();
    } else {
      const { error } = newUnitMeasurement;
      reset();
      if (isNameInErrorTypeGuard(error)) {
        setErrorMsg(frontendFromBackendErrors[error.name] || error.name);
      } else {
        setErrorMsg(
          typeof error === 'string'
            ? error
            : 'Неизвестная ошибка при создании новой единицы измерения'
        );
      }
    }
  });

  const handleCancelButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    reset();
    dialog.onFalse();
  };

  return (
    <Dialog open={dialog.value} disableEscapeKeyDown disableEnforceFocus>
      <DialogTitle>Добавьте новую единицу измерения</DialogTitle>

      <DialogContent sx={{ paddingBottom: '20px' }}>
        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        )}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5} sx={{ paddingTop: '15px' }}>
            <RHFTextField name="name" label="Наименование" />
            <RHFTextField name="comment" label="Описание" multiline />

            <Stack
              sx={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '15px',
              }}
            >
              <LoadingButton
                fullWidth
                color="inherit"
                size="medium"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Создать
              </LoadingButton>

              <Button
                onClick={handleCancelButtonClick}
                variant="outlined"
                color="inherit"
                sx={{ width: '85%' }}
              >
                Отменить
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
