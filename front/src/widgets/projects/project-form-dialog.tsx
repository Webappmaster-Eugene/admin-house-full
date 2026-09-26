'use client';

import { useState, useEffect } from 'react';

import {
  Stack,
  Button,
  Dialog,
  MenuItem,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

// ----------------------------------------------------------------------

export interface ProjectFormValues {
  organizationUuid: string;
  name: string;
  description: string;
  customerMail: string;
}

interface OrganizationOption {
  uuid: string;
  name: string;
}

interface ProjectFormDialogProps {
  open: boolean;
  organizations: OrganizationOption[];
  /** Организация по умолчанию для нового проекта */
  defaultOrganizationUuid: string;
  /** Значения для редактирования; без них — создание */
  initialValues?: ProjectFormValues;
  onClose: () => void;
  /** Возвращает true при успехе — тогда диалог закрывается */
  onSubmit: (values: ProjectFormValues) => Promise<boolean>;
}

// Та же проверка, что даёт понятную ошибку до запроса; окончательно email валидирует бэкенд (zod).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ProjectFormDialog({
  open,
  organizations,
  defaultOrganizationUuid,
  initialValues,
  onClose,
  onSubmit,
}: ProjectFormDialogProps) {
  const isEdit = Boolean(initialValues);
  const [values, setValues] = useState<ProjectFormValues>({
    organizationUuid: defaultOrganizationUuid,
    name: '',
    description: '',
    customerMail: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setValues(
      initialValues ?? {
        organizationUuid: defaultOrganizationUuid,
        name: '',
        description: '',
        customerMail: '',
      }
    );
    setTouched(false);
  }, [open, initialValues, defaultOrganizationUuid]);

  const trimmedMail = values.customerMail.trim();
  const nameError = touched && !values.name.trim();
  const organizationError = touched && !values.organizationUuid;
  const mailError = touched && trimmedMail !== '' && !EMAIL_PATTERN.test(trimmedMail);

  const movingToAnotherOrganization =
    isEdit && initialValues?.organizationUuid !== values.organizationUuid;

  const handleSubmit = async () => {
    setTouched(true);
    if (
      !values.name.trim() ||
      !values.organizationUuid ||
      (trimmedMail !== '' && !EMAIL_PATTERN.test(trimmedMail))
    ) {
      return;
    }
    setSubmitting(true);
    const ok = await onSubmit({
      organizationUuid: values.organizationUuid,
      name: values.name.trim(),
      description: values.description.trim(),
      customerMail: trimmedMail,
    });
    setSubmitting(false);
    if (ok) onClose();
  };

  const setField =
    (field: keyof ProjectFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: event.target.value }));

  let mailHelperText = 'Необязательно. Если не указать, подставится ваш email';
  if (isEdit) mailHelperText = 'Необязательно';
  if (mailError) mailHelperText = 'Некорректный email';

  return (
    <Dialog open={open} onClose={submitting ? undefined : onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Изменить проект' : 'Новый проект'}</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          spacing={2}
          mt={1}
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            select
            fullWidth
            required
            label="Организация"
            value={values.organizationUuid}
            onChange={setField('organizationUuid')}
            error={organizationError}
            helperText={
              (organizationError && 'Выберите организацию') ||
              (movingToAnotherOrganization &&
                'Проект вместе со сметами переедет в выбранную организацию') ||
              ' '
            }
            disabled={submitting}
          >
            {organizations.map((organization) => (
              <MenuItem key={organization.uuid} value={organization.uuid}>
                {organization.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            fullWidth
            required
            label="Название"
            placeholder="Например, Частный дом 10×12 м, ул. Лесная, 5"
            value={values.name}
            onChange={setField('name')}
            error={nameError}
            helperText={nameError ? 'Укажите название' : ' '}
            disabled={submitting}
          />
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Описание"
            placeholder="Адрес, площадь, пожелания заказчика — по желанию"
            value={values.description}
            onChange={setField('description')}
            disabled={submitting}
          />
          <TextField
            fullWidth
            type="email"
            label="Email заказчика"
            value={values.customerMail}
            onChange={setField('customerMail')}
            error={mailError}
            helperText={mailHelperText}
            disabled={submitting}
          />
          {/* Скрытая кнопка: Enter в однострочном поле отправляет форму */}
          <button type="submit" hidden aria-hidden tabIndex={-1} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose} disabled={submitting}>
          Отменить
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
          {isEdit ? 'Сохранить' : 'Создать'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
